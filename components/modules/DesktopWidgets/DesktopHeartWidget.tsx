import React, { useEffect, useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import {
	fetchLikesCount,
	incrementLikeCount,
	isSupabaseConfigured,
	subscribeToLikesCount,
} from '../../../services/supabaseClient';
import styles from './DesktopHeartWidget.module.css';

interface HeartParticle {
	id: number;
	x: number;
	y: number;
	randX: number;
	randRot: number;
}

const DEFAULT_BASE_LIKES = 39174;

export default function DesktopHeartWidget() {
	const [likes, setLikes] = useState<number>(DEFAULT_BASE_LIKES);
	const [isPulsing, setIsPulsing] = useState<boolean>(false);
	const [isLive, setIsLive] = useState<boolean>(false);
	const [particles, setParticles] = useState<HeartParticle[]>([]);

	useEffect(() => {
		const live = isSupabaseConfigured();
		setIsLive(live);

		// 1. Initial count from localStorage or base
		try {
			const saved = localStorage.getItem('webhead_like_count');
			if (saved) {
				const num = parseInt(saved, 10);
				if (!isNaN(num) && num > 0) {
					setLikes(num);
				}
			}
		} catch {
			// ignore
		}

		// 2. Fetch live count from Supabase if configured
		if (live) {
			fetchLikesCount().then((res) => {
				if (res.count > 0) {
					setLikes(res.count);
					try {
						localStorage.setItem('webhead_like_count', res.count.toString());
					} catch {
						// ignore
					}
				}
			});

			// Subscribe to real-time postgres updates on site_stats
			const sub = subscribeToLikesCount((newCount) => {
				setLikes(newCount);
				try {
					localStorage.setItem('webhead_like_count', newCount.toString());
				} catch {
					// ignore
				}
			});

			return () => {
				sub?.unsubscribe();
			};
		}

		// 3. Setup BroadcastChannel for real-time cross-tab sync even without remote Supabase
		let channel: BroadcastChannel | null = null;
		try {
			channel = new BroadcastChannel('webhead_likes_sync');
			channel.onmessage = (event) => {
				if (typeof event.data?.likes === 'number') {
					setLikes(event.data.likes);
					triggerPulse();
				}
			};
		} catch {
			// BroadcastChannel unsupported
		}

		return () => {
			channel?.close();
		};
	}, []);

	const triggerPulse = () => {
		setIsPulsing(true);
		setTimeout(() => setIsPulsing(false), 300);
	};

	const handleClickHeart = async (e: React.MouseEvent) => {
		triggerPulse();

		const rect = e.currentTarget.getBoundingClientRect();
		const spawnX = rect.left + rect.width / 2;
		const spawnY = rect.top + rect.height / 2;

		// Spawn multiple floating hearts for rich visual feedback
		const newParticles: HeartParticle[] = Array.from({ length: 4 }).map((_, idx) => ({
			id: Date.now() + Math.random() + idx,
			x: spawnX,
			y: spawnY,
			randX: (Math.random() - 0.5) * 160,
			randRot: (Math.random() - 0.5) * 60,
		}));

		setParticles((prev) => [...prev, ...newParticles]);

		setTimeout(() => {
			setParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id)));
		}, 1400);

		const updatedCount = likes + 1;
		setLikes(updatedCount);

		try {
			localStorage.setItem('webhead_like_count', updatedCount.toString());
			const channel = new BroadcastChannel('webhead_likes_sync');
			channel.postMessage({ likes: updatedCount });
			channel.close();
		} catch {
			// ignore
		}

		// Sync with remote Supabase Realtime backend
		if (isLive) {
			const res = await incrementLikeCount();
			if (res.count > 0) {
				setLikes(res.count);
			}
		}
	};

	return (
		<div className={styles.container}>
			<button
				type="button"
				className={`${styles.heartCard} ${isPulsing ? styles.pulsing : ''}`}
				onClick={handleClickHeart}
				title="Click to drop a like on WEBHEAD!"
			>
				<AiFillHeart className={styles.heartIcon} />
				<span className={styles.likeCount}>{likes.toLocaleString()}</span>
			</button>

			<div className={styles.liveTag}>
				<span className={styles.liveIndicatorDot} />
				<span>{isLive ? 'Real-Time Likes Connected' : 'Real-Time Likes Sync'}</span>
			</div>

			{particles.map((p) => (
				<span
					key={p.id}
					className={styles.floatingParticle}
					style={
						{
							left: `${p.x}px`,
							top: `${p.y}px`,
							'--rand-x': `${p.randX}px`,
							'--rand-rot': `${p.randRot}deg`,
						} as React.CSSProperties
					}
				>
					❤️
				</span>
			))}
		</div>
	);
}

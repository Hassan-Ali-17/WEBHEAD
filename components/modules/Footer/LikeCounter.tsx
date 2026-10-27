import React, { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { fetchLikesCount, incrementLikeCount, isSupabaseConfigured } from '../../../services/supabaseClient';
import styles from './LikeCounter.module.css';

interface FloatingHeart {
	id: number;
	x: number;
	y: number;
}

export default function LikeCounter() {
	const [likes, setLikes] = useState<number>(17);
	const [hasLiked, setHasLiked] = useState<boolean>(false);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);
	const [isLive, setIsLive] = useState<boolean>(false);

	useEffect(() => {
		const live = isSupabaseConfigured();
		setIsLive(live);

		// Check local storage for initial count and liked state
		try {
			const storedLiked = localStorage.getItem('webhead_user_liked');
			if (storedLiked) setHasLiked(true);

			const storedCount = localStorage.getItem('webhead_like_count');
			if (storedCount && !live) {
				setLikes(parseInt(storedCount, 10));
			}
		} catch {
			// ignore storage errors
		}

		// If Supabase is configured, fetch live count from site_stats
		if (live) {
			fetchLikesCount().then((res) => {
				if (res.count > 0) {
					setLikes(res.count);
				}
			});
		}
	}, []);

	const handleLike = async (e: React.MouseEvent) => {
		e.stopPropagation();
		if (isSubmitting) return;

		// Anti-abuse: Cooldown
		setIsSubmitting(true);
		setTimeout(() => setIsSubmitting(false), 800);

		const rect = e.currentTarget.getBoundingClientRect();
		const newHeart: FloatingHeart = {
			id: Date.now() + Math.random(),
			x: rect.left + rect.width / 2,
			y: rect.top,
		};
		setFloatingHearts((prev) => [...prev, newHeart]);

		// Remove floating heart after animation completes
		setTimeout(() => {
			setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
		}, 1200);

		const nextCount = likes + 1;
		setLikes(nextCount);
		setHasLiked(true);

		try {
			localStorage.setItem('webhead_user_liked', 'true');
			if (!isLive) {
				localStorage.setItem('webhead_like_count', nextCount.toString());
			}
		} catch {
			// ignore
		}

		if (isLive) {
			const res = await incrementLikeCount();
			if (res.count > 0) {
				setLikes(res.count);
			}
		}
	};

	return (
		<>
			<div
				className={`${styles.container} ${hasLiked ? styles.active : ''}`}
				onClick={handleLike}
				title={isLive ? `Live Webhead Likes: ${likes}` : `Local Webhead Likes: ${likes} (Backend offline)`}
			>
				<span className={styles.iconWrapper}>
					{hasLiked ? <AiFillHeart className={styles.heartFilled} /> : <AiOutlineHeart className={styles.heartOutline} />}
				</span>
				<span className={styles.counterText}>{likes}</span>
				{isLive && <span className={styles.liveDot} title="Live Supabase Sync" />}
			</div>

			{floatingHearts.map((heart) => (
				<span
					key={heart.id}
					className={styles.floatingBurst}
					style={{ left: heart.x, top: heart.y }}
				>
					❤️
				</span>
			))}
		</>
	);
}

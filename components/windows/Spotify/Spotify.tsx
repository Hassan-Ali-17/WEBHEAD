import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { BsCheckCircleFill, BsSpotify } from 'react-icons/bs';
import { FiExternalLink } from 'react-icons/fi';
import { RiDiscLine } from 'react-icons/ri';
import { PORTFOLIO_CONFIG } from '../../../config/portfolio.config';
import DraggableWindow from '../../utils/DraggableWindow/DraggableWindow';
import styles from './Spotify.module.css';

interface PlaylistEntry {
	name: string;
	description: string;
	playlistId: string;
	embedUrl: string;
	spotifyUrl: string;
}

export default function SpotifyWindow() {
	const defaultPlaylists = PORTFOLIO_CONFIG.spotify.playlists;
	const [playlistList, setPlaylistList] = useState<PlaylistEntry[]>(defaultPlaylists);
	const [activePlaylist, setActivePlaylist] = useState<PlaylistEntry>(defaultPlaylists[0]);
	const [customInput, setCustomInput] = useState('');
	const [iframeLoaded, setIframeLoaded] = useState(false);

	// Load custom saved playlist if present
	useEffect(() => {
		try {
			const saved = localStorage.getItem('webhead_custom_spotify_playlist');
			if (saved) {
				const parsed = JSON.parse(saved) as PlaylistEntry;
				if (parsed && parsed.embedUrl) {
					setPlaylistList((prev) => [parsed, ...prev.filter((p) => p.playlistId !== parsed.playlistId)]);
					setActivePlaylist(parsed);
				}
			}
		} catch {
			// ignore
		}
	}, []);

	const handleSelectPlaylist = (pl: PlaylistEntry) => {
		if (pl.playlistId === activePlaylist.playlistId) return;
		setIframeLoaded(false);
		setActivePlaylist(pl);
	};

	const handleLoadCustom = (e: React.FormEvent) => {
		e.preventDefault();
		const raw = customInput.trim();
		if (!raw) return;

		let id = raw;
		let type = 'playlist';

		// Parse Spotify URL if pasted: e.g. https://open.spotify.com/playlist/37i9dQZF1DX1qNS1A130RF
		const match = raw.match(/open\.spotify\.com\/(playlist|album|track|artist)\/([a-zA-Z0-9]+)/);
		if (match) {
			type = match[1];
			id = match[2];
		} else if (raw.startsWith('spotify:')) {
			const parts = raw.split(':');
			if (parts.length >= 3) {
				type = parts[1];
				id = parts[2];
			}
		}

		const customEntry: PlaylistEntry = {
			name: `Custom ${type.toUpperCase()}`,
			description: `Loaded from ${id}`,
			playlistId: id,
			embedUrl: `https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0`,
			spotifyUrl: `https://open.spotify.com/${type}/${id}`,
		};

		setPlaylistList((prev) => [customEntry, ...prev.filter((p) => p.playlistId !== id)]);
		setIframeLoaded(false);
		setActivePlaylist(customEntry);
		setCustomInput('');

		try {
			localStorage.setItem('webhead_custom_spotify_playlist', JSON.stringify(customEntry));
		} catch {
			// ignore
		}
	};

	return (
		<DraggableWindow
			windowName="spotify"
			topTitle="Spider-Verse Spotify Music Room // @Hassanaalipnd"
			topIcon={
				<Image
					src="/icons/spotify/spotify.png"
					width={18}
					height={18}
					alt="Spotify"
				/>
			}
		>
			<div className={styles.container}>
				{/* Sidebar Playlist Selector */}
				<div className={styles.sidebar}>
					<div className={styles.sidebarHeader}>
						<div className={styles.brandGroup}>
							<BsSpotify className={styles.spotifyBrandIcon} />
							<h4>Webhead Jukebox</h4>
						</div>
					</div>

					{/* Custom Playlist Loader */}
					<div className={styles.customInputSection}>
						<div className={styles.customInputLabel}>
							<span>Add Any Spotify Playlist</span>
						</div>
						<form className={styles.customForm} onSubmit={handleLoadCustom}>
							<input
								type="text"
								className={styles.customInput}
								placeholder="Paste link or ID..."
								value={customInput}
								onChange={(e) => setCustomInput(e.target.value)}
							/>
							<button type="submit" className={styles.loadBtn}>
								Play
							</button>
						</form>
					</div>

					{/* Playlist Buttons */}
					<div className={styles.playlistList}>
						{playlistList.map((pl) => {
							const isActive = pl.playlistId === activePlaylist.playlistId;
							return (
								<button
									key={pl.playlistId}
									className={`${styles.playlistItem} ${isActive ? styles.activeItem : ''}`}
									onClick={() => handleSelectPlaylist(pl)}
								>
									<RiDiscLine className={`${styles.discIcon} ${isActive ? styles.spinning : ''}`} />
									<div className={styles.playlistItemInfo}>
										<span className={styles.playlistName}>{pl.name}</span>
										<span className={styles.playlistDesc}>{pl.description}</span>
									</div>
								</button>
							);
						})}
					</div>

					{/* Sidebar Footer with Hassan's profile link */}
					<div className={styles.sidebarFooter}>
						<a
							href="https://open.spotify.com/user/Hassanaalipnd"
							target="_blank"
							rel="noopener noreferrer"
							className={styles.hassanProfileBanner}
						>
							<span>🎧 View @Hassanaalipnd Profile</span>
							<FiExternalLink />
						</a>

						<a
							href={activePlaylist.spotifyUrl}
							target="_blank"
							rel="noopener noreferrer"
							className={styles.externalLink}
						>
							<span>Open in Spotify App</span>
							<FiExternalLink />
						</a>
					</div>
				</div>

				{/* Embed Player Area */}
				<div className={styles.playerArea}>
					<div className={styles.apiKeyNoteBanner}>
						<span>
							<BsCheckCircleFill style={{ marginRight: 6, verticalAlign: 'middle' }} />
							Zero Spotify API Key Required — Playlists Stream Directly
						</span>
						<span>Web Player Active</span>
					</div>

					<div className={styles.playerFrameWrapper}>
						{!iframeLoaded && (
							<div className={styles.playerLoading}>
								<div className={styles.loadingSpinner} />
								<p>Connecting Spider-Verse Audio Stream...</p>
							</div>
						)}
						<iframe
							title={`Spotify Playlist - ${activePlaylist.name}`}
							src={activePlaylist.embedUrl}
							width="100%"
							height="100%"
							frameBorder="0"
							allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
							loading="lazy"
							className={`${styles.embedIframe} ${iframeLoaded ? styles.loaded : ''}`}
							onLoad={() => setIframeLoaded(true)}
						/>
					</div>
				</div>
			</div>
		</DraggableWindow>
	);
}

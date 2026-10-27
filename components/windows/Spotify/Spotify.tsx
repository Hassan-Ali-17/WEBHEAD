import Image from 'next/image';
import React, { useState } from 'react';
import { BsSpotify } from 'react-icons/bs';
import { FiExternalLink } from 'react-icons/fi';
import { RiDiscLine } from 'react-icons/ri';
import { PORTFOLIO_CONFIG } from '../../../config/portfolio.config';
import DraggableWindow from '../../utils/DraggableWindow/DraggableWindow';
import styles from './Spotify.module.css';

export default function SpotifyWindow() {
	const playlists = PORTFOLIO_CONFIG.spotify.playlists;
	const [activePlaylist, setActivePlaylist] = useState(playlists[0]);
	const [iframeLoaded, setIframeLoaded] = useState(false);

	const handleSelectPlaylist = (pl: typeof playlists[0]) => {
		if (pl.playlistId === activePlaylist.playlistId) return;
		setIframeLoaded(false);
		setActivePlaylist(pl);
	};

	return (
		<DraggableWindow
			windowName="spotify"
			topTitle="Spider-Verse Spotify Music Room"
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
						<BsSpotify className={styles.spotifyBrandIcon} />
						<h4>Webhead Jukebox</h4>
					</div>

					<div className={styles.playlistList}>
						{playlists.map((pl) => {
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

					<div className={styles.sidebarFooter}>
						<a
							href={activePlaylist.spotifyUrl}
							target="_blank"
							rel="noopener noreferrer"
							className={styles.externalLink}
						>
							<span>Open in Spotify</span>
							<FiExternalLink />
						</a>
					</div>
				</div>

				{/* Embed Player Area */}
				<div className={styles.playerArea}>
					{!iframeLoaded && (
						<div className={styles.playerLoading}>
							<div className={styles.loadingSpinner} />
							<p>Buffering Spotify Web Stream...</p>
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
		</DraggableWindow>
	);
}

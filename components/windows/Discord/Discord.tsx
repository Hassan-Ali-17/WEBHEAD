import Image from 'next/image';
import React, { useState } from 'react';
import { BsSpotify } from 'react-icons/bs';
import { FiExternalLink, FiGithub, FiMessageSquare, FiMoreHorizontal } from 'react-icons/fi';
import { RiHome4Line } from 'react-icons/ri';
import { PORTFOLIO_CONFIG } from '../../../config/portfolio.config';
import DraggableWindow from '../../utils/DraggableWindow/DraggableWindow';
import styles from './Discord.module.css';

export default function DiscordWindow() {
	const discord = PORTFOLIO_CONFIG.discord;
	const [statusBubble, setStatusBubble] = useState(discord.statusBubble || 'What are you currently obsessed with?');

	return (
		<DraggableWindow
			windowName="discord"
			topTitle="Spider-Verse Discord Comms // BladeX⚔️"
			topIcon={
				<Image
					src="/icons/discord/discord.png"
					width={18}
					height={18}
					alt="Discord"
				/>
			}
		>
			<div className={styles.container}>
				<div className={styles.profileCardWrapper}>
					{/* Mint Green Banner */}
					<div className={styles.banner}>
						<div className={styles.avatarContainer}>
							<div className={styles.avatarWrapper}>
								<Image
									src="/images/discord-profile.png"
									alt={discord.displayName}
									width={92}
									height={92}
									className={styles.avatarImg}
									unoptimized
									style={{ objectPosition: '15% 18%', transform: 'scale(1.8)' }}
								/>
							</div>
							<span className={styles.onlineBadge} />
						</div>

						{/* Custom Status Bubble */}
						<div className={styles.statusBubble}>
							<span className={styles.bubblePlus}>+</span>
							<span>{statusBubble}</span>
						</div>
					</div>

					{/* Profile Card Body */}
					<div className={styles.cardBody}>
						{/* User Identity & Badges */}
						<div className={styles.userIdentityRow}>
							<div className={styles.nameBadgesRow}>
								<h2 className={styles.displayName}>{discord.displayName}</h2>
								<div className={styles.badgesGroup}>
									<span className={styles.auraBadge}>
										<span>🔥 AURA</span>
									</span>
									<span className={styles.badgeIcon}>🐍</span>
									<span className={styles.badgeIcon}>🍃</span>
								</div>
							</div>
							<div className={styles.handleRow}>
								<span>{discord.username} • {discord.pronouns}</span>
							</div>
						</div>

						{/* Quick Action Buttons */}
						<div className={styles.actionButtonsRow}>
							<a
								href={discord.profileUrl}
								target="_blank"
								rel="noopener noreferrer"
								className={styles.messageBtn}
							>
								<FiMessageSquare />
								<span>Message</span>
							</a>
							<button type="button" className={styles.iconBtn} title="Mutual Servers">
								<RiHome4Line />
							</button>
							<button type="button" className={styles.iconBtn} title="More Options">
								<FiMoreHorizontal />
							</button>
						</div>

						{/* About / Bio Section */}
						<div className={styles.section}>
							<h4 className={styles.sectionTitle}>Bio</h4>
							{discord.bioLines.map((line, idx) => (
								<p key={idx} className={styles.bioLine}>
									{line}
								</p>
							))}
						</div>

						{/* Member Since Section */}
						<div className={styles.section}>
							<h4 className={styles.sectionTitle}>Member Since</h4>
							<p className={styles.memberDate}>{discord.memberSince}</p>
						</div>

						{/* Verified Connections Section */}
						<div className={styles.section}>
							<h4 className={styles.sectionTitle}>Connections</h4>
							<div className={styles.connectionsList}>
								{/* GitHub Connection */}
								<a
									href={`https://github.com/${discord.connections.github}`}
									target="_blank"
									rel="noopener noreferrer"
									className={styles.connectionItem}
								>
									<div className={styles.connectionLeft}>
										<FiGithub className={`${styles.connIcon} ${styles.githubWhite}`} />
										<span className={styles.connHandle}>{discord.connections.github}</span>
									</div>
									<FiExternalLink className={styles.externalArrow} />
								</a>

								{/* Spotify Connection */}
								<a
									href={`https://open.spotify.com/user/${discord.connections.spotify}`}
									target="_blank"
									rel="noopener noreferrer"
									className={styles.connectionItem}
								>
									<div className={styles.connectionLeft}>
										<BsSpotify className={`${styles.connIcon} ${styles.spotifyGreen}`} />
										<span className={styles.connHandle}>{discord.connections.spotify}</span>
									</div>
									<FiExternalLink className={styles.externalArrow} />
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</DraggableWindow>
	);
}

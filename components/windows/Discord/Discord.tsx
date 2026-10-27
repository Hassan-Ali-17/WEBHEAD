import Image from 'next/image';
import React, { useState } from 'react';
import { BsDiscord, BsShieldCheck } from 'react-icons/bs';
import { FiCopy, FiExternalLink } from 'react-icons/fi';
import { PORTFOLIO_CONFIG } from '../../../config/portfolio.config';
import DraggableWindow from '../../utils/DraggableWindow/DraggableWindow';
import styles from './Discord.module.css';

export default function DiscordWindow() {
	const discordConfig = PORTFOLIO_CONFIG.discord;
	const [copied, setCopied] = useState(false);

	const handleCopyUsername = () => {
		navigator.clipboard.writeText(discordConfig.username);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<DraggableWindow
			windowName="discord"
			topTitle="Spider-Verse Discord Comms"
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
				{/* Discord Profile Card */}
				<div className={styles.profileBanner}>
					<div className={styles.bannerBackground} />
					<div className={styles.avatarContainer}>
						<Image
							src={discordConfig.avatarUrl}
							alt={discordConfig.username}
							width={84}
							height={84}
							className={styles.avatarImg}
						/>
						<span className={styles.onlineBadge} />
					</div>
				</div>

				<div className={styles.profileBody}>
					<div className={styles.userHeader}>
						<div>
							<h2>{PORTFOLIO_CONFIG.owner.name}</h2>
							<span className={styles.tag}>@{discordConfig.username}</span>
						</div>
						<button onClick={handleCopyUsername} className={styles.copyBtn} title="Copy Username">
							<FiCopy />
							<span>{copied ? 'Copied Tag!' : 'Copy Tag'}</span>
						</button>
					</div>

					<div className={styles.statusBox}>
						<span className={styles.statusDot} />
						<p>{discordConfig.status}</p>
					</div>

					<div className={styles.sectionDivider} />

					<div className={styles.aboutSection}>
						<h3>ABOUT WEBHEAD</h3>
						<p>
							{PORTFOLIO_CONFIG.owner.bio}
						</p>
					</div>

					<div className={styles.rolesSection}>
						<h3>ROLES</h3>
						<div className={styles.rolesList}>
							<span className={styles.roleTagRed}>Spider-Developer</span>
							<span className={styles.roleTagCyan}>Earth-1610 Admin</span>
							<span className={styles.roleTagPurple}>Full-Stack Engineer</span>
						</div>
					</div>

					{/* Discord Server & External Community Card */}
					<div className={styles.serverCard}>
						<div className={styles.serverInfo}>
							<BsDiscord className={styles.serverIcon} />
							<div>
								<h4>{discordConfig.serverName}</h4>
								<p>Join the webhead creative dev community</p>
							</div>
						</div>
						<a
							href={discordConfig.serverInviteUrl}
							target="_blank"
							rel="noopener noreferrer"
							className={styles.joinServerBtn}
						>
							<span>Join Server</span>
							<FiExternalLink />
						</a>
					</div>
				</div>
			</div>
		</DraggableWindow>
	);
}

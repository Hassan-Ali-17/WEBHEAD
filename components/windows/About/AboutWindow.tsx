import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { AiFillGithub, AiFillLinkedin, AiOutlineMail, AiOutlineTwitter } from 'react-icons/ai';
import { BsTerminal } from 'react-icons/bs';
import { FiDownload } from 'react-icons/fi';
import { PORTFOLIO_CONFIG } from '../../../config/portfolio.config';
import DraggableWindow from '../../utils/DraggableWindow/DraggableWindow';
import styles from './AboutWindow.module.css';

export default function AboutWindow() {
	const owner = PORTFOLIO_CONFIG.owner;

	return (
		<DraggableWindow
			windowName="about"
			topTitle="Spider-Verse Webhead Dossier — About Me"
			topIcon={
				<Image
					src="/images/webhead-avatar.jpg"
					width={18}
					height={18}
					alt="Avatar"
					style={{ borderRadius: '50%' }}
				/>
			}
		>
			<div className={styles.container}>
				{/* Top Hero Banner */}
				<div className={styles.heroSection}>
					<div className={styles.avatarWrapper}>
						<Image
							src="/images/webhead-avatar.jpg"
							alt={owner.name}
							width={96}
							height={96}
							className={styles.avatarImg}
						/>
						<span className={styles.statusDot} title="Earth-1610 Active" />
					</div>

					<div className={styles.heroText}>
						<div className={styles.badgeRow}>
							<span className={styles.dimensionBadge}>Earth-1610</span>
							<span className={styles.statusBadge}>Available for Hire</span>
						</div>
						<h1 className={styles.name}>{owner.name}</h1>
						<p className={styles.title}>{owner.title}</p>
						<p className={styles.tagline}>&ldquo;{owner.tagline}&rdquo;</p>
					</div>

					<div className={styles.heroActions}>
						<Link href="/resume" className={styles.actionBtnResume}>
							<FiDownload />
							<span>Resume</span>
						</Link>
						<Link href="/terminal" className={styles.actionBtnTerminal}>
							<BsTerminal />
							<span>Terminal</span>
						</Link>
					</div>
				</div>

				{/* Bio Transmission */}
				<div className={styles.bioCard}>
					<h3>TRANSMISSION DOSSIER</h3>
					<p>{owner.bio}</p>
				</div>

				{/* Tech Stack Matrix */}
				<div className={styles.skillsSection}>
					<h3>SUPERPOWERS & TECH STACK</h3>

					<div className={styles.skillsGrid}>
						<div className={styles.skillCategoryCard}>
							<h4>Frontend Engineering</h4>
							<div className={styles.tagList}>
								{owner.skills.frontend.map((s) => (
									<span key={s} className={styles.tagCyan}>
										{s}
									</span>
								))}
							</div>
						</div>

						<div className={styles.skillCategoryCard}>
							<h4>Backend & Real-Time</h4>
							<div className={styles.tagList}>
								{owner.skills.backend.map((s) => (
									<span key={s} className={styles.tagRed}>
										{s}
									</span>
								))}
							</div>
						</div>

						<div className={styles.skillCategoryCard}>
							<h4>Tooling & Cloud</h4>
							<div className={styles.tagList}>
								{owner.skills.tools.map((s) => (
									<span key={s} className={styles.tagPurple}>
										{s}
									</span>
								))}
							</div>
						</div>

						<div className={styles.skillCategoryCard}>
							<h4>Spider-Verse Specialities</h4>
							<div className={styles.tagList}>
								{owner.skills.spiderverse.map((s) => (
									<span key={s} className={styles.tagGold}>
										{s}
									</span>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Social Links */}
				<div className={styles.socialBar}>
					<a
						href={owner.socials.github}
						target="_blank"
						rel="noopener noreferrer"
						className={styles.socialLink}
						title="GitHub"
					>
						<AiFillGithub />
						<span>GitHub</span>
					</a>
					<a
						href={owner.socials.linkedin}
						target="_blank"
						rel="noopener noreferrer"
						className={styles.socialLink}
						title="LinkedIn"
					>
						<AiFillLinkedin />
						<span>LinkedIn</span>
					</a>
					<a
						href={`mailto:${owner.email}`}
						className={styles.socialLink}
						title="Email Transmission"
					>
						<AiOutlineMail />
						<span>Email</span>
					</a>
					{owner.socials.twitter && (
						<a
							href={owner.socials.twitter}
							target="_blank"
							rel="noopener noreferrer"
							className={styles.socialLink}
							title="Twitter / X"
						>
							<AiOutlineTwitter />
							<span>Twitter</span>
						</a>
					)}
				</div>
			</div>
		</DraggableWindow>
	);
}

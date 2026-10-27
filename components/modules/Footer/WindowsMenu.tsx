import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { IoIosArrowForward } from 'react-icons/io';
import { VscSearch } from 'react-icons/vsc';
import { PORTFOLIO_CONFIG } from '../../../config/portfolio.config';
import styles from './WindowsMenu.module.css';

type Props = {
	winMenu: boolean;
	handleWinMenu: () => void;
};

const slideVerticalAnimation = {
	open: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.25,
		},
		display: 'block',
	},
	close: {
		y: 550,
		opacity: 0,
		transition: {
			duration: 0.2,
		},
		transitionEnd: {
			display: 'none',
		},
	},
};

const APPS_LIST = [
	{ name: 'About Hassan', href: '/about', icon: '/images/webhead-avatar.jpg', isRound: true },
	{ name: 'Projects Showcase', href: '/projects', icon: '/icons/folder/folder.png' },
	{ name: 'Public Chat', href: '/chat', icon: '/icons/discord/discord.png' },
	{ name: 'Spotify Music', href: '/spotify', icon: '/icons/spotify/spotify.png' },
	{ name: 'Discord', href: '/discord', icon: '/icons/discord/discord.png' },
	{ name: 'Resume (PDF)', href: '/resume', icon: '/icons/notes/notes.png' },
	{ name: 'Weather Station', href: '/weather', icon: '/icons/pictures/pictures.png' },
	{ name: 'Settings', href: '/settings', icon: '/icons/shortcut/shortcut.png' },
	{ name: 'Cyber Terminal', href: '/terminal', icon: '/icons/terminal/terminal.png' },
	{ name: 'File Explorer', href: '/explorer/quick-access', icon: '/icons/explorer/explorer.png' },
];

function WindowsMenu({ winMenu, handleWinMenu }: Props) {
	const node = useRef<HTMLDivElement>(null);
	const [searchQuery, setSearchQuery] = useState('');

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Element;
			if (null === node.current) return;
			if (
				node.current.contains(target) ||
				target.classList.contains('windowsIcon') ||
				target.closest('.windowsIcon')
			) {
				return;
			}
			if (winMenu) {
				handleWinMenu();
			}
		};

		if (winMenu) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [handleWinMenu, winMenu]);

	const filteredApps = searchQuery.trim()
		? APPS_LIST.filter((app) => app.name.toLowerCase().includes(searchQuery.toLowerCase()))
		: APPS_LIST;

	return (
		<motion.div
			initial="close"
			animate={winMenu ? 'open' : 'close'}
			variants={slideVerticalAnimation}
			className={styles.overflow}
		>
			<div className={styles.winMenu} ref={node}>
				<div className={styles.winMenuContainer}>
					{/* Search Bar */}
					<div className={styles.winMenuSearch}>
						<div className={styles.inputWithIcon}>
							<VscSearch className={styles.searchIcon} />
							<input
								type="text"
								placeholder="Search Spider-Verse apps and files..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
						</div>
					</div>

					{/* Pinned Applications */}
					<div className={styles.winMenuPinned}>
						<div className={styles.winMenuPinnedContainer}>
							<div className={styles.winMenuPinnedTop}>
								<h2>Spider Apps</h2>
								<div>
									<p>{filteredApps.length} Available</p>
									<IoIosArrowForward />
								</div>
							</div>
							<div className={styles.winMenuGrid}>
								{filteredApps.map((app) => (
									<Link
										key={app.name}
										href={app.href}
										onClick={() => handleWinMenu()}
										className={styles.appCard}
										draggable={false}
									>
										<div className={styles.appIconWrapper}>
											<Image
												src={app.icon}
												alt={app.name}
												width={34}
												height={34}
												style={app.isRound ? { borderRadius: '50%', border: '1px solid #ff1a3c' } : {}}
											/>
										</div>
										<p>{app.name}</p>
									</Link>
								))}
							</div>
						</div>

						{/* Recommended Section */}
						<div className={styles.winMenuPinnedContainer}>
							<div className={styles.winMenuPinnedTop}>
								<h2>Recommended</h2>
								<Link href="/projects" onClick={() => handleWinMenu()} className={styles.moreLink}>
									<p>View All Projects</p>
									<IoIosArrowForward />
								</Link>
							</div>
							<div className={styles.recommendedGrid}>
								<Link
									href="/about"
									onClick={() => handleWinMenu()}
									className={styles.recCard}
								>
									<Image
										src="/images/webhead-avatar.jpg"
										alt="Hassan Ali Shah"
										width={30}
										height={30}
										style={{ borderRadius: '50%' }}
									/>
									<div>
										<h4>About {PORTFOLIO_CONFIG.owner.name}</h4>
										<p>Full-Stack Developer Profile</p>
									</div>
								</Link>

								<Link
									href="/chat"
									onClick={() => handleWinMenu()}
									className={styles.recCard}
								>
									<Image
										src="/icons/discord/discord.png"
										alt="Chat"
										width={30}
										height={30}
									/>
									<div>
										<h4>Public Webhead Chat</h4>
										<p>Real-Time Multi-Visitor Chat</p>
									</div>
								</Link>

								<Link
									href="/spotify"
									onClick={() => handleWinMenu()}
									className={styles.recCard}
								>
									<Image
										src="/icons/spotify/spotify.png"
										alt="Spotify"
										width={30}
										height={30}
									/>
									<div>
										<h4>Into the Spider-Verse OST</h4>
										<p>Listen while exploring</p>
									</div>
								</Link>
							</div>
						</div>
					</div>
				</div>

				{/* User Profile Footer */}
				<div className={styles.winMenuFooter}>
					<Link
						href="/about"
						onClick={() => handleWinMenu()}
						className={styles.userProfile}
					>
						<Image
							src="/images/webhead-avatar.jpg"
							alt={PORTFOLIO_CONFIG.owner.name}
							width={34}
							height={34}
							style={{ borderRadius: '50%', border: '1.5px solid #ff1a3c' }}
						/>
						<div className={styles.userInfo}>
							<p className={styles.userName}>{PORTFOLIO_CONFIG.owner.name}</p>
							<span className={styles.userRole}>Earth-1610 // Online</span>
						</div>
					</Link>
					<button
						className={styles.powerButton}
						onClick={() => {
							if (window.confirm('Restart Spider-Verse Workstation?')) {
								window.location.href = '/';
							}
						}}
						title="Restart Workstation"
					>
						<AiOutlinePoweroff />
					</button>
				</div>
				<div className={styles.winMenuBg} />
			</div>
		</motion.div>
	);
}

export default WindowsMenu;

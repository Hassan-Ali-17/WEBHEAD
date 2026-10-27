import Image from 'next/image';
import React, { useContext } from 'react';
import { BiImage, BiPalette, BiTime, BiVolumeFull } from 'react-icons/bi';
import { BsEye, BsShieldCheck } from 'react-icons/bs';
import { Context } from '../../../context/ContextProvider';
import type { DesktopSettings, WallpaperOption } from '../../../types';
import DraggableWindow from '../../utils/DraggableWindow/DraggableWindow';
import styles from './SettingsWindow.module.css';

const WALLPAPERS: WallpaperOption[] = [
	{
		id: 'city-night',
		name: 'Brooklyn Skyline at Midnight (Spider-Verse)',
		url: '/images/wallpaper-spiderverse-city.jpg',
		thumbnail: '/images/wallpaper-spiderverse-city.jpg',
	},
	{
		id: 'multiverse-glitch',
		name: 'Multiverse Dimensional Portal',
		url: '/images/wallpaper-multiverse.jpg',
		thumbnail: '/images/wallpaper-multiverse.jpg',
	},
	{
		id: 'classic-dark',
		name: 'Dark Carbon Texture Grid',
		url: '/images/wallpaper.webp',
		thumbnail: '/images/wallpaper.webp',
	},
];

export default function SettingsWindow() {
	const { settingsState } = useContext(Context);
	const [settings, setSettings] = settingsState;

	const handleSelectWallpaper = (wp: WallpaperOption) => {
		setSettings({
			...settings,
			wallpaper: wp.url,
		});
	};

	const handleToggleClock = (fmt: '12h' | '24h') => {
		setSettings({
			...settings,
			clockFormat: fmt,
		});
	};

	const handleToggleTheme = (theme: 'red' | 'cyan' | 'purple') => {
		setSettings({
			...settings,
			themeAccent: theme,
		});
	};

	const handleToggleMotion = () => {
		setSettings({
			...settings,
			reducedMotion: !settings.reducedMotion,
		});
	};

	const handleToggleSound = () => {
		setSettings({
			...settings,
			soundEnabled: !settings.soundEnabled,
		});
	};

	return (
		<DraggableWindow
			windowName="settings"
			topTitle="Spider-Verse Desktop Settings"
			topIcon={
				<Image
					src="/icons/shortcut/shortcut.png"
					width={18}
					height={18}
					alt="Settings"
				/>
			}
		>
			<div className={styles.container}>
				{/* Header */}
				<div className={styles.header}>
					<h2>Desktop Preferences & Customization</h2>
					<p>Configure your Spider-Verse workstation environment across Earth-1610.</p>
				</div>

				<div className={styles.settingsGrid}>
					{/* Wallpaper Selection */}
					<div className={styles.sectionCard}>
						<div className={styles.sectionHeader}>
							<BiImage className={styles.secIcon} />
							<div>
								<h3>Spider-Verse Wallpaper</h3>
								<p>Select your desktop skyline or multiverse backdrop</p>
							</div>
						</div>

						<div className={styles.wallpaperGrid}>
							{WALLPAPERS.map((wp) => {
								const isSelected = settings.wallpaper === wp.url;
								return (
									<div
										key={wp.id}
										className={`${styles.wpCard} ${isSelected ? styles.wpSelected : ''}`}
										onClick={() => handleSelectWallpaper(wp)}
									>
										<div className={styles.wpImageWrapper}>
											<Image
												src={wp.thumbnail}
												alt={wp.name}
												width={220}
												height={120}
												className={styles.wpThumb}
											/>
											{isSelected && <span className={styles.activeWpBadge}>Active</span>}
										</div>
										<p className={styles.wpName}>{wp.name}</p>
									</div>
								);
							})}
						</div>
					</div>

					{/* Theme & Color Accents */}
					<div className={styles.sectionCard}>
						<div className={styles.sectionHeader}>
							<BiPalette className={styles.secIcon} />
							<div>
								<h3>Spider-Verse Accent Glow</h3>
								<p>Choose your primary dimensional neon frequency</p>
							</div>
						</div>

						<div className={styles.themeOptions}>
							<button
								className={`${styles.themeBtn} ${styles.themeRed} ${
									settings.themeAccent === 'red' ? styles.themeActive : ''
								}`}
								onClick={() => handleToggleTheme('red')}
							>
								<span className={styles.themeDotRed} />
								<span>Spider Crimson Red</span>
							</button>

							<button
								className={`${styles.themeBtn} ${styles.themeCyan} ${
									settings.themeAccent === 'cyan' ? styles.themeActive : ''
								}`}
								onClick={() => handleToggleTheme('cyan')}
							>
								<span className={styles.themeDotCyan} />
								<span>Electric Cyan</span>
							</button>

							<button
								className={`${styles.themeBtn} ${styles.themePurple} ${
									settings.themeAccent === 'purple' ? styles.themeActive : ''
								}`}
								onClick={() => handleToggleTheme('purple')}
							>
								<span className={styles.themeDotPurple} />
								<span>Multiverse Violet</span>
							</button>
						</div>
					</div>

					{/* System Tray Clock & Accessibility */}
					<div className={styles.sectionCard}>
						<div className={styles.sectionHeader}>
							<BiTime className={styles.secIcon} />
							<div>
								<h3>Clock & Display Formats</h3>
								<p>System tray time format</p>
							</div>
						</div>

						<div className={styles.toggleRow}>
							<span>Clock Format:</span>
							<div className={styles.segmentedButtons}>
								<button
									className={`${styles.segBtn} ${
										settings.clockFormat === '12h' ? styles.segBtnActive : ''
									}`}
									onClick={() => handleToggleClock('12h')}
								>
									12-Hour (AM/PM)
								</button>
								<button
									className={`${styles.segBtn} ${
										settings.clockFormat === '24h' ? styles.segBtnActive : ''
									}`}
									onClick={() => handleToggleClock('24h')}
								>
									24-Hour (Military)
								</button>
							</div>
						</div>
					</div>

					{/* Accessibility & Animations */}
					<div className={styles.sectionCard}>
						<div className={styles.sectionHeader}>
							<BsEye className={styles.secIcon} />
							<div>
								<h3>Motion & Feedback</h3>
								<p>Control visual motion effects and audio cues</p>
							</div>
						</div>

						<div className={styles.switchRow}>
							<div>
								<strong>Reduced Motion</strong>
								<p>Diminish floating bursts and chromatic glitch animations</p>
							</div>
							<button
								className={`${styles.toggleSwitch} ${
									settings.reducedMotion ? styles.switchOn : ''
								}`}
								onClick={handleToggleMotion}
							>
								<span className={styles.switchHandle} />
							</button>
						</div>

						<div className={styles.switchRow}>
							<div>
								<strong>Sound Effects</strong>
								<p>Audio feedback for clicks and transmissions</p>
							</div>
							<button
								className={`${styles.toggleSwitch} ${
									settings.soundEnabled ? styles.switchOn : ''
								}`}
								onClick={handleToggleSound}
							>
								<span className={styles.switchHandle} />
							</button>
						</div>
					</div>
				</div>
			</div>
		</DraggableWindow>
	);
}

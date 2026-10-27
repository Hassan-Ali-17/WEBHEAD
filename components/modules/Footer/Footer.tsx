import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { AiOutlineWifi } from 'react-icons/ai';
import { FiVolume2 } from 'react-icons/fi';
import { Context } from '../../../context/ContextProvider';
import { fetchWeatherForCoords, WeatherData } from '../../../services/weatherService';
import type { ErrorType } from '../../../types';
import Error from '../../windows/Error/Error';
import CalendarFlyout from './CalendarFlyout';
import styles from './Footer.module.css';
import LikeCounter from './LikeCounter';
import WindowsMenu from './WindowsMenu';

function Footer() {
	const [winMenu, setWinMenu] = useState(false);
	const [calendarOpen, setCalendarOpen] = useState(false);
	const [errors, setError] = useState([] as ErrorType[]);
	const [weather, setWeather] = useState<WeatherData | null>(null);

	const { settingsState } = useContext(Context);
	const [settings] = settingsState;

	const handleWinMenu = () => {
		setWinMenu(!winMenu);
	};

	const [hourStr, setHourStr] = useState('12:00 PM');
	const [dateStr, setDateStr] = useState('1/1/2026');

	// Update system tray clock based on clock format setting
	useEffect(() => {
		const updateTime = () => {
			const now = new Date();
			const is12Hour = settings.clockFormat === '12h';
			setHourStr(
				now.toLocaleTimeString(navigator.language, {
					hour: '2-digit',
					minute: '2-digit',
					hour12: is12Hour,
				}),
			);
			setDateStr(now.toLocaleDateString(navigator.language));
		};

		updateTime();
		const interval = setInterval(updateTime, 1000);
		return () => clearInterval(interval);
	}, [settings.clockFormat]);

	// Fetch quick weather for Brooklyn / default
	useEffect(() => {
		fetchWeatherForCoords(40.6782, -73.9442, 'Brooklyn').then((res) => {
			if (res.data) setWeather(res.data);
		});
	}, []);

	return (
		<>
			{errors &&
				errors.map((err) => {
					return (
						<Error
							key={err.index}
							error={err.error}
							errors={errors}
							setError={setError}
							index={err.index}
						/>
					);
				})}

			<div className={styles.container}>
				{/* Left / Center Spider Taskbar Icons */}
				<section className={styles.iconContainer}>
					{/* Spider Start Menu Button */}
					<div
						className={`${styles.icon} ${styles.spiderStartBtn} windowsIcon`}
						onClick={() => handleWinMenu()}
						title="Spider-Verse OS Menu"
					>
						<Image
							src={'/icons/spider/spider.png'}
							width={28}
							height={28}
							alt="Webhead Start"
							className={`${styles.spiderLogo} windowsIcon`}
						/>
					</div>

					<Link
						href="/explorer/quick-access"
						className={styles.icon}
						draggable={false}
						title="File Explorer"
					>
						<Image
							src={'/icons/explorer/explorer.png'}
							width={26}
							height={26}
							alt="File Explorer"
						/>
					</Link>

					<Link
						href="/projects"
						className={styles.icon}
						draggable={false}
						title="Projects Showcase"
					>
						<Image
							src={'/icons/folder/folder.png'}
							width={26}
							height={26}
							alt="Projects"
						/>
					</Link>

					<Link
						href="/chat"
						className={styles.icon}
						draggable={false}
						title="Real-Time Public Chat"
					>
						<Image
							src={'/icons/discord/discord.png'}
							width={26}
							height={26}
							alt="Live Chat"
						/>
					</Link>

					<Link
						href="/spotify"
						className={styles.icon}
						draggable={false}
						title="Spotify Music Room"
					>
						<Image
							src={'/icons/spotify/spotify.png'}
							width={26}
							height={26}
							alt="Spotify Music"
						/>
					</Link>

					<Link
						href="/weather"
						className={styles.icon}
						draggable={false}
						title="Weather Station"
					>
						<Image
							src={'/icons/pictures/pictures.png'}
							width={26}
							height={26}
							alt="Weather Station"
						/>
					</Link>

					<Link
						href="/terminal"
						className={styles.icon}
						draggable={false}
						title="Spider Terminal"
					>
						<Image
							src={'/icons/terminal/terminal.png'}
							width={26}
							height={26}
							alt="Terminal"
						/>
					</Link>

					<Link
						href="/settings"
						className={styles.icon}
						draggable={false}
						title="Spider-Verse Settings"
					>
						<Image
							src={'/icons/shortcut/shortcut.png'}
							width={26}
							height={26}
							alt="Settings"
						/>
					</Link>
				</section>

				{/* Right System Tray */}
				<section className={styles.toolbarContainer}>
					{/* Interactive Like Counter */}
					<LikeCounter />

					{/* Weather Snapshot */}
					{weather && (
						<Link href="/weather" className={styles.weatherTrayItem} title={`${weather.condition} (${weather.city})`}>
							<span className={styles.weatherIcon}>
								{weather.condition.includes('Sun') || weather.condition.includes('Clear') ? '☀️' : '🌧️'}
							</span>
							<span className={styles.weatherTemp}>{weather.temperature}°C</span>
						</Link>
					)}

					<div className={styles.systemStatusIcons}>
						<AiOutlineWifi />
						<FiVolume2 />
					</div>

					{/* Interactive Live Clock & Calendar Trigger */}
					<div
						className={`${styles.dateIcons} dateIconsTarget`}
						onClick={() => setCalendarOpen(!calendarOpen)}
						title="Click to view interactive Spider-Verse Calendar"
					>
						<p className={styles.hourText}>{hourStr}</p>
						<p className={styles.dateText}>{dateStr}</p>
					</div>
				</section>
			</div>

			<WindowsMenu winMenu={winMenu} handleWinMenu={handleWinMenu} />
			<CalendarFlyout isOpen={calendarOpen} onClose={() => setCalendarOpen(false)} />
		</>
	);
}

export default Footer;

import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../../context/ContextProvider';
import { fetchWeatherForCoords, WeatherData } from '../../../services/weatherService';
import styles from './DesktopClockWeather.module.css';

export default function DesktopClockWeather() {
	const { settingsState } = useContext(Context);
	const [settings] = settingsState;

	const [timeStr, setTimeStr] = useState('08:00');
	const [dateStr, setDateStr] = useState('Wednesday 28 October');
	const [weather, setWeather] = useState<WeatherData>({
		city: 'Lahore, Pakistan',
		temperature: 28,
		condition: 'Clear Sky',
		humidity: 45,
		windSpeed: 8,
		isDay: true,
		time: '20:00',
		highTemp: 31,
		lowTemp: 20,
		code: 0,
	});

	useEffect(() => {
		const updateTime = () => {
			const now = new Date();
			setTimeStr(
				now.toLocaleTimeString([], {
					hour: '2-digit',
					minute: '2-digit',
					hour12: settings.clockFormat === '12h',
					timeZone: 'Asia/Karachi',
				}),
			);
			setDateStr(
				now.toLocaleDateString([], {
					weekday: 'short',
					day: 'numeric',
					month: 'short',
					timeZone: 'Asia/Karachi',
				}),
			);
		};

		updateTime();
		const interval = setInterval(updateTime, 1000);
		return () => clearInterval(interval);
	}, [settings.clockFormat]);

	useEffect(() => {
		fetchWeatherForCoords(31.5204, 74.3587, 'Lahore, Pakistan').then((res) => {
			if (res.data) setWeather(res.data);
		});
	}, []);

	return (
		<div className={styles.widgetGroup}>
			{/* Time Widget */}
			<div className={`${styles.widgetCard} ${styles.clockWidget}`}>
				<span className={styles.clockHeader}>PAKISTAN STANDARD TIME (PKT)</span>
				<div className={styles.clockTime} suppressHydrationWarning>{timeStr}</div>
				<div className={styles.clockDate} suppressHydrationWarning>{dateStr}</div>
			</div>



			{/* Weather Widget */}
			<div className={`${styles.widgetCard} ${styles.weatherWidget}`}>
				<div className={styles.weatherHeader}>
					<span>WEATHER</span>
					<span>☀️</span>
				</div>
				<div className={styles.weatherMain}>
					<span className={styles.weatherIcon}>
						{weather.condition.toLowerCase().includes('rain') ? '🌧️' : '☀️'}
					</span>
					<span className={styles.weatherTemp}>{weather.temperature}°C</span>
				</div>
				<div className={styles.weatherCondition}>
					{weather.condition} • {weather.city}
				</div>
			</div>
		</div>
	);
}

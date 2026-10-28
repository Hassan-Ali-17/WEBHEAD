import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../../context/ContextProvider';
import { fetchWeatherForCoords, WeatherData } from '../../../services/weatherService';
import styles from './DesktopClockWeather.module.css';

export default function DesktopClockWeather() {
	const { settingsState } = useContext(Context);
	const [settings] = settingsState;

	const [timeStr, setTimeStr] = useState('12:28');
	const [dateStr, setDateStr] = useState('Wednesday 28 October');
	const [weather, setWeather] = useState<WeatherData>({
		city: 'Tokyo, Japan',
		temperature: 24,
		condition: 'Clear Sky',
		humidity: 48,
		windSpeed: 12,
		isDay: true,
		time: '12:28',
		highTemp: 26,
		lowTemp: 18,
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
				}),
			);
			setDateStr(
				now.toLocaleDateString([], {
					weekday: 'short',
					day: 'numeric',
					month: 'short',
				}),
			);
		};

		updateTime();
		const interval = setInterval(updateTime, 1000);
		return () => clearInterval(interval);
	}, [settings.clockFormat]);

	useEffect(() => {
		fetchWeatherForCoords(35.6762, 139.6503, 'Tokyo, Japan').then((res) => {
			if (res.data) setWeather(res.data);
		});
	}, []);

	return (
		<div className={styles.widgetGroup}>
			{/* Time Widget */}
			<div className={`${styles.widgetCard} ${styles.clockWidget}`}>
				<span className={styles.clockHeader}>JAPAN STANDARD TIME</span>
				<div className={styles.clockTime}>{timeStr}</div>
				<div className={styles.clockDate}>{dateStr}</div>
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

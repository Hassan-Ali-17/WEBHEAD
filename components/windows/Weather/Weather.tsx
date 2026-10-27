import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { BiNavigation, BiRefresh } from 'react-icons/bi';
import { BsCloudSun, BsDroplet, BsWind } from 'react-icons/bs';
import { PORTFOLIO_CONFIG } from '../../../config/portfolio.config';
import { fetchWeatherForCoords, WeatherData } from '../../../services/weatherService';
import DraggableWindow from '../../utils/DraggableWindow/DraggableWindow';
import styles from './Weather.module.css';

export default function WeatherWindow() {
	const defaultWeatherConfig = PORTFOLIO_CONFIG.weather;
	const [weather, setWeather] = useState<WeatherData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [permissionStatus, setPermissionStatus] = useState<'idle' | 'prompt' | 'granted' | 'denied'>('idle');

	const loadDefaultWeather = async () => {
		setLoading(true);
		setError(null);
		const res = await fetchWeatherForCoords(
			defaultWeatherConfig.defaultLatitude,
			defaultWeatherConfig.defaultLongitude,
			defaultWeatherConfig.defaultCity,
		);
		setLoading(false);
		if (res.error) {
			setError(res.error);
		} else {
			setWeather(res.data);
		}
	};

	useEffect(() => {
		loadDefaultWeather();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleRequestGeolocation = () => {
		if (!navigator.geolocation) {
			setError('Geolocation is not supported by your current browser.');
			setPermissionStatus('denied');
			return;
		}

		setPermissionStatus('prompt');
		setLoading(true);

		navigator.geolocation.getCurrentPosition(
			async (position) => {
				setPermissionStatus('granted');
				const { latitude, longitude } = position.coords;
				const res = await fetchWeatherForCoords(latitude, longitude, 'Your Local Patrol Area');
				setLoading(false);
				if (res.error) {
					setError(res.error);
				} else {
					setWeather(res.data);
				}
			},
			(err) => {
				setLoading(false);
				setPermissionStatus('denied');
				if (err.code === err.PERMISSION_DENIED) {
					setError('Location permission was denied. Showing default city weather.');
				} else {
					setError(`Location error: ${err.message}. Showing default city.`);
				}
			},
			{ timeout: 10000 },
		);
	};

	return (
		<DraggableWindow
			windowName="weather"
			topTitle="Spider-Verse Weather Patrol"
			topIcon={
				<Image
					src="/icons/pictures/pictures.png"
					width={18}
					height={18}
					alt="Weather"
				/>
			}
		>
			<div className={styles.container}>
				{/* Top Controls */}
				<div className={styles.header}>
					<div className={styles.cityInfo}>
						<h2>{weather?.city || defaultWeatherConfig.defaultCity}</h2>
						<span className={styles.subtext}>
							{permissionStatus === 'granted' ? 'Live Geolocation Synced' : 'Default Patrol City'}
						</span>
					</div>

					<div className={styles.controls}>
						<button
							onClick={handleRequestGeolocation}
							className={styles.geoBtn}
							title="Request Browser Geolocation"
						>
							<BiNavigation />
							<span>Use My Location</span>
						</button>
						<button
							onClick={loadDefaultWeather}
							className={styles.refreshBtn}
							title="Refresh Weather"
						>
							<BiRefresh className={loading ? styles.spinning : ''} />
						</button>
					</div>
				</div>

				{/* Error Notice */}
				{error && (
					<div className={styles.noticeBar}>
						<span>⚠️ {error}</span>
					</div>
				)}

				{/* Loading State */}
				{loading && !weather ? (
					<div className={styles.loadingContainer}>
						<div className={styles.spinner} />
						<p>Scanning atmospheric conditions across Earth-1610...</p>
					</div>
				) : weather ? (
					<div className={styles.weatherContent}>
						{/* Main Temp Card */}
						<div className={styles.mainCard}>
							<div className={styles.tempLarge}>
								<span className={styles.tempNum}>{weather.temperature}</span>
								<span className={styles.tempUnit}>°C</span>
							</div>
							<div className={styles.conditionBox}>
								<span className={styles.conditionName}>{weather.condition}</span>
								<span className={styles.tempRange}>
									High: {weather.highTemp ?? weather.temperature + 2}°C · Low: {weather.lowTemp ?? weather.temperature - 3}°C
								</span>
							</div>
						</div>

						{/* Metric Grid */}
						<div className={styles.metricsGrid}>
							<div className={styles.metricCard}>
								<BsWind className={styles.metricIcon} />
								<div>
									<span className={styles.metricLabel}>Wind Speed</span>
									<span className={styles.metricVal}>{weather.windSpeed} km/h</span>
								</div>
							</div>

							<div className={styles.metricCard}>
								<BsDroplet className={styles.metricIcon} />
								<div>
									<span className={styles.metricLabel}>Humidity</span>
									<span className={styles.metricVal}>{weather.humidity ?? 65}%</span>
								</div>
							</div>

							<div className={styles.metricCard}>
								<BsCloudSun className={styles.metricIcon} />
								<div>
									<span className={styles.metricLabel}>Patrol Visibility</span>
									<span className={styles.metricVal}>
										{weather.code <= 2 ? 'Optimal (Clear Webs)' : 'Caution (Mist/Rain)'}
									</span>
								</div>
							</div>
						</div>

						{/* Spider-Verse Patrol Forecast Advice */}
						<div className={styles.spiderPatrolAdvice}>
							<h4>SPIDEY SENSE PATROL REPORT</h4>
							<p>
								{weather.temperature < 5
									? 'Chilly conditions over Brooklyn. Web-fluid viscosity may stiffen. Thermal suit recommended.'
									: weather.condition.includes('Rain') || weather.condition.includes('Downpour')
									? 'Slick surfaces across building rooftops. Caution when swinging across the East River bridge cables.'
									: 'Prime web-swinging conditions across the skyline. Clear skies for maximum velocity.'}
							</p>
						</div>

						<div className={styles.dataSourceFootnote}>
							Real-Time Meteorological Data provided by Open-Meteo Free API · Timezone: Auto
						</div>
					</div>
				) : null}
			</div>
		</DraggableWindow>
	);
}

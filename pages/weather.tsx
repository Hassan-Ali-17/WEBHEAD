import Head from 'next/head';
import Icons from '../components/modules/Icons/Icons';
import WeatherWindow from '../components/windows/Weather/Weather';
import { PORTFOLIO_CONFIG } from '../config/portfolio.config';

export default function WeatherPage() {
	return (
		<>
			<Head>
				<title>{PORTFOLIO_CONFIG.owner.name} — Weather Patrol</title>
				<meta
					name="description"
					content="Live meteorological radar and atmospheric patrol station for the Spider-Verse."
				/>
				<meta property="og:title" content="WEBHEAD Weather Patrol" />
				<meta
					property="og:description"
					content="Live meteorological radar and atmospheric patrol station for the Spider-Verse."
				/>
			</Head>
			<div style={{ height: '100%' }}>
				<WeatherWindow />
				<Icons />
			</div>
		</>
	);
}

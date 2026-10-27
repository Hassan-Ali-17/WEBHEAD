import Head from 'next/head';
import Icons from '../components/modules/Icons/Icons';
import SpotifyWindow from '../components/windows/Spotify/Spotify';
import { PORTFOLIO_CONFIG } from '../config/portfolio.config';

export default function SpotifyPage() {
	return (
		<>
			<Head>
				<title>{PORTFOLIO_CONFIG.owner.name} — Spotify Music Room</title>
				<meta
					name="description"
					content="Listen to curated Spider-Verse soundtracks and coding beats in the Webhead Spotify Music Room."
				/>
				<meta property="og:title" content="WEBHEAD Spotify Music Room" />
				<meta
					property="og:description"
					content="Listen to curated Spider-Verse soundtracks and coding beats in the Webhead Spotify Music Room."
				/>
			</Head>
			<div style={{ height: '100%' }}>
				<SpotifyWindow />
				<Icons />
			</div>
		</>
	);
}

import Head from 'next/head';
import Icons from '../components/modules/Icons/Icons';
import AboutWindow from '../components/windows/About/AboutWindow';
import { PORTFOLIO_CONFIG } from '../config/portfolio.config';

export default function AboutPage() {
	return (
		<>
			<Head>
				<title>{PORTFOLIO_CONFIG.owner.name} — Spider-Verse Developer Dossier</title>
				<meta
					name="description"
					content={PORTFOLIO_CONFIG.owner.bio}
				/>
				<meta property="og:title" content={`${PORTFOLIO_CONFIG.owner.name} — Webhead Developer`} />
				<meta
					property="og:description"
					content={PORTFOLIO_CONFIG.owner.bio}
				/>
			</Head>
			<div style={{ height: '100%' }}>
				<AboutWindow />
				<Icons />
			</div>
		</>
	);
}

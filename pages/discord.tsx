import Head from 'next/head';
import Icons from '../components/modules/Icons/Icons';
import DiscordWindow from '../components/windows/Discord/Discord';
import { PORTFOLIO_CONFIG } from '../config/portfolio.config';

export default function DiscordPage() {
	return (
		<>
			<Head>
				<title>{PORTFOLIO_CONFIG.owner.name} — Discord Comms</title>
				<meta
					name="description"
					content="Connect with Hassan Ali Shah on Discord or join the Spider-Verse Dev community."
				/>
				<meta property="og:title" content="WEBHEAD Discord Comms" />
				<meta
					property="og:description"
					content="Connect with Hassan Ali Shah on Discord or join the Spider-Verse Dev community."
				/>
			</Head>
			<div style={{ height: '100%' }}>
				<DiscordWindow />
				<Icons />
			</div>
		</>
	);
}

import Head from 'next/head';
import Icons from '../components/modules/Icons/Icons';
import TerminalComponent from '../components/windows/Terminal/Terminal';
import { PORTFOLIO_CONFIG } from '../config/portfolio.config';

function Terminal() {
	return (
		<>
			<Head>
				<title>{PORTFOLIO_CONFIG.owner.name} - Spider-Verse Terminal</title>
				<link rel="canonical" href="https://webhead-portfolio.vercel.app/terminal" />
				<meta
					name="description"
					content="Execute commands inside the Spider-Verse Dev Terminal across Earth-1610."
				/>
				<meta property="og:title" content={`${PORTFOLIO_CONFIG.owner.name} - Terminal`} />
				<meta
					property="og:description"
					content="Execute commands inside the Spider-Verse Dev Terminal across Earth-1610."
				/>
			</Head>
			<div style={{ height: '100%' }}>
				<TerminalComponent />
				<Icons />
			</div>
		</>
	);
}

export default Terminal;

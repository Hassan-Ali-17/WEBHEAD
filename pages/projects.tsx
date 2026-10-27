import Head from 'next/head';
import Icons from '../components/modules/Icons/Icons';
import ProjectsWindow from '../components/windows/Projects/ProjectsWindow';
import { PORTFOLIO_CONFIG } from '../config/portfolio.config';

export default function ProjectsPage() {
	return (
		<>
			<Head>
				<title>{PORTFOLIO_CONFIG.owner.name} — Spider-Verse Projects</title>
				<meta
					name="description"
					content="Explore software projects, realtime systems, and open-source repositories engineered by Hassan Ali Shah."
				/>
				<meta property="og:title" content="WEBHEAD Projects Vault" />
				<meta
					property="og:description"
					content="Explore software projects, realtime systems, and open-source repositories engineered by Hassan Ali Shah."
				/>
			</Head>
			<div style={{ height: '100%' }}>
				<ProjectsWindow />
				<Icons />
			</div>
		</>
	);
}

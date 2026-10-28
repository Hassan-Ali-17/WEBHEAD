import Head from 'next/head';
import Icons from '../../components/modules/Icons/Icons';
import ProjectsWindow from '../../components/windows/Projects/ProjectsWindow';
import { PORTFOLIO_CONFIG } from '../../config/portfolio.config';

export default function ExplorerProjectsPage() {
	return (
		<>
			<Head>
				<title>{`${PORTFOLIO_CONFIG.owner.name} — Projects Explorer`}</title>
				<link
					rel="canonical"
					href="https://webhead-portfolio.vercel.app/explorer/projects"
				/>
				<meta
					name="description"
					content={`Explore 12 verified software projects and open source repositories engineered by ${PORTFOLIO_CONFIG.owner.name}.`}
				/>
				<meta
					property="og:title"
					content={`${PORTFOLIO_CONFIG.owner.name} — Projects Explorer`}
				/>
				<meta
					property="og:description"
					content={`Explore 12 verified software projects and open source repositories engineered by ${PORTFOLIO_CONFIG.owner.name}.`}
				/>
			</Head>
			<div style={{ height: '100%' }}>
				<ProjectsWindow />
				<Icons />
			</div>
		</>
	);
}

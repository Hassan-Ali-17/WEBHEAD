import Head from 'next/head';
import Icons from '../components/modules/Icons/Icons';
import ResumeWindow from '../components/windows/Resume/ResumeWindow';
import { PORTFOLIO_CONFIG } from '../config/portfolio.config';

export default function ResumePage() {
	return (
		<>
			<Head>
				<title>{PORTFOLIO_CONFIG.owner.name} — Resume & Qualifications</title>
				<meta
					name="description"
					content={`Review professional credentials and download the resume of ${PORTFOLIO_CONFIG.owner.name}.`}
				/>
				<meta property="og:title" content={`${PORTFOLIO_CONFIG.owner.name} — Resume`} />
				<meta
					property="og:description"
					content={`Review professional credentials and download the resume of ${PORTFOLIO_CONFIG.owner.name}.`}
				/>
			</Head>
			<div style={{ height: '100%' }}>
				<ResumeWindow />
				<Icons />
			</div>
		</>
	);
}

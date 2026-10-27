import Head from 'next/head';
import Icons from '../../components/modules/Icons/Icons';
import Notepad from '../../components/windows/Notepad/Notepad';
import { PORTFOLIO_CONFIG } from '../../config/portfolio.config';

function About() {
	const textContent = () => {
		return `========================================
WEBHEAD // SPIDER-VERSE DEVELOPER DOSSIER
========================================
Owner: ${PORTFOLIO_CONFIG.owner.name}
Role: ${PORTFOLIO_CONFIG.owner.title}
Base: ${PORTFOLIO_CONFIG.owner.location}
Tagline: "${PORTFOLIO_CONFIG.owner.tagline}"

ABOUT ME:
${PORTFOLIO_CONFIG.owner.bio}

CORE SUPERPOWERS:
- Frontend: ${PORTFOLIO_CONFIG.owner.skills.frontend.join(', ')}
- Backend: ${PORTFOLIO_CONFIG.owner.skills.backend.join(', ')}
- Tools: ${PORTFOLIO_CONFIG.owner.skills.tools.join(', ')}
- Spider-Verse: ${PORTFOLIO_CONFIG.owner.skills.spiderverse.join(', ')}

CONNECT:
- GitHub: ${PORTFOLIO_CONFIG.owner.socials.github}
- LinkedIn: ${PORTFOLIO_CONFIG.owner.socials.linkedin}
- Discord: ${PORTFOLIO_CONFIG.discord.username}
- Email: ${PORTFOLIO_CONFIG.owner.email}

Open the Projects or Public Chat windows on the desktop to interact in real-time!
`;
	};

	return (
		<>
			<Head>
				<title>{PORTFOLIO_CONFIG.owner.name} - About Me</title>
				<link
					rel="canonical"
					href="https://webhead-portfolio.vercel.app/notepad/about"
				/>
				<meta
					name="description"
					content={PORTFOLIO_CONFIG.owner.bio}
				/>
			</Head>
			<div style={{ height: '100%' }}>
				<Notepad initialText={textContent()} />
				<Icons />
			</div>
		</>
	);
}

export default About;

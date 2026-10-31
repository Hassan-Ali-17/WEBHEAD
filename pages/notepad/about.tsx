import Head from 'next/head';
import Icons from '../../components/modules/Icons/Icons';
import Notepad from '../../components/windows/Notepad/Notepad';
import { PORTFOLIO_CONFIG } from '../../config/portfolio.config';

function About() {
	const textContent = () => {
		return `========================================
WEBHEAD // SPIDER-VERSE DEVELOPER DOSSIER
========================================
Owner:    ${PORTFOLIO_CONFIG.owner.name}
Role:     ${PORTFOLIO_CONFIG.owner.title}
Base:     ${PORTFOLIO_CONFIG.owner.location}
Phone:    ${PORTFOLIO_CONFIG.owner.phone}
Email:    ${PORTFOLIO_CONFIG.owner.email}
Tagline:  "${PORTFOLIO_CONFIG.owner.tagline}"

PROFESSIONAL SUMMARY:
${PORTFOLIO_CONFIG.owner.bio}

TECHNICAL SKILLS:
- Languages:           ${PORTFOLIO_CONFIG.owner.skills.languages.join(', ')}
- AI / ML & Agentic:   ${PORTFOLIO_CONFIG.owner.skills.aiml.join(', ')}
- Frontend:            ${PORTFOLIO_CONFIG.owner.skills.frontend.join(', ')}
- Backend & Cloud:     ${[...PORTFOLIO_CONFIG.owner.skills.backend, ...PORTFOLIO_CONFIG.owner.skills.databases].join(', ')}
- Mobile Development:  ${PORTFOLIO_CONFIG.owner.skills.mobile.join(', ')}
- Core Computer Sci:   ${PORTFOLIO_CONFIG.owner.skills.coreCS.join(', ')}
- Tools & DevOps:      ${PORTFOLIO_CONFIG.owner.skills.tools.join(', ')}

PROFESSIONAL EXPERIENCE:
${PORTFOLIO_CONFIG.owner.experience
	.map(
		(e) => `• ${e.role} — ${e.company} (${e.period})
  ${e.summary}
${e.highlights.map((h) => `    - ${h}`).join('\n')}`
	)
	.join('\n\n')}

ACHIEVEMENTS & RECOGNITION:
${PORTFOLIO_CONFIG.owner.achievements
	.map((a) => `• ${a.title}\n  ${a.description}`)
	.join('\n\n')}

EDUCATION:
${PORTFOLIO_CONFIG.owner.education
	.map((ed) => `• ${ed.degree} — ${ed.institution} (${ed.period}) [${ed.details}]`)
	.join('\n')}

CORE STRENGTHS:
${PORTFOLIO_CONFIG.owner.coreStrengths.map((cs) => `• ${cs}`).join('\n')}

CONNECT:
- Portfolio: ${PORTFOLIO_CONFIG.owner.socials.portfolio}
- GitHub:    ${PORTFOLIO_CONFIG.owner.socials.github}
- LinkedIn:  ${PORTFOLIO_CONFIG.owner.socials.linkedin}
- Email:     ${PORTFOLIO_CONFIG.owner.email}
- Phone:     ${PORTFOLIO_CONFIG.owner.phone}

========================================
Open the Projects Explorer or Resume window on the desktop for the complete interactive experience!
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

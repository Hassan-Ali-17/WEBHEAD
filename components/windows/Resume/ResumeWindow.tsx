import Image from 'next/image';
import React from 'react';
import { BiBriefcase, BiCheckCircle } from 'react-icons/bi';
import { FiDownload, FiExternalLink } from 'react-icons/fi';
import { HiOutlineAcademicCap } from 'react-icons/hi';
import { PORTFOLIO_CONFIG } from '../../../config/portfolio.config';
import DraggableWindow from '../../utils/DraggableWindow/DraggableWindow';
import styles from './ResumeWindow.module.css';

export default function ResumeWindow() {
	const owner = PORTFOLIO_CONFIG.owner;

	const handleDownload = () => {
		// Create a dynamic printable HTML/PDF or download configured resume path
		const link = document.createElement('a');
		link.href = owner.resumeUrl;
		link.download = `${owner.name.replace(/\s+/g, '_')}_Resume.pdf`;
		link.target = '_blank';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<DraggableWindow
			windowName="resume"
			topTitle="Spider-Verse Developer Resume"
			topIcon={
				<Image
					src="/icons/notes/notes.png"
					width={18}
					height={18}
					alt="Resume"
				/>
			}
		>
			<div className={styles.container}>
				{/* Top Actions Bar */}
				<div className={styles.actionsBar}>
					<div className={styles.candidateHeader}>
						<h2>{owner.name}</h2>
						<span>{owner.title}</span>
					</div>

					<button onClick={handleDownload} className={styles.downloadBtn}>
						<FiDownload />
						<span>Download Resume (PDF)</span>
					</button>
				</div>

				<div className={styles.resumePaper}>
					{/* Header Info */}
					<div className={styles.resumeHeader}>
						<div>
							<h1 className={styles.paperName}>{owner.name}</h1>
							<p className={styles.paperRole}>{owner.title} · {owner.location}</p>
						</div>
						<div className={styles.contactDetails}>
							<span>Email: {owner.email}</span>
							<span>GitHub: {owner.socials.github}</span>
							<span>LinkedIn: {owner.socials.linkedin}</span>
						</div>
					</div>

					<div className={styles.divider} />

					{/* Summary */}
					<div className={styles.section}>
						<h3 className={styles.sectionTitle}>Professional Summary</h3>
						<p className={styles.sectionText}>{owner.bio}</p>
					</div>

					{/* Experience */}
					<div className={styles.section}>
						<h3 className={styles.sectionTitle}>
							<BiBriefcase className={styles.iconInline} /> Technical Experience
						</h3>

						<div className={styles.jobItem}>
							<div className={styles.jobHeader}>
								<h4>Full-Stack Software Engineer & Creative Lead</h4>
								<span className={styles.jobPeriod}>2023 — Present</span>
							</div>
							<p className={styles.companyName}>Spider-Verse Solutions // Earth-1610</p>
							<ul className={styles.jobBullets}>
								<li>
									Architected real-time desktop web operating systems using Next.js 16, React 19, Motion, and Supabase Realtime, supporting multi-user presence and sub-50ms WebSocket latency.
								</li>
								<li>
									Engineered responsive client window managers with dynamic stacking, drag-and-drop mechanics, and custom CSS glassmorphism.
								</li>
								<li>
									Built and optimized REST and WebSocket endpoints with strict Row Level Security (RLS) policies and PostgreSQL schemas.
								</li>
							</ul>
						</div>

						<div className={styles.jobItem}>
							<div className={styles.jobHeader}>
								<h4>Frontend & Systems Developer</h4>
								<span className={styles.jobPeriod}>2021 — 2023</span>
							</div>
							<p className={styles.companyName}>Digital Multiverse Labs</p>
							<ul className={styles.jobBullets}>
								<li>
									Built high-performance web applications with modern TypeScript, TailwindCSS/Vanilla CSS, and automated CI/CD deployment pipelines on Vercel.
								</li>
								<li>
									Integrated third-party APIs including Spotify Web Embeds, Open-Meteo Geocoding, and Discord API interfaces.
								</li>
							</ul>
						</div>
					</div>

					{/* Education */}
					<div className={styles.section}>
						<h3 className={styles.sectionTitle}>
							<HiOutlineAcademicCap className={styles.iconInline} /> Education & Credentials
						</h3>
						<div className={styles.eduItem}>
							<div className={styles.jobHeader}>
								<h4>Bachelor of Science in Computer Science</h4>
								<span className={styles.jobPeriod}>Graduated</span>
							</div>
							<p className={styles.companyName}>Faculty of Engineering & Computer Sciences</p>
						</div>
					</div>

					{/* Technical Skills */}
					<div className={styles.section}>
						<h3 className={styles.sectionTitle}>
							<BiCheckCircle className={styles.iconInline} /> Core Competencies
						</h3>
						<div className={styles.skillsTable}>
							<div>
								<strong>Languages & Runtimes:</strong> TypeScript, JavaScript (ESNext), Node.js, Python, SQL, HTML5, CSS3.
							</div>
							<div>
								<strong>Frameworks & Libraries:</strong> React 19, Next.js 16, Motion, TailwindCSS, Express.js.
							</div>
							<div>
								<strong>Databases & Cloud:</strong> PostgreSQL, Supabase, Vercel, Docker, Git/GitHub.
							</div>
						</div>
					</div>
				</div>
			</div>
		</DraggableWindow>
	);
}

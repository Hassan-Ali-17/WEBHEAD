import Image from 'next/image';
import React from 'react';
import { BiBriefcase, BiCheckCircle } from 'react-icons/bi';
import { BsAward, BsCodeSquare, BsStars } from 'react-icons/bs';
import { FiDownload } from 'react-icons/fi';
import { HiOutlineAcademicCap } from 'react-icons/hi';
import { PORTFOLIO_CONFIG } from '../../../config/portfolio.config';
import DraggableWindow from '../../utils/DraggableWindow/DraggableWindow';
import styles from './ResumeWindow.module.css';

export default function ResumeWindow() {
	const owner = PORTFOLIO_CONFIG.owner;

	const handleDownload = () => {
		window.print();
	};

	return (
		<DraggableWindow
			windowName="resume"
			topTitle="Spider-Verse Developer Resume — Hassan Ali Shah"
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

					<button onClick={handleDownload} className={styles.downloadBtn} title="Print or Save Resume as PDF">
						<FiDownload />
						<span>Print / Save as PDF</span>
					</button>
				</div>

				<div className={styles.resumePaper}>
					{/* Header Info */}
					<div className={styles.resumeHeader}>
						<div>
							<h1 className={styles.paperName}>{owner.name}</h1>
							<p className={styles.paperRole}>{owner.title}</p>
							<p style={{ fontSize: '0.8rem', color: '#9aa4bf', marginTop: '4px' }}>
								{owner.location} · {owner.phone}
							</p>
						</div>
						<div className={styles.contactDetails}>
							<span>
								Email:{' '}
								<a href={`mailto:${owner.email}`} style={{ color: '#00f0ff', textDecoration: 'none' }}>
									{owner.email}
								</a>
							</span>
							<span>
								GitHub:{' '}
								<a
									href={owner.socials.github}
									target="_blank"
									rel="noreferrer"
									style={{ color: '#00f0ff', textDecoration: 'none' }}
								>
									github.com/Hassan-Ali-17
								</a>
							</span>
							<span>
								LinkedIn:{' '}
								<a
									href={owner.socials.linkedin}
									target="_blank"
									rel="noreferrer"
									style={{ color: '#00f0ff', textDecoration: 'none' }}
								>
									linkedin.com/in/hassan-ali-shah
								</a>
							</span>
							<span>
								Portfolio:{' '}
								<a
									href={owner.socials.portfolio}
									target="_blank"
									rel="noreferrer"
									style={{ color: '#00f0ff', textDecoration: 'none' }}
								>
									hassan-ali-17.github.io
								</a>
							</span>
						</div>
					</div>

					<div className={styles.divider} />

					{/* Summary */}
					<div className={styles.section}>
						<h3 className={styles.sectionTitle}>
							<BsStars className={styles.iconInline} /> Professional Summary
						</h3>
						<p className={styles.sectionText}>{owner.bio}</p>
					</div>

					{/* Technical Skills */}
					<div className={styles.section}>
						<h3 className={styles.sectionTitle}>
							<BiCheckCircle className={styles.iconInline} /> Technical Skills
						</h3>
						<div className={styles.skillsTable}>
							<div>
								<strong>Languages:</strong> {owner.skills.languages.join(', ')}
							</div>
							<div>
								<strong>Frontend Development:</strong> {owner.skills.frontend.join(', ')}
							</div>
							<div>
								<strong>Backend Development:</strong> {owner.skills.backend.join(', ')}
							</div>
							<div>
								<strong>Databases & Cloud:</strong> {owner.skills.databases.join(', ')}
							</div>
							<div>
								<strong>Mobile Development:</strong> {owner.skills.mobile.join(', ')}
							</div>
							<div>
								<strong>AI / ML:</strong> {owner.skills.aiml.join(', ')}
							</div>
							<div>
								<strong>Core CS:</strong> {owner.skills.coreCS.join(', ')}
							</div>
						</div>
					</div>

					{/* Professional Experience */}
					<div className={styles.section}>
						<h3 className={styles.sectionTitle}>
							<BiBriefcase className={styles.iconInline} /> Professional Experience
						</h3>

						{owner.experience.map((exp, idx) => (
							<div key={idx} className={styles.jobItem}>
								<div className={styles.jobHeader}>
									<h4>{exp.role}</h4>
									<span className={styles.jobPeriod}>{exp.period}</span>
								</div>
								<p className={styles.companyName}>{exp.company}</p>
								<p style={{ fontSize: '0.8rem', color: '#dbdee1', marginBottom: '6px' }}>{exp.summary}</p>
								<ul className={styles.jobBullets}>
									{exp.highlights.map((bullet, bIdx) => (
										<li key={bIdx}>{bullet}</li>
									))}
								</ul>
							</div>
						))}
					</div>

					{/* Key Projects */}
					<div className={styles.section}>
						<h3 className={styles.sectionTitle}>
							<BsCodeSquare className={styles.iconInline} /> Featured Projects
						</h3>

						<div className={styles.jobItem}>
							<div className={styles.jobHeader}>
								<h4>Full Stack Web Application (MERN Stack)</h4>
								<span className={styles.jobPeriod}>React.js, Node.js, Express, MongoDB</span>
							</div>
							<ul className={styles.jobBullets} style={{ marginTop: '6px' }}>
								<li>
									Architected and deployed a production-ready web application featuring JWT-based authentication, dynamic real-time data flow, and a fully responsive UI.
								</li>
							</ul>
						</div>

						<div className={styles.jobItem}>
							<div className={styles.jobHeader}>
								<h4>TaskFlow Pro — AI Task Management Platform</h4>
								<span className={styles.jobPeriod}>Python, Flask, AI/ML, Code Execution</span>
							</div>
							<ul className={styles.jobBullets} style={{ marginTop: '6px' }}>
								<li>
									Built an AI-powered task management platform using Flask and Python with role-based dashboards, intelligent task assistance, automated feedback, and integrated code execution.
								</li>
							</ul>
						</div>

						<div className={styles.jobItem}>
							<div className={styles.jobHeader}>
								<h4>Cost-Based SQL Query Optimizer (CB-SQLopt)</h4>
								<span className={styles.jobPeriod}>C++, Systems, Dynamic Programming</span>
							</div>
							<ul className={styles.jobBullets} style={{ marginTop: '6px' }}>
								<li>
									Implemented a cost-based SQL optimizer in C++ featuring recursive-descent parsing, Selinger join optimization, query rewrite rules, and an interactive SQL shell with EXPLAIN plan output.
								</li>
							</ul>
						</div>

						<div className={styles.jobItem}>
							<div className={styles.jobHeader}>
								<h4>VORTEX OS — Custom Linux Shell Environment</h4>
								<span className={styles.jobPeriod}>Python, Systems Programming, Bash</span>
							</div>
							<ul className={styles.jobBullets} style={{ marginTop: '6px' }}>
								<li>
									Engineered a modular Linux shell in Python with command execution, alias management, command chaining, persistent history, and a customizable theme engine.
								</li>
							</ul>
						</div>

						<div className={styles.jobItem}>
							<div className={styles.jobHeader}>
								<h4>Uniflow — Classroom Management App</h4>
								<span className={styles.jobPeriod}>Flutter, Dart, Mobile App</span>
							</div>
							<ul className={styles.jobBullets} style={{ marginTop: '6px' }}>
								<li>
									Built Uniflow, a cross-platform mobile app inspired by Google Classroom, using Flutter and Dart to manage classes, assignments, and student-teacher communication with real-time notifications.
								</li>
							</ul>
						</div>

						<div className={styles.jobItem}>
							<div className={styles.jobHeader}>
								<h4>Hassan-Verse — Interactive 3D Developer Portfolio</h4>
								<span className={styles.jobPeriod}>React, Three.js, Vercel</span>
							</div>
							<ul className={styles.jobBullets} style={{ marginTop: '6px' }}>
								<li>
									Built an immersive 3D portfolio using React and Three.js, enabling interactive exploration of projects and skills through a virtual workspace with responsive rendering.
								</li>
							</ul>
						</div>
					</div>

					{/* Achievements & Recognition */}
					<div className={styles.section}>
						<h3 className={styles.sectionTitle}>
							<BsAward className={styles.iconInline} /> Achievements & Recognition
						</h3>
						<ul className={styles.jobBullets}>
							{owner.achievements.map((ach, idx) => (
								<li key={idx} style={{ marginBottom: '8px' }}>
									<strong style={{ color: '#ffffff' }}>{ach.title}:</strong> {ach.description}
								</li>
							))}
						</ul>
					</div>

					{/* Education */}
					<div className={styles.section}>
						<h3 className={styles.sectionTitle}>
							<HiOutlineAcademicCap className={styles.iconInline} /> Education
						</h3>
						{owner.education.map((edu, idx) => (
							<div key={idx} className={styles.eduItem}>
								<div className={styles.jobHeader}>
									<h4>{edu.degree}</h4>
									<span className={styles.jobPeriod}>{edu.period}</span>
								</div>
								<p className={styles.companyName}>{edu.institution}</p>
								<p style={{ fontSize: '0.8rem', color: '#9aa4bf' }}>{edu.details}</p>
							</div>
						))}
					</div>

					{/* Core Strengths */}
					<div className={styles.section}>
						<h3 className={styles.sectionTitle}>
							<BiCheckCircle className={styles.iconInline} /> Core Strengths
						</h3>
						<ul className={styles.jobBullets}>
							{owner.coreStrengths.map((str, idx) => (
								<li key={idx}>{str}</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</DraggableWindow>
	);
}

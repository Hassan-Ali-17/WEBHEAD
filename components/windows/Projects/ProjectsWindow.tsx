import Image from 'next/image';
import React, { useState } from 'react';
import { AiOutlineStar } from 'react-icons/ai';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { PORTFOLIO_CONFIG, ProjectItem } from '../../../config/portfolio.config';
import DraggableWindow from '../../utils/DraggableWindow/DraggableWindow';
import styles from './ProjectsWindow.module.css';

const CATEGORIES = ['All', 'Web App', 'Realtime', 'AI & Tooling', 'Open Source'] as const;

export default function ProjectsWindow() {
	const allProjects = PORTFOLIO_CONFIG.projects;
	const [activeCategory, setActiveCategory] = useState<string>('All');
	const [searchQuery, setSearchQuery] = useState('');

	const filteredProjects = allProjects.filter((proj) => {
		const matchesCategory = activeCategory === 'All' || proj.category === activeCategory;
		const matchesSearch =
			proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
			proj.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
		return matchesCategory && matchesSearch;
	});

	return (
		<DraggableWindow
			windowName="projects"
			topTitle="Spider-Verse Project Vault"
			topIcon={
				<Image
					src="/icons/folder/folder.png"
					width={18}
					height={18}
					alt="Projects"
				/>
			}
		>
			<div className={styles.container}>
				{/* Header & Filter Controls */}
				<div className={styles.header}>
					<div className={styles.headerLeft}>
						<h2>Multiverse Repositories & Creations</h2>
						<p>Engineered by {PORTFOLIO_CONFIG.owner.name} across dimensions.</p>
					</div>

					<div className={styles.searchBox}>
						<input
							type="text"
							placeholder="Search projects or stacks..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>
				</div>

				<div className={styles.categoryPills}>
					{CATEGORIES.map((cat) => (
						<button
							key={cat}
							className={`${styles.catBtn} ${activeCategory === cat ? styles.activeCatBtn : ''}`}
							onClick={() => setActiveCategory(cat)}
						>
							{cat}
						</button>
					))}
				</div>

				{/* Projects Grid */}
				<div className={styles.projectsGrid}>
					{filteredProjects.length === 0 ? (
						<div className={styles.noResults}>
							<p>No project transmissions found matching &ldquo;{searchQuery}&rdquo;</p>
						</div>
					) : (
						filteredProjects.map((project: ProjectItem) => (
							<div key={project.id} className={styles.projectCard}>
								<div className={styles.cardHeader}>
									<span className={styles.categoryBadge}>{project.category}</span>
									{project.stars !== undefined && (
										<div className={styles.starBadge}>
											<AiOutlineStar />
											<span>{project.stars}</span>
										</div>
									)}
								</div>

								<h3 className={styles.projectTitle}>{project.title}</h3>
								<p className={styles.projectDesc}>{project.description}</p>

								<div className={styles.techStackList}>
									{project.technologies.map((tech) => (
										<span key={tech} className={styles.techBadge}>
											{tech}
										</span>
									))}
								</div>

								<div className={styles.cardActions}>
									<a
										href={project.githubUrl}
										target="_blank"
										rel="noopener noreferrer"
										className={styles.actionBtn}
									>
										<FiGithub />
										<span>Source</span>
									</a>
									{project.liveUrl && (
										<a
											href={project.liveUrl}
											target="_blank"
											rel="noopener noreferrer"
											className={styles.actionBtnPrimary}
										>
											<FiExternalLink />
											<span>Live Demo</span>
										</a>
									)}
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</DraggableWindow>
	);
}

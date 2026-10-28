import Image from 'next/image';
import React, { useState } from 'react';
import {
	AiOutlineArrowLeft,
	AiOutlineArrowRight,
	AiOutlineArrowUp,
	AiOutlineReload,
	AiOutlineSearch,
} from 'react-icons/ai';
import {
	BsFolder2,
	BsFolderFill,
	BsGrid3X3Gap,
	BsListUl,
	BsFileEarmarkText,
	BsFileEarmarkCode,
	BsLink45Deg,
	BsLayoutSidebarReverse,
	BsX,
} from 'react-icons/bs';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import {
	EXPLORER_CATEGORIES,
	FEATURED_PROJECTS_CATALOGUE,
	FeaturedProject,
	VirtualFile,
} from '../../../config/projectsCatalogue';
import styles from './ProjectsExplorer.module.css';

export default function ProjectsExplorer() {
	const [activeCategory, setActiveCategory] = useState<string>('All Projects');
	const [searchQuery, setSearchQuery] = useState('');
	const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
	const [showDetails, setShowDetails] = useState<boolean>(true);
	const [selectedProject, setSelectedProject] = useState<FeaturedProject>(
		FEATURED_PROJECTS_CATALOGUE[0],
	);
	const [currentFolder, setCurrentFolder] = useState<FeaturedProject | null>(null);
	const [selectedFile, setSelectedFile] = useState<VirtualFile | null>(null);

	// Navigation history stack
	const [historyStack, setHistoryStack] = useState<(FeaturedProject | null)[]>([null]);
	const [historyIndex, setHistoryIndex] = useState(0);

	const handleOpenFolder = (proj: FeaturedProject) => {
		setSelectedProject(proj);
		setCurrentFolder(proj);
		setSelectedFile(proj.virtualFiles[0] || null);

		const nextStack = historyStack.slice(0, historyIndex + 1);
		nextStack.push(proj);
		setHistoryStack(nextStack);
		setHistoryIndex(nextStack.length - 1);
	};

	const handleGoUp = () => {
		if (currentFolder) {
			setCurrentFolder(null);
			setSelectedFile(null);

			const nextStack = historyStack.slice(0, historyIndex + 1);
			nextStack.push(null);
			setHistoryStack(nextStack);
			setHistoryIndex(nextStack.length - 1);
		}
	};

	const handleBack = () => {
		if (historyIndex > 0) {
			const newIdx = historyIndex - 1;
			setHistoryIndex(newIdx);
			const target = historyStack[newIdx];
			setCurrentFolder(target);
			if (target) {
				setSelectedProject(target);
				setSelectedFile(target.virtualFiles[0] || null);
			} else {
				setSelectedFile(null);
			}
		}
	};

	const handleForward = () => {
		if (historyIndex < historyStack.length - 1) {
			const newIdx = historyIndex + 1;
			setHistoryIndex(newIdx);
			const target = historyStack[newIdx];
			setCurrentFolder(target);
			if (target) {
				setSelectedProject(target);
				setSelectedFile(target.virtualFiles[0] || null);
			} else {
				setSelectedFile(null);
			}
		}
	};

	const filteredProjects = FEATURED_PROJECTS_CATALOGUE.filter((proj) => {
		const matchesCat =
			activeCategory === 'All Projects' || proj.category === activeCategory;
		const matchesSearch =
			proj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			proj.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
			proj.technologies.some((t) =>
				t.toLowerCase().includes(searchQuery.toLowerCase()),
			);
		return matchesCat && matchesSearch;
	});

	const renderFileIcon = (type: VirtualFile['type']) => {
		switch (type) {
			case 'markdown':
				return <BsFileEarmarkText className={styles.fileIcon} color="#00f0ff" />;
			case 'code':
				return <BsFileEarmarkCode className={styles.fileIcon} color="#ff4d6d" />;
			case 'url':
				return <BsLink45Deg className={styles.fileIcon} color="#23a55a" />;
			default:
				return <BsFileEarmarkText className={styles.fileIcon} color="#c9d1d9" />;
		}
	};

	return (
		<div className={styles.windowContainer}>
			{/* Top Windows 11 Toolbar */}
			<div className={styles.toolbar}>
				<div className={styles.navBtnGroup}>
					<button
						type="button"
						className={styles.navIconBtn}
						onClick={handleBack}
						disabled={historyIndex <= 0}
						title="Back"
					>
						<AiOutlineArrowLeft />
					</button>
					<button
						type="button"
						className={styles.navIconBtn}
						onClick={handleForward}
						disabled={historyIndex >= historyStack.length - 1}
						title="Forward"
					>
						<AiOutlineArrowRight />
					</button>
					<button
						type="button"
						className={styles.navIconBtn}
						onClick={handleGoUp}
						disabled={!currentFolder}
						title="Up to Featured Projects"
					>
						<AiOutlineArrowUp />
					</button>
					<button
						type="button"
						className={styles.navIconBtn}
						onClick={() => {
							setSearchQuery('');
							setActiveCategory('All Projects');
						}}
						title="Refresh"
					>
						<AiOutlineReload />
					</button>
				</div>

				{/* Address / Breadcrumb Bar */}
				<div className={styles.addressBar}>
					<span className={styles.driveIcon}>💻</span>
					<span
						className={styles.crumbItem}
						onClick={() => {
							setCurrentFolder(null);
							setSelectedFile(null);
						}}
					>
						WEBHEAD
					</span>
					<span className={styles.crumbSeparator}>&gt;</span>
					<span
						className={styles.crumbItem}
						onClick={() => {
							setCurrentFolder(null);
							setSelectedFile(null);
						}}
					>
						Featured Projects
					</span>
					{currentFolder && (
						<>
							<span className={styles.crumbSeparator}>&gt;</span>
							<span className={styles.crumbItem}>
								{currentFolder.folderNumber} - {currentFolder.name}
							</span>
						</>
					)}
				</div>

				{/* Search Field */}
				<div className={styles.searchBox}>
					<AiOutlineSearch className={styles.searchIcon} />
					<input
						type="text"
						className={styles.searchInput}
						placeholder="Search projects & stacks..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>

				{/* Grid / List / Details View Controls */}
				<div className={styles.viewControls}>
					<button
						type="button"
						className={`${styles.viewModeBtn} ${
							viewMode === 'grid' ? styles.activeView : ''
						}`}
						onClick={() => setViewMode('grid')}
						title="Icons Grid View"
					>
						<BsGrid3X3Gap />
					</button>
					<button
						type="button"
						className={`${styles.viewModeBtn} ${
							viewMode === 'list' ? styles.activeView : ''
						}`}
						onClick={() => setViewMode('list')}
						title="Details List View"
					>
						<BsListUl />
					</button>
					<button
						type="button"
						className={`${styles.viewModeBtn} ${
							showDetails ? styles.activeView : ''
						}`}
						onClick={() => setShowDetails(!showDetails)}
						title="Toggle Details Inspection Pane"
					>
						<BsLayoutSidebarReverse />
					</button>
				</div>
			</div>

			{/* Main Explorer Body */}
			<div className={styles.explorerBody}>
				{/* Left Sidebar */}
				<div className={styles.sidebar}>
					<div className={styles.sidebarGroup}>
						<h4 className={styles.sidebarHeading}>Quick Access</h4>
						<button
							type="button"
							className={`${styles.sidebarItem} ${
								activeCategory === 'All Projects' && !currentFolder
									? styles.activeSidebarItem
									: ''
							}`}
							onClick={() => {
								setActiveCategory('All Projects');
								setCurrentFolder(null);
								setSelectedFile(null);
							}}
						>
							<BsFolderFill className={styles.sidebarIcon} color="#ff1a3c" />
							<span>Featured Projects</span>
							<span className={styles.sidebarCount}>12</span>
						</button>
					</div>

					<div className={styles.sidebarGroup}>
						<h4 className={styles.sidebarHeading}>Domains</h4>
						{EXPLORER_CATEGORIES.filter((c) => c !== 'All Projects').map((cat) => {
							const count = FEATURED_PROJECTS_CATALOGUE.filter(
								(p) => p.category === cat,
							).length;
							return (
								<button
									key={cat}
									type="button"
									className={`${styles.sidebarItem} ${
										activeCategory === cat ? styles.activeSidebarItem : ''
									}`}
									onClick={() => {
										setActiveCategory(cat);
										setCurrentFolder(null);
										setSelectedFile(null);
									}}
								>
									<BsFolder2 className={styles.sidebarIcon} />
									<span>{cat}</span>
									<span className={styles.sidebarCount}>{count}</span>
								</button>
							);
						})}
					</div>

					{/* Drives Telemetry */}
					<div className={styles.sidebarGroup} style={{ marginTop: 'auto' }}>
						<h4 className={styles.sidebarHeading}>Local Disks</h4>
						<div style={{ padding: '4px 8px' }}>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									fontSize: '0.74rem',
									color: '#c9d1d9',
								}}
							>
								<span>System (C:)</span>
								<span>248 GB free</span>
							</div>
							<div className={styles.driveSpaceBar}>
								<div
									className={styles.driveSpaceUsed}
									style={{ width: '52%' }}
								/>
							</div>
						</div>
						<div style={{ padding: '4px 8px' }}>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									fontSize: '0.74rem',
									color: '#c9d1d9',
								}}
							>
								<span>Projects (D:)</span>
								<span>890 GB free</span>
							</div>
							<div className={styles.driveSpaceBar}>
								<div
									className={styles.driveSpaceUsed}
									style={{ width: '18%', background: '#ff1a3c' }}
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Main Folder Content Area */}
				<div className={styles.mainArea}>
					{/* Status Bar */}
					<div className={styles.statusBar}>
						<span>
							{currentFolder
								? `${currentFolder.virtualFiles.length} items in ${currentFolder.name}`
								: `${filteredProjects.length} projects`}
						</span>
						<span>
							{currentFolder
								? `Path: C:\\Dev\\${currentFolder.slug}`
								: 'Path: C:\\Dev\\FeaturedProjects'}
						</span>
					</div>

					{/* View 1: Inside a Project Folder */}
					{currentFolder ? (
						<div className={styles.folderContentsWrapper}>
							<div className={styles.folderBackHeader}>
								<button
									type="button"
									className={styles.backUpBtn}
									onClick={handleGoUp}
								>
									<AiOutlineArrowUp />
									<span>Back to Projects</span>
								</button>
								<h2 className={styles.folderHeaderTitle}>
									{currentFolder.folderNumber} - {currentFolder.name}
								</h2>
							</div>

							<div className={styles.filesGrid}>
								{currentFolder.virtualFiles.map((vf) => {
									const isSelected = selectedFile?.name === vf.name;
									return (
										<div
											key={vf.name}
											className={`${styles.fileCard} ${
												isSelected ? styles.selectedFile : ''
											}`}
											onClick={() => setSelectedFile(vf)}
											onDoubleClick={() => {
												if (vf.type === 'url' && vf.url) {
													window.open(vf.url, '_blank', 'noopener,noreferrer');
												}
											}}
											title={
												vf.type === 'url'
													? 'Double click to open GitHub repository'
													: 'Click to preview'
											}
										>
											{renderFileIcon(vf.type)}
											<span className={styles.fileName}>{vf.name}</span>
										</div>
									);
								})}
							</div>

							{/* Inline File Preview if selected */}
							{selectedFile && selectedFile.content && (
								<div style={{ marginTop: '16px' }}>
									<h4
										style={{
											fontSize: '0.75rem',
											color: '#8b949e',
											marginBottom: '6px',
											textTransform: 'uppercase',
										}}
									>
										Preview: {selectedFile.name}
									</h4>
									<div className={styles.filePreviewContainer}>
										{selectedFile.content}
									</div>
								</div>
							)}
						</div>
					) : viewMode === 'grid' ? (
						/* View 2: Projects Grid */
						<div className={styles.projectsGrid}>
							{filteredProjects.map((proj) => {
								const isSelected = selectedProject.id === proj.id;
								return (
									<div
										key={proj.id}
										className={`${styles.folderCard} ${
											isSelected ? styles.selectedCard : ''
										}`}
										onClick={() => {
											setSelectedProject(proj);
											setShowDetails(true);
										}}
										onDoubleClick={() => handleOpenFolder(proj)}
										title="Click to view details, double-click to explore files"
									>
										<div className={styles.cardTopRow}>
											<span className={styles.folderIconWrapper}>📁</span>
											<span className={styles.folderNumberBadge}>
												{proj.folderNumber}
											</span>
										</div>

										<h3 className={styles.folderTitle}>{proj.name}</h3>
										<p className={styles.folderTagline}>{proj.tagline}</p>

										<div className={styles.folderMetaFooter}>
											<span className={styles.categoryTag}>{proj.category}</span>
											<span>{proj.sizeBytes}</span>
										</div>
									</div>
								);
							})}
						</div>
					) : (
						/* View 3: Projects List View */
						<table className={styles.listViewTable}>
							<thead>
								<tr>
									<th>Name</th>
									<th>Category</th>
									<th>Date Modified</th>
									<th>Size</th>
									<th>Status</th>
								</tr>
							</thead>
							<tbody>
								{filteredProjects.map((proj) => {
									const isSelected = selectedProject.id === proj.id;
									return (
										<tr
											key={proj.id}
											className={`${styles.listRow} ${
												isSelected ? styles.selectedRow : ''
											}`}
											onClick={() => {
												setSelectedProject(proj);
												setShowDetails(true);
											}}
											onDoubleClick={() => handleOpenFolder(proj)}
										>
											<td>
												<div className={styles.listNameCell}>
													<span>📁</span>
													<span>
														{proj.folderNumber} - {proj.name}
													</span>
												</div>
											</td>
											<td>{proj.category}</td>
											<td>{proj.dateModified}</td>
											<td>{proj.sizeBytes}</td>
											<td>
												<span className={styles.statusCompleteBadge}>
													{proj.status.toUpperCase()}
												</span>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					)}
				</div>

				{/* 3. Details Inspection Panel */}
				{showDetails && selectedProject && (
					<div className={styles.detailsPanel}>
						<div className={styles.detailsPanelTopBar}>
							<span className={styles.detailsPaneLabel}>PROJECT INSPECTOR</span>
							<button
								type="button"
								className={styles.closeDetailsBtn}
								onClick={() => setShowDetails(false)}
								title="Close Details Pane"
							>
								<BsX />
							</button>
						</div>

						<div className={styles.detailsHeader}>
							<div className={styles.detailsBadgeRow}>
								<span className={styles.folderNumberBadge}>
									PROJECT {selectedProject.folderNumber}
								</span>
								<span className={styles.statusCompleteBadge}>
									{selectedProject.status.toUpperCase()}
								</span>
							</div>
							<h2 className={styles.detailsTitle}>{selectedProject.name}</h2>
							<p className={styles.detailsTagline}>{selectedProject.tagline}</p>
						</div>

							{/* Summary & Problem */}
							<div className={styles.detailsSection}>
								<h4 className={styles.sectionHeading}>Summary</h4>
								<p className={styles.sectionBody}>{selectedProject.summary}</p>
							</div>

							<div className={styles.detailsSection}>
								<h4 className={styles.sectionHeading}>Problem Solved</h4>
								<p className={styles.sectionBody}>
									{selectedProject.problemStatement}
								</p>
							</div>

							{/* Verified Achievements if any */}
							{selectedProject.achievements &&
								selectedProject.achievements.length > 0 && (
									<div className={styles.achievementsBox}>
										<h4 className={styles.sectionHeading} style={{ color: '#ff1a3c' }}>
											Verified Highlights
										</h4>
										{selectedProject.achievements.map((ach, idx) => (
											<p key={idx} className={styles.achievementText}>
												🏆 {ach}
											</p>
										))}
									</div>
								)}

							{/* Technologies Used */}
							<div className={styles.detailsSection}>
								<h4 className={styles.sectionHeading}>Technology Stack</h4>
								<div className={styles.techPills}>
									{selectedProject.technologies.map((tech) => (
										<span key={tech} className={styles.techPill}>
											{tech}
										</span>
									))}
								</div>
							</div>

							{/* Key Features */}
							<div className={styles.detailsSection}>
								<h4 className={styles.sectionHeading}>Core Features</h4>
								<ul className={styles.featuresList}>
									{selectedProject.features.map((feat, idx) => (
										<li key={idx}>{feat}</li>
									))}
								</ul>
							</div>

							{/* Primary Action Buttons */}
							<div className={styles.actionButtonsGroup}>
								<a
									href={selectedProject.repositoryUrl}
									target="_blank"
									rel="noopener noreferrer"
									className={styles.primaryRepoBtn}
								>
									<FiGithub />
									<span>Open GitHub Repository</span>
									<FiExternalLink />
								</a>

								{!currentFolder && (
									<button
										type="button"
										className={styles.secondaryFolderBtn}
										onClick={() => handleOpenFolder(selectedProject)}
									>
										<span>Explore Project Files 📂</span>
									</button>
								)}

								{selectedProject.liveDemoUrl && (
									<a
										href={selectedProject.liveDemoUrl}
										target="_blank"
										rel="noopener noreferrer"
										className={styles.secondaryFolderBtn}
									>
										<span>Launch Live Demo</span>
										<FiExternalLink />
									</a>
								)}
							</div>
						</div>
					)}
			</div>
		</div>
	);
}

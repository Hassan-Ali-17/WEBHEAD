import Head from 'next/head';
import Image from 'next/image';
import Icons from '../../components/modules/Icons/Icons';
import FileExplorer from '../../components/windows/FileExplorer/FileExplorer';
import { PORTFOLIO_CONFIG } from '../../config/portfolio.config';
import styles from '../../styles/utils/List.module.css';
import type { ProjectType } from '../../types';

function Projects({ data }: { data: ProjectType[] }) {
	const content = () => {
		const getDate = (date: string) => {
			try {
				const dateString = new Date(date).toLocaleDateString('en-GB', {
					year: 'numeric',
					month: '2-digit',
					day: '2-digit',
					hour: '2-digit',
					minute: '2-digit',
				});
				return dateString.replace(',', '');
			} catch {
				return date;
			}
		};

		const formatSize = (size: number) => {
			if (size > 1024) {
				return `${(size / 1024).toFixed(2)} MB`;
			}
			return `${size} KB`;
		};

		return (
			<div className={styles.listItemContainer}>
				{data.map((project) => (
					<div
						className={styles.listItem}
						key={project.id}
						onClick={() =>
							window.open(
								project.html_url,
								'_blank',
								'noopener,noreferrer',
							)
						}
					>
						<div className={styles.listItemName}>
							<Image
								src="/svg/github.svg"
								unoptimized
								alt="icon"
								width={16}
								height={16}
							/>
							<p>{project.name}</p>
						</div>
						<p className={styles.listItemDateModified}>
							{getDate(project.updated_at)}
						</p>
						<p className={styles.listItemType}>Repository</p>
						<p className={styles.listItemSize}>
							{formatSize(project.size)}
						</p>
					</div>
				))}
			</div>
		);
	};

	return (
		<>
			<Head>
				<title>{PORTFOLIO_CONFIG.owner.name} - Projects Explorer</title>
				<link
					rel="canonical"
					href="https://webhead-portfolio.vercel.app/explorer/projects"
				/>
				<meta
					name="description"
					content={`Public repositories and open source projects by ${PORTFOLIO_CONFIG.owner.name}.`}
				/>
				<meta property="og:title" content={`${PORTFOLIO_CONFIG.owner.name} - Projects`} />
				<meta
					property="og:description"
					content={`Public repositories and open source projects by ${PORTFOLIO_CONFIG.owner.name}.`}
				/>
			</Head>
			<div style={{ height: '100%' }}>
				<FileExplorer
					icon="folder"
					folder="Projects"
					component={data.length ? content() : undefined}
					topNav={true}
				/>
				<Icons />
			</div>
		</>
	);
}

export async function getStaticProps() {
	try {
		const res = await fetch(`https://api.github.com/users/Hassan-Ali-17/repos`);
		if (res.ok) {
			const json = await res.json();
			if (Array.isArray(json) && json.length > 0) {
				const data = json
					.filter((p: ProjectType) => !p.fork)
					.map((p: ProjectType) => ({
						fork: p.fork,
						full_name: p.full_name,
						id: p.id,
						html_url: p.html_url,
						name: p.name,
						updated_at: p.updated_at,
						size: p.size || 1024,
					}));
				return { props: { data }, revalidate: 60 };
			}
		}
	} catch {
		// Fallback to configured projects
	}

	// Fallback to local portfolio config projects if GitHub API is rate-limited
	const fallbackData: ProjectType[] = PORTFOLIO_CONFIG.projects.map((p, idx) => ({
		fork: false,
		full_name: `Hassan-Ali-17/${p.id}`,
		id: idx + 1001,
		html_url: p.githubUrl,
		name: p.title,
		updated_at: new Date().toISOString(),
		size: 2048,
	}));

	return {
		props: { data: fallbackData },
		revalidate: 60,
	};
}

export default Projects;

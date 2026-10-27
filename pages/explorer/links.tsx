import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Icons from '../../components/modules/Icons/Icons';
import FileExplorer from '../../components/windows/FileExplorer/FileExplorer';
import { PORTFOLIO_CONFIG } from '../../config/portfolio.config';
import styles from '../../styles/utils/List.module.css';

function Links() {
	const owner = PORTFOLIO_CONFIG.owner;

	const content = () => {
		return (
			<div className={styles.listItemContainer}>
				<Link
					href={owner.socials.github}
					className={styles.listItem}
					target="_blank"
					rel="noopener noreferrer"
				>
					<div className={styles.listItemName}>
						<Image
							src="/svg/github.svg"
							unoptimized
							alt="icon"
							width={18}
							height={18}
						/>
						<p>GitHub — {owner.handle}</p>
					</div>
					<p className={styles.listItemDateModified}>Earth-1610</p>
					<p className={styles.listItemType}>Web Link</p>
					<p className={styles.listItemSize}>1 KB</p>
				</Link>

				<Link
					href={owner.socials.linkedin}
					className={styles.listItem}
					target="_blank"
					rel="noopener noreferrer"
				>
					<div className={styles.listItemName}>
						<Image
							src="/icons/links/links.png"
							unoptimized
							alt="icon"
							width={18}
							height={18}
						/>
						<p>LinkedIn Profile</p>
					</div>
					<p className={styles.listItemDateModified}>Active</p>
					<p className={styles.listItemType}>Web Link</p>
					<p className={styles.listItemSize}>1 KB</p>
				</Link>

				<Link
					href={owner.socials.discord}
					className={styles.listItem}
					target="_blank"
					rel="noopener noreferrer"
				>
					<div className={styles.listItemName}>
						<Image
							src="/svg/discord.svg"
							unoptimized
							alt="icon"
							width={18}
							height={18}
						/>
						<p>Discord — {PORTFOLIO_CONFIG.discord.username}</p>
					</div>
					<p className={styles.listItemDateModified}>Connected</p>
					<p className={styles.listItemType}>Web Link</p>
					<p className={styles.listItemSize}>1 KB</p>
				</Link>

				<Link
					href={`mailto:${owner.email}`}
					className={styles.listItem}
				>
					<div className={styles.listItemName}>
						<Image
							src="/icons/notes/notes.png"
							unoptimized
							alt="icon"
							width={18}
							height={18}
						/>
						<p>Email — {owner.email}</p>
					</div>
					<p className={styles.listItemDateModified}>Verified</p>
					<p className={styles.listItemType}>Contact</p>
					<p className={styles.listItemSize}>1 KB</p>
				</Link>

				<Link
					href={PORTFOLIO_CONFIG.spotify.playlists[0].spotifyUrl}
					className={styles.listItem}
					target="_blank"
					rel="noopener noreferrer"
				>
					<div className={styles.listItemName}>
						<Image
							src="/svg/spotify.svg"
							unoptimized
							alt="icon"
							width={18}
							height={18}
						/>
						<p>Spotify Playlist</p>
					</div>
					<p className={styles.listItemDateModified}>Audio</p>
					<p className={styles.listItemType}>Web Link</p>
					<p className={styles.listItemSize}>1 KB</p>
				</Link>
			</div>
		);
	};

	return (
		<>
			<Head>
				<title>{owner.name} - Links</title>
				<link
					rel="canonical"
					href="https://webhead-portfolio.vercel.app/explorer/links"
				/>
				<meta
					name="description"
					content={`Connect with ${owner.name} across social and developer platforms.`}
				/>
			</Head>
			<div style={{ height: '100%' }}>
				<FileExplorer
					icon="folder"
					folder="Links"
					topNav={true}
					component={content()}
				/>
				<Icons />
			</div>
		</>
	);
}

export default Links;

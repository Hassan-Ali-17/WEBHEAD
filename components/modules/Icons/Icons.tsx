import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Selecto from 'react-selecto';
import styles from './Icons.module.css';

const ESCAPE_KEYS = ['46', 'Delete'];

function Icons() {
	const [deleted, setDeleted] = useState(false);

	const handleDelete = () => {
		const selected = document.querySelectorAll(`.selected`);
		selected.forEach((element) => {
			if (!element.classList.contains('recycleBin')) {
				element.classList.add(`${styles.deleted}`);
				element.classList.add('deleted');
				setDeleted(true);
			}
		});
	};

	useEffect(() => {
		const eventListener = (e: KeyboardEvent) => {
			if (ESCAPE_KEYS.includes(String(e.key))) {
				handleDelete();
			}
		};
		document.addEventListener('keydown', eventListener);
		return () => {
			document.removeEventListener('keydown', eventListener);
		};
	}, []);

	return (
		<>
			<Selecto
				dragContainer={'.elements'}
				selectableTargets={[`.selecto-area .selectoItem`]}
				hitRate={0}
				selectByClick={true}
				selectFromInside={true}
				ratio={0}
				onSelect={(e) => {
					e.added.forEach((el) => {
						el.classList.add(`${styles.selected}`);
						el.classList.add(`selected`);
					});
					e.removed.forEach((el) => {
						el.classList.remove(`${styles.selected}`);
						el.classList.remove(`selected`);
					});
				}}
			/>
			<div className={`elements ${styles.container}`}>
				<div className={`selecto-area ${styles.wrapper}`} id="selecto1">
					<Link
						href={'/about'}
						className={`${styles.item} selectoItem`}
						draggable={false}
					>
						<Image
							src="/images/webhead-avatar.jpg"
							alt="About Hassan"
							width={42}
							height={42}
							style={{ borderRadius: '50%', border: '1.5px solid #ff1a3c' }}
						/>
						<p>About Me</p>
					</Link>

					<Link
						href={'/projects'}
						className={`${styles.item} selectoItem`}
						draggable={false}
					>
						<Image
							src="/icons/folder/folder.png"
							alt="Projects"
							width={40}
							height={40}
						/>
						<p>Projects</p>
					</Link>

					<Link
						href={'/chat'}
						className={`${styles.item} selectoItem`}
						draggable={false}
					>
						<Image
							src="/icons/discord/discord.png"
							alt="Live Chat"
							width={40}
							height={40}
						/>
						<p>Dev Chat</p>
					</Link>


					<Link
						href={'/spotify'}
						className={`${styles.item} selectoItem`}
						draggable={false}
					>
						<Image
							src="/icons/spotify/spotify.png"
							alt="Spotify"
							width={40}
							height={40}
						/>
						<p>Music Room</p>
					</Link>

					<Link
						href={'/discord'}
						className={`${styles.item} selectoItem`}
						draggable={false}
					>
						<Image
							src="/icons/discord/discord.png"
							alt="Discord"
							width={40}
							height={40}
						/>
						<p>Discord</p>
					</Link>

					<Link
						href={'/resume'}
						className={`${styles.item} selectoItem`}
						draggable={false}
					>
						<Image
							src="/icons/notes/notes.png"
							alt="Resume"
							width={40}
							height={40}
						/>
						<p>Resume</p>
					</Link>

					<Link
						href={'/weather'}
						className={`${styles.item} selectoItem`}
						draggable={false}
					>
						<Image
							src="/icons/pictures/pictures.png"
							alt="Weather"
							width={40}
							height={40}
						/>
						<p>Weather</p>
					</Link>

					<Link
						href={'/settings'}
						className={`${styles.item} selectoItem`}
						draggable={false}
					>
						<Image
							src="/icons/shortcut/shortcut.png"
							alt="Settings"
							width={40}
							height={40}
						/>
						<p>Settings</p>
					</Link>

					<Link
						href={'/terminal'}
						className={`${styles.item} selectoItem`}
						draggable={false}
					>
						<Image
							src="/icons/terminal/terminal.png"
							alt="Terminal"
							width={40}
							height={40}
						/>
						<p>Terminal</p>
					</Link>

					<Link
						href={'/explorer/quick-access'}
						className={`${styles.item} selectoItem`}
						draggable={false}
					>
						<Image
							src="/icons/explorer/explorer.png"
							alt="Explorer"
							width={40}
							height={40}
						/>
						<p>File Explorer</p>
					</Link>

					<div className={`${styles.item} selectoItem recycleBin`}>
						{deleted ? (
							<Image
								src="/icons/trash/trash_full.png"
								alt="Recycle Bin Full"
								width={40}
								height={40}
							/>
						) : (
							<Image
								src="/icons/trash/trash_empty.png"
								alt="Recycle Bin Empty"
								width={40}
								height={40}
							/>
						)}
						<p>Recycle Bin</p>
					</div>
				</div>
			</div>
		</>
	);
}

export default Icons;

import { AnimatePresence, motion } from 'motion/react';
import { useRouter } from 'next/router';
import { MouseEvent, ReactNode, useContext, useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { RiArrowDropDownLine } from 'react-icons/ri';
import {
	VscChromeClose,
	VscChromeMaximize,
	VscChromeMinimize,
} from 'react-icons/vsc';
import { Rnd } from 'react-rnd';
import { Context } from '../../../context/ContextProvider';
import { handleWindowPriority } from '../WindowPriority/WindowPriority';
import styles from './DraggableWindow.module.css';

const handleStyles = {
	bottom: { cursor: 'ns-resize' },
	bottomLeft: { cursor: 'nesw-resize' },
	bottomRight: { cursor: 'nwse-resize' },
	left: { cursor: 'ew-resize' },
	right: { cursor: 'ew-resize' },
	top: { cursor: 'ns-resize' },
	topLeft: { cursor: 'nwse-resize' },
	topRight: { cursor: 'nesw-resize' },
};

const variants = {
	maximized: {
		borderRadius: '0px',
		scale: 1,
		opacity: 1,
	},
	minimized: {
		borderRadius: '12px',
		scale: 1,
		opacity: 1,
	},
	enterFromHistory: {
		scale: 1,
	},
	enterFresh: {
		scale: 0.95,
		opacity: 0,
	},
};

type Props = {
	children: ReactNode;
	windowName: string;
	topTitle: string;
	topIcon?: ReactNode;
	close?: (newMedia: null) => void;
};

function DraggableWindow({
	children,
	windowName,
	topTitle,
	topIcon,
	close,
}: Props) {
	const router = useRouter();

	const [isDragging, setIsDragging] = useState(false);
	const [isResizing, setIsResizing] = useState(false);
	const [loading, setLoading] = useState(true);
	const [isClosing, setIsClosing] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	const DraggableWindowContext = useContext(Context);

	const [maximized, setMaximized] = DraggableWindowContext.maximizedState;
	const [history, setHistory] = DraggableWindowContext.explorerHistoryState;
	const [position, setPosition] = DraggableWindowContext.positionState;
	const [windowPriority, setWindowPriority] =
		DraggableWindowContext.windowPriorityState;
	const [lastPos, setLastPos] = DraggableWindowContext.lastPosState;

	const handlePriority = async (e: MouseEvent, window: string) => {
		const newPriority = await handleWindowPriority({
			e,
			windowName: window,
			windowPriority,
		});

		if (newPriority) {
			setWindowPriority(newPriority);
		}
	};

	const handleMaximize = () => {
		setMaximized({ ...maximized, [windowName]: !maximized[windowName] });
	};

	const handleClose = () => {
		setIsClosing(true);
		setMaximized({ ...maximized, [windowName]: null });

		if (windowName === 'fileExplorer') setHistory([]);
		if (windowName === 'mediaPlayer') {
			setTimeout(() => {
				if (close) {
					setTimeout(() => {
						close(null);
					}, 500);
				}
			}, 500);
			const newPriority = Object.fromEntries(
				Object.entries(windowPriority).filter(
					([key]) => key !== 'mediaPlayer',
				),
			);
			return setWindowPriority(newPriority);
		}

		setTimeout(() => {
			router.push('/');
		}, 300);
	};

	const handleClick = (e: MouseEvent<HTMLDivElement>, window: string) => {
		handlePriority(e, window);
	};

	useEffect(() => {
		const checkMobile = () => {
			const mobile = window.innerWidth < 880;
			setIsMobile(mobile);
			return mobile;
		};

		const mobile = checkMobile();
		const width = window.innerWidth;
		const height = window.innerHeight;

		const targetW = mobile ? Math.max(320, width - 20) : Math.min(920, width - 40);
		const targetH = mobile ? Math.max(450, height - 70) : Math.min(600, height - 100);

		const currentPos = position[windowName] || { x: 0, y: 0, width: 880, height: 550 };

		if (currentPos.x === 0 && currentPos.y === 0 && maximized[windowName] === null) {
			const x = Math.max(10, Math.floor((width - targetW) / 2));
			const y = Math.max(10, Math.floor((height - 50 - targetH) / 2));

			setPosition({
				...position,
				[windowName]: {
					x,
					y,
					width: targetW,
					height: targetH,
				},
			});
		}
		setLoading(false);
	}, [maximized, position, setPosition, windowName]);

	useEffect(() => {
		if (loading) return;
		const currentPos = position[windowName] || { x: 0, y: 0, width: 880, height: 550 };

		if (maximized[windowName] === true) {
			setLastPos({
				x: currentPos.x,
				y: currentPos.y,
				width: currentPos.width,
				height: currentPos.height,
			});

			setPosition({
				...position,
				[windowName]: {
					x: 0,
					y: 0,
					width: window.innerWidth,
					height: window.innerHeight - 50,
				},
			});
		} else if (maximized[windowName] === false && lastPos.width > 0) {
			setPosition({
				...position,
				[windowName]: {
					x: lastPos.x,
					y: lastPos.y,
					width: lastPos.width,
					height: lastPos.height,
				},
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [maximized[windowName]]);

	const currentWinPos = position[windowName] || { x: 20, y: 20, width: 880, height: 550 };

	return (
		<AnimatePresence>
			{!isClosing && !loading && (
				<Rnd
					key={windowName}
					dragHandleClassName={'draggable'}
					cancel={'.not_draggable'}
					onDragStart={() => {
						if (maximized[windowName]) {
							setMaximized({ ...maximized, [windowName]: false });
						}
						setIsDragging(true);
					}}
					onDragStop={(e, d) => {
						setPosition({
							...position,
							[windowName]: {
								...currentWinPos,
								x: d.x,
								y: d.y,
							},
						});
						setIsDragging(false);
					}}
					onResize={(e, direction, ref, delta, pos) => {
						if (maximized[windowName]) {
							setMaximized({ ...maximized, [windowName]: false });
						}
						setIsResizing(true);
						setPosition({
							...position,
							[windowName]: {
								x: pos.x,
								y: pos.y,
								width: ref.offsetWidth,
								height: ref.offsetHeight,
							},
						});
					}}
					onResizeStop={() => {
						setIsResizing(false);
					}}
					size={{
						width: currentWinPos.width,
						height: currentWinPos.height,
					}}
					position={{
						x: currentWinPos.x,
						y: currentWinPos.y,
					}}
					minWidth={isMobile ? 320 : 420}
					minHeight={isMobile ? 380 : 400}
					className={`${
						isDragging || isResizing || loading
							? ''
							: styles.animatedWindow
					}`}
					style={
						isDragging || isResizing || loading
							? { zIndex: 997 }
							: {
									zIndex: windowPriority[windowName] || 10,
								}
					}
					resizeHandleStyles={handleStyles}
					disableDragging={isMobile && maximized[windowName] === true}
				>
					<motion.div
						onClick={(e) => handleClick(e, windowName)}
						className={`${styles.container} ${maximized[windowName] ? styles.isMaximized : ''}`}
						variants={variants}
						animate={
							maximized[windowName] ? 'maximized' : 'minimized'
						}
						initial={
							history.length > 1 && windowName === 'fileExplorer'
								? 'enterFromHistory'
								: 'enterFresh'
						}
						exit={{ scale: 0.9, opacity: 0 }}
						transition={{ duration: 0.18 }}
						style={
							windowName === 'terminal'
								? { backgroundColor: 'rgba(8, 10, 18, 0.95)' }
								: {}
						}
					>
						<div className={styles.main}>
							<nav className={styles.windowNav}>
								<section className={`${styles.top} draggable`}>
									{windowName === 'terminal' ? (
										<div className={styles.terminalContainer}>
											<div>
												<div className={styles.titleWithIcon}>
													{topIcon}
													<p>{topTitle}</p>
												</div>
												<VscChromeClose onClick={handleClose} className={styles.closeTabIcon} />
											</div>
											<div className={styles.manageButtons}>
												<AiOutlinePlus />
												<RiArrowDropDownLine />
											</div>
										</div>
									) : (
										<div className={styles.topContainer}>
											{topIcon}
											<p className={styles.topTitleText}>{topTitle}</p>
										</div>
									)}
									<div className={`${styles.iconContainer} not_draggable`}>
										<div className={styles.icon} onClick={() => setMaximized({ ...maximized, [windowName]: false })}>
											<VscChromeMinimize />
										</div>
										<div className={styles.icon} onClick={handleMaximize}>
											<VscChromeMaximize />
										</div>
										<div className={styles.iconClose} onClick={handleClose}>
											<VscChromeClose />
										</div>
									</div>
								</section>
							</nav>
							<div className={styles.windowBody}>{children}</div>
						</div>
					</motion.div>
				</Rnd>
			)}
		</AnimatePresence>
	);
}

export default DraggableWindow;

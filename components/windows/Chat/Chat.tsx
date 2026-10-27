import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineExclamationCircle, AiOutlineSend } from 'react-icons/ai';
import { BiRefresh } from 'react-icons/bi';
import { BsCheckCircle, BsShieldCheck } from 'react-icons/bs';
import { FaUserAstronaut } from 'react-icons/fa';
import DraggableWindow from '../../utils/DraggableWindow/DraggableWindow';
import {
	ChatMessage,
	fetchRecentMessages,
	isSupabaseConfigured,
	sendChatMessage,
	subscribeToNewMessages,
} from '../../../services/supabaseClient';
import styles from './Chat.module.css';

const SPIDER_AVATARS = [
	{ id: 'miles', name: 'Miles Morales', img: '/images/webhead-avatar.jpg' },
	{ id: 'gwen', name: 'Spider-Gwen', img: '/icons/discord/discord.png' },
	{ id: 'peter', name: 'Peter B. Parker', img: '/icons/notes/notes.png' },
	{ id: 'spiderman2099', name: 'Spider-Man 2099', img: '/icons/spider/spider.png' },
	{ id: 'noir', name: 'Spider-Noir', img: '/icons/terminal/terminal.png' },
];

export default function ChatWindow() {
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [newMessage, setNewMessage] = useState('');
	const [displayName, setDisplayName] = useState('');
	const [selectedAvatar, setSelectedAvatar] = useState('miles');
	const [hasJoined, setHasJoined] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [isSending, setIsSending] = useState(false);
	const [statusError, setStatusError] = useState<string | null>(null);
	const [isLiveBackend, setIsLiveBackend] = useState(false);
	const [reportedIds, setReportedIds] = useState<string[]>([]);
	const [onlinePresence, setOnlinePresence] = useState(3);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	// Load local storage visitor profile
	useEffect(() => {
		try {
			const savedName = localStorage.getItem('webhead_chat_name');
			const savedAvatar = localStorage.getItem('webhead_chat_avatar');
			if (savedName) {
				setDisplayName(savedName);
				setHasJoined(true);
			}
			if (savedAvatar) {
				setSelectedAvatar(savedAvatar);
			}
		} catch {
			// ignore
		}
	}, []);

	// Initialize messages & Realtime subscription
	useEffect(() => {
		const configured = isSupabaseConfigured();
		setIsLiveBackend(configured);

		if (!configured) {
			// Unconfigured / Demo mode
			setIsLoading(false);
			setMessages([
				{
					id: 'demo-1',
					created_at: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
					display_name: 'Hassan Ali Shah',
					avatar: 'miles',
					content: 'Welcome to the Spider-Verse Dev Terminal! Feel free to leave a transmission.',
				},
				{
					id: 'demo-2',
					created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
					display_name: 'Spider-Gwen',
					avatar: 'gwen',
					content: 'Love the cyberpunk desktop aesthetic! Webheads assemble. 🕸️',
				},
			]);
			return;
		}

		// Fetch live messages from Supabase
		fetchRecentMessages(50).then((res) => {
			setIsLoading(false);
			if (res.error) {
				setStatusError(`Supabase query notice: ${res.error}`);
			} else {
				setMessages(res.data);
			}
		});

		// Subscribe to real-time inserts
		const channel = subscribeToNewMessages((incoming) => {
			setMessages((prev) => {
				if (prev.some((m) => m.id === incoming.id)) return prev;
				return [...prev, incoming];
			});
		});

		return () => {
			if (channel) {
				channel.unsubscribe();
			}
		};
	}, []);

	// Auto-scroll to bottom of chat
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	const handleJoin = (e: React.FormEvent) => {
		e.preventDefault();
		const trimmed = displayName.trim();
		if (!trimmed) return;

		setDisplayName(trimmed);
		setHasJoined(true);
		try {
			localStorage.setItem('webhead_chat_name', trimmed);
			localStorage.setItem('webhead_chat_avatar', selectedAvatar);
		} catch {
			// ignore
		}
	};

	const handleSendMessage = async (e: React.FormEvent) => {
		e.preventDefault();
		const trimmed = newMessage.trim();
		if (!trimmed || isSending) return;

		setIsSending(true);
		setStatusError(null);

		if (isLiveBackend) {
			const res = await sendChatMessage({
				display_name: displayName,
				avatar: selectedAvatar,
				content: trimmed,
			});

			setIsSending(false);
			if (res.error) {
				setStatusError(res.error);
			} else if (res.data) {
				setNewMessage('');
			}
		} else {
			// Demo offline mode simulation
			setTimeout(() => {
				const mockMsg: ChatMessage = {
					id: `local-${Date.now()}`,
					created_at: new Date().toISOString(),
					display_name: displayName,
					avatar: selectedAvatar,
					content: trimmed,
				};
				setMessages((prev) => [...prev, mockMsg]);
				setNewMessage('');
				setIsSending(false);
			}, 200);
		}
	};

	const handleReportMessage = (msgId: string) => {
		if (reportedIds.includes(msgId)) return;
		setReportedIds((prev) => [...prev, msgId]);
		alert('Thank you. Message flagged for owner moderation.');
	};

	const formatTimestamp = (dateStr: string) => {
		try {
			const d = new Date(dateStr);
			return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
		} catch {
			return '';
		}
	};

	return (
		<DraggableWindow
			windowName="chat"
			topTitle="Spider-Verse Multi-Visitor Public Chat"
			topIcon={
				<Image
					src="/icons/discord/discord.png"
					width={18}
					height={18}
					alt="Chat"
				/>
			}
		>
			<div className={styles.container}>
				{/* Top Status Header */}
				<div className={styles.header}>
					<div className={styles.headerTitle}>
						<span className={styles.pulseDot} />
						<h3>Earth-1610 Live Frequency</h3>
						<span className={styles.presenceBadge}>
							{onlinePresence} Webheads Connected
						</span>
					</div>

					<div className={styles.backendStatus}>
						{isLiveBackend ? (
							<span className={styles.statusLive}>
								<BsCheckCircle /> Supabase Realtime Connected
							</span>
						) : (
							<span className={styles.statusMock} title="Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable live cloud database">
								<AiOutlineExclamationCircle /> Dev / Local Mode (Not Live)
							</span>
						)}
					</div>
				</div>

				{/* Join Screen vs Chat Screen */}
				{!hasJoined ? (
					<div className={styles.joinScreen}>
						<div className={styles.joinCard}>
							<div className={styles.spiderEmblem}>
								<Image
									src="/images/webhead-avatar.jpg"
									width={60}
									height={60}
									alt="Spider Emblem"
									style={{ borderRadius: '50%', border: '2px solid #ff1a3c' }}
								/>
							</div>
							<h2>Select Your Spider-Verse Alias</h2>
							<p>Choose your callsign and avatar to transmit messages across dimensions.</p>

							<form onSubmit={handleJoin} className={styles.joinForm}>
								<div className={styles.avatarSelection}>
									<label>Choose Avatar:</label>
									<div className={styles.avatarGrid}>
										{SPIDER_AVATARS.map((av) => (
											<button
												key={av.id}
												type="button"
												className={`${styles.avatarBtn} ${
													selectedAvatar === av.id ? styles.avatarBtnActive : ''
												}`}
												onClick={() => setSelectedAvatar(av.id)}
											>
												<Image
													src={av.img}
													alt={av.name}
													width={32}
													height={32}
													style={{ borderRadius: '50%' }}
												/>
												<span>{av.name}</span>
											</button>
										))}
									</div>
								</div>

								<div className={styles.nameInputGroup}>
									<input
										type="text"
										placeholder="Enter your display name (e.g. BrooklynSpider)"
										value={displayName}
										maxLength={30}
										required
										onChange={(e) => setDisplayName(e.target.value)}
									/>
									<button type="submit" className={styles.joinBtn}>
										Enter Frequency
									</button>
								</div>
							</form>
						</div>
					</div>
				) : (
					<div className={styles.chatBody}>
						{/* Setup banner if Supabase not configured */}
						{!isLiveBackend && (
							<div className={styles.setupNotice}>
								<div>
									<strong>⚠️ Cloud Database Setup:</strong> Add your Supabase credentials to <code>.env.local</code> to activate live global persistence. Database migration script is ready at <code>supabase/schema.sql</code>.
								</div>
							</div>
						)}

						{statusError && (
							<div className={styles.errorMessage}>
								{statusError}
							</div>
						)}

						{/* Messages Stream */}
						<div className={styles.messagesList}>
							{isLoading ? (
								<div className={styles.loadingState}>
									<BiRefresh className={styles.spinIcon} />
									<p>Tuning inter-dimensional antenna...</p>
								</div>
							) : messages.length === 0 ? (
								<div className={styles.emptyState}>
									<FaUserAstronaut className={styles.emptyIcon} />
									<p>No transmissions yet. Be the first to say what&apos;s up danger!</p>
								</div>
							) : (
								messages.map((msg) => {
									const isMe = msg.display_name === displayName;
									const isReported = reportedIds.includes(msg.id);
									const avatarObj =
										SPIDER_AVATARS.find((a) => a.id === msg.avatar) || SPIDER_AVATARS[0];

									return (
										<div
											key={msg.id}
											className={`${styles.messageItem} ${
												isMe ? styles.messageMine : styles.messageOther
											}`}
										>
											<div className={styles.msgAvatarWrapper}>
												<Image
													src={avatarObj.img}
													alt={msg.display_name}
													width={32}
													height={32}
													style={{ borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)' }}
												/>
											</div>
											<div className={styles.msgBubble}>
												<div className={styles.msgMeta}>
													<span className={styles.msgSender}>{msg.display_name}</span>
													<span className={styles.msgTime}>
														{formatTimestamp(msg.created_at)}
													</span>
													{!isMe && !isReported && (
														<button
															className={styles.reportBtn}
															onClick={() => handleReportMessage(msg.id)}
															title="Report message"
														>
															Flag
														</button>
													)}
													{isReported && (
														<span className={styles.reportedBadge}>Reported</span>
													)}
												</div>
												<div className={styles.msgContent}>{msg.content}</div>
											</div>
										</div>
									);
								})
							)}
							<div ref={messagesEndRef} />
						</div>

						{/* Message Input Form */}
						<form onSubmit={handleSendMessage} className={styles.chatFooter}>
							<div className={styles.userInfoPill}>
								<span>{displayName}</span>
							</div>
							<input
								type="text"
								placeholder="Transmit a webhead message (max 500 chars)..."
								value={newMessage}
								maxLength={500}
								onChange={(e) => setNewMessage(e.target.value)}
								disabled={isSending}
							/>
							<button
								type="submit"
								className={styles.sendBtn}
								disabled={!newMessage.trim() || isSending}
							>
								<AiOutlineSend />
							</button>
						</form>
					</div>
				)}
			</div>
		</DraggableWindow>
	);
}

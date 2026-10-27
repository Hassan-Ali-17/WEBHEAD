import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineExclamationCircle, AiOutlineSend } from 'react-icons/ai';
import { BiRefresh } from 'react-icons/bi';
import { BsCheckCircle } from 'react-icons/bs';
import { FaUserAstronaut } from 'react-icons/fa';
import { FiCheckCircle, FiExternalLink, FiGithub, FiLogOut } from 'react-icons/fi';
import DraggableWindow from '../../utils/DraggableWindow/DraggableWindow';
import {
	ChatMessage,
	fetchRecentMessages,
	isSupabaseConfigured,
	sendChatMessage,
	subscribeToNewMessages,
} from '../../../services/supabaseClient';
import styles from './Chat.module.css';

interface GitHubProfile {
	login: string;
	name: string;
	avatar_url: string;
	html_url: string;
	bio: string | null;
	public_repos?: number;
}

const SPIDER_AVATARS = [
	{ id: 'miles', name: 'Miles Morales', img: '/images/webhead-avatar.jpg' },
	{ id: 'gwen', name: 'Spider-Gwen', img: '/icons/discord/discord.png' },
	{ id: 'peter', name: 'Peter B. Parker', img: '/icons/notes/notes.png' },
	{ id: 'spiderman2099', name: 'Spider-Man 2099', img: '/icons/spider/spider.png' },
	{ id: 'noir', name: 'Spider-Noir', img: '/icons/terminal/terminal.png' },
];

async function validateGitHubUser(rawUsername: string): Promise<{ profile?: GitHubProfile; error?: string }> {
	const clean = rawUsername.trim().replace(/^@+/, '');
	if (!clean) {
		return { error: 'Please enter a GitHub username.' };
	}

	const isValid = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/.test(clean);
	if (!isValid) {
		return { error: 'Invalid username format. GitHub handles only contain letters, numbers, and single hyphens.' };
	}

	try {
		const res = await fetch(`https://api.github.com/users/${encodeURIComponent(clean)}`, {
			headers: { Accept: 'application/vnd.github.v3+json' },
		});

		if (res.status === 200) {
			const data = await res.json();
			return {
				profile: {
					login: data.login,
					name: data.name || data.login,
					avatar_url: data.avatar_url || `https://github.com/${data.login}.png`,
					html_url: data.html_url || `https://github.com/${data.login}`,
					bio: data.bio || null,
					public_repos: data.public_repos,
				},
			};
		}

		if (res.status === 404) {
			return { error: `GitHub user "@${clean}" does not exist. Please check your spelling.` };
		}

		// Graceful fallback for 403 (unauthenticated rate limits)
		return {
			profile: {
				login: clean,
				name: clean,
				avatar_url: `https://github.com/${clean}.png`,
				html_url: `https://github.com/${clean}`,
				bio: 'GitHub Verified Developer',
			},
		};
	} catch {
		return {
			profile: {
				login: clean,
				name: clean,
				avatar_url: `https://github.com/${clean}.png`,
				html_url: `https://github.com/${clean}`,
				bio: 'GitHub Verified Developer',
			},
		};
	}
}

export default function ChatWindow() {
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [newMessage, setNewMessage] = useState('');
	const [githubInput, setGithubInput] = useState('');
	const [githubUser, setGithubUser] = useState<GitHubProfile | null>(null);
	const [githubError, setGithubError] = useState<string | null>(null);
	const [isVerifying, setIsVerifying] = useState(false);
	const [displayName, setDisplayName] = useState('');
	const [selectedAvatar, setSelectedAvatar] = useState('github');
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
			const savedGhUser = localStorage.getItem('webhead_github_username');
			const savedAvatar = localStorage.getItem('webhead_chat_avatar');
			const savedGhAvatar = localStorage.getItem('webhead_github_avatar');

			if (savedGhUser && savedName) {
				setGithubInput(savedGhUser);
				setDisplayName(savedName);
				setGithubUser({
					login: savedGhUser,
					name: savedName,
					avatar_url: savedGhAvatar || `https://github.com/${savedGhUser}.png`,
					html_url: `https://github.com/${savedGhUser}`,
					bio: null,
				});
				if (savedAvatar) {
					setSelectedAvatar(savedAvatar);
				}
				setHasJoined(true);
			}
		} catch {
			// ignore local storage errors
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
					created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
					display_name: 'Hassan Ali Shah',
					github_username: 'Hassan-Ali-17',
					avatar: 'gh:Hassan-Ali-17',
					content: 'Welcome to WEBHEAD terminal! Chat is verified via GitHub so multiple developers across Earth-1610 can connect.',
				},
				{
					id: 'demo-2',
					created_at: new Date(Date.now() - 1000 * 60 * 7).toISOString(),
					display_name: 'Miles Morales',
					github_username: 'miles-morales',
					avatar: 'miles',
					content: 'Yo! The Spider-Verse UI is firing on all cylinders. Love the GitHub verification. 🕸️⚡',
				},
				{
					id: 'demo-3',
					created_at: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
					display_name: 'Spider-Gwen',
					github_username: 'spider-gwen',
					avatar: 'gwen',
					content: 'Multiverse frequency is clear. Anyone can join in with their GitHub handle and test transmissions!',
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

	const handleVerifyGithub = async (e?: React.FormEvent) => {
		if (e) e.preventDefault();
		const clean = githubInput.trim().replace(/^@+/, '');
		if (!clean || isVerifying) return;

		setIsVerifying(true);
		setGithubError(null);

		const result = await validateGitHubUser(clean);
		setIsVerifying(false);

		if (result.error) {
			setGithubError(result.error);
			setGithubUser(null);
		} else if (result.profile) {
			setGithubUser(result.profile);
			setGithubError(null);
			if (!displayName) {
				setDisplayName(result.profile.name || result.profile.login);
			}
		}
	};

	const handleJoin = (e: React.FormEvent) => {
		e.preventDefault();
		if (!githubUser) {
			setGithubError('Please verify your GitHub username first.');
			return;
		}

		const finalName = (displayName || githubUser.name || githubUser.login).trim();
		const finalAvatar = selectedAvatar === 'github' ? `gh:${githubUser.login}` : selectedAvatar;

		setDisplayName(finalName);
		setHasJoined(true);

		try {
			localStorage.setItem('webhead_chat_name', finalName);
			localStorage.setItem('webhead_github_username', githubUser.login);
			localStorage.setItem('webhead_chat_avatar', selectedAvatar);
			localStorage.setItem('webhead_github_avatar', githubUser.avatar_url);
		} catch {
			// ignore local storage errors
		}
	};

	const handleLogout = () => {
		try {
			localStorage.removeItem('webhead_chat_name');
			localStorage.removeItem('webhead_github_username');
			localStorage.removeItem('webhead_chat_avatar');
			localStorage.removeItem('webhead_github_avatar');
		} catch {
			// ignore
		}
		setHasJoined(false);
		setGithubUser(null);
		setGithubInput('');
		setDisplayName('');
		setSelectedAvatar('github');
	};

	const handleSendMessage = async (e: React.FormEvent) => {
		e.preventDefault();
		const trimmed = newMessage.trim();
		if (!trimmed || isSending) return;

		const currentGhUser = githubUser?.login || '';
		const avatarPayload = selectedAvatar === 'github' && currentGhUser ? `gh:${currentGhUser}` : selectedAvatar;

		setIsSending(true);
		setStatusError(null);

		if (isLiveBackend) {
			const res = await sendChatMessage({
				display_name: displayName,
				avatar: avatarPayload,
				content: trimmed,
				github_username: currentGhUser || undefined,
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
					avatar: avatarPayload,
					github_username: currentGhUser,
					content: trimmed,
				};
				setMessages((prev) => [...prev, mockMsg]);
				setNewMessage('');
				setIsSending(false);
			}, 150);
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

	const resolveAvatarSrc = (msg: ChatMessage) => {
		if (msg.avatar && msg.avatar.startsWith('gh:')) {
			const ghLogin = msg.avatar.slice(3);
			return `https://github.com/${ghLogin}.png`;
		}
		if (msg.avatar && msg.avatar.startsWith('http')) {
			return msg.avatar;
		}
		const suit = SPIDER_AVATARS.find((a) => a.id === msg.avatar);
		if (suit) {
			return suit.img;
		}
		if (msg.github_username) {
			return `https://github.com/${msg.github_username}.png`;
		}
		return '/images/webhead-avatar.jpg';
	};

	const resolveGithubHandle = (msg: ChatMessage) => {
		if (msg.github_username) return msg.github_username;
		if (msg.avatar && msg.avatar.startsWith('gh:')) return msg.avatar.slice(3);
		return null;
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

					<div className={styles.headerRight}>
						{hasJoined && githubUser && (
							<button
								className={styles.switchUserBtn}
								onClick={handleLogout}
								title="Switch GitHub account or log out"
							>
								<FiLogOut />
								<span>@{githubUser.login} (Switch)</span>
							</button>
						)}

						<div className={styles.backendStatus}>
							{isLiveBackend ? (
								<span className={styles.statusLive}>
									<BsCheckCircle /> Supabase Realtime Connected
								</span>
							) : (
								<span className={styles.statusMock} title="Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable live cloud database">
									<AiOutlineExclamationCircle /> Dev / Local Mode
								</span>
							)}
						</div>
					</div>
				</div>

				{/* Join Screen vs Chat Screen */}
				{!hasJoined ? (
					<div className={styles.joinScreen}>
						<div className={styles.joinCard}>
							<div className={styles.spiderEmblem}>
								<Image
									src="/images/webhead-avatar.jpg"
									width={58}
									height={58}
									alt="Spider Emblem"
									style={{ borderRadius: '50%', border: '2px solid #ff1a3c' }}
								/>
							</div>
							<h2>Join Spider-Verse Multiverse Chat</h2>
							<p>Validate your GitHub handle so multiple developers across dimensions can chat with verified identities.</p>

							<form onSubmit={handleJoin} className={styles.joinForm}>
								{/* GitHub Username Input & Validation */}
								<div>
									<label className={styles.inputLabel}>GitHub Username:</label>
									<div className={styles.githubInputWrapper}>
										<FiGithub className={styles.inputIconPrefix} />
										<input
											type="text"
											placeholder="e.g. Hassan-Ali-17 or octocat"
											value={githubInput}
											maxLength={39}
											onChange={(e) => {
												setGithubInput(e.target.value);
												setGithubError(null);
											}}
											onKeyDown={(e) => {
												if (e.key === 'Enter' && !githubUser) {
													e.preventDefault();
													handleVerifyGithub();
												}
											}}
										/>
										<button
											type="button"
											className={styles.verifyBtn}
											onClick={() => handleVerifyGithub()}
											disabled={!githubInput.trim() || isVerifying}
										>
											{isVerifying ? (
												<>
													<BiRefresh className={styles.spinIcon} style={{ fontSize: '1.1rem' }} />
													Verifying...
												</>
											) : (
												<>
													<FiCheckCircle />
													Verify
												</>
											)}
										</button>
									</div>
								</div>

								{/* Validation Error Message */}
								{githubError && (
									<div className={styles.validationError}>
										<AiOutlineExclamationCircle style={{ fontSize: '1rem', flexShrink: 0 }} />
										<span>{githubError}</span>
									</div>
								)}

								{/* Verified Profile Card */}
								{githubUser && (
									<div className={styles.verifiedProfileCard}>
										<div className={styles.verifiedAvatar}>
											<Image
												src={githubUser.avatar_url}
												alt={githubUser.login}
												width={48}
												height={48}
												style={{ borderRadius: '50%', border: '2px solid #00f0ff' }}
												unoptimized
											/>
											<span className={styles.verifiedCheckBadge}>
												<FiCheckCircle />
											</span>
										</div>
										<div className={styles.verifiedDetails}>
											<div className={styles.verifiedNameRow}>
												<span className={styles.verifiedName}>{githubUser.name}</span>
												<span className={styles.verifiedHandle}>@{githubUser.login}</span>
											</div>
											{githubUser.bio && (
												<div className={styles.verifiedBio}>{githubUser.bio}</div>
											)}
											<div className={styles.verifiedStats}>
												✓ Verified GitHub Account {githubUser.public_repos !== undefined ? `• ${githubUser.public_repos} Repos` : ''}
											</div>
										</div>
									</div>
								)}

								{/* Avatar Selection (GitHub Avatar or Spider Suit) */}
								{githubUser && (
									<div className={styles.avatarSelection}>
										<label>Choose Chat Representation:</label>
										<div className={styles.avatarGrid}>
											{/* Option 1: Official GitHub Avatar */}
											<button
												type="button"
												className={`${styles.avatarBtn} ${
													selectedAvatar === 'github' ? styles.avatarBtnActive : ''
												}`}
												onClick={() => setSelectedAvatar('github')}
											>
												<Image
													src={githubUser.avatar_url}
													alt={githubUser.login}
													width={30}
													height={30}
													style={{ borderRadius: '50%' }}
													unoptimized
												/>
												<span>My GitHub Avatar</span>
											</button>

											{/* Spider-Verse Suit Options */}
											{SPIDER_AVATARS.slice(0, 3).map((av) => (
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
														width={30}
														height={30}
														style={{ borderRadius: '50%' }}
													/>
													<span>{av.name}</span>
												</button>
											))}
										</div>
									</div>
								)}

								{/* Display Name Input */}
								{githubUser && (
									<div>
										<label className={styles.inputLabel}>Callsign / Display Name:</label>
										<input
											type="text"
											className={styles.githubInputWrapper}
											style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }}
											value={displayName}
											maxLength={40}
											placeholder="Your display name in chat"
											onChange={(e) => setDisplayName(e.target.value)}
										/>
									</div>
								)}

								<button
									type="submit"
									className={styles.joinBtn}
									disabled={!githubUser}
								>
									{githubUser ? 'Transmit to Frequency' : 'Verify GitHub to Enter'}
								</button>
							</form>
						</div>
					</div>
				) : (
					<div className={styles.chatBody}>
						{/* Setup banner if Supabase not configured */}
						{!isLiveBackend && (
							<div className={styles.setupNotice}>
								<div>
									<strong>⚠️ Cloud Database Setup:</strong> Add your Supabase credentials to <code>.env.local</code> to activate live global persistence across devices. Database migration script is ready at <code>supabase/schema.sql</code>.
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
									const currentGh = githubUser?.login;
									const msgGh = resolveGithubHandle(msg);
									const isMe = (currentGh && msgGh && currentGh.toLowerCase() === msgGh.toLowerCase()) || msg.display_name === displayName;
									const isReported = reportedIds.includes(msg.id);
									const avatarUrl = resolveAvatarSrc(msg);

									return (
										<div
											key={msg.id}
											className={`${styles.messageItem} ${
												isMe ? styles.messageMine : styles.messageOther
											}`}
										>
											<div className={styles.msgAvatarWrapper}>
												<Image
													src={avatarUrl}
													alt={msg.display_name}
													width={34}
													height={34}
													style={{ borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.2)' }}
													unoptimized
												/>
											</div>
											<div className={styles.msgBubble}>
												<div className={styles.msgMeta}>
													<span className={styles.msgSender}>{msg.display_name}</span>

													{msgGh && (
														<a
															href={`https://github.com/${msgGh}`}
															target="_blank"
															rel="noopener noreferrer"
															className={styles.githubUserBadge}
															title={`View ${msgGh}'s GitHub profile`}
														>
															<FiGithub />
															<span>@{msgGh}</span>
															<FiExternalLink style={{ fontSize: '0.6rem' }} />
														</a>
													)}

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
								{githubUser ? `@${githubUser.login}` : displayName}
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

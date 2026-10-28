import Image from 'next/image';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { BsCheckCircleFill } from 'react-icons/bs';
import { Context } from '../../../context/ContextProvider';
import {
	ChatMessage,
	fetchRecentMessages,
	isSupabaseConfigured,
	sendChatMessage,
	subscribeToNewMessages,
} from '../../../services/supabaseClient';
import styles from './DesktopChatWidget.module.css';

const DEMO_SEED_MESSAGES: ChatMessage[] = [
	{
		id: 'seed-1',
		created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
		display_name: 'Faraz0150',
		github_username: 'Faraz0150',
		avatar: 'https://github.com/Faraz0150.png',
		content: 'Hey hassan! best of luck to all developers in my connections http://github.com/Faraz0150',
	},
	{
		id: 'seed-2',
		created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
		display_name: 'shinobicoder789',
		github_username: 'shinobicoder789',
		avatar: 'https://github.com/shinobicoder789.png',
		content: 'yo',
	},
	{
		id: 'seed-3',
		created_at: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
		display_name: 'BladeX⚔️',
		github_username: 'Hassan-Ali-17',
		avatar: 'https://github.com/Hassan-Ali-17.png',
		content: 'welcome to the Spider-Verse dev workstation!',
	},
	{
		id: 'seed-4',
		created_at: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
		display_name: 'Hassan-Ali-17',
		github_username: 'Hassan-Ali-17',
		avatar: 'https://github.com/Hassan-Ali-17.png',
		content: 'damn! one of the best portfolios ever 🔥',
	},
];

export default function DesktopChatWidget() {
	const { authUserState } = useContext(Context);
	const [authUser, setAuthUser] = authUserState;

	const [isMounted, setIsMounted] = useState(false);
	const [messages, setMessages] = useState<ChatMessage[]>(DEMO_SEED_MESSAGES);
	const [inputText, setInputText] = useState('');
	const [verifyHandle, setVerifyHandle] = useState('');
	const [isSending, setIsSending] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		setIsMounted(true);
		const live = isSupabaseConfigured();


		// Load stored local messages or seed
		try {
			const saved = localStorage.getItem('webhead_desktop_messages');
			if (saved) {
				const parsed = JSON.parse(saved);
				if (Array.isArray(parsed) && parsed.length > 0) {
					setMessages(parsed);
				}
			}
		} catch {
			// ignore
		}

		if (live) {
			fetchRecentMessages(40).then((res) => {
				if (res.data && res.data.length > 0) {
					setMessages(res.data);
				}
			});

			const sub = subscribeToNewMessages((msg) => {
				setMessages((prev) => {
					if (prev.some((m) => m.id === msg.id)) return prev;
					const updated = [...prev, msg];
					try {
						localStorage.setItem('webhead_desktop_messages', JSON.stringify(updated.slice(-50)));
					} catch {
						// ignore
					}
					return updated;
				});
			});

			return () => {
				sub?.unsubscribe();
			};
		}

		// BroadcastChannel for cross-tab realtime messaging
		let channel: BroadcastChannel | null = null;
		try {
			channel = new BroadcastChannel('webhead_chat_sync');
			channel.onmessage = (event) => {
				if (event.data?.message) {
					const incoming = event.data.message as ChatMessage;
					setMessages((prev) => {
						if (prev.some((m) => m.id === incoming.id)) return prev;
						return [...prev, incoming];
					});
				}
			};
		} catch {
			// ignore
		}

		return () => {
			channel?.close();
		};
	}, []);

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const handleVerifyGithub = (e: React.FormEvent) => {
		e.preventDefault();
		const clean = verifyHandle.trim().replace(/^@+/, '');
		if (!clean) return;

		setAuthUser({
			login: clean,
			name: clean,
			avatarUrl: `https://github.com/${clean}.png`,
			bio: 'Verified Developer',
			isVerified: true,
		});
		setVerifyHandle('');
	};

	const handleSendMessage = async (e: React.FormEvent) => {
		e.preventDefault();
		const text = inputText.trim();
		if (!text || isSending) return;

		// Require GitHub verification
		if (!authUser || !authUser.login) {
			return;
		}

		setIsSending(true);

		const newMsg: ChatMessage = {
			id: `msg-${Date.now()}-${Math.random()}`,
			created_at: new Date().toISOString(),
			display_name: authUser.name || authUser.login,
			github_username: authUser.login,
			avatar: authUser.avatarUrl || `https://github.com/${authUser.login}.png`,
			content: text,
		};

		// Optimistic update
		setMessages((prev) => {
			const updated = [...prev, newMsg];
			try {
				localStorage.setItem('webhead_desktop_messages', JSON.stringify(updated.slice(-50)));
			} catch {
				// ignore
			}
			return updated;
		});
		setInputText('');

		// Broadcast cross-tab
		try {
			const channel = new BroadcastChannel('webhead_chat_sync');
			channel.postMessage({ message: newMsg });
			channel.close();
		} catch {
			// ignore
		}

		// Supabase remote sync
		if (isSupabaseConfigured()) {
			await sendChatMessage({
				display_name: newMsg.display_name,
				github_username: newMsg.github_username,
				avatar: newMsg.avatar,
				content: newMsg.content,
			});
		}

		setIsSending(false);
	};

	const formatTime = (iso: string) => {
		if (!isMounted) return '';
		try {
			const d = new Date(iso);
			return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
		} catch {
			return '';
		}
	};

	return (
		<div className={styles.chatContainer}>
			{/* Chat Header */}
			<div className={styles.chatHeader}>
				<div className={styles.headerTitleArea}>
					<span className={styles.liveDot} />
					<h3 className={styles.headerTitle}>portfolio chat</h3>
				</div>
				<span className={styles.verifiedBadge}>verified with every voice</span>
			</div>

			{/* Message Stream */}
			<div className={styles.messagesList}>
				{messages.map((msg) => {
					const ghHandle = msg.github_username || msg.display_name;
					const avatarSrc =
						msg.avatar && msg.avatar.startsWith('http')
							? msg.avatar
							: `https://github.com/${ghHandle}.png`;

					return (
						<div key={msg.id} className={styles.messageItem}>
							<Image
								src={avatarSrc}
								alt={ghHandle}
								width={32}
								height={32}
								className={styles.messageAvatar}
								unoptimized
								onError={(e) => {
									(e.target as HTMLImageElement).src = '/images/webhead-avatar.jpg';
								}}
							/>
							<div className={styles.messageContent}>
								<div className={styles.messageMeta}>
									<span className={styles.authorName}>{msg.display_name}</span>
									<span className={styles.messageTime} suppressHydrationWarning>
										{formatTime(msg.created_at)}
									</span>
								</div>
								<p className={styles.messageText}>{msg.content}</p>
							</div>
						</div>
					);
				})}

				<div ref={messagesEndRef} />
			</div>

			{/* GitHub Verification Gate or Chat Form */}
			{!authUser || !authUser.isVerified ? (
				<div className={styles.unverifiedPrompt}>
					<p>⚠️ Verify your GitHub username to join the conversation:</p>
					<form className={styles.verifyInputRow} onSubmit={handleVerifyGithub}>
						<input
							type="text"
							className={styles.verifyInput}
							placeholder="Enter GitHub handle (e.g. Hassan-Ali-17)"
							value={verifyHandle}
							onChange={(e) => setVerifyHandle(e.target.value)}
						/>
						<button type="submit" className={styles.verifyBtn}>
							Verify
						</button>
					</form>
				</div>
			) : (
				<form className={styles.chatInputForm} onSubmit={handleSendMessage}>
					<input
						type="text"
						className={styles.chatInput}
						placeholder={`Message as @${authUser.login}...`}
						value={inputText}
						onChange={(e) => setInputText(e.target.value)}
						maxLength={500}
					/>
					<button
						type="submit"
						className={styles.sendBtn}
						disabled={!inputText.trim() || isSending}
						title="Send Message"
					>
						<AiOutlineSend />
					</button>
				</form>
			)}
		</div>
	);
}

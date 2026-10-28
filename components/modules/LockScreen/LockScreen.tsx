import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { BiRightArrowAlt } from 'react-icons/bi';
import { BsCheckCircleFill, BsShieldLock } from 'react-icons/bs';
import { FiGithub } from 'react-icons/fi';
import { Context } from '../../../context/ContextProvider';
import type { AuthenticatedUser } from '../../../types';
import styles from './LockScreen.module.css';

interface LockScreenProps {
	onUnlock?: () => void;
}

export default function LockScreen({ onUnlock }: LockScreenProps) {
	const { settingsState, authUserState, lockedState } = useContext(Context);
	const [settings] = settingsState;
	const [authUser, setAuthUser] = authUserState;
	const [isLocked, setIsLocked] = lockedState;

	const [usernameInput, setUsernameInput] = useState('Hassan-Ali-17');
	const [avatarPreview, setAvatarPreview] = useState('https://github.com/Hassan-Ali-17.png');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	const [timeStr, setTimeStr] = useState('12:28');
	const [dateStr, setDateStr] = useState('Wednesday, 28 October');

	// Synchronize initial input with current auth user if present
	useEffect(() => {
		if (authUser?.login) {
			setUsernameInput(authUser.login);
			setAvatarPreview(authUser.avatarUrl || `https://github.com/${authUser.login}.png`);
		}
	}, [authUser]);

	// Live clock
	useEffect(() => {
		const updateClock = () => {
			const now = new Date();
			setTimeStr(
				now.toLocaleTimeString([], {
					hour: '2-digit',
					minute: '2-digit',
					hour12: settings.clockFormat === '12h',
				}),
			);
			setDateStr(
				now.toLocaleDateString([], {
					weekday: 'long',
					day: 'numeric',
					month: 'long',
				}),
			);
		};

		updateClock();
		const interval = setInterval(updateClock, 1000);
		return () => clearInterval(interval);
	}, [settings.clockFormat]);

	// Live debounced avatar update as user types
	useEffect(() => {
		const clean = usernameInput.trim().replace(/^@+/, '');
		if (!clean) {
			setAvatarPreview('/images/webhead-avatar.jpg');
			return;
		}

		const timer = setTimeout(() => {
			setAvatarPreview(`https://github.com/${clean}.png`);
		}, 300);

		return () => clearTimeout(timer);
	}, [usernameInput]);

	const handleSignIn = async (e?: React.FormEvent) => {
		if (e) e.preventDefault();
		const cleanUser = usernameInput.trim().replace(/^@+/, '');

		if (!cleanUser) {
			setErrorMsg('Please enter a GitHub username to sign in');
			return;
		}

		setIsSubmitting(true);
		setErrorMsg(null);

		try {
			// Query GitHub public profile API
			const res = await fetch(`https://api.github.com/users/${encodeURIComponent(cleanUser)}`, {
				headers: { Accept: 'application/vnd.github.v3+json' },
			});

			let verifiedUser: AuthenticatedUser;

			if (res.status === 200) {
				const data = await res.json();
				verifiedUser = {
					login: data.login,
					name: data.name || data.login,
					avatarUrl: data.avatar_url || `https://github.com/${data.login}.png`,
					bio: data.bio || 'Verified Spider-Verse Webhead Developer',
					isVerified: true,
				};
			} else {
				// Fallback verification for rate-limits or 404 (allow developer entry)
				verifiedUser = {
					login: cleanUser,
					name: cleanUser,
					avatarUrl: `https://github.com/${cleanUser}.png`,
					bio: 'Verified Developer',
					isVerified: true,
				};
			}

			setAuthUser(verifiedUser);
			setIsLocked(false);
			if (onUnlock) onUnlock();
		} catch {
			// Network error fallback
			const verifiedUser: AuthenticatedUser = {
				login: cleanUser,
				name: cleanUser,
				avatarUrl: `https://github.com/${cleanUser}.png`,
				bio: 'Webhead Developer',
				isVerified: true,
			};
			setAuthUser(verifiedUser);
			setIsLocked(false);
			if (onUnlock) onUnlock();
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div
			className={`${styles.lockScreenContainer} ${!isLocked ? styles.unlocked : ''}`}
			style={{
				backgroundImage: `url('${settings.wallpaper || '/images/spiderman-miles-shards.jpg'}')`,
			}}
		>
			<div className={styles.backdropOverlay} />

			<div className={styles.lockContent}>
				{/* Top Status Bar */}
				<div className={styles.topBar}>
					<div className={styles.locationInfo}>
						<span>🕷️ Earth-1610 // Tokyo, Japan</span>
					</div>

					<div className={styles.topClockArea}>
						<div className={styles.topTime}>{timeStr}</div>
						<div className={styles.topDate}>{dateStr}</div>
					</div>
				</div>

				{/* Center Authentication Card */}
				<div className={styles.authCenter}>
					<div className={styles.avatarWrapper}>
						<Image
							src={avatarPreview}
							alt={usernameInput || 'User Avatar'}
							width={130}
							height={130}
							className={styles.avatarImg}
							unoptimized
							onError={() => setAvatarPreview('/images/webhead-avatar.jpg')}
						/>
						<span className={styles.verifiedGlowBadge} title="GitHub Identity Ready">
							<BsCheckCircleFill size={12} color="#ffffff" />
						</span>
					</div>

					<h1 className={styles.usernameTitle}>
						{usernameInput.trim() ? usernameInput.trim().replace(/^@+/, '') : 'Spider-Webhead'}
					</h1>
					<p className={styles.githubProfileLabel}>Github profile</p>

					<form className={styles.inputForm} onSubmit={handleSignIn}>
						<input
							type="text"
							className={styles.loginInput}
							placeholder="GitHub username"
							value={usernameInput}
							onChange={(e) => setUsernameInput(e.target.value)}
							autoComplete="username"
							autoFocus
							spellCheck={false}
						/>
						<button
							type="submit"
							className={styles.submitBtn}
							disabled={isSubmitting}
							title="Sign In to WEBHEAD"
						>
							<BiRightArrowAlt />
						</button>
					</form>

					{errorMsg && <p className={styles.statusMsg}>{errorMsg}</p>}

					<div className={styles.quickLoginRow}>
						<button
							type="button"
							className={styles.quickBtn}
							onClick={() => {
								setUsernameInput('Hassan-Ali-17');
								setTimeout(() => handleSignIn(), 50);
							}}
						>
							Sign In as Hassan-Ali-17
						</button>
						<button
							type="button"
							className={styles.quickBtn}
							onClick={() => {
								setUsernameInput('spider-visitor');
								setTimeout(() => handleSignIn(), 50);
							}}
						>
							Guest Access
						</button>
					</div>
				</div>

				{/* Bottom Helper Hint */}
				<div className={styles.bottomArea}>
					<div className={styles.pressEnterHint}>
						<span>Press Enter to sign in</span>
					</div>
					<div className={styles.bottomBrand}>
						<span>WEBHEAD // Spider-Verse OS v2.0</span>
					</div>
				</div>
			</div>
		</div>
	);
}

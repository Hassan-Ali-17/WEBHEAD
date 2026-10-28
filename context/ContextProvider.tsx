import React, { createContext, useEffect, useState } from 'react';
import type { AuthenticatedUser, DesktopSettings } from '../types';

type LastPos = {
	x: number;
	y: number;
	width: number;
	height: number;
};

type PositionState = {
	[key: string]: {
		x: number;
		y: number;
		width: number;
		height: number;
	};
};

type WindowPriority = {
	[key: string]: number;
};

type Maximized = {
	[key: string]: boolean | null;
};

type ContextType = {
	maximizedState: [Maximized, (newMaximized: Maximized) => void];
	explorerHistoryState: [string[], (newExplorerHistory: string[]) => void];
	indexState: [number, (newIndex: number) => void];
	wasManualState: [boolean, (newWasManual: boolean) => void];
	positionState: [PositionState, (newPosition: PositionState) => void];
	windowPriorityState: [
		WindowPriority,
		(newPriority: WindowPriority) => void,
	];
	lastPosState: [LastPos, (newLastPos: LastPos) => void];
	settingsState: [DesktopSettings, (newSettings: DesktopSettings) => void];
	activeAppMobileState: [string | null, (app: string | null) => void];
	authUserState: [AuthenticatedUser | null, (user: AuthenticatedUser | null) => void];
	lockedState: [boolean, (locked: boolean) => void];
};


const initialPriority: WindowPriority = {
	fileExplorer: 101,
	chat: 102,
	spotify: 103,
	discord: 104,
	weather: 105,
	settings: 106,
	about: 107,
	projects: 108,
	resume: 109,
	contact: 110,
	terminal: 111,
	notepad: 112,
	mediaPlayer: 113,
};

const initialMaximized: Maximized = {
	fileExplorer: null,
	mediaPlayer: null,
	notepad: null,
	terminal: null,
	chat: null,
	spotify: null,
	discord: null,
	weather: null,
	settings: null,
	about: null,
	projects: null,
	resume: null,
	contact: null,
};

const createDefaultWindowPos = () => ({
	x: 0,
	y: 0,
	width: 880,
	height: 560,
});

const defaultWindowKeys = [
	'fileExplorer',
	'mediaPlayer',
	'notepad',
	'terminal',
	'chat',
	'spotify',
	'discord',
	'weather',
	'settings',
	'about',
	'projects',
	'resume',
	'contact',
];

const initialPosition: PositionState = defaultWindowKeys.reduce((acc, key) => {
	acc[key] = createDefaultWindowPos();
	return acc;
}, {} as PositionState);

const initialLastPos: LastPos = {
	x: 0,
	y: 0,
	width: 0,
	height: 0,
};

const defaultSettings: DesktopSettings = {
	wallpaper: '/images/spiderman-miles-shards.jpg',
	clockFormat: '12h',
	themeAccent: 'red',
	reducedMotion: false,
	soundEnabled: true,
};

const defaultAuthUser: AuthenticatedUser = {
	login: 'Hassan-Ali-17',
	name: 'Hassan Ali Shah',
	avatarUrl: 'https://github.com/Hassan-Ali-17.png',
	bio: 'Full-Stack Developer & Spider-Verse Webhead',
	isVerified: true,
};

const initialState: ContextType = {
	maximizedState: [initialMaximized, () => {}],
	explorerHistoryState: [[], () => {}],
	indexState: [0, () => {}],
	wasManualState: [false, () => {}],
	positionState: [initialPosition, () => {}],
	windowPriorityState: [initialPriority, () => {}],
	lastPosState: [initialLastPos, () => {}],
	settingsState: [defaultSettings, () => {}],
	activeAppMobileState: [null, () => {}],
	authUserState: [defaultAuthUser, () => {}],
	lockedState: [true, () => {}],
};

export const Context = createContext<ContextType>(initialState);

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [maximized, setMaximized] = useState<Maximized>(initialMaximized);
	const [explorerHistory, setExplorerHistory] = useState<string[]>([]);
	const [index, setIndex] = useState<number>(0);
	const [position, setPosition] = useState<PositionState>(initialPosition);
	const [wasManual, setWasManual] = useState<boolean>(false);
	const [windowPriority, setWindowPriority] =
		useState<WindowPriority>(initialPriority);
	const [lastPos, setLastPos] = useState<LastPos>(initialLastPos);
	const [settings, setSettings] = useState<DesktopSettings>(defaultSettings);
	const [activeAppMobile, setActiveAppMobile] = useState<string | null>(null);
	const [authUser, setAuthUser] = useState<AuthenticatedUser | null>(defaultAuthUser);
	const [isLocked, setIsLocked] = useState<boolean>(true);

	// Load persisted settings & auth from localStorage if available
	useEffect(() => {
		try {
			const saved = localStorage.getItem('webhead_settings');
			if (saved) {
				const parsed = JSON.parse(saved);
				setSettings((prev) => ({ ...prev, ...parsed }));
			}

			const savedAuth = localStorage.getItem('webhead_auth_user');
			if (savedAuth) {
				const parsedAuth = JSON.parse(savedAuth);
				setAuthUser(parsedAuth);
			}

			// Check if user explicitly unlocked previously
			const savedUnlocked = sessionStorage.getItem('webhead_session_unlocked');
			if (savedUnlocked === 'true') {
				setIsLocked(false);
			}
		} catch {
			// ignore local storage errors
		}
	}, []);

	const handleUpdateSettings = (newSettings: DesktopSettings) => {
		setSettings(newSettings);
		try {
			localStorage.setItem('webhead_settings', JSON.stringify(newSettings));
		} catch {
			// ignore storage errors
		}
	};

	const handleUpdateAuthUser = (user: AuthenticatedUser | null) => {
		setAuthUser(user);
		try {
			if (user) {
				localStorage.setItem('webhead_auth_user', JSON.stringify(user));
				localStorage.setItem('webhead_github_username', user.login);
				localStorage.setItem('webhead_chat_name', user.name);
				localStorage.setItem('webhead_github_avatar', user.avatarUrl);
			} else {
				localStorage.removeItem('webhead_auth_user');
			}
		} catch {
			// ignore storage errors
		}
	};

	const handleSetLocked = (locked: boolean) => {
		setIsLocked(locked);
		try {
			if (!locked) {
				sessionStorage.setItem('webhead_session_unlocked', 'true');
			} else {
				sessionStorage.removeItem('webhead_session_unlocked');
			}
		} catch {
			// ignore
		}
	};

	// Ensure any accessed window has a position entry
	const safeSetPosition = (newPosition: PositionState) => {
		setPosition(newPosition);
	};

	const safePosition = new Proxy(position, {
		get(target, prop: string) {
			if (!(prop in target)) {
				target[prop] = createDefaultWindowPos();
			}
			return target[prop];
		},
	});

	const appContext: ContextType = {
		maximizedState: [maximized, setMaximized],
		explorerHistoryState: [explorerHistory, setExplorerHistory],
		indexState: [index, setIndex],
		wasManualState: [wasManual, setWasManual],
		positionState: [safePosition, safeSetPosition],
		windowPriorityState: [windowPriority, setWindowPriority],
		lastPosState: [lastPos, setLastPos],
		settingsState: [settings, handleUpdateSettings],
		activeAppMobileState: [activeAppMobile, setActiveAppMobile],
		authUserState: [authUser, handleUpdateAuthUser],
		lockedState: [isLocked, handleSetLocked],
	};

	return <Context.Provider value={appContext}>{children}</Context.Provider>;
};

export default ContextProvider;

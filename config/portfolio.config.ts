export interface ProjectItem {
	id: string;
	title: string;
	description: string;
	technologies: string[];
	githubUrl: string;
	liveUrl?: string;
	stars?: number;
	featured?: boolean;
	category: 'Web App' | 'Realtime' | 'AI & Tooling' | 'Open Source';
	image?: string;
}

export interface PlaylistConfig {
	name: string;
	description: string;
	playlistId: string; // Spotify playlist ID
	embedUrl: string;
	spotifyUrl: string;
}

export const PORTFOLIO_CONFIG = {
	owner: {
		name: 'Hassan Ali Shah',
		handle: '@Hassan-Ali-17',
		title: 'Full-Stack Developer & Spider-Verse Webhead',
		tagline: 'With great code comes great responsibility.',
		bio: 'Full-stack software engineer crafting immersive interactive web apps, resilient real-time backend systems, and sleek reactive frontends. Traversing the multiverse of code from Next.js and React to Node.js, TypeScript, and distributed databases.',
		location: 'Earth-1610 // Global Remote',
		email: 'contact@hassanalishah.dev',
		socials: {
			github: 'https://github.com/Hassan-Ali-17',
			linkedin: 'https://linkedin.com/in/hassan-ali-shah',
			discord: 'https://discord.com/users/hassanali',
			twitter: 'https://x.com/hassan_ali_dev',
		},
		skills: {
			frontend: ['React 19', 'Next.js 16', 'TypeScript', 'TailwindCSS / Vanilla CSS', 'Motion / Framer', 'WebSockets / Realtime'],
			backend: ['Node.js', 'PostgreSQL', 'Supabase', 'Python', 'REST & GraphQL APIs', 'Docker'],
			tools: ['Git & GitHub', 'Vercel', 'Figma', 'Linux / Bash', 'Turbopack', 'VS Code'],
			spiderverse: ['Wall-Crawling Code', 'Web-Slinging APIs', 'Spidey Sense Debugging', 'Multiverse Syncing'],
		},
		resumeUrl: '/resume.pdf',
	},

	projects: [
		{
			id: 'webhead-os',
			title: 'WEBHEAD — Spider-Verse Desktop OS',
			description: 'Interactive desktop portfolio inspired by Windows 11 and Miles Morales Spider-Verse aesthetic, featuring Supabase Realtime multi-user chat, Spotify music player, live weather, interactive calendar, and draggable windows.',
			technologies: ['Next.js 16', 'React 19', 'TypeScript', 'Supabase Realtime', 'Motion', 'CSS Modules'],
			githubUrl: 'https://github.com/Hassan-Ali-17/WEBHEAD',
			liveUrl: 'https://webhead-portfolio.vercel.app',
			stars: 42,
			featured: true,
			category: 'Web App',
		},
		{
			id: 'realtime-sync',
			title: 'Spider-Sync Realtime Collaborative Engine',
			description: 'Low-latency collaborative presence and state sync service powered by PostgreSQL Change Data Capture and WebSockets with optimistic UI updates.',
			technologies: ['Node.js', 'PostgreSQL', 'Supabase', 'WebSockets', 'TypeScript'],
			githubUrl: 'https://github.com/Hassan-Ali-17/spider-sync-engine',
			stars: 28,
			featured: true,
			category: 'Realtime',
		},
		{
			id: 'ai-code-copilot',
			title: 'Multiverse Code Navigator',
			description: 'Developer workspace agent orchestrating automated code audits, intelligent AST refactoring, and multi-file dependency graph analysis.',
			technologies: ['TypeScript', 'Python', 'OpenAI API', 'Next.js', 'TailwindCSS'],
			githubUrl: 'https://github.com/Hassan-Ali-17/multiverse-code-nav',
			stars: 35,
			featured: true,
			category: 'AI & Tooling',
		},
		{
			id: 'cyber-terminal',
			title: 'Spider-Verse Interactive Terminal',
			description: 'CLI emulator directly inside the browser with custom shell commands, filesystem navigation, secret multiverse easter eggs, and animated ASCII art.',
			technologies: ['React', 'TypeScript', 'Bash Emulator', 'CSS Modules'],
			githubUrl: 'https://github.com/Hassan-Ali-17/cyber-terminal',
			stars: 19,
			featured: false,
			category: 'Open Source',
		},
	] as ProjectItem[],

	spotify: {
		username: 'Hassanaalipnd',
		userProfileUrl: 'https://open.spotify.com/user/Hassanaalipnd',
		defaultPlaylistId: '37i9dQZF1DX1qNS1A130RF',
		playlists: [
			{
				name: 'Into the Spider-Verse OST',
				description: 'Official Soundtrack — Sunflower, What\'s Up Danger, Way Up',
				playlistId: '37i9dQZF1DX1qNS1A130RF',
				embedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX1qNS1A130RF?utm_source=generator&theme=0',
				spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX1qNS1A130RF',
			},
			{
				name: 'Across the Spider-Verse (Metro Boomin)',
				description: 'Metro Boomin Presents: Across the Spider-Verse Soundtrack',
				playlistId: '37i9dQZF1DWZo5FvVq0v5D',
				embedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DWZo5FvVq0v5D?utm_source=generator&theme=0',
				spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DWZo5FvVq0v5D',
			},
			{
				name: 'Hassan\'s Spotify Profile',
				description: 'Listen directly on @Hassanaalipnd Spotify account',
				playlistId: '37i9dQZF1DXdLEN7aqioXM',
				embedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DXdLEN7aqioXM?utm_source=generator&theme=0',
				spotifyUrl: 'https://open.spotify.com/user/Hassanaalipnd',
			},
			{
				name: 'Cyberpunk Lo-Fi Web Beats',
				description: 'Midnight coding vibes, chill synthwave, and chill beats',
				playlistId: '37i9dQZF1DXdLEN7aqioXM',
				embedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DXdLEN7aqioXM?utm_source=generator&theme=0',
				spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DXdLEN7aqioXM',
			},
		] as PlaylistConfig[],
	},

	discord: {
		displayName: 'BladeX⚔️',
		username: 'hassan02485',
		pronouns: 'He/him',
		statusBubble: 'What are you currently obsessed with?',
		bioLines: [
			'🎮 Gamer by passion',
			'💀 No mercy in ranked',
			'⚡ BladeX.exe running',
		],
		memberSince: '5 Jan 2024',
		connections: {
			github: 'Hassan-Ali-17',
			spotify: 'Hassanaalipnd',
		},
		avatarUrl: '/images/discord-profile.png',
		profileUrl: 'https://discord.com/users/hassan02485',
		serverName: 'Spider-Verse Dev Den',
		serverInviteUrl: 'https://discord.gg/spiderverse-dev',
		widgetId: '',
	},


	weather: {
		defaultCity: 'Brooklyn, NY',
		defaultLatitude: 40.6782,
		defaultLongitude: -73.9442,
	},

	supabase: {
		url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
		anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
	},
};

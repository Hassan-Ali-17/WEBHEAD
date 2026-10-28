import { FEATURED_PROJECTS_CATALOGUE } from './projectsCatalogue';

export interface ProjectItem {
	id: string;
	title: string;
	description: string;
	technologies: string[];
	githubUrl: string;
	liveUrl?: string;
	stars?: number;
	featured?: boolean;
	category: string;
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

	projects: FEATURED_PROJECTS_CATALOGUE.map((p) => ({
		id: p.id,
		title: p.name,
		description: p.summary,
		technologies: p.technologies,
		githubUrl: p.repositoryUrl,
		liveUrl: p.liveDemoUrl,
		featured: true,
		category: p.category,
		image: p.icon,
	})) as ProjectItem[],

	spotify: {
		username: 'Hassanaalipnd',
		userProfileUrl: 'https://open.spotify.com/user/Hassanaalipnd',
		defaultPlaylistId: '2ZBuoBQDfhL4qTbHRuh8GW',
		playlists: [
			{
				name: 'Hassan\'s Official Playlist',
				description: 'Curated Webhead tracks by @Hassanaalipnd',
				playlistId: '2ZBuoBQDfhL4qTbHRuh8GW',
				embedUrl: 'https://open.spotify.com/embed/playlist/2ZBuoBQDfhL4qTbHRuh8GW?utm_source=generator&theme=0',
				spotifyUrl: 'https://open.spotify.com/playlist/2ZBuoBQDfhL4qTbHRuh8GW',
			},
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
				playlistId: 'profile',
				embedUrl: 'https://open.spotify.com/embed/playlist/2ZBuoBQDfhL4qTbHRuh8GW?utm_source=generator&theme=0',
				spotifyUrl: 'https://open.spotify.com/user/Hassanaalipnd',
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
		avatarUrl: '/images/discord-avatar-og.png',
		profileUrl: 'https://discord.com/users/hassan02485',
		serverName: 'Spider-Verse Dev Den',
		serverInviteUrl: 'https://discord.gg/spiderverse-dev',
		widgetId: '',
	},



	weather: {
		defaultCity: 'Lahore, Pakistan',
		defaultLatitude: 31.5204,
		defaultLongitude: 74.3587,
		timeZone: 'Asia/Karachi',
	},


	supabase: {
		url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
		anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
	},
};

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
		title: 'Full Stack Developer | Software Engineer | Agentic AI Engineer',
		tagline: 'Building scalable systems and autonomous agentic AI across dimensions.',
		bio: 'Ambitious Full Stack Developer and Agentic AI Engineer with a strong foundation in Data Structures, Algorithms, and scalable system design. Experienced in building production-ready web applications and implementing machine learning models from scratch. Passionate about Generative AI and autonomous systems, with hands-on industry experience as an AI Engineer at startups. Internationally recognized innovator — represented Pakistan at the global stage in Act in Space 2026, organized by CNES (French Space Agency) and the European Space Agency (ESA). Proven leader with the ability to drive teams, solve complex problems, and rapidly adapt to emerging technologies.',
		location: 'Lahore, Pakistan',
		phone: '+92 325 4331778',
		email: 'hassanaalipnd@gmail.com',
		socials: {
			github: 'https://github.com/Hassan-Ali-17',
			linkedin: 'https://linkedin.com/in/hassan-ali-shah',
			discord: 'https://discord.com/users/hassan02485',
			twitter: 'https://x.com/hassan_ali_dev',
			portfolio: 'https://hassan-ali-17.github.io',
		},
		skills: {
			languages: ['C++', 'Python', 'JavaScript', 'Dart', 'Swift', 'SQL'],
			frontend: ['React.js', 'Next.js 16', 'JavaScript', 'Responsive UI Design', 'Motion / Framer', 'WebSockets / Realtime'],
			backend: ['Node.js', 'Express.js', 'REST APIs', 'JWT Authentication', 'MERN Stack'],
			databases: ['MongoDB', 'PostgreSQL', 'AWS', 'Supabase', 'Docker'],
			mobile: ['Flutter', 'Dart', 'Swift'],
			aiml: ['Generative AI', 'Agentic AI Systems', 'PyTorch', 'NumPy', 'Pandas', 'Data Preprocessing', 'Model Evaluation'],
			coreCS: ['Data Structures & Algorithms', 'Object-Oriented Programming', 'System Design', 'Dynamic Memory Management'],
			tools: ['Git & GitHub', 'AWS', 'Vercel', 'Linux / Bash', 'VS Code', 'Turbopack'],
			spiderverse: ['Wall-Crawling Code', 'Web-Slinging APIs', 'Spidey Sense Debugging', 'Multiverse Syncing'],
		},
		experience: [
			{
				role: 'ML/AI Engineering Intern',
				company: 'CAASIAC',
				period: '2024 – 2025',
				summary: 'Contributed to end-to-end machine learning workflows at an AI-driven startup, gaining hands-on experience in a fast-paced production environment.',
				highlights: [
					'Designed and optimized data preprocessing pipelines, improving model input quality and reducing training time.',
					'Developed and evaluated multiple ML models to support AI-driven problem-solving across business use cases.',
					'Collaborated with senior engineers on agentic AI research and implementation strategies for autonomous systems.',
					'Gained practical exposure to Generative AI tools and workflows in a real-world product environment.',
				],
			},
			{
				role: 'AI/ML Intern',
				company: 'NeuroFive',
				period: '2026 · 6 Weeks',
				summary: 'Completed an intensive 6-week internship focused on applied artificial intelligence and machine learning.',
				highlights: [
					'Worked on AI/ML tasks spanning data preparation, model development, and evaluation.',
					'Applied machine learning concepts to practical, real-world problem statements in a team setting.',
					'Strengthened hands-on skills in Python-based ML tooling and AI workflows.',
				],
			},
		],
		education: [
			{
				degree: 'BS Computer Science',
				institution: 'Information Technology University (ITU), Lahore',
				period: '2024 – 2028',
				details: 'CGPA: 3.02 / 4.0',
			},
			{
				degree: 'FSc Pre-Engineering',
				institution: 'Punjab Group of Colleges, Lahore',
				period: '2022 – 2024',
				details: 'Percentage: 87%',
			},
			{
				degree: 'Matric (Science)',
				institution: 'Lahore Grammar School',
				period: '2020 – 2022',
				details: 'Percentage: 92%',
			},
		],
		achievements: [
			{
				title: 'National Winner — Act in Space 2026',
				description: 'Secured 1st place at the national level in Act in Space 2026, a prestigious space innovation challenge.',
			},
			{
				title: 'International Representative — Act in Space 2026 (France)',
				description: 'Selected to represent Pakistan at the international finals, organized by CNES (Centre National d\'Études Spatiales) and the European Space Agency (ESA) — one of the few Pakistanis to compete at this global platform.',
			},
			{
				title: 'Team Lead — NASA Space Apps Challenge',
				description: 'Led a team in the world\'s largest global hackathon organized by NASA, directing technical strategy and project delivery under a tight international competition timeline.',
			},
			{
				title: 'Participant — Code Rush Hackathon',
				description: 'Competed in a high-intensity coding competition, applying problem-solving and algorithmic skills under pressure.',
			},
		],
		coreStrengths: [
			'Strong analytical and problem-solving skills with a track record of competitive achievement.',
			'Ability to build robust systems from first principles — hardware-level to cloud-deployed applications.',
			'Proven leadership in high-pressure, international-level hackathon environments.',
			'Fast learner who thrives at the intersection of cutting-edge AI research and practical engineering.',
			'Deep grasp of core Computer Science fundamentals: algorithms, memory management, and system architecture.',
		],
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

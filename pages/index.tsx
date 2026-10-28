import Head from 'next/head';
import Icons from '../components/modules/Icons/Icons';
import LockScreen from '../components/modules/LockScreen/LockScreen';
import DesktopClockWeather from '../components/modules/DesktopWidgets/DesktopClockWeather';
import DesktopChatWidget from '../components/modules/DesktopWidgets/DesktopChatWidget';
import { PORTFOLIO_CONFIG } from '../config/portfolio.config';

export default function Home() {
	const owner = PORTFOLIO_CONFIG.owner;

	return (
		<>
			<Head>
				<title>{owner.name} — WEBHEAD | Spider-Verse Developer Portfolio</title>
				<link rel="canonical" href="https://webhead-portfolio.vercel.app" />

				{/* Metadata & SEO */}
				<meta
					name="description"
					content={`${owner.name} (${owner.handle}) — ${owner.title}. Interactive Spider-Verse developer desktop workstation featuring real-time public chat, Spotify music player, live weather, and dynamic projects.`}
				/>
				<meta name="keywords" content="Hassan Ali Shah, Spider-Verse, Developer Portfolio, Webhead, Next.js 16, React 19, Supabase Realtime, TypeScript, Full-Stack" />
				<meta name="author" content={owner.name} />
				<meta name="theme-color" content="#ff1a3c" />

				{/* OpenGraph */}
				<meta property="og:title" content={`${owner.name} — WEBHEAD Spider-Verse Portfolio`} />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://webhead-portfolio.vercel.app" />
				<meta
					property="og:description"
					content={`Step into ${owner.name}'s Spider-Verse workstation. Real-time chat, Spotify room, interactive terminal, and showcase.`}
				/>
				<meta property="og:image" content="/images/spiderman-miles-shards.jpg" />

				{/* Twitter */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={`${owner.name} — WEBHEAD Portfolio`} />
				<meta name="twitter:description" content={owner.tagline} />
				<meta name="twitter:image" content="/images/spiderman-miles-shards.jpg" />
			</Head>

			{/* Windows 11 Authentication Lock Screen */}
			<LockScreen />

			{/* Desktop Workstation */}
			<div style={{ position: 'relative', height: '100%', width: '100%', overflow: 'hidden' }}>
				{/* Desktop Shortcuts (Left Column) */}
				<Icons />

				{/* Top-Right Time & Weather Widgets */}
				<DesktopClockWeather />

				{/* Right-Side Realtime Verified Portfolio Chat Panel */}
				<DesktopChatWidget />
			</div>
		</>
	);
}



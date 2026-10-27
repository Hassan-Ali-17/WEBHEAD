import Head from 'next/head';
import Icons from '../components/modules/Icons/Icons';
import ChatWindow from '../components/windows/Chat/Chat';
import { PORTFOLIO_CONFIG } from '../config/portfolio.config';

export default function ChatPage() {
	return (
		<>
			<Head>
				<title>{PORTFOLIO_CONFIG.owner.name} — Spider-Verse Real-Time Chat</title>
				<meta
					name="description"
					content="Connect to the Spider-Verse inter-dimensional public chat with live messaging powered by Supabase."
				/>
				<meta property="og:title" content="WEBHEAD Public Chat" />
				<meta
					property="og:description"
					content="Connect to the Spider-Verse inter-dimensional public chat with live messaging powered by Supabase."
				/>
			</Head>
			<div style={{ height: '100%' }}>
				<ChatWindow />
				<Icons />
			</div>
		</>
	);
}

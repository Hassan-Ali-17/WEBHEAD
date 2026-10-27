import Head from 'next/head';
import Icons from '../components/modules/Icons/Icons';
import SettingsWindow from '../components/windows/Settings/SettingsWindow';
import { PORTFOLIO_CONFIG } from '../config/portfolio.config';

export default function SettingsPage() {
	return (
		<>
			<Head>
				<title>{PORTFOLIO_CONFIG.owner.name} — Desktop Settings</title>
				<meta
					name="description"
					content="Customize your Spider-Verse desktop experience, wallpaper, theme accent, and formats."
				/>
				<meta property="og:title" content="WEBHEAD Settings" />
				<meta
					property="og:description"
					content="Customize your Spider-Verse desktop experience, wallpaper, theme accent, and formats."
				/>
			</Head>
			<div style={{ height: '100%' }}>
				<SettingsWindow />
				<Icons />
			</div>
		</>
	);
}

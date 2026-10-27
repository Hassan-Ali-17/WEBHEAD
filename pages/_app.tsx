import { GoogleAnalytics } from '@next/third-parties/google';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from '../components/layouts/Layout/Layout';
import ContextProvider from '../context/ContextProvider';
import '../styles/globals.css';

const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();

	// FileExplorer reads prevPath to decide whether a window is already open.
	useEffect(() => {
		const storage = globalThis?.sessionStorage;
		if (!storage) return;
		storage.setItem('prevPath', globalThis.location.pathname);
	}, [router.asPath]);

	return (
		<ContextProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
			{GA_ID && <GoogleAnalytics gaId={GA_ID} />}
		</ContextProvider>
	);
}

export default MyApp;

import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				{/* Fonts */}
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600&display=swap"
					rel="stylesheet"
				/>

				{/* Favicons */}
				<link rel="icon" type="image/x-icon" href="/favicon.ico" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
				<link rel="apple-touch-icon" href="/apple-touch-icon.png" />

				{/* SEO & Open Graph meta tags */}
				<meta name="theme-color" content="#ff1a3c" />
				<meta charSet="utf-8" />
				<meta name="language" content="english" />

				<meta name="author" content="Hassan Ali Shah" />
				<meta name="designer" content="Hassan Ali Shah" />
				<meta name="publisher" content="Hassan Ali Shah" />

				<meta
					name="keywords"
					content="Hassan Ali Shah, Full Stack Developer, Agentic AI Engineer, Spider-Verse, Webhead, Portfolio"
				/>

				<meta name="robots" content="index, follow" />
				<meta name="subject" content="Portfolio" />

				{/* Global OpenGraph tags */}
				<meta
					property="og:site_name"
					content="Hassan Ali Shah — WEBHEAD"
				/>
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://webhead-portfolio.vercel.app" />
				<meta
					property="og:image"
					content="/images/webhead-hood.png"
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}

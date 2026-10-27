import React, { useContext } from 'react';
import { Context } from '../../../context/ContextProvider';
import Footer from '../../modules/Footer/Footer';
import styles from './Layout.module.css';

function Layout({ children }: { children: React.ReactNode }) {
	const { settingsState } = useContext(Context);
	const [settings] = settingsState;

	return (
		<div className={styles.desktopWrapper}>
			<div
				className={`${styles.container} layout`}
				style={{
					backgroundImage: `radial-gradient(circle at 50% 50%, rgba(7, 9, 16, 0.4) 0%, rgba(7, 9, 16, 0.75) 100%), url('${settings.wallpaper}')`,
				}}
			>
				<div className={styles.halftoneOverlay} />
				<div className={styles.contentLayer}>{children}</div>
			</div>
			<Footer />
		</div>
	);
}

export default Layout;

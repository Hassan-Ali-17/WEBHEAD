import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { PORTFOLIO_CONFIG } from '../../../config/portfolio.config';
import type { HistoryType } from '../../../types';
import DraggableWindow from '../../utils/DraggableWindow/DraggableWindow';
import styles from './Terminal.module.css';

function Terminal() {
	const router = useRouter();
	const [history, setHistory] = useState<HistoryType[]>([
		{
			input: 'init-spider-shell',
			response: `🕷️ Spider-Verse OS Kernel v2.4 // Earth-1610 Terminal<br/>Logged in as: ${PORTFOLIO_CONFIG.owner.name}<br/>Type "help" to list available commands.`,
		},
	]);

	const executeCommand = useCallback(
		(input: string) => {
			const trimmed = input.trim();
			const command = trimmed.split(' ')[0].toLowerCase();

			switch (command) {
				case 'help':
					setHistory((prev) => [
						...prev,
						{
							input: trimmed,
							response: `Available Spider-Shell commands:<br/>
• whoami       : Display developer identity & multiverse coordinates<br/>
• bio          : Read ${PORTFOLIO_CONFIG.owner.name}'s biography<br/>
• skills       : Show frontend, backend, and cloud competencies<br/>
• projects     : List featured projects & open source repos<br/>
• chat         : Launch the real-time public chat window<br/>
• spotify      : Launch the Spider-Verse music room<br/>
• weather      : Launch the weather patrol station<br/>
• spider-sense : Run dimensional diagnostic scan<br/>
• ls           : List files in current directory<br/>
• clear        : Clear terminal output<br/>
• echo [text]  : Print text to screen`,
						},
					]);
					break;

				case 'whoami':
					setHistory((prev) => [
						...prev,
						{
							input: trimmed,
							response: `${PORTFOLIO_CONFIG.owner.name} (${PORTFOLIO_CONFIG.owner.handle})<br/>Role: ${PORTFOLIO_CONFIG.owner.title}<br/>Base: ${PORTFOLIO_CONFIG.owner.location}`,
						},
					]);
					break;

				case 'bio':
					setHistory((prev) => [
						...prev,
						{
							input: trimmed,
							response: PORTFOLIO_CONFIG.owner.bio,
						},
					]);
					break;

				case 'skills':
					setHistory((prev) => [
						...prev,
						{
							input: trimmed,
							response: `Frontend: ${PORTFOLIO_CONFIG.owner.skills.frontend.join(', ')}<br/>Backend: ${PORTFOLIO_CONFIG.owner.skills.backend.join(', ')}<br/>Cloud & Tools: ${PORTFOLIO_CONFIG.owner.skills.tools.join(', ')}`,
						},
					]);
					break;

				case 'projects':
					setHistory((prev) => [
						...prev,
						{
							input: trimmed,
							response: PORTFOLIO_CONFIG.projects
								.map((p) => `• ${p.title} (${p.category}) - ${p.githubUrl}`)
								.join('<br/>'),
						},
					]);
					break;

				case 'spider-sense':
					setHistory((prev) => [
						...prev,
						{
							input: trimmed,
							response: `⚡ SPIDEY SENSE REPORT: All dimensional frequencies stable. Zero packet drop on Supabase Realtime WebSocket. Ready to swing.`,
						},
					]);
					break;

				case 'chat':
					router.push('/chat');
					break;

				case 'spotify':
					router.push('/spotify');
					break;

				case 'weather':
					router.push('/weather');
					break;

				case 'clear':
					setHistory([]);
					break;

				case 'ls':
					setHistory((prev) => [
						...prev,
						{
							input: trimmed,
							response: `dossier.md    projects.json    spider_suit.cfg    web_shooters.py    resume.pdf`,
						},
					]);
					break;

				case 'echo':
					setHistory((prev) => [
						...prev,
						{
							input: trimmed,
							response: trimmed.replace(/^echo\s*/i, ''),
						},
					]);
					break;

				case '':
					setHistory((prev) => [
						...prev,
						{
							input: '',
							response: null,
						},
					]);
					break;

				default:
					setHistory((prev) => [
						...prev,
						{
							input: trimmed,
							response: `spider-shell: ${command}: command not found. Type "help" for assistance.`,
						},
					]);
					break;
			}
		},
		[router],
	);

	useEffect(() => {
		const handleFocus = () => {
			const terminal = document.getElementsByClassName(
				'prompt',
			)[0] as HTMLInputElement;
			terminal?.focus();
			terminal?.scrollIntoView();
		};

		const handleKeyUp = async (e: KeyboardEvent) => {
			if (e.key === 'Enter') {
				const target = e.target as HTMLInputElement;
				const input = target.value;
				executeCommand(input);
				target.value = '';
			}
		};

		document.addEventListener('keydown', handleFocus);
		document.addEventListener('click', handleFocus);
		document.addEventListener('keyup', handleKeyUp);

		return () => {
			document.removeEventListener('keydown', handleFocus);
			document.removeEventListener('keyup', handleKeyUp);
			document.removeEventListener('click', handleFocus);
		};
	}, [executeCommand]);

	return (
		<DraggableWindow
			windowName={'terminal'}
			topTitle={'SPIDER-BASH: ~/earth-1610/webhead'}
			topIcon={
				<Image
					src={`/icons/terminal/terminal.png`}
					alt="Terminal"
					width={20}
					height={20}
				/>
			}
		>
			<div className={`${styles.main} terminal`}>
				{history.map((item, index) => (
					<div
						key={`${item.input}${index}`}
						className={styles.historyItem}
					>
						<p className={styles.terminalTitle}>
							webhead@earth-1610 <span>SPIDER-SHELL</span> <span>~</span>
						</p>
						<p>$ {item.input}</p>
						{item.response?.split('<br/>')?.map((text, idx) => (
							<p key={idx} className={styles.terminalResponse} dangerouslySetInnerHTML={{ __html: text }} />
						))}
					</div>
				))}
				<div className={styles.historyItem}>
					<p className={styles.terminalTitle}>
						webhead@earth-1610 <span>SPIDER-SHELL</span> <span>~</span>
					</p>
					<div className={`${styles.promt}`}>
						<p>$</p>
						<input type="text" className="prompt" autoFocus />
					</div>
				</div>
			</div>
			<div className={styles.background} />
		</DraggableWindow>
	);
}

export default Terminal;

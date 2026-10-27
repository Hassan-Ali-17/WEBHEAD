import React, { useContext, useEffect, useRef, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { VscClose } from 'react-icons/vsc';
import { Context } from '../../../context/ContextProvider';
import styles from './CalendarFlyout.module.css';

interface Props {
	isOpen: boolean;
	onClose: () => void;
}

const MONTH_NAMES = [
	'January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December',
];

const DAYS_HEADER = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export default function CalendarFlyout({ isOpen, onClose }: Props) {
	const flyoutRef = useRef<HTMLDivElement>(null);
	const { settingsState } = useContext(Context);
	const [settings, setSettings] = settingsState;

	const today = new Date();
	const [viewDate, setViewDate] = useState(new Date());
	const [currentTime, setCurrentTime] = useState('');

	// Update live clock every second
	useEffect(() => {
		const updateTime = () => {
			const now = new Date();
			const is12Hour = settings.clockFormat === '12h';
			setCurrentTime(
				now.toLocaleTimeString(navigator.language, {
					hour: '2-digit',
					minute: '2-digit',
					second: '2-digit',
					hour12: is12Hour,
				}),
			);
		};
		updateTime();
		const timer = setInterval(updateTime, 1000);
		return () => clearInterval(timer);
	}, [settings.clockFormat]);

	// Outside click listener
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				isOpen &&
				flyoutRef.current &&
				!flyoutRef.current.contains(e.target as Node) &&
				!(e.target as HTMLElement).closest('.dateIconsTarget')
			) {
				onClose();
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	const currentYear = viewDate.getFullYear();
	const currentMonth = viewDate.getMonth();

	const handlePrevMonth = () => {
		setViewDate(new Date(currentYear, currentMonth - 1, 1));
	};

	const handleNextMonth = () => {
		setViewDate(new Date(currentYear, currentMonth + 1, 1));
	};

	const handleJumpToToday = () => {
		setViewDate(new Date());
	};

	const toggleClockFormat = () => {
		setSettings({
			...settings,
			clockFormat: settings.clockFormat === '12h' ? '24h' : '12h',
		});
	};

	// Calendar calculations
	const isLeapYear = (year: number) => {
		return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
	};

	const getDaysInMonth = (year: number, month: number) => {
		const daysPerMonth = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		return daysPerMonth[month];
	};

	const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
	const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth);

	const prevMonthDays = getDaysInMonth(currentYear, currentMonth === 0 ? 11 : currentMonth - 1);
	const calendarDays = [];

	// Leading days from previous month
	for (let i = firstDayIndex - 1; i >= 0; i--) {
		calendarDays.push({
			day: prevMonthDays - i,
			isCurrentMonth: false,
			isToday: false,
		});
	}

	// Days of current month
	for (let d = 1; d <= daysInCurrentMonth; d++) {
		const isToday =
			d === today.getDate() &&
			currentMonth === today.getMonth() &&
			currentYear === today.getFullYear();
		calendarDays.push({
			day: d,
			isCurrentMonth: true,
			isToday,
		});
	}

	// Trailing days from next month to complete 35 or 42 grid cells
	const totalCells = calendarDays.length > 35 ? 42 : 35;
	const remainingCells = totalCells - calendarDays.length;
	for (let d = 1; d <= remainingCells; d++) {
		calendarDays.push({
			day: d,
			isCurrentMonth: false,
			isToday: false,
		});
	}

	return (
		<div className={styles.container} ref={flyoutRef}>
			<div className={styles.header}>
				<div className={styles.clockSection}>
					<span className={styles.liveTime}>{currentTime}</span>
					<button
						className={styles.formatToggleBtn}
						onClick={toggleClockFormat}
						title="Toggle 12h/24h"
					>
						{settings.clockFormat.toUpperCase()}
					</button>
				</div>
				<div className={styles.todayDateText}>
					{today.toLocaleDateString(navigator.language, {
						weekday: 'long',
						month: 'long',
						day: 'numeric',
						year: 'numeric',
					})}
				</div>
				<button className={styles.closeBtn} onClick={onClose}>
					<VscClose />
				</button>
			</div>

			<div className={styles.calendarBody}>
				<div className={styles.navRow}>
					<div className={styles.monthLabel}>
						{MONTH_NAMES[currentMonth]} {currentYear}
					</div>
					<div className={styles.navButtons}>
						<button
							className={styles.navBtn}
							onClick={handlePrevMonth}
							aria-label="Previous Month"
						>
							<IoIosArrowBack />
						</button>
						<button
							className={styles.todayBtn}
							onClick={handleJumpToToday}
							title="Jump to Today"
						>
							Today
						</button>
						<button
							className={styles.navBtn}
							onClick={handleNextMonth}
							aria-label="Next Month"
						>
							<IoIosArrowForward />
						</button>
					</div>
				</div>

				<div className={styles.gridHeader}>
					{DAYS_HEADER.map((day) => (
						<div key={day} className={styles.dayHeaderCell}>
							{day}
						</div>
					))}
				</div>

				<div className={styles.gridDays}>
					{calendarDays.map((cell, idx) => (
						<div
							key={idx}
							className={`${styles.dayCell} ${
								cell.isCurrentMonth ? styles.currentMonthDay : styles.otherMonthDay
							} ${cell.isToday ? styles.todayCell : ''}`}
						>
							{cell.day}
						</div>
					))}
				</div>
			</div>

			<div className={styles.footerNote}>
				Earth-1610 Timezone Sync // Local Browser Time
			</div>
		</div>
	);
}

'use client';

import SettingIcon from '../icons/SettingIcon';
import useSidebarStore from '@/lib/store/useSidebarStore';
import css from './sidebar.module.css';
import { useRef, type MouseEvent } from 'react';

const SettingButton = () => {
	const { open, setOpenSettings, settings, setButtonRef } = useSidebarStore();
	const buttonRef = useRef<HTMLButtonElement>(null);
	const click = (e: MouseEvent<HTMLButtonElement>) => {
		setButtonRef(buttonRef!);
		if (buttonRef && buttonRef.current) {
			const rect = buttonRef.current.getBoundingClientRect();
			const leftMove = !open ? 45 : 125;
			const x = rect.left + leftMove;
			const y = rect.top - 42;
			setOpenSettings(settings.id !== '' ? { id: '', x: 0, y: 0 } : { id: 'SideBarSetting', x, y });
		}
	};

	return (
		<div className={css.sidebarSettingContainer}>
			<button
				ref={buttonRef}
				onClick={click}
				className={`pl-1 pr-3 h-9 w-full flex  cursor-pointer z-0 ${css.settingButton}`}>
				<div
					data-text={open ? 'Settings' : ''}
					className={`relative rounded-full pl-2 w-full h-full flex justify-start items-center hover:bg-notable-primary-175 active:bg-notable-primary-200 gap-x-4 after:content-attr after:flex`}>
					<SettingIcon />
				</div>
			</button>
			<span className={settings.id === '' && !open ? css.settingText : 'hidden'}>Settings</span>
		</div>
	);
};

export default SettingButton;

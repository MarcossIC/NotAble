'use client';

import useSidebarStore from '@/lib/store/useSidebarStore';
import CleanNotesButton from './CleanNotesButton';
import SettingButton from './SettingButton';
import css from './sidebar.module.css';
import SettingMenu from './SettingMenu/SettingMenu';

const Sidebar = () => {
	const { open, settings } = useSidebarStore();
	return (
		<div
			role='navigation'
			className={`relative bg-notable-primary-150 flex flex-shrink-0 flex-grow-0 basis-auto h-full w-16 transition-all duration-200  ${open && 'w-80 z-20'}`}>
			<aside
				className={`w-full h-full min-h-dvh  grid grid-rows-[min-content_1fr] grid-cols-1 contain-inline-size`}
				role='menubar'>
				<div className='w-full h-[calc(100cqh-6rem)]  mt-24  grid grid-rows-[min-content_1fr] grid-cols-1 text-notable-white'>
					<div className='pl-2 pb-3 flex justify-start items-center'>
						<CleanNotesButton />
					</div>
					<div className={css.sidebarSettingContainer}>
						<SettingButton />
						<span className={settings.id === '' && !open ? css.settingText : 'hidden'}>Settings</span>
					</div>
					<div className='w-full mt-8 invisible max-h-0 opacity-0 shadow-custom-toast'></div>
				</div>
				<SettingMenu />
			</aside>
		</div>
	);
};

export default Sidebar;

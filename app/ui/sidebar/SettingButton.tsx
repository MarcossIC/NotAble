'use client';

import SettingIcon from '../icons/SettingIcon';
import useSidebarStore from '@/lib/store/useSidebarStore';

const SettingButton = () => {
	const { open } = useSidebarStore();
	return (
		<button className='px-2 h-9 w-full flex  cursor-pointer z-0'>
			<div
				className={`rounded-full px-1 w-full h-full flex  items-center hover:bg-notable-primary-175 ${open ? 'justify-start pl-2' : 'justify-center'}`}>
				<SettingIcon />
			</div>
		</button>
	);
};

export default SettingButton;

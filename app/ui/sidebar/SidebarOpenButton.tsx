'use client';

import useSidebarStore from '@/lib/store/useSidebarStore';
import BarsIcon from '../icons/BarsIcon';

const SidebarOpenButton = () => {
	const { setOpen, open } = useSidebarStore();
	return (
		<button
			onClick={() => setOpen(!open)}
			className='fixed top-[.3rem] left-[.6rem] z-50 rounded-full bg-transparent hover:bg-notable-primary-175 active:bg-notable-primary-200 p-3'>
			<div className='w-full h-full'>
				<BarsIcon />
			</div>
		</button>
	);
};

export default SidebarOpenButton;

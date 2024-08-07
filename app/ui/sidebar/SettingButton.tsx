'use client';

import SettingIcon from '../icons/SettingIcon';

const SettingButton = () => {
	return (
		<button className='rounded-full h-9 w-full flex mx-auto cursor-pointer z-0'>
			<div className='w-full h-full flex justify-center items-center'>
				<SettingIcon />
			</div>
		</button>
	);
};

export default SettingButton;

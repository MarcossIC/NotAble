import CleanNotesButton from './CleanNotesButton';

const Sidebar = () => {
	return (
		<div className='relative bg-notable-primary-150 flex flex-shrink-0 flex-grow-0 basis-auto h-full w-16'>
			<aside className='w-full h-full min-h-dvh overflow-hidden grid grid-rows-[min-content_1fr] grid-cols-1'>
				<div className='w-full h-full mt-24 overflow-hidden grid grid-rows-[min-content_1fr] grid-cols-1 text-notable-white'>
					<div className='pl-1 pb-3 flex justify-center items-center'>
						<CleanNotesButton />
					</div>
					<div></div>
					<div className='w-full mt-6 invisible max-h-0 opacity-0'></div>
				</div>
			</aside>
		</div>
	);
};

export default Sidebar;

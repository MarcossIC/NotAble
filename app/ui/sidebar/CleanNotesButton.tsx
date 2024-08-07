import PlusIcon from '../icons/PlusIcon';

const CleanNotesButton = () => {
	return (
		<div className='pl-2 pb-3 flex justify-start items-center'>
			<button className='rounded-full bg-notable-primary-100 p-3 text-notable-white-o60'>
				<div className='w-full h-full'>
					<PlusIcon />
				</div>
			</button>
		</div>
	);
};

export default CleanNotesButton;

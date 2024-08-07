import PlusIcon from '../icons/PlusIcon';

const CleanNotesButton = () => {
	return (
		<button className='rounded-full bg-notable-primary-100 p-3 text-white/60'>
			<div className='w-full h-full'>
				<PlusIcon />
			</div>
		</button>
	);
};

export default CleanNotesButton;

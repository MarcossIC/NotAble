import BarsIcon from '../icons/BarsIcon';

const SidebarOpenButton = () => {
	return (
		<button className='fixed top-[.3rem] left-[.6rem] z-10 rounded-full bg-transparent active:bg-[#232222] hover:bg-notable-primary-100 p-3'>
			<div className='w-full h-full'>
				<BarsIcon />
			</div>
		</button>
	);
};

export default SidebarOpenButton;

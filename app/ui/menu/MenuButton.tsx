import type { FC, ReactNode } from 'react';

interface MenuButtonProps {
	onClick: () => void;
	children: ReactNode | string;
}

const MenuButton: FC<MenuButtonProps> = ({ onClick, children }) => {
	return (
		<button
			onClick={onClick}
			className='text-left px-3 py-1 w-full whitespace-nowrap opacity-95 hover:opacity-100 hover:bg-notable-primary-100 transition-all duration-500'>
			{children}
		</button>
	);
};

export default MenuButton;

import type { FC, ReactNode } from 'react';

interface MenuButtonProps {
	onClick: () => void;
	children: ReactNode | string;
	className?: string;
}

const MenuButton: FC<MenuButtonProps> = ({ onClick, className = '', children }) => {
	return (
		<button
			onClick={onClick}
			className={`text-left px-3 py-1 w-full whitespace-nowrap opacity-95 hover:opacity-100 hover:bg-notable-primary-175 active:bg-notable-primary-200 transition-all duration-500 ${className}`}>
			{children}
		</button>
	);
};

export default MenuButton;

import type { CSSProperties, ReactNode } from 'react';
import { forwardRef } from 'react';
import Show from '../core/Show';

interface MenuContainerProps {
	open: boolean;
	position: CSSProperties;
	children: ReactNode;
	className?: string;
}

const MenuContainer = forwardRef<HTMLDivElement, MenuContainerProps>(function MenuContainerForward(
	{ open, position, children, className = '' },
	ref
) {
	return (
		<div
			ref={ref}
			className='fixed z-50'
			style={position}>
			<div
				className={`outline-none bg-notable-primary-50 rounded-md flex flex-col transition-all duration-500 ${open ? 'w-[7.5rem] min-w-fit h-auto' : 'w-0 h-0'} ${className}`}>
				<Show when={open}>{children}</Show>
			</div>
		</div>
	);
});

export default MenuContainer;

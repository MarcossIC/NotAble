'use client';

import { useCallback, useEffect, type ReactNode } from 'react';
import Show from './Show';

interface ModalWrapperProps {
	open: boolean;
	children: ReactNode;
	onClose?: () => void;
	className?: string;
}

const ModalWrapper = ({ open, onClose, children, className = '' }: ModalWrapperProps) => {
	const handleClose = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				e.preventDefault();
				e.stopPropagation();
				onClose && onClose();
			}
		},
		[onClose]
	);
	useEffect(() => {
		window.addEventListener('keydown', handleClose);
		return () => window.removeEventListener('keydown', handleClose);
	}, []);

	return (
		<Show
			when={open}
			updateAnd={children}>
			<div
				onDoubleClick={onClose}
				className='fixed top-0 left-0 w-full h-dvh flex items-start justify-center z-50 bg-black/35 backdrop-blur-sm'>
				<article className={`relative min-w-[330px] bg-notable-primary-150 rounded-lg flex flex-col my-auto  overflow-hidden ${className}`}>
					{children}
				</article>
			</div>
		</Show>
	);
};

export default ModalWrapper;

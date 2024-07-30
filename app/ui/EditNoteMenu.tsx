'use client';

import useNoteStore from '@/lib/store/useNoteStore';
import Show from '@/app/ui/Show';
import { useCallback, useMemo, useRef, type CSSProperties } from 'react';
import useClickOutside from '@/lib/useClickOutside';

export default function EditNoteMenu() {
	const { openedNote, setOpenedNote, buttonRef } = useNoteStore();
	const open = useMemo(() => openedNote.id !== ' ' && Boolean(openedNote.id), [openedNote.id, openedNote.y]);
	const menuRef = useRef<HTMLDivElement>(null);
	const closeMenu = useCallback(() => {
		if (open) setOpenedNote({ id: '', x: 0, y: 0 });
	}, [open]);
	useClickOutside(menuRef, closeMenu, buttonRef!);
	const position: CSSProperties = { left: `${openedNote.x}px`, top: `${openedNote.y}px` };
	return (
		<div
			ref={menuRef}
			className={`fixed w-auto h-auto z-50`}
			style={position}>
			<div className={`outline-none shadow-sm bg-notable-primary-50 rounded-md flex flex-col ${open ? 'w-[7.5rem] min-w-fit h-auto' : 'w-0 h-0'}`}>
				<Show when={open}>
					<>
						<button className='text-left px-3 py-1 w-full whitespace-nowrap opacity-95 hover:opacity-100 hover:bg-notable-primary-100 transition-all duration-500'>
							Remove note
						</button>
						<button className='text-left px-3 py-1 w-full whitespace-nowrap opacity-95 hover:opacity-100 hover:bg-notable-primary-100 transition-all duration-500'>
							Copy note
						</button>
					</>
				</Show>
			</div>
		</div>
	);
}

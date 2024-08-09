import useNoteStore from '@/lib/store/useNoteStore';
import { useCallback, useMemo, useRef, type MouseEvent } from 'react';

interface SettingNoteButtonProp {
	id: string;
}

const SettingNoteButton = ({ id }: SettingNoteButtonProp) => {
	const { setOpenedNote, openedNote, setButtonRef } = useNoteStore();
	const open = useMemo(() => Boolean(openedNote.id) && id === openedNote.id, [openedNote.id, id]);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const click = useCallback(
		(e: MouseEvent<HTMLButtonElement>) => {
			setButtonRef(buttonRef);
			if (buttonRef.current) {
				const rect = buttonRef.current.getBoundingClientRect();
				const x = rect.left;
				const y = rect.bottom + 5;
				setOpenedNote(open ? { id: '', x: 0, y: 0 } : { id, x, y });
			}
		},
		[id, open, setButtonRef]
	);

	return (
		<button
			ref={buttonRef}
			onClick={click}
			className={`rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-300 active:bg-notable-primary-200 ${open && 'opacity-100 bg-notable-primary-175'}`}>
			<svg
				height='24px'
				viewBox='0 -960 960 960'
				width='24px'
				fill='currentColor'>
				<path d='M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z' />
			</svg>
		</button>
	);
};

export default SettingNoteButton;

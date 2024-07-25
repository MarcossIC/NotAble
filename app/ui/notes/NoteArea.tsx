import { useRef } from 'react';
import css from './notes.module.css';
import useAutoResizeTextarea from '@/lib/useAutoResizeTextarea';

interface NoteAreaProps {
	value: string;
}

export default function NoteArea({ value }: NoteAreaProps) {
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	useAutoResizeTextarea(textareaRef, value);

	return (
		<textarea
			ref={textareaRef}
			className={`${css.textareaNote}`}
			value={value}
			readOnly
		/>
	);
}

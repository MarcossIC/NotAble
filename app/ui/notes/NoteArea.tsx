import { useRef } from 'react';
import css from './notes.module.css';
import useAutoResizeTextarea from '@/lib/useAutoResizeTextarea';

interface NoteAreaProps {
	value: string;
	className?: string;
}

export default function NoteArea({ value, className = '' }: NoteAreaProps) {
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	useAutoResizeTextarea(textareaRef, value);

	return (
		<textarea
			ref={textareaRef}
			className={`${css.textareaNote} ${className}`}
			value={value}
			readOnly
		/>
	);
}

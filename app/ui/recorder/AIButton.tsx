import css from './recorder.module.css';
import useResumeStore from '@/lib/store/useResumePreferenceStore';
import useNoteStore from '@/lib/store/useNoteStore';
import { useMemo } from 'react';
import Authenticated from '../auth/Authenticated';

const AIButton = () => {
	const { setOpen, open, setResume } = useResumeStore();
	const { notes, notesCount } = useNoteStore();
	const handleClick = () => {
		setResume('');
		setOpen(true);
		fetch('/api/resume', { method: 'POST', body: JSON.stringify({ notes }) })
			.then((res) => res.json())
			.then((body) => {
				setResume(body.text);
			});
	};

	const isDisabled = useMemo(() => notesCount === 0 || open, [notesCount, open]);

	return (
		<Authenticated>
			<button
				className={css.aiButton}
				title='Generate IA Resume'
				aria-describedby='AI Button'
				onClick={handleClick}
				disabled={isDisabled}>
				<svg
					fill='currentColor'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='currentColor'
					className='size-6 '>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z'
					/>
				</svg>
			</button>
		</Authenticated>
	);
};

export default AIButton;

'use client';

import { useSession } from 'next-auth/react';
import NotesList from '@/app/ui/notes/NotesList';
import NoteLoader from '@/app/ui/notes/NoteLoader';
import css from './notes.module.css';
import Show from '@/app/ui/Show';
import useAudioStore from '@/lib/store/useAudioStore';
import { useCallback, useRef } from 'react';
import useGotoBottom from '@/lib/useGotoBottom';
import Authenticated from '../auth/Authenticated';
import NoteBeforeLogin from '../NoteBeforeLogin';
import useNoteStore from '@/lib/store/useNoteStore';
import useExecuteOneScroll from '@/lib/useExecuteOnScroll';

export default function NotesPad() {
	const { data: session } = useSession();
	const { loading } = useAudioStore();
	const { openedNote, setOpenedNote } = useNoteStore();
	const notesContainer = useRef<HTMLDivElement>(null);
	useGotoBottom(notesContainer);
	const handleScroll = useCallback(() => {
		if (openedNote.id) setOpenedNote({ id: '', x: 0, y: 0 });
	}, [openedNote.id]);
	useExecuteOneScroll(notesContainer, handleScroll);

	return (
		<Authenticated fallback={<NoteBeforeLogin />}>
			<div
				className={css.notesContainer}
				ref={notesContainer}>
				<NotesList
					profile={session?.user.image || ''}
					id={session?.user.id || ''}
				/>

				<Show when={loading}>
					<div className='w-full h-full'>
						<NoteLoader />
					</div>
				</Show>
			</div>
		</Authenticated>
	);
}

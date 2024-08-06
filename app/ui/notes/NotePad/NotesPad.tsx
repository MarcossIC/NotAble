'use client';

import useNotePad from './useNotePad';
import NotesList from '@/app/ui/notes/NotesList';
import NoteLoader from '@/app/ui/notes/NoteLoader';
import css from '../notes.module.css';
import Show from '@/app/ui/Show';
import Authenticated from '../../auth/Authenticated';
import NoteBeforeLogin from '../../NoteBeforeLogin';

export default function NotesPad() {
	const [notesContainer, loading, session] = useNotePad();
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

'use client';

import { useSession } from 'next-auth/react';
import NotesList from '@/app/ui/notes/NotesList';
import NoteLoader from '@/app/ui/notes/NoteLoader';
import css from './notes.module.css';
import Show from '@/app/ui/Show';
import useAudioStore from '@/lib/store/useAudioStore';
import { useRef } from 'react';
import useGotoBottom from '@/lib/useGotoBottom';
import Authenticated from '../auth/Authenticated';
import NoteBeforeLogin from '../NoteBeforeLogin';

export default function NotesPad() {
	const { data: session } = useSession();
	const { loading } = useAudioStore();
	const gotoContainer = useRef<HTMLDivElement>(null);
	useGotoBottom(gotoContainer);

	return (
		<Authenticated fallback={<NoteBeforeLogin />}>
			<div
				className={css.notesContainer}
				ref={gotoContainer}>
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

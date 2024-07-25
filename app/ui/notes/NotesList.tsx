import useAudioStore from '@/lib/store/useAudioStore';
import { useEffect, useState } from 'react';
import type { Note } from '@/app/models/notesTypes';
import Image from 'next/image';
import NoteArea from '@/app/ui/notes/NoteArea';

type NotesListProps = {
	id: string;
	profile: string;
};

const getNotes = async (id: string) =>
	fetch(`/api/notes`, { method: 'POST', priority: 'high', body: JSON.stringify({ id }) }).then((res) => res.json());

export default function NotesList({ id, profile }: NotesListProps) {
	const { textAudio, setLoading } = useAudioStore();
	const [notes, setNotes] = useState<Note[]>([]);
	useEffect(() => {
		getNotes(id)
			.then((res) => {
				setLoading(false);
				setNotes(res.notes);
			})
			.catch((err) => {
				console.error('CATCH: ', err);
				setNotes([]);
			});
	}, [id, textAudio]);

	return notes.map((note) => {
		return (
			<div
				className='mb-8 flex gap-x-2 justify-start items-start'
				key={note.id}>
				<Image
					src={profile}
					alt='User profile'
					width={32}
					height={32}
					className='size-8 rounded-full object-cover object-center'
				/>
				<div className='bg-notable-primary-150 pt-3 pb-5 pl-4 pr-5 rounded-xl flex flex-col gap-y-2 w-full h-auto'>
					<div className='text-nowrap whitespace-pre font-medium text-lg'>{note.title}</div>
					<NoteArea value={note.note} />
				</div>
			</div>
		);
	});
}

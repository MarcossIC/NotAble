import useAudioStore from '@/lib/useAudioStore';
import { useEffect, useState } from 'react';
import type { Note } from '../models/notesTypes';

type NotesListProps = {
	id: string;
	profile: string;
};

const getNotes = async (id: string) =>
	fetch(`/api/notes`, { method: 'POST', priority: 'high', body: JSON.stringify({ id }) }).then((res) => res.json());

export default function NotesList({ id, profile }: NotesListProps) {
	const { textAudio } = useAudioStore();
	const [notes, setNotes] = useState<Note[]>([]);
	useEffect(() => {
		getNotes(id)
			.then((res) => {
				console.log('notes: ', res?.notes);
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
				className='mb-4'
				key={note.id}>
				{note.note}
			</div>
		);
	});
}

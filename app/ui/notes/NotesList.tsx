import useAudioStore from '@/lib/store/useAudioStore';
import { useEffect } from 'react';
import useNoteStore from '@/lib/store/useNoteStore';
import NoteComponent from './NoteComponent';

type NotesListProps = {
	id: string;
	profile: string;
};

const getNotes = async function getNotes(id: string): Promise<any> {
	const response = await fetch(`/api/notes`, {
		method: 'GET',
		headers: {
			uuid: id,
		},
	});

	if (!response.ok) {
		throw new Error(`Error fetching notes: ${response.status}`);
	}

	return await response.json();
};

export default function NotesList({ id, profile }: NotesListProps) {
	const { textAudio, setLoading } = useAudioStore();
	const { notes, setNotes } = useNoteStore();
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

	return notes.map((note) => (
		<NoteComponent
			key={note.id}
			note={note}
			profile={profile}
		/>
	));
}

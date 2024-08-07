import type { NotesStore } from '@/app/models/storeTypes';
import type { ZustandSetter } from '@/app/models/zustandTypes';
import { create } from 'zustand';

const useNoteStore = create<NotesStore>()((set: ZustandSetter<NotesStore>, $get) => ({
	notes: [],
	notesCount: 0,
	openedNote: { id: '', x: 0, y: 0 },
	buttonRef: null,
	autoScrollDisable: false,
	setAutoScrollDisable: (updated) => set({ autoScrollDisable: updated }),
	getOpenNote: () => {
		const { openedNote, notes } = $get();
		const id = openedNote.id;
		return notes.filter((note) => note.id === id)[0].note || '';
	},
	setButtonRef: (updated) => set({ buttonRef: updated }),
	setOpenedNote: (updated) => set({ openedNote: updated }),
	setNotes: (updated) => set({ notes: updated, notesCount: updated.length }),
	removeItem: (itemId) => {
		const { notes } = $get();
		set({ notes: notes.filter((note) => note.id !== itemId) });
	},
}));

export default useNoteStore;

import type { NotesStore } from "@/app/models/storeTypes";
import type { ZustandSetter } from "@/app/models/zustandTypes";
import { create } from "zustand";

const useNoteStore = create<NotesStore>()((set: ZustandSetter<NotesStore>) => ({
	notes: [],
	notesCount: 0,
	setNotes: (updated) => set({ notes: updated, notesCount: updated.length }),
}));

export default useNoteStore;
import type { SetFunction } from "@/app/models/types";
import type { Note } from "@/app/models/notesTypes";

export enum Position {
    _CENTER=1,
    _RIGHT_SIDE=2,
    _LEFT_SIDE=3
}

export interface ResumePreferenceStore {
    open: boolean;
    resume: string;
    position: Position;
    setOpen: SetFunction<boolean>;
    setResume: SetFunction<string>;
    setPosition: SetFunction<Position>;
}

export interface NotesStore {
    notes: Note[];
    notesCount: number;
    setNotes: SetFunction<Note[]>;
}

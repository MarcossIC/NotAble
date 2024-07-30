import type { SetFunction } from '@/app/models/types';
import type { Note } from '@/app/models/notesTypes';
import type { RefObject } from 'react';

export enum Position {
	_CENTER = 1,
	_RIGHT_SIDE = 2,
	_LEFT_SIDE = 3,
}

export interface ResumePreferenceStore {
	open: boolean;
	resume: string;
	position: Position;
	setOpen: SetFunction<boolean>;
	setResume: SetFunction<string>;
	setPosition: SetFunction<Position>;
}

interface OpenNote {
	id: string;
	x: number;
	y: number;
}

export interface NotesStore {
	notes: Note[];
	notesCount: number;
	openedNote: OpenNote;
	buttonRef: RefObject<HTMLButtonElement> | null;
	setButtonRef: SetFunction<RefObject<HTMLButtonElement>>;
	setOpenedNote: SetFunction<OpenNote>;
	setNotes: SetFunction<Note[]>;
}

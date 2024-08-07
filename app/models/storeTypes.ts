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
	autoScrollDisable: boolean;
	getOpenNote: () => string;
	setAutoScrollDisable: SetFunction<boolean>;
	setButtonRef: SetFunction<RefObject<HTMLButtonElement>>;
	setOpenedNote: SetFunction<OpenNote>;
	setNotes: SetFunction<Note[]>;
	removeItem: SetFunction<string>;
}

export interface AudioStore {
	audio: Blob | null;
	audioType: string;
	textAudio: string;
	loading: boolean;

	setLoading: SetFunction<boolean>;
	setAudio: SetFunction<Blob | null>;
	setAudioType: SetFunction<string>;
	setTextAudio: SetFunction<string>;
}

export interface SidebarStore {
	open: boolean;
	setOpen: SetFunction<boolean>;
}

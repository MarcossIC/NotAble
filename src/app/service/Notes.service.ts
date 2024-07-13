import { Injectable, signal } from '@angular/core';
import { EMPTYNOTE, Note, NOTEKEYS } from '../models/note';

@Injectable({ providedIn: 'root' })
export class NotesService {
  private lastNote$ = signal<Note>(EMPTYNOTE);
  private notes$ = signal<Note[]>([]);

  constructor() {
    const lastStorage = localStorage.getItem(NOTEKEYS.LASTNOTEKEY);
    const base64Audio = localStorage.getItem(NOTEKEYS.LASTBASE64NOTEKEY);
    if (!!lastStorage && !!base64Audio) {
      const lastNoteParsed = JSON.parse(lastStorage);

      this.lastNote$.set({ ...lastNoteParsed, audio: base64Audio });
    }
  }

  public addNote(newNote: Note) {
    const notes = [...this.notes, newNote];
    this.notes$.set(notes);
  }
  public cleanNotes() {
    this.notes$.set([]);
  }
  public cleanLast() {
    this.lastNote = EMPTYNOTE;
  }

  public get notes() {
    return this.notes$.asReadonly()();
  }

  public get lastNote() {
    return this.lastNote$.asReadonly()();
  }

  public set lastNote(update: Note) {
    this.lastNote$.set(update);
    localStorage.setItem(NOTEKEYS.LASTNOTEKEY, JSON.stringify(update));
  }
}

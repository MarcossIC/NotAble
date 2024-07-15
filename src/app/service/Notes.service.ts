import { inject, Injectable, signal } from '@angular/core';
import { EMPTYNOTE, Note, NOTEKEYS } from '../models/note';
import { AudioTranscriberSpeechmatics } from '../lib/AudioTranscriberSpeechmatics.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AudioTranscriberGCP } from '../lib/AudioTranscriberGCP.service';
import { AudioTranscriberAssemblyai } from '../lib/AudioTranscriberAssemblyai.service';

@Injectable({ providedIn: 'root' })
export class NotesService {
  private audioTranscriber = inject(AudioTranscriberAssemblyai);
  private lastNote$ = signal<Note>(EMPTYNOTE);
  private notes$ = signal<Note[]>([]);

  constructor() {
    const lastStorage = localStorage.getItem(NOTEKEYS.LASTNOTEKEY);
    const base64Audio = localStorage.getItem(NOTEKEYS.LASTBASE64NOTEKEY);
    if (!!lastStorage && !!base64Audio) {
      const lastNoteParsed = JSON.parse(lastStorage);

      this.lastNote$.set({ ...lastNoteParsed, audio: base64Audio });
    }
    this.audioTranscriber.getLastTextTranscript
      .pipe(takeUntilDestroyed())
      .subscribe((transcript) => {
        console.log({ transcript });
        this.lastNote$.update((note: Note) => {
          note.text = transcript;
          return note;
        });
        this.addNote(this.lastNote);
      });
  }

  public addNote(newNote: Note) {
    this.notes$.update((notes) => {
      notes.push(newNote);
      return notes;
    });
  }

  public updateNote({ text }: Note, index: number) {
    this.notes$.update((notes) => {
      notes[index].text = text;
      return notes;
    });
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

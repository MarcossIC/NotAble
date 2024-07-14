import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordingNotes } from '../../service/RecordingNotes.service';
import { NotesService } from '../../service/Notes.service';
import { EMPTYNOTE } from '../../models/note';
import { text } from 'stream/consumers';

@Component({
  selector: 'home-page',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [CommonModule],
})
export class HomePageComponent {
  public recordingNotes = inject(RecordingNotes);
  public notesService = inject(NotesService);

  public startNote() {
    this.recordingNotes.startNote();
    this.notesService.cleanLast();
  }

  public saveNote() {
    this.recordingNotes.stopNote().then((audioUrl) => {
      const note = {
        ...EMPTYNOTE,
        audio: audioUrl,
        text: 'Load transcription...',
      };
      this.notesService.lastNote = note;
    });
  }

  public playLastNote(audioHtml: HTMLAudioElement) {
    const last = this.notesService.lastNote;
    this.recordingNotes.playNote(last.audio, audioHtml);
  }
}

export default HomePageComponent;

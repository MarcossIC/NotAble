import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordingNotes } from '../../service/RecordingNotes.service';
import { NotesService } from '../../service/Notes.service';

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
    console.log('Inicie la grabacion');
    this.recordingNotes.startNote();
    this.notesService.cleanLast();
  }

  public saveNote() {
    this.recordingNotes.stopNote().then((audioUrl) => {
      const note = { text: '', audio: audioUrl, tags: [] };
      this.notesService.lastNote = note;
      this.notesService.addNote(note);
    });
  }

  public playLastNote(audioHtml: HTMLAudioElement) {
    const last = this.notesService.lastNote;
    console.log({ last });
    this.recordingNotes.playNote(last.audio, audioHtml);
  }
}

export default HomePageComponent;

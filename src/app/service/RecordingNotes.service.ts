import { inject, Injectable } from '@angular/core';
import { AudioRecorderService } from '../lib/AudioRecorder.service';

@Injectable({ providedIn: 'root' })
export class RecordingNotes {
  private recorder = inject(AudioRecorderService);

  constructor() {}

  public isStartingRecordNote() {
    return this.recorder.isRecording();
  }

  public startNote() {
    this.recorder.startRecording();
  }

  public pauseNote() {
    this.recorder.pauseRecording();
  }

  public resumeNote() {
    this.recorder.resumeRecording();
  }

  public async stopNote() {
    return await this.recorder.stopRecording();
  }

  private blobToBase64() {}

  public playNote(audioUrl: string, audioElement: HTMLAudioElement) {
    if (!!audioUrl) {
      audioElement.src = audioUrl;
      audioElement.play();
    }
  }
}

import { inject, Injectable } from '@angular/core';
import { AudioRecorderService } from '../lib/AudioRecorder.service';
import { AudioTranscriberGCP } from '../lib/AudioTranscriberGCP.service';
import { AudioTranscriberAssemblyai } from '../lib/AudioTranscriberAssemblyai.service';

@Injectable({ providedIn: 'root' })
export class RecordingNotes {
  private recorder = inject(AudioRecorderService);
  private audioTranscriber = inject(AudioTranscriberAssemblyai);

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
    try {
      const audioBlob = await this.recorder.stopRecording();
      const audioUrl = URL.createObjectURL(audioBlob);
      this.audioTranscriber.transcriber(audioBlob);
      this.recorder.saveRecording(audioBlob);
      return audioUrl;
    } catch (error) {
      console.error('Error stopping note:', error);
      throw error;
    }
  }

  public playNote(audioUrl: string, audioElement: HTMLAudioElement) {
    if (!!audioUrl) {
      audioElement.src = audioUrl;
      audioElement.play();
    }
  }
}

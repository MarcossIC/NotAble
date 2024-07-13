import { Injectable } from '@angular/core';
import { NOTEKEYS } from '../models/note';

@Injectable({
  providedIn: 'root',
})
export class AudioRecorderService {
  private mediaRecorder: MediaRecorder;
  private audioChunks: Blob[];

  constructor() {
    this.audioChunks = [];
    this.mediaRecorder = new MediaRecorder(new MediaStream());
  }

  public isRecording() {
    return this.mediaRecorder && this.mediaRecorder.state === 'recording';
  }

  public async startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.mediaRecorder = new MediaRecorder(stream);

    this.mediaRecorder.ondataavailable = (event) => {
      this.audioChunks.push(event.data);
    };

    this.mediaRecorder.start();
  }

  public stopRecording() {
    return new Promise<string>((resolve, reject) => {
      if (this.mediaRecorder) {
        this.mediaRecorder.onstop = () => {
          const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(audioBlob);
          this.saveRecording(audioBlob);
          this.audioChunks = [];
          resolve(audioUrl);
        };

        this.mediaRecorder.stop();
      } else {
        reject('No recording in progress');
      }
    });
  }

  public pauseRecording() {
    if (this.isRecording()) {
      this.mediaRecorder.pause();
    }
  }

  public resumeRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state === 'paused') {
      this.mediaRecorder.resume();
    }
  }

  private saveRecording(blob: Blob) {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result as string;
      localStorage.setItem(NOTEKEYS.LASTBASE64NOTEKEY, base64data);
    };
  }
}

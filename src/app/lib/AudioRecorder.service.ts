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

  private getSupportedMimetype() {
    let mimeType = '';

    if (MediaRecorder.isTypeSupported('audio/flac')) {
      mimeType = 'audio/flac';
    } else if (MediaRecorder.isTypeSupported('audio/amr')) {
      mimeType = 'audio/amr';
    } else if (MediaRecorder.isTypeSupported('audio/aac')) {
      mimeType = 'audio/aac';
    } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
      mimeType = 'audio/mp4';
    } else if (MediaRecorder.isTypeSupported('audio/mpeg')) {
      mimeType = 'audio/mpeg';
    } else if (MediaRecorder.isTypeSupported('audio/mp3')) {
      mimeType = 'audio/mp3';
    } else if (MediaRecorder.isTypeSupported('audio/ogg')) {
      mimeType = 'audio/ogg';
    } else if (MediaRecorder.isTypeSupported('audio/wav')) {
      mimeType = 'audio/wav';
    } else if (MediaRecorder.isTypeSupported('audio/x-m4a')) {
      mimeType = 'audio/x-m4a';
    }
    return mimeType;
  }

  public async startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.mediaRecorder = new MediaRecorder(stream, {
      mimeType: this.getSupportedMimetype(),
    });

    this.mediaRecorder.ondataavailable = (event) => {
      this.audioChunks.push(event.data);
    };

    this.mediaRecorder.start();
  }

  public stopRecording() {
    return new Promise<Blob>((resolve, reject) => {
      if (this.mediaRecorder) {
        this.mediaRecorder.onstop = () => {
          const type = this.mediaRecorder!.mimeType;
          const audioBlob = new Blob(this.audioChunks, {
            type: type.includes(';') ? type.split(';')[0] : type,
          });
          this.audioChunks = [];
          resolve(audioBlob);
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

  public saveRecording(blob: Blob) {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result as string;
      localStorage.setItem(NOTEKEYS.LASTBASE64NOTEKEY, base64data);
    };
  }
}

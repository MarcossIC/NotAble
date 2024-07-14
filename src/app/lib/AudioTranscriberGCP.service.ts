import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AbstractAudioTranscriber } from './AbstractAudioTranscriber';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, take } from 'rxjs';
//import * as speech from '@google-cloud/speech';

@Injectable({ providedIn: 'root' })
export class AudioTranscriberGCP extends AbstractAudioTranscriber {
  private http = inject(HttpClient);
  //private client: speech.SpeechClient;

  constructor() {
    super(environment.GCP_API_KEY, environment.GCP_URL);
    //this.client = new speech.SpeechClient({ key: this.API_KEY });
  }
  private getEncoding(type: string) {
    const match = this.REGEX.exec(type);
    const ext = !!match ? match[1] : '';
    if (ext === 'webm' || ext === 'wav') {
      return 'WEBM_OPUS';
    } else if (ext === 'ogg') {
      return 'OGG_OPUS';
    } else if (ext === 'flac') {
      return 'FLAC';
    } else if (ext === 'mp3' || ext === 'mpeg') {
      return 'MP3';
    } else if (ext === 'amr') {
      return 'AMR';
    }

    return 'ENCODING_UNSPECIFIED';
  }

  private withFetch(audioBytes: string, encoding: string) {
    const URL = `${this.API_URL}speech:recognize?key=${this.API_KEY}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = {
      config: {
        encoding: encoding,
        audioChannelCount: 1,
        languageCode: 'es-ES',
      },
      audio: { content: audioBytes },
    };
    this.http
      .post(URL, JSON.stringify(body), {
        headers,
      })
      .pipe(
        take(1),
        catchError((err: any) => {
          console.error('Error creating transcription job:', err);
          console.error('Error response body:', err.error);
          throw err;
        })
      )
      .subscribe((response: any) => {
        const transcript = response.results[0].alternatives[0].transcript;
        console.log({ transcript });
        this.subject$.next(transcript);
      });
  }

  public override transcriber(blob: Blob): void {
    this.blobToBase64(blob).then((audioBytes) =>
      this.withFetch(audioBytes, this.getEncoding(blob.type))
    );
    /*
    this.client
        .recognize({
          config: {
            encoding: this.getEncoding(blob.type),
            audioChannelCount: 1,
            sampleRateHertz: 16000,
            languageCode: 'es-ES',
          },
          audio: { content: audioBytes },
        })
        .then((response: any) => {
          const transcript = response.results[0].alternatives.transcript;
          console.log({ alter: response.results[0] });
          console.log({ transcript });
          this.subject$.next(transcript);
        })
    */
  }

  private blobToBase64(blob: Blob): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          const base64String = reader.result.split(',')[1];
          resolve(base64String);
        } else {
          reject(new Error('Failed to read blob as string'));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  public override get getLastTextTranscript() {
    return this.subject$.asObservable();
  }
}

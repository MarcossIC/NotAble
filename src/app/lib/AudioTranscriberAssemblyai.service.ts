import { inject, Injectable } from '@angular/core';
import { AbstractAudioTranscriber } from './AbstractAudioTranscriber';
import { environment } from '../../environments/environment';
import { AssemblyAI } from 'assemblyai';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  filter,
  firstValueFrom,
  map,
  switchMap,
  take,
  takeWhile,
  tap,
  timer,
} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AudioTranscriberAssemblyai extends AbstractAudioTranscriber {
  private http = inject(HttpClient);
  private client: AssemblyAI;
  constructor() {
    super(environment.ASSEMBLY_AI_API_KEY, environment.ASSEMBLY_AI_URL);

    this.client = new AssemblyAI({
      apiKey: this.API_KEY,
    });
  }

  public override async transcriber(blob: Blob) {
    try {
      const audioBytes = await this.blobToBase64(blob);
      const audioBuffer = await blob.text();
      const headers = new HttpHeaders({
        Authorization: this.API_KEY,
        'Content-Type': 'application/json',
      });

      const response = await firstValueFrom(
        this.http.post<any>(
          `${this.API_URL}/transcript`,
          {
            audio_url: audioBytes,
            speaker_labels: true,
          },
          { headers }
        )
      );
      const transcriptId = response.id;
      timer(0, 3000).pipe(
        switchMap(() =>
          this.http.get<any>(`${this.API_URL}/transcript/${transcriptId}`, {
            headers,
          })
        ),
        takeWhile(
          (result) =>
            result.status !== 'completed' && result.status !== 'error',
          true
        ),
        tap((result) => {
          if (result.status === 'error') {
            throw new Error('Error en la transcripción: ' + result.error);
          }
        }),
        map((result) => {
          if (result.status === 'completed') {
            console.log('Ya con esto basta: ', result.text);
            this.subject$.next(result.text || 'No funko');
            return 'completed';
          }
          return null;
        }),
        filter((text) => text !== null),
        take(1)
      );
    } catch (err: any) {}

    this.blobToBase64(blob).then((audioBytes) => {
      this.client.transcripts
        .transcribe({
          audio: audioBytes,
        })
        .then((transcript) => {
          console.log('Ya con esto basta: ', transcript.text);
          this.subject$.next(transcript.text || 'N o funko');
        });
    });
  }

  public override get getLastTextTranscript() {
    return this.subject$.asObservable();
  }

  private blobToBase64(blob: Blob): Promise<string> {
    const reader = new FileReader();
    return new Promise<string>((resolve, reject) => {
      reader.onloadend = () => {
        console.log('Hasta aca bien');
        if (typeof reader.result === 'string') {
          console.log('Es string el result');
          const base64String = reader.result.split(',')[1];
          console.log('BASE 64 no le gusta');
          resolve(base64String);
        } else {
          reject(new Error('Failed to read blob as string'));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}

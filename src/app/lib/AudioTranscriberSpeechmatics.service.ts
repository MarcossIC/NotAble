import { inject, Injectable } from '@angular/core';
import { AbstractAudioTranscriber } from './AbstractAudioTranscriber';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, delay, of, take, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Speechmatics } from 'speechmatics';

@Injectable()
export class AudioTranscriberSpeechmatics extends AbstractAudioTranscriber {
  private http = inject(HttpClient);
  private client: Speechmatics;
  constructor() {
    super(environment.SPEECHMATICS_API_KEY, environment.SPEECHMATICS_URL);
    this.client = new Speechmatics({ apiKey: this.API_KEY });
  }

  public override transcriber(input: Blob) {
    if (!(input instanceof Blob)) {
      console.error('Input is not a Blob');
      return;
    }
    const match = this.REGEX.exec(input.type);
    const ext = !!match ? match[1] : '';
    this.client.batch
      .transcribe(
        { data: input, fileName: `audio.${ext}` },
        {
          transcription_config: { language: 'es', operating_point: 'standard' },
        },
        'text'
      )
      .then((transcriptText: any) => {
        this.subject$.next(transcriptText);
      })
      .catch((err: any) => {
        console.error('Error creating transcription job:', err);
        console.error('Error response body:', err.error);
      });
  }

  /**
  History:
    No me funciono al principio, creia que fue un fallo mio
    Pero resulto que la API no soporta "weba" audio
    Y al parecer OperaGx solo me deja grabar con MediaRecorder en esta extension
    Asi que era por el navegador, deberia de usar otra forma de grabacion o transformar el archivo
    antes de enviarlo.
   */
  private useCurl(input: Blob) {
    const formData = new FormData();
    const match = this.REGEX.exec(input.type);
    const ext = !!match ? match[1] : '';
    formData.append('data_file', input, `audio.${ext}`);

    formData.append(
      'config',
      JSON.stringify({
        type: 'transcription',
        transcription_config: {
          operating_point: 'enhanced',
          language: 'es',
        },
      })
    );
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.API_KEY}`,
    });

    this.http
      .post(this.API_URL, formData, {
        headers,
        observe: 'response',
      })
      .pipe(
        take(1),
        catchError((err: any) => {
          console.error('Error creating transcription job:', err);
          console.error('Error response body:', err.error);
          throw err;
        }),
        tap((response: HttpResponse<any>) => {
          if (response.body && response.body.job && response.body.job.id) {
            const { id } = response.body.job;
            this.pollForTranscript(this.getTranscriptUrl(id));
          } else {
            console.error('Unexpected response format:', response);
          }
        })
      )
      .subscribe();
  }

  private pollForTranscript(URL: string) {
    of(null)
      .pipe(take(1), delay(5000))
      .subscribe(() => this.checkoutStatus(URL));
  }

  private checkoutStatus(URL: string) {
    this.http
      .get(URL, {
        headers: {
          Authorization: `Bearer ${this.API_KEY}`,
        },
      })
      .pipe(
        take(1),
        catchError((err) => {
          console.error('Error on pull job:', err);
          return of(null);
        })
      )
      .subscribe((data: any) => {
        if (data) {
          this.subject$.next(data);
        } else {
          this.pollForTranscript(URL);
        }
      });
  }

  private getTranscriptUrl(jobId: string) {
    return `${this.API_URL}${jobId}/transcript?format=txt`;
  }

  public override get getLastTextTranscript() {
    return this.subject$.asObservable();
  }
}

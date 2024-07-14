import { Observable, Subject } from 'rxjs';

export abstract class AbstractAudioTranscriber {
  protected readonly API_KEY: string;
  protected readonly API_URL: string;
  protected readonly subject$ = new Subject<any>();
  protected readonly REGEX = /audio\/(\w+)(?:;codecs=\w+)?/;
  constructor(API_KEY: string, API_URL: string) {
    this.API_KEY = API_KEY;
    this.API_URL = API_URL;
  }
  public abstract transcriber(blob: Blob): void;
  public abstract get getLastTextTranscript(): string | Observable<string>;
}

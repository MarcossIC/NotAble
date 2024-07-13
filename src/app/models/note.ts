export type Note = {
  text: string;
  audio: string;
  tags: string[];
};

export const EMPTYNOTE: Note = {
  audio: '',
  text: '',
  tags: [],
};

export enum NOTEKEYS {
  LASTBASE64NOTEKEY = 'lastRecordingBase64',
  LASTNOTEKEY = 'lastNoteStorage',
}

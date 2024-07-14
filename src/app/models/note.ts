export type Note = {
  title: string;
  text: string;
  audio: string;
  tags: string[];
};

export const EMPTYNOTE: Note = {
  title: '',
  audio: '',
  text: '',
  tags: [],
};

export enum NOTEKEYS {
  LASTBASE64NOTEKEY = 'lastRecordingBase64',
  LASTNOTEKEY = 'lastNoteStorage',
}

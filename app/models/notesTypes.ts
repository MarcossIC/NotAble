export interface NoteDB {
    id: string;
    text: string;
    title: string;
    created_at: string;
    user_id: string;
}


export interface Note {
    id: string;
    note: string;
    title: string;
}

export type Notes = Note[];
import type { Note, NoteDB } from '@/app/models/notesTypes';
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const maxDuration = 30;

export async function GET(req: Request) {
	const ID = req.headers.get('uuid');

	if (!ID) {
		return NextResponse.json({ message: 'ID is required' }, { status: 400 });
	}

	const results = await sql<NoteDB>`SELECT * FROM note WHERE user_id = ${ID}`;

	const notes: Note[] = results.rows.map((row) => {
		return {
			id: row.id,
			note: row.text,
			title: row.title,
		} as Note;
	});

	return NextResponse.json({ notes }, { status: 200 });
}

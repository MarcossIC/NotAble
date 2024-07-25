import transcribe from '@/lib/transcript/SpeechMaticsService';
import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import type { NoteDB } from '@/app/models/notesTypes';

export const maxDuration = 30;

export async function POST(req: Request) {
	const formData = await req.formData();
	const userId = formData.get('userId') as string | null;
	const audio = formData.get('audio') as Blob | null;
	const audioType = formData.get('audioType') as string | null;
	if (!audio || !audioType) {
		return NextResponse.json({ error: 'Audio or AudioType not found' }, { status: 400 });
	}

	const transcriptText = await transcribe(audio!, audioType!);
	const noteId = crypto.randomUUID();
	await sql<NoteDB>`INSERT INTO note (id, text, title, user_id) VALUES (${noteId},${transcriptText},'',${userId});`;

	return NextResponse.json({ transcriptText }, { status: 200 });
}

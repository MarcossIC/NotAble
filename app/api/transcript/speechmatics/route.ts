import transcribe from '@/lib/SpeechMaticsService';
import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export const maxDuration = 30;

export async function POST(req: Request) {
	const formData = await req.formData();
	const userId = formData.get('userId') as string | null;
	const audio = formData.get('audio') as File | null;
	const audioType = formData.get('audioType') as string | null;

	if (!audio || !audioType) {
		return NextResponse.json({ error: 'Audio o tipo de audio no proporcionado' }, { status: 400 });
	}

	const transcriptText = await transcribe(audio!, audioType!);

	await sql`INSERT INTO note (text, title, user_id) VALUES ( ${transcriptText}, '', ${userId});`;

	return NextResponse.json({ transcriptText }, { status: 200 });
}

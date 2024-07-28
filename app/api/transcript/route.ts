import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import type { NoteDB } from '@/app/models/notesTypes';
import whisper from '@/lib/ai/whisper';
import type { CustomWhisperModelV1 } from '@/lib/ai/whisper/whisperModelV1';
import { TranscribeService } from '@/app/models/types';
import useSpeechmatics from '@/lib/transcript/useSpeechmatics';

export const maxDuration = 30;

async function transcribe(service: string, options: Parameters<CustomWhisperModelV1["doGenerate"]>[0]){
	if(service === TranscribeService._SPEECHMATICS){
		return await useSpeechmatics(options.file!, options.file!.type);
	}
	const whisperResponse = await whisper("whisper-large-v3").doGenerate(options);
	return whisperResponse.content;
}

export async function POST(req: Request) {
	const formData = await req.formData();
	const userId = formData.get('userId') as string | null;
	const audio = formData.get('audio') as Blob | null;
	const service = formData.get('service') as string;
	if (!audio) {
		return NextResponse.json({ error: 'Audio or AudioType not found' }, { status: 400 });
	}

	const transcriptText = await transcribe(service,{language:"es",responseFormat: "json", file:audio})
	const noteId = crypto.randomUUID();
	await sql<NoteDB>`INSERT INTO note (id, text, title, user_id) VALUES (${noteId},${transcriptText},'',${userId});`;

	return NextResponse.json({ transcriptText }, { status: 200 });
}


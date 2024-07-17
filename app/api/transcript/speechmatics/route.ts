import transcribe from '@/app/lib/SpeechMaticsService';
import { NextResponse } from 'next/server';

export const maxDuration = 30;

export async function POST(req: Request) {
	const formData = await req.formData();
	const audio = formData.get('audio') as File | null;
	const audioType = formData.get('audioType') as string | null;

	if (!audio || !audioType) {
		return NextResponse.json({ error: 'Audio o tipo de audio no proporcionado' }, { status: 400 });
	}

	const transcriptText = await transcribe(audio!, audioType!);

	return NextResponse.json({ transcriptText }, { status: 200 });
}

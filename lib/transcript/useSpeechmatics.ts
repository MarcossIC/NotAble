'use server';

import { Speechmatics } from 'speechmatics';

const REGEX = /audio\/(\w+)(?:;codecs=\w+)?/;
const apiKey = process.env.SPEECHMATICS_API_KEY!;

export default async function useSpeechmatics(audio: Blob | File, type: string) {
	const client = new Speechmatics({ apiKey: apiKey });

	const match = REGEX.exec(type);
	const ext = match ? match[1] : '';
	try {
		return (await client.batch.transcribe(
			{ data: audio, fileName: `audio.${ext}` },
			{
				transcription_config: { language: 'es', operating_point: 'standard' },
			},
			'text'
		)) as string;
	} catch (err: unknown) {
		console.error('Error creating transcription job:', err);
		return '';
	}
}

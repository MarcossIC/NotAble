'use server';

import { Speechmatics } from 'speechmatics';

const REGEX = /audio\/(\w+)(?:;codecs=\w+)?/;

export default async function transcribe(audio: Blob | File, type: string) {
	const apiKey = process.env.SPEECHMATICS_API_KEY;
	const client = new Speechmatics({ apiKey: apiKey! });

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
	} catch (err: any) {
		console.error('Error creating transcription job:', err);
		console.error('Error response body:', err.error);
		return '';
	}
}

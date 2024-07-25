'use client';

import { useCallback, useEffect, useState } from 'react';
import useTranscriptAudio from './useTranscriptAudio';
import { blobToBase64 } from './blobToBase64';
import useAudioStore from './store/useAudioStore';
import { useSession } from 'next-auth/react';

export default function useAudioMediaPlayer() {
	const transcript = useTranscriptAudio();
	const [audioSrc, setAudioSrc] = useState<string | undefined>(undefined);
	const { audio, audioType, setTextAudio } = useAudioStore();
	const { data: session } = useSession();

	const handleTranscription = useCallback(async () => {
		if (audio && session?.user?.id) {
			try {
				const res = await transcript(audio, session.user.id);
				setTextAudio(res);
			} catch (error) {
				console.error('Error during transcription:', error);
			}
		}
	}, [audio, session?.user?.id]);
	const handleAudioConversion = useCallback(async () => {
		if (audio !== null) {
			try {
				const audioString = await blobToBase64(audio);
				setAudioSrc(`data:${audioType};base64,${audioString}`);
			} catch (error) {
				console.error('Error converting audio:', error);
			}
		} else {
			setAudioSrc(undefined);
		}
	}, [audio, audioType]);

	useEffect(() => {
		handleTranscription();
		handleAudioConversion();
	}, [audio]);

	return [audioSrc] as const;
}

'use client';

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import useAudioStore from '../../lib/useAudioStore';
import { useSession } from 'next-auth/react';
import useTranscriptAudio from '@/lib/useTranscriptAudio';
import { useEffect, useState } from 'react';
import { blobToBase64 } from '@/lib/blobToBase64';

export default function AudioMediaPlayer() {
	const { audio, audioType, setTextAudio } = useAudioStore();
	const { data: session } = useSession();
	const [audioSrc, setAudioSrc] = useState<string | undefined>(undefined);
	const transcript = useTranscriptAudio();

	useEffect(() => {
		if (audio !== null) {
			if (session) {
				transcript(audio, session.user.id || '').then((res) => {
					setTextAudio(res);
				});
			}
			blobToBase64(audio).then((audioString: string) => {
				setAudioSrc(`data:${audioType};base64,${audioString}`);
			});
		} else {
			setAudioSrc(undefined);
		}
	}, [audio]);

	return (
		<AudioPlayer
			autoPlay
			src={audioSrc}
			layout='stacked-reverse'
			autoPlayAfterSrcChange={true}
			showSkipControls={false}
			showJumpControls={false}
			showDownloadProgress={false}
			progressUpdateInterval={25}
			defaultDuration={'0:0'}
			defaultCurrentTime={'0:0'}
			customAdditionalControls={[]}
			customVolumeControls={[]}
			className={`${!audioSrc ? 'rhap_play-status--nocontent' : ''}`}
		/>
	);
}

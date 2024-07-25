'use client';

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useMemo } from 'react';
import useAudioMediaPlayer from '@/lib/useAudioMediaPlayer';

export default function AudioMediaPlayer() {
	const [audioSrc] = useAudioMediaPlayer();

	const playerClassName = useMemo(() => `${!audioSrc ? 'rhap_play-status--nocontent' : ''}`, [audioSrc]);
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
			className={playerClassName}
		/>
	);
}

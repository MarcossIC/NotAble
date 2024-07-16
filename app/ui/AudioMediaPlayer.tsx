'use client';

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import useAudioStore from '../lib/useAudioStore';

export default function AudioMediaPlayer() {
	const { audioType, audioString } = useAudioStore();

	return (
		<AudioPlayer
			autoPlay
			src={audioType ? `data:${audioType};base64,${audioString}` : undefined}
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
			className={`${!audioType ? 'rhap_play-status--nocontent' : ''}`}
		/>
	);
}

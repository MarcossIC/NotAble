'use client';

import useAudioStore from '@/lib/store/useAudioStore';
import useRecorder from '@/lib/useRecorder';
import PauseButton from './PauseButton';
import RecorderButton from './RecorderButton';
import { useCallback } from 'react';
import AIButton from './AIButton';

export default function Recorder() {
	const { isRecording, isPaused, isNotSupported, startRecording, stopRecording, pauseAction } = useRecorder();
	const { setAudio, setAudioType, setLoading } = useAudioStore();

	const handleRecordingAction = useCallback(() => {
		if (!isRecording) {
			startRecording();
		} else {
			stopRecording().then(([audioblob, type]) => {
				setLoading(true);
				setAudio(audioblob);
				setAudioType(type);
			});
		}
	}, [isRecording, isPaused, isNotSupported]);

	return (
		<div className='w-[240px] h-fit mx-auto pb-2 flex justify-center items-center relative'>
			<AIButton />
			<RecorderButton
				onClick={handleRecordingAction}
				isDisabled={isNotSupported}
				isActive={isRecording}
			/>
			<PauseButton
				onClick={pauseAction}
				isDisabled={!isRecording}
				isActive={isPaused}
			/>
		</div>
	);
}

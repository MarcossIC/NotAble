'use client';

import useAudioStore from '@/lib/store/useAudioStore';
import useRecorder from '@/lib/useRecorder';
import css from './recorder.module.css';

export default function Recorder() {
	const { isRecording, isPaused, isNotSupported, startRecording, stopRecording, pauseAction } = useRecorder();
	const { setAudio, setAudioType, setLoading } = useAudioStore();

	const recordingAction = () => {
		if (!isRecording) {
			startRecording();
		} else {
			stopRecording().then(([audioblob, type]) => {
				setLoading(true);
				setAudio(audioblob);
				setAudioType(type);
			});
		}
	};

	return (
		<div className='w-[140px] h-fit mx-auto pb-2 flex justify-center items-center relative'>
			<button
				tabIndex={1}
				onClick={recordingAction}
				className={css.recorderButton}
				disabled={isNotSupported}
				value={isRecording ? 1 : 0}></button>
			<button
				tabIndex={2}
				onClick={pauseAction}
				className={css.pauseRecorderButton}
				disabled={!isRecording}
				value={isPaused ? 1 : 0}>
				<svg
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth='1.5'
					stroke='currentColor'
					className='size-7'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M15.75 5.25v13.5m-7.5-13.5v13.5'
					/>
				</svg>
			</button>
		</div>
	);
}

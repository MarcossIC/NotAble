import { useRef, useState } from 'react';
import AudioRecorderService from './AudioRecorderService';

export default function useRecorder() {
	const [recorderService] = useState(new AudioRecorderService());
	const [recorder, setRecorder] = useState<MediaRecorder | undefined>();
	const [isNotSupported, setIsNotSupported] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const audioChunks = useRef<Blob[]>([]);

	const startRecording = () => {
		recorderService.startRecording().then((newRecorder) => {
			if (newRecorder) {
				newRecorder.ondataavailable = (event) => {
					audioChunks.current.push(event.data);
				};
				newRecorder.start();
				setIsPaused(false);
				setRecorder(newRecorder);
			} else {
				setIsNotSupported(true);
			}
		});
	};

	const stopRecording = () => {
		return recorderService.stopRecording(recorder, audioChunks.current).then((audioBlob) =>
			recorderService.blobToBase64(audioBlob).then((audiobase64) => {
				setIsPaused(false);
				audioChunks.current = [];
				setRecorder(undefined);
				const type = audioBlob.type;
				return [audiobase64, type];
			})
		);
	};

	const pauseAction = () => {
		if (!recorderService.isPaused(recorder)) {
			recorderService.pauseRecording(recorder);

			setIsPaused(true);
		} else {
			recorderService.resumeRecording(recorder);
			setIsPaused(false);
		}
	};

	return { isRecording: recorderService.isRecording(recorder), isPaused, isNotSupported, stopRecording, startRecording, pauseAction };
}

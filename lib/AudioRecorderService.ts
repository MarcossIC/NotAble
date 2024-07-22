"use client";

class AudioRecorderService {
	public isRecording(mediaRecorder: MediaRecorder | undefined) {
		return !!mediaRecorder && (mediaRecorder.state === 'recording' || mediaRecorder.state === 'paused');
	}

	public isPaused(mediaRecorder: MediaRecorder | undefined) {
		return !!mediaRecorder && mediaRecorder.state === 'paused';
	}

	private getSupportedMimetype() {
		let mimeType = '';

		if (MediaRecorder.isTypeSupported('audio/flac')) {
			mimeType = 'audio/flac';
		} else if (MediaRecorder.isTypeSupported('audio/amr')) {
			mimeType = 'audio/amr';
		} else if (MediaRecorder.isTypeSupported('audio/aac')) {
			mimeType = 'audio/aac';
		} else if (MediaRecorder.isTypeSupported('audio/mp4')) {
			mimeType = 'audio/mp4';
		} else if (MediaRecorder.isTypeSupported('audio/mpeg')) {
			mimeType = 'audio/mpeg';
		} else if (MediaRecorder.isTypeSupported('audio/mp3')) {
			mimeType = 'audio/mp3';
		} else if (MediaRecorder.isTypeSupported('audio/ogg')) {
			mimeType = 'audio/ogg';
		} else if (MediaRecorder.isTypeSupported('audio/wav')) {
			mimeType = 'audio/wav';
		} else if (MediaRecorder.isTypeSupported('audio/x-m4a')) {
			mimeType = 'audio/x-m4a';
		}
		return mimeType;
	}

	public async startRecording() {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			const mediaRecorder = new MediaRecorder(stream, {
				mimeType: this.getSupportedMimetype(),
			});
			return mediaRecorder;
		} catch (err: unknown) {
			console.error('Error in MediaRecorder ', err);
			return undefined;
		}
	}

	public stopRecording(mediaRecorder: MediaRecorder | undefined, audioChunks: Blob[]) {
		return new Promise<Blob>((resolve, reject) => {
			if (mediaRecorder) {
				mediaRecorder.onstop = () => {
					const type = mediaRecorder!.mimeType;
					const audioBlob = new Blob(audioChunks, {
						type: type.includes(';') ? type.split(';')[0] : type,
					});
					resolve(audioBlob);
				};

				mediaRecorder.stop();
			} else {
				reject('No recording in progress');
			}
		});
	}

	public pauseRecording(mediaRecorder: MediaRecorder | undefined) {
		if (this.isRecording(mediaRecorder)) {
			mediaRecorder!.pause();
		}
	}

	public resumeRecording(mediaRecorder: MediaRecorder | undefined) {
		if (this.isPaused(mediaRecorder)) {
			mediaRecorder!.resume();
		}
	}

	public blobToBase64(blob: Blob): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => {
				if (typeof reader.result === 'string') {
					const base64String = reader.result.split(',')[1];
					resolve(base64String);
				} else {
					reject(new Error('Failed to read blob as string'));
				}
			};
			reader.onerror = reject;
			reader.readAsDataURL(blob);
		});
	}
}

export default AudioRecorderService;

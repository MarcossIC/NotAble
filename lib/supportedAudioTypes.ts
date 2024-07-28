export const getSupportedMimetype = () => {
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
};

export const isSupported = (mimeType: string) => {
	if (
		mimeType === 'audio/flac' ||
		mimeType === 'audio/amr' ||
		mimeType === 'audio/aac' ||
		mimeType === 'audio/mp4' ||
		mimeType === 'audio/mpeg' ||
		mimeType === 'audio/mp3' ||
		mimeType === 'audio/ogg' ||
		mimeType === 'audio/wav' ||
		mimeType === 'audio/x-m4a'
	) {
		return true;
	}
	return false;
};

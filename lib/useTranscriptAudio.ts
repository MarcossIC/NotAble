import { TranscribeService } from '@/app/models/types';

export default function useTranscriptAudio() {
	const transcript = async (audioBlob: Blob, id: string) => {
		if (audioBlob) {
			const formData = new FormData();
			formData.append('audio', audioBlob);
			formData.append('audioType', audioBlob.type);
			formData.append('userId', id);
			formData.append('service', TranscribeService._SPEECHMATICS);

			const response = await fetch('/api/transcript', {
				method: 'POST',
				body: formData,
			});

			if (response.ok) {
				const res = await response.json();
				return res.transcriptText;
			} else {
				console.error('Failed to upload audio');
				return '';
			}
		}
	};

	return transcript;
}

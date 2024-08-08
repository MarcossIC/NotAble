import { createWhisper } from './whisper/whisperProvider';

const whisper = createWhisper({
	baseURL: process.env?.GROQ_API_URL || "",
	apiKey: process.env?.GROQ_API_KEY || "",
});

export default whisper;

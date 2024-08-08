'use client';

import { useState } from 'react';
import { MODAL_APIKEY_INPUT } from '../../models/apiKeyInputEnum';

const useApiKeyModal = () => {
	const [speechService, setSpeechService] = useState('Select your Speech service');
	const [speechApiKey, setSpeechApiKey] = useState('');
	const [aiService, setAiService] = useState('Select your AI service');
	const [aiApiKey, setAiApiKey] = useState('');

	const handleChange = (input: MODAL_APIKEY_INPUT, value: string) => {
		switch (input) {
			case MODAL_APIKEY_INPUT.SPEECH_SERVICE:
				setSpeechService(value);
				break;
			case MODAL_APIKEY_INPUT.SPEECH_API_KEY:
				setSpeechApiKey(value);
				break;
			case MODAL_APIKEY_INPUT.AI_SERVICE:
				setAiService(value);
				break;
			case MODAL_APIKEY_INPUT.AI_API_KEY:
				setAiApiKey(value);
				break;
			default:
				break;
		}
	};

	const handleSave = () => {
		console.log({
			speechService,
			speechApiKey,
			aiService,
			aiApiKey,
		});
	};

	return {
		speechService,
		speechApiKey,
		aiService,
		aiApiKey,
		handleChange,
		handleSave,
	};
};

export default useApiKeyModal;

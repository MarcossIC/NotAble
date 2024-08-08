'use client';

import { useCallback } from 'react';
import { MODAL_APIKEY_INPUT } from '../../models/apiKeyInputEnum';
import useApiKeyStore from '@/lib/store/useApiKeyStore';

const useApiKeyModal = () => {
	const { open, setOpen, setSpeechApiKey, setSpeechService, setAiService, setAiApiKey, speechService, speechApiKey, aiService, aiApiKey } =
		useApiKeyStore();

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
	const onClose = useCallback(()=> {
		setOpen(false);
	}, [])

	return {
		open,
		speechService,
		speechApiKey,
		aiService,
		aiApiKey,
		handleChange,
		handleSave,
		onClose
	};
};

export default useApiKeyModal;

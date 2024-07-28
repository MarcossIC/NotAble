import { generateId, withoutTrailingSlash } from '@ai-sdk/provider-utils';
import { WhisperChatLanguageModel } from './whisperChatLanguageModel';
import type { WhisperChatModelId, WhisperChatSettings } from './whisperChatSetting';

export interface WhisperProvider {
	(modelId: WhisperChatModelId, settings?: WhisperChatSettings): WhisperChatLanguageModel;
	chat(modelId: WhisperChatModelId, settings?: WhisperChatSettings): WhisperChatLanguageModel;
}

// optional settings for the provider
export interface WhisperProviderSettings {
	baseURL?: string;
	apiKey?: string;
	headers?: Record<string, string>;

	generateId?: () => string;
}

// provider factory function
export function createWhisper(options: WhisperProviderSettings = {}): WhisperProvider {
	const baseURL = withoutTrailingSlash(options.baseURL ?? options.baseURL) ?? '';

	const getHeaders = () => ({
		Authorization: `Bearer ${options.apiKey}`,
		...options.headers,
	});

	const createTranscriptAudioModel = (modelId: WhisperChatModelId, settings: WhisperChatSettings = {}) =>
		new WhisperChatLanguageModel(modelId, settings, {
			provider: 'openai.audio',
			baseURL: `${baseURL}/audio/transcriptions`,
			headers: getHeaders,
			generateId: options.generateId ?? generateId,
		});

	const provider = function (modelId: WhisperChatModelId, settings?: WhisperChatSettings) {
		if (new.target) {
			throw new Error('The model factory function cannot be called with the new keyword.');
		}

		return createTranscriptAudioModel(modelId, settings);
	};

	provider.chat = createTranscriptAudioModel;
	return provider as WhisperProvider;
}

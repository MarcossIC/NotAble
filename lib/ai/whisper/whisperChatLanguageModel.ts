import type { LanguageModelV1CallWarning } from '@ai-sdk/provider';
import { combineHeaders } from '@ai-sdk/provider-utils';

import type { WhisperChatModelId, WhisperChatSettings } from './whisperChatSetting';

import type { CustomWhisperModelV1 } from './whisperModelV1';
import { isSupported } from '@/lib/supportedAudioTypes';
import { mapValue, validJSON } from './whisperMapFetchResponse';

type WhisperChatConfig = {
	provider: string;
	baseURL: string;
	headers: () => Record<string, string | undefined>;
	generateId: () => string;
};

export class WhisperChatLanguageModel implements CustomWhisperModelV1 {
	readonly specificationVersion = 'v1';
	readonly defaultObjectGenerationMode = 'json';
	readonly modelId: WhisperChatModelId;
	readonly settings: WhisperChatSettings;

	private readonly config: WhisperChatConfig;

	constructor(modelId: WhisperChatModelId, settings: WhisperChatSettings, config: WhisperChatConfig) {
		this.modelId = modelId;
		this.settings = settings;
		this.config = config;
	}

	get provider(): string {
		return this.config.provider;
	}

	private getArgs({
		temperature,
		topP,
		topK,
		frequencyPenalty,
		presencePenalty,
		stopSequences,
		responseFormat,
		file,
		language,
		maxTokens,
		propmt,
	}: Parameters<CustomWhisperModelV1['doGenerate']>[0]) {
		const warnings: LanguageModelV1CallWarning[] = [];

		if (file && !isSupported(file?.type)) {
			warnings.push({
				type: 'other',
				message: 'file.type is not supported',
			});
		}
		if (maxTokens != null) {
			warnings.push({
				type: 'unsupported-setting',
				setting: 'presencePenalty',
			});
		}
		if (presencePenalty != null) {
			warnings.push({
				type: 'unsupported-setting',
				setting: 'presencePenalty',
			});
		}
		if (topP != null) {
			warnings.push({
				type: 'unsupported-setting',
				setting: 'topP',
			});
		}
		if (stopSequences != null) {
			warnings.push({
				type: 'unsupported-setting',
				setting: 'stopSequences',
			});
		}

		if (topK != null) {
			warnings.push({
				type: 'unsupported-setting',
				setting: 'topK',
			});
		}

		if (frequencyPenalty != null) {
			warnings.push({
				type: 'unsupported-setting',
				setting: 'frequencyPenalty',
			});
		}

		const baseArgs = new FormData();
		baseArgs.append('file', file!, 'audio.wav');
		baseArgs.append('model', this.modelId);
		baseArgs.append('response_format', responseFormat || '');
		baseArgs.append('language', language);
		baseArgs.append('temperature', String(temperature || 0.0));
		baseArgs.append('prompt', propmt || '');

		return {
			args: baseArgs,
			warnings,
		};
	}

	async doGenerate(options: Parameters<CustomWhisperModelV1['doGenerate']>[0]): Promise<Awaited<ReturnType<CustomWhisperModelV1['doGenerate']>>> {
		const { args, warnings } = this.getArgs(options);
		const headers = combineHeaders(this.config.headers(), options.headers) as Record<string, string>;

		const res = await fetch(this.config.baseURL, {
			method: 'POST',
			headers,
			body: args,
			signal: options.abortSignal,
		})
			.then(validJSON)
			.then(mapValue);

		return {
			...res,
			warnings,
		};
	}
}

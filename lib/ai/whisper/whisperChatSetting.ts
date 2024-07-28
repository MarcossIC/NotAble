export type WhisperChatModelId =
	| 'whisper-tiny-v3'
	| 'whisper-base-v3'
	| 'whisper-small-v3'
	| 'whisper-medium-v3'
	| 'whisper-large-v3'
	| (string & {});

export interface WhisperChatSettings {
	safePrompt?: boolean;
}

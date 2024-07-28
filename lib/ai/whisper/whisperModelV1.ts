import type { LanguageModelV1CallWarning } from "@ai-sdk/provider";

type SpecificationType = 'v1';
type WhisperResponseFormat = "json" | "verbose_json" | "text" | undefined;
type WhisperModelV1FinishReason = 'stop' | 'length' | 'content-filter' | 'tool-calls' | 'error' | 'other' | 'unknown';

type WhisperModelOptions = {
  maxTokens?: number;
  temperature?: number;
  stopSequences?: string[];
  topP?: number;
  topK?: number;
  presencePenalty?: number;
  seed?: number;
  frequencyPenalty?: number;
  responseFormat?: WhisperResponseFormat;
  abortSignal?: AbortSignal;
  headers?: Record<string, string | undefined>;
};

type CustomWhisperModelCallOptions = WhisperModelOptions & {
  responseFormat?: WhisperResponseFormat;
  propmt?: string;
  file?: File | Blob;
  language: string;
}



export type CustomWhisperModelV1 = {
    readonly specificationVersion: SpecificationType;
    readonly provider: string;
    readonly modelId: string;
    readonly defaultObjectGenerationMode: WhisperResponseFormat;

    doGenerate(options: CustomWhisperModelCallOptions): PromiseLike<{
        id: string;
        content: string;
        role: string;
        finish_reason: WhisperModelV1FinishReason;
        object: string;
        warnings?: LanguageModelV1CallWarning[];
    }>;
};
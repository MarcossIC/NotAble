import type { MouseEventHandler, PropsWithChildren, ReactNode } from 'react';

export type SetFunction<T> = (updated: T) => void;

export type StopRecording = [Blob, string];

export type ChildrenProps = PropsWithChildren;
export type FallbackProps = { fallback?: ReactNode | undefined };
export type ChildrenAndFallback = ChildrenProps & FallbackProps;
export type ButtonProps = {
	isDisabled?: boolean;
	isActive?: boolean;
	onClick?: MouseEventHandler | undefined;
};

export enum TranscribeService {
	_SPEECHMATICS = 'speechmatics',
	_WHISPER_GROQ = 'whisper_groq',
}

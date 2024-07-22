import type { StateCreator } from 'zustand';

export type StateInitializer<T> = (store: StateCreator<T>, persistence: { name: string }) => StateCreator<T>;

export type ZustandSetter<T> = (partial: T | Partial<T> | ((state: T) => T | Partial<T>), replace?: boolean | undefined) => void;

import { create, type StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { SetFunction } from '../models/types';
import type { StateInitializer, ZustandSetter } from '../models/zustandTypes';

interface AudioStore {
	audioString: string;
	audioType: string;

	setAudioString: SetFunction<string>;
	setAudioType: SetFunction<string>;
}
const stateInit: StateInitializer<AudioStore> = (store, persistence) => devtools(persist(store, persistence)) as StateCreator<AudioStore>;

const useAudioStore = create<AudioStore>()(
	stateInit(
		(set: ZustandSetter<AudioStore>) => ({
			audioString: '',
			audioType: '',
			setAudioString: (updated: string) => set({ audioString: updated }),
			setAudioType: (updated: string) => set({ audioType: updated }),
		}),
		{ name: 'audio-latest' }
	)
);

export default useAudioStore;

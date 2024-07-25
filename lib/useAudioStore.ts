import { create } from 'zustand';
import type { SetFunction } from '../app/models/types';
import type { ZustandSetter } from '../app/models/zustandTypes';

interface AudioStore {
	audio: Blob | null;
	audioType: string;
	textAudio: string;
	loading: boolean;

	setLoading: SetFunction<boolean>;
	setAudio: SetFunction<Blob | null>;
	setAudioType: SetFunction<string>;
	setTextAudio: SetFunction<string>;
}
//const stateInit: StateInitializer<AudioStore> = (store, persistence) => devtools(persist(store, persistence)) as StateCreator<AudioStore>;

const useAudioStore = create<AudioStore>()((set: ZustandSetter<AudioStore>) => ({
	audio: null,
	audioType: '',
	textAudio: '',
	loading: false,
	setLoading: (updated)=> set({loading: updated}),
	setAudio: (updated: Blob | null) => set({ audio: updated }),
	setAudioType: (updated: string) => set({ audioType: updated }),
	setTextAudio: (updated: string) => set({ textAudio: updated }),
}));

export default useAudioStore;

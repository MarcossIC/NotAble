import { create } from 'zustand';
import type { ZustandSetter } from '@/app/models/zustandTypes';
import type { AudioStore } from '@/app/models/storeTypes';

//const stateInit: StateInitializer<AudioStore> = (store, persistence) => devtools(persist(store, persistence)) as StateCreator<AudioStore>;

const useAudioStore = create<AudioStore>()((set: ZustandSetter<AudioStore>) => ({
	audio: null,
	audioType: '',
	textAudio: '',
	loading: false,
	setLoading: (updated) => set({ loading: updated }),
	setAudio: (updated: Blob | null) => set({ audio: updated }),
	setAudioType: (updated: string) => set({ audioType: updated }),
	setTextAudio: (updated: string) => set({ textAudio: updated }),
}));

export default useAudioStore;

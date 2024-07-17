import { create, type StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface AudioStore {
	audioString: string;
	audioType: string;

	setAudioString: (updated: string) => void;
	setAudioType: (updated: string) => void;
}
const stateInit = (store: any, persistence: any) =>
	devtools(persist(store, persistence)) as StateCreator<AudioStore, [], [['zustand/persist', string]]>;

const useAudioStore = create<AudioStore>()(
	stateInit(
		(set: any, _get: any) => ({
			audioString: '',
			audioType: '',
			setAudioString: (updated: string) => set({ audioString: updated }),
			setAudioType: (updated: string) => set({ audioType: updated }),
		}),
		{ name: 'audio-latest' }
	)
);

export default useAudioStore;

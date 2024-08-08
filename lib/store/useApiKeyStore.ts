import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { ApiKeyStore } from '@/app/models/storeTypes';
import type { StateInitializer } from '@/app/models/zustandTypes';

const stateInit: StateInitializer<ApiKeyStore> = (store, persistence) => devtools(persist(store, persistence));

const useApiKeyStore = create<ApiKeyStore>()(
	stateInit(
		(set) => ({
			open: false,
			speechService: '',
			speechApiKey: '',
			aiService: '',
			aiApiKey: '',
			setSpeechService: (updated) => set({ speechService: updated }),
			setSpeechApiKey: (updated) => set({ speechApiKey: updated }),
			setAiService: (updated) => set({ aiService: updated }),
			setAiApiKey: (updated) => set({ aiApiKey: updated }),
			setOpen: (updated) => set({ open: updated }),
		}),
		{ name: 'apiKeyStore' }
	)
);

export default useApiKeyStore;

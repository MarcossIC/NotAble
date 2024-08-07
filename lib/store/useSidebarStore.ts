import { create } from 'zustand';
import type { ZustandSetter } from '@/app/models/zustandTypes';
import type { SidebarStore } from '@/app/models/storeTypes';

const useSidebarStore = create<SidebarStore>()((set: ZustandSetter<SidebarStore>) => ({
	open: false,
	settings: {id: "", x: 0, y: 0},
	buttonRef: null,
	setButtonRef: (updated) => set({ buttonRef: updated }),
	setOpenSettings: (updated) => set({ settings: updated }),
	setOpen: (updated) => set({ open: updated }),
}));

export default useSidebarStore;

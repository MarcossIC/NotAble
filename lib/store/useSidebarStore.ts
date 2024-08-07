import { create } from 'zustand';
import type { ZustandSetter } from '@/app/models/zustandTypes';
import type { SidebarStore } from '@/app/models/storeTypes';

const useSidebarStore = create<SidebarStore>()((set: ZustandSetter<SidebarStore>) => ({
	open: false,
	setOpen: (updated) => set({ open: updated }),
}));

export default useSidebarStore;

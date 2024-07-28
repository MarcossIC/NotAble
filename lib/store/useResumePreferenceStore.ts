
import { Position, type ResumePreferenceStore } from "@/app/models/storeTypes";
import type { ZustandSetter } from "@/app/models/zustandTypes";
import { create } from "zustand";


const useResumeStore = create<ResumePreferenceStore>()((set: ZustandSetter<ResumePreferenceStore>) => ({
	open: false,
	resume: "",
	position: Position._RIGHT_SIDE,
	setOpen: (open) => set({ open }),
	setResume: (resume) => set({ resume }),
	setPosition: (position) => set({ position }),
}));

export default useResumeStore;
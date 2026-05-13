import { create } from 'zustand';

type Store = {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const useCommunityStore = create<Store>((set, get) => ({
    open: false,
    setOpen: (open) => {
        set({ open });
    }
}));
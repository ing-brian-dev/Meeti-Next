import { create } from 'zustand';
import { SelectCommunity } from '../types/community.types';

type Store = {
    open: boolean;
    setOpen: (open: boolean) => void;
    community: SelectCommunity | null;
    setCommunity: (community: SelectCommunity | null) => void;
}

export const useCommunityStore = create<Store>((set, get) => ({
    open: false,
    setOpen: (open) => {
        set({ open });
    },
    community: null,
    setCommunity: (community) => {
        set({ community });
    }
}));
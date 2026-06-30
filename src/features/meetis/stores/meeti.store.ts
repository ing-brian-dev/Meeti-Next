import { create } from 'zustand'
import { SelectMeeti } from '../types/meeti.types'

type Store = {
    meeti: SelectMeeti | null
    setMeeti: (meeti: SelectMeeti | null) => void
    open: boolean
    setOpen: (open: boolean) => void
}

export const useMeetiStore = create<Store>((set) => ({
    meeti: null,
    setMeeti: (meeti) => {
        set({ meeti })
    },
    open: false,
    setOpen: (open) => {
        set({ open })
    }
}))
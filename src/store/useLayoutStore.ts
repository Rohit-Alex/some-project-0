import { LOCAL_STORAGE_KEYS } from '@/constants/global'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface LayoutState {
  drawerOpen: boolean
  toggleDrawer: () => void
  setDrawerOpen: (open: boolean) => void
}

export const useLayoutStore = create<LayoutState>()(
  persist(
    (set) => ({
      drawerOpen: true,
      toggleDrawer: (): void => {
        set((state) => ({ drawerOpen: !state.drawerOpen }))
      },
      setDrawerOpen: (open: boolean): void => {
        set({ drawerOpen: open })
      },
    }),
    {
      name: LOCAL_STORAGE_KEYS.LAYOUT,
    }
  )
)


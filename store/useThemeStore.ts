import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ThemeMode } from '../config'
import { LOCAL_STORAGE_KEYS } from '@/constants/global'

interface ThemeState {
  mode: ThemeMode
  toggleTheme: () => void
  setTheme: (mode: ThemeMode) => void
}

export const useThemeStore = create<ThemeState>()(
    persist(
      (set) => ({
        mode: ThemeMode.DARK,
        toggleTheme: (): void => {
          set((state) => ({
            mode: state.mode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT,
          }))
        },
        setTheme: (mode: ThemeMode): void => {
          set({ mode })
        },
      }),
      {
        name: LOCAL_STORAGE_KEYS.THEME,
      }
  )
)


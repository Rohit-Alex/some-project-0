import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import { API_STATUS } from '../../constants/apiStatus'
import type { AuthStore, AuthState } from './types'

// ==============================|| DEFAULT STATE ||============================== //

const defaultState: AuthState = {
  user: null,
  isAuthenticated: false,
  accessToken: null,
  loadingStates: {
    login: API_STATUS.Uninitialized,
    register: API_STATUS.Uninitialized,
    forgotPassword: API_STATUS.Uninitialized,
    resetPassword: API_STATUS.Uninitialized,
    fetchUser: API_STATUS.Uninitialized,
    logout: API_STATUS.Uninitialized,
    updatePassword: API_STATUS.Uninitialized,
  },
}

// ==============================|| AUTH STORE ||============================== //

const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        ...defaultState,

        setStoreData: (data) =>
          set((state) => {
            const updates = typeof data === 'function' ? data(state) : data
            return { ...state, ...updates }
          }),

        reset: () => set(defaultState),
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
          accessToken: state.accessToken,
        }),
      }
    ),
    { name: 'AuthStore' }
  )
)

export default useAuthStore


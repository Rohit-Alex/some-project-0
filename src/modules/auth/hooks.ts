import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { loginService, registerService, forgotPasswordService } from './services'
import useAuthStore from './store'
import { API_STATUS } from '../../constants/apiStatus'
import { ROUTES } from '../../config/routes'
import type { LoginRequest, RegisterRequest, ForgotPasswordRequest } from './types'

// ==============================|| AUTH HOOKS ||============================== //

/**
 * Login mutation hook
 */
export function useLogin() {
  const navigate = useNavigate()
  const setStoreData = useAuthStore((state) => state.setStoreData)

  return useMutation({
    mutationFn: (data: LoginRequest) => loginService(data),

    onMutate: () => {
      setStoreData((state) => ({
        loadingStates: { ...state.loadingStates, login: API_STATUS.Loading },
      }))
    },

    onSuccess: (response) => {
      // Store token
      localStorage.setItem('accessToken', response.accessToken)

      // Update store
      setStoreData((state) => ({
        user: response.user,
        isAuthenticated: true,
        accessToken: response.accessToken,
        loadingStates: { ...state.loadingStates, login: API_STATUS.Success },
      }))

      // Navigate to dashboard
      navigate(ROUTES.DASHBOARD)
    },

    onError: (error) => {
      setStoreData((state) => ({
        loadingStates: { ...state.loadingStates, login: API_STATUS.Error },
      }))
      console.error('Login failed:', error)
    },
  })
}

/**
 * Register mutation hook
 */
export function useRegister() {
  const navigate = useNavigate()
  const setStoreData = useAuthStore((state) => state.setStoreData)

  return useMutation({
    mutationFn: (data: RegisterRequest) => registerService(data),

    onMutate: () => {
      setStoreData((state) => ({
        loadingStates: { ...state.loadingStates, register: API_STATUS.Loading },
      }))
    },

    onSuccess: () => {
      setStoreData((state) => ({
        loadingStates: { ...state.loadingStates, register: API_STATUS.Success },
      }))

      // Navigate to login
      navigate(ROUTES.LOGIN)
    },

    onError: (error) => {
      setStoreData((state) => ({
        loadingStates: { ...state.loadingStates, register: API_STATUS.Error },
      }))
      console.error('Registration failed:', error)
    },
  })
}

/**
 * Forgot password mutation hook
 */
export function useForgotPassword() {
  const setStoreData = useAuthStore((state) => state.setStoreData)

  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) => forgotPasswordService(data),

    onMutate: () => {
      setStoreData((state) => ({
        loadingStates: { ...state.loadingStates, forgotPassword: API_STATUS.Loading },
      }))
    },

    onSuccess: () => {
      setStoreData((state) => ({
        loadingStates: { ...state.loadingStates, forgotPassword: API_STATUS.Success },
      }))
    },

    onError: (error) => {
      setStoreData((state) => ({
        loadingStates: { ...state.loadingStates, forgotPassword: API_STATUS.Error },
      }))
      console.error('Forgot password failed:', error)
    },
  })
}

/**
 * Logout helper
 */
export function useLogout() {
  const navigate = useNavigate()
  const reset = useAuthStore((state) => state.reset)

  return () => {
    localStorage.removeItem('accessToken')
    reset()
    navigate(ROUTES.LOGIN)
  }
}

/**
 * Auth state selectors
 */
export function useAuthUser() {
  return useAuthStore((state) => state.user)
}

export function useIsAuthenticated() {
  return useAuthStore((state) => state.isAuthenticated)
}

export function useAuthLoadingStates() {
  return useAuthStore((state) => state.loadingStates)
}


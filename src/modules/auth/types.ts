import type { ApiStatus } from '../../types'

// ==============================|| AUTH TYPES ||============================== //

export interface User {
  id: string
  email: string
  name: string
  firstName?: string
  lastName?: string
  avatar?: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  user: User
  accessToken: string
  refreshToken?: string
}

export interface RegisterRequest {
  email: string
  password: string
  firstName: string
  lastName: string
  company?: string
}

export interface RegisterResponse {
  message: string
  user?: User
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ForgotPasswordResponse {
  message: string
}

export interface ResetPasswordRequest {
  token: string
  password: string
}

export interface ResetPasswordResponse {
  message: string
}

// ==============================|| STORE TYPES ||============================== //

export interface AuthLoadingStates {
  login: ApiStatus
  register: ApiStatus
  forgotPassword: ApiStatus
  resetPassword: ApiStatus
  fetchUser: ApiStatus
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  accessToken: string | null
  loadingStates: AuthLoadingStates
}

export interface AuthStore extends AuthState {
  setStoreData: (
    data: Partial<AuthState> | ((state: AuthState) => Partial<AuthState>)
  ) => void
  reset: () => void
}


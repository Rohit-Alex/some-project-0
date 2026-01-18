import { apiPost } from '../../services/axios'
import { withMockData, shouldUseMockData } from '../../utils/withMockData'
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
} from './types'
import { mockLogin, mockRegister, mockForgotPassword } from './mocks'

// ==============================|| AUTH API SERVICES ||============================== //

const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  REFRESH_TOKEN: '/auth/refresh',
  ME: '/auth/me',
} as const

/**
 * Login user
 */
export async function loginService(data: LoginRequest): Promise<LoginResponse> {
  return withMockData(
    () => apiPost<LoginResponse, LoginRequest>(AUTH_ENDPOINTS.LOGIN, data),
    () => mockLogin(data),
    shouldUseMockData
  )
}

/**
 * Register new user
 */
export async function registerService(data: RegisterRequest): Promise<RegisterResponse> {
  return withMockData(
    () => apiPost<RegisterResponse, RegisterRequest>(AUTH_ENDPOINTS.REGISTER, data),
    () => mockRegister(data),
    shouldUseMockData
  )
}

/**
 * Request password reset
 */
export async function forgotPasswordService(
  data: ForgotPasswordRequest
): Promise<ForgotPasswordResponse> {
  return withMockData(
    () => apiPost<ForgotPasswordResponse, ForgotPasswordRequest>(AUTH_ENDPOINTS.FORGOT_PASSWORD, data),
    () => mockForgotPassword(data),
    shouldUseMockData
  )
}


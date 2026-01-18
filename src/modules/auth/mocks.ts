import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
} from './types'

// ==============================|| MOCK DATA ||============================== //

export function mockLogin(data: LoginRequest): LoginResponse {
  return {
    user: {
      id: '1',
      email: data.email,
      name: data.email.split('@')[0],
      firstName: 'John',
      lastName: 'Doe',
    },
    accessToken: 'mock-jwt-token-' + Date.now(),
  }
}

export function mockRegister(data: RegisterRequest): RegisterResponse {
  return {
    message: 'Registration successful! Please check your email to verify your account.',
    user: {
      id: '2',
      email: data.email,
      name: `${data.firstName} ${data.lastName}`,
      firstName: data.firstName,
      lastName: data.lastName,
    },
  }
}

export function mockForgotPassword(data: ForgotPasswordRequest): ForgotPasswordResponse {
  return {
    message: `Password reset email sent to ${data.email}`,
  }
}


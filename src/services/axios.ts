import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { ROUTES } from '../config/routes'

// ==============================|| AXIOS INSTANCE ||============================== //

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ==============================|| REQUEST INTERCEPTOR ||============================== //

const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('accessToken')
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}


axiosInstance.interceptors.request.use(
  requestInterceptor,
  (error) => {
    return Promise.reject(error)
  }
)

// ==============================|| RESPONSE INTERCEPTOR ||============================== //
const errorInterceptor = (error: any) => {
  console.error('Error in interceptor:', error)
  const { response } = error

  // Handle specific error codes
  if (response) {
    switch (response.status) {
      case 401:
        // Unauthorized - clear token and redirect to login
        localStorage.removeItem('accessToken')
        localStorage.removeItem('auth-storage')
        if (!window.location.pathname.includes('/login')) {
          window.location.href = ROUTES.LOGIN
        }
        break
      case 403:
        // Forbidden
        console.error('Access denied')
        break
      case 404:
        // Not found
        console.error('Resource not found')
        break
      case 500:
        // Server error
        console.error('Server error')
        break
    }
  }

  // Return a consistent error format
  return Promise.reject({
    message: response?.data?.message || error.message || 'An error occurred',
    status: response?.status,
    data: response?.data,
  })
}


axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  errorInterceptor
)

export default axiosInstance

// ==============================|| API HELPER FUNCTIONS ||============================== //

export async function apiGet<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await axiosInstance.get<T>(url, config)
  return response.data
}

export async function apiPost<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
  const response = await axiosInstance.post<T>(url, data, config)
  return response.data
}

export async function apiPut<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
  const response = await axiosInstance.put<T>(url, data, config)
  return response.data
}

export async function apiPatch<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
  const response = await axiosInstance.patch<T>(url, data, config)
  return response.data
}

export async function apiDelete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await axiosInstance.delete<T>(url, config)
  return response.data
}


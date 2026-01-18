import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { UseQueryOptions, UseMutationOptions } from '@tanstack/react-query'
import { apiGet, apiPost, apiPut, apiDelete } from '../axios'

// ==============================|| GENERIC API HOOKS ||============================== //

/**
 * Generic GET hook
 */
export function useApiGet<T>(
  queryKey: string[],
  url: string,
  options?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>
) {
  return useQuery<T>({
    queryKey,
    queryFn: () => apiGet<T>(url),
    ...options,
  })
}

/**
 * Generic POST hook
 */
export function useApiPost<T, D = unknown>(
  url: string,
  options?: Omit<UseMutationOptions<T, Error, D>, 'mutationFn'>
) {

  return useMutation<T, Error, D>({
    mutationFn: (data: D) => apiPost<T, D>(url, data),
    onSuccess: () => {
      // Optionally invalidate queries on success
    },
    ...options,
  })
}

/**
 * Generic PUT hook
 */
export function useApiPut<T, D = unknown>(
  url: string,
  options?: Omit<UseMutationOptions<T, Error, D>, 'mutationFn'>
) {
  return useMutation<T, Error, D>({
    mutationFn: (data: D) => apiPut<T, D>(url, data),
    ...options,
  })
}

/**
 * Generic DELETE hook
 */
export function useApiDelete<T>(
  url: string,
  options?: Omit<UseMutationOptions<T, Error, void>, 'mutationFn'>
) {
  return useMutation<T, Error, void>({
    mutationFn: () => apiDelete<T>(url),
    ...options,
  })
}

// ==============================|| SPECIALIZED HOOKS ||============================== //

/**
 * POST with query invalidation
 */
export function useApiPostWithInvalidation<T, D = unknown>(
  url: string,
  invalidateKeys: string[][],
  options?: Omit<UseMutationOptions<T, Error, D>, 'mutationFn'>
) {
  const queryClient = useQueryClient()

  return useMutation<T, Error, D>({
    mutationFn: (data: D) => apiPost<T, D>(url, data),
    onSuccess: () => {
      invalidateKeys.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key })
      })
    },
    ...options,
  })
}


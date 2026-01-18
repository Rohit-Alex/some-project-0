// ==============================|| MOCK DATA UTILITY ||============================== //

type MockDataGenerator<T> = T | (() => T) | (() => Promise<T>)

interface WithMockDataOptions {
  /** Delay in milliseconds before returning mock data */
  delay?: number
  /** Call the real API anyway (for logging/debugging) */
  callApiAnyway?: boolean
  /** Callback when mock data is used */
  onMockUsed?: () => void
}

const DEFAULT_OPTIONS: WithMockDataOptions = {
  delay: 500,
  callApiAnyway: false,
  onMockUsed: undefined,
}

// Check if we should use mock data from env
export const shouldUseMockData = import.meta.env.VITE_USE_MOCK_DATA === 'true'

/**
 * Utility to wrap API calls with mock data support
 *
 * @example
 * ```ts
 * const user = await withMockData(
 *   () => api.getUser(id),
 *   { id: '1', name: 'Mock User', email: 'mock@test.com' },
 *   shouldUseMockData
 * )
 * ```
 */
export async function withMockData<T>(
  apiCall: () => Promise<T>,
  mockData: MockDataGenerator<T>,
  useMockData: boolean,
  options: WithMockDataOptions = {}
): Promise<T> {
  const { delay, callApiAnyway, onMockUsed } = { ...DEFAULT_OPTIONS, ...options }

  // Use real API if mock data is disabled
  if (!useMockData) {
    return apiCall()
  }

  // Optionally call the real API for debugging
  if (callApiAnyway) {
    apiCall().catch((error) => {
      console.debug('[MockData] API call failed (using mock data):', error)
    })
  }

  // Notify that mock data is being used
  onMockUsed?.()

  if (import.meta.env.DEV) {
    console.debug('[MockData] Using mock data')
  }

  // Add artificial delay to simulate network latency
  if (delay && delay > 0) {
    await new Promise((resolve) => setTimeout(resolve, delay))
  }

  // Resolve mock data (can be a value, function, or async function)
  if (typeof mockData === 'function') {
    const mockFn = mockData as (() => T) | (() => Promise<T>)
    return mockFn()
  }

  return mockData
}

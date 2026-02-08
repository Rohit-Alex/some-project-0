// ==============================|| MOCK DATA UTILITY ||============================== //

type MockDataGenerator<T> = T | (() => T) | (() => Promise<T>)

interface WithMockDataOptions {
  delay?: number // in milliseconds
  callApiAnyway?: boolean
  onMockUsed?: () => void
}

const DEFAULT_OPTIONS: WithMockDataOptions = {
  delay: 500,
  callApiAnyway: true,
  onMockUsed: undefined,
}

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

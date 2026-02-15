import type { TimeRangeValue } from '@components/TimeRangeFilter'

/**
 * Calculate date range from TimeRangeValue
 * Used by event/data tables to convert UI time range to API date parameters
 */
export function getDateRangeFromTimeRange(timeRange: TimeRangeValue): {
  startDate?: string
  endDate?: string
} {
  if (timeRange.range === 'custom') {
    return {
      startDate: timeRange.startDate,
      endDate: timeRange.endDate,
    }
  }

  const now = new Date()
  const endDate = now.toISOString()
  let startDate: string

  switch (timeRange.range) {
    case '24h':
      startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString()
      break
    case '7d':
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
      break
    case '30d':
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString()
      break
    default:
      startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString()
  }

  return { startDate, endDate }
}

/**
 * Convert filter values from the Table component to API query params
 * Handles text, select, and date range filters
 */
export function filtersToApiParams(
  filters: Record<string, unknown>
): Record<string, string> {
  const result: Record<string, string> = {}

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      if (typeof value === 'string') {
        result[key] = value
      } else if (typeof value === 'object' && 'start' in (value as object)) {
        const dateRange = value as { start?: string; end?: string }
        if (dateRange.start) result[`${key}Start`] = dateRange.start
        if (dateRange.end) result[`${key}End`] = dateRange.end
      }
    }
  })

  return result
}

/**
 * Create a stable time range key for React Query caching
 * This prevents unnecessary re-fetches when the date object changes but the range is the same
 */
export function createTimeRangeKey(timeRange: TimeRangeValue): string {
  if (timeRange.range === 'custom') {
    return `custom:${timeRange.startDate || ''}:${timeRange.endDate || ''}`
  }
  return timeRange.range
}


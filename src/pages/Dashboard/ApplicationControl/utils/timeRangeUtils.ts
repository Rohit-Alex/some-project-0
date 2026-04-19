/**
 * Utilities for handling time range and data granularity
 */

export type DataGranularity = 'hourly' | 'daily' | 'weekly' | 'monthly'

export interface TimeRangeConfig {
  granularity: DataGranularity
  dataPoints: number
  intervalUnit: 'hour' | 'day' | 'week' | 'month'
  intervalValue: number
}

/**
 * Determines the appropriate data granularity based on the time range key
 */
export function getTimeRangeConfig(timeRangeKey: string): TimeRangeConfig {
  // Handle custom time ranges
  if (timeRangeKey.startsWith('custom:')) {
    const [, startDate, endDate] = timeRangeKey.split(':')
    if (startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      const diffHours = Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60)
      
      if (diffHours <= 24) {
        return { granularity: 'hourly', dataPoints: 24, intervalUnit: 'hour', intervalValue: 1 }
      } else if (diffHours <= 168) { // 7 days
        return { granularity: 'daily', dataPoints: 7, intervalUnit: 'day', intervalValue: 1 }
      } else if (diffHours <= 720) { // 30 days
        return { granularity: 'daily', dataPoints: 30, intervalUnit: 'day', intervalValue: 1 }
      } else {
        return { granularity: 'weekly', dataPoints: 12, intervalUnit: 'week', intervalValue: 1 }
      }
    }
  }

  // Handle predefined time ranges
  switch (timeRangeKey) {
    case '1h':
    case '6h':
    case '12h':
    case '24h':
      const totalHours = parseInt(timeRangeKey.replace('h', '')) || 24
      // For 24h, show every 3 hours to reduce crowding (8 data points)
      // For other ranges, show all hours
      const dataPoints = totalHours === 24 ? 8 : totalHours
      const intervalValue = totalHours === 24 ? 3 : 1
      
      return { 
        granularity: 'hourly', 
        dataPoints,
        intervalUnit: 'hour',
        intervalValue
      }
    
    case '7d':
    case '1w':
      return { 
        granularity: 'daily', 
        dataPoints: 7,
        intervalUnit: 'day',
        intervalValue: 1
      }
    
    case '30d':
    case '1m':
      return { 
        granularity: 'daily', 
        dataPoints: 30,
        intervalUnit: 'day',
        intervalValue: 1
      }
    
    case '90d':
    case '3m':
      return { 
        granularity: 'weekly', 
        dataPoints: 12,
        intervalUnit: 'week',
        intervalValue: 1
      }
    
    case '6m':
      return { 
        granularity: 'weekly', 
        dataPoints: 24,
        intervalUnit: 'week',
        intervalValue: 1
      }
    
    case '1y':
      return { 
        granularity: 'monthly', 
        dataPoints: 12,
        intervalUnit: 'month',
        intervalValue: 1
      }
    
    default:
      // Default to daily for unknown ranges
      return { 
        granularity: 'daily', 
        dataPoints: 7,
        intervalUnit: 'day',
        intervalValue: 1
      }
  }
}

/**
 * Generates time-aware data points based on the time range configuration
 */
export function generateTimeAwareDataPoints(
  config: TimeRangeConfig,
  dataGenerator: (date: Date, index: number) => any
): any[] {
  const data: any[] = []
  const now = new Date()
  
  for (let i = config.dataPoints - 1; i >= 0; i--) {
    const date = new Date(now)
    
    switch (config.intervalUnit) {
      case 'hour':
        date.setHours(date.getHours() - i * config.intervalValue)
        break
      case 'day':
        date.setDate(date.getDate() - i * config.intervalValue)
        break
      case 'week':
        date.setDate(date.getDate() - i * 7 * config.intervalValue)
        break
      case 'month':
        date.setMonth(date.getMonth() - i * config.intervalValue)
        break
    }
    
    data.push(dataGenerator(date, i))
  }
  
  return data
}

/**
 * Formats date based on granularity for backend/data processing (full precision)
 */
export function formatDateForBackend(date: Date, granularity: DataGranularity): string {
  switch (granularity) {
    case 'hourly':
      return date.toISOString().slice(0, 13) + ':00:00Z' // YYYY-MM-DDTHH:00:00Z
    case 'daily':
      return date.toISOString().split('T')[0] // YYYY-MM-DD
    case 'weekly':
      // Get start of week (Monday)
      const startOfWeek = new Date(date)
      startOfWeek.setDate(date.getDate() - date.getDay() + 1)
      return startOfWeek.toISOString().split('T')[0]
    case 'monthly':
      return date.toISOString().slice(0, 7) + '-01' // YYYY-MM-01
    default:
      return date.toISOString().split('T')[0]
  }
}

/**
 * Formats date based on granularity for display (user-friendly)
 */
export function formatDateForGranularity(date: Date, granularity: DataGranularity): string {
  switch (granularity) {
    case 'hourly':
      // Format as "1 AM", "2 AM", "5 PM", etc.
      const hour = date.getHours()
      const ampm = hour >= 12 ? 'PM' : 'AM'
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
      return `${displayHour} ${ampm}`
    case 'daily':
      return date.toISOString().split('T')[0] // YYYY-MM-DD
    case 'weekly':
      // Get start of week (Monday)
      const startOfWeek = new Date(date)
      startOfWeek.setDate(date.getDate() - date.getDay() + 1)
      return startOfWeek.toISOString().split('T')[0]
    case 'monthly':
      return date.toISOString().slice(0, 7) + '-01' // YYYY-MM-01
    default:
      return date.toISOString().split('T')[0]
  }
}
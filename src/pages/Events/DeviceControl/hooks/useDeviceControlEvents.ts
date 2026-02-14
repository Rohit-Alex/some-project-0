import { useQuery } from '@tanstack/react-query'
import { deviceControlService } from '../services'
import type { DeviceControlListParams } from '../types'

export const QUERY_KEYS = {
  list: 'deviceControlEvents',
} as const

interface UseDeviceControlEventsParams extends Omit<DeviceControlListParams, 'startDate' | 'endDate'> {
  timeRangeKey: string // Use stable key like "24h" or "custom:start:end"
  startDate?: string
  endDate?: string
}

export function useDeviceControlEvents(params: UseDeviceControlEventsParams) {
  const { page, limit, sortBy, sortDirection, filters, timeRangeKey, startDate, endDate } = params

  // Stringify filters for stable comparison
  const filtersKey = JSON.stringify(filters ?? {})

  return useQuery({
    // Use timeRangeKey instead of dynamic dates for stable query key
    queryKey: [QUERY_KEYS.list, page, limit, sortBy, sortDirection, timeRangeKey, filtersKey],
    queryFn: () =>
      deviceControlService.getList({
        page,
        limit,
        sortBy,
        sortDirection,
        filters,
        startDate,
        endDate,
      }),
    staleTime: 30000, // 30 seconds
    refetchOnWindowFocus: false,
  })
}

export function useExportDeviceControlEvents() {
  const exportData = async () => {
    const data = await deviceControlService.exportData()
    // Convert to CSV and download
    const headers = Object.keys(data[0] || {}).join(',')
    const rows = data.map((row) => Object.values(row).join(','))
    const csv = [headers, ...rows].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `device-control-events-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return { exportData }
}

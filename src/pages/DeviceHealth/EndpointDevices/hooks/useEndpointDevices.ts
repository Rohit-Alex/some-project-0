import { useQuery } from '@tanstack/react-query'
import { endpointDeviceService } from '../services'
import type { EndpointDeviceListParams } from '../types'

export const QUERY_KEYS = {
  list: 'endpointDevices',
} as const

interface UseEndpointDevicesParams extends Omit<EndpointDeviceListParams, 'startDate' | 'endDate'> {
  timeRangeKey: string // Use stable key like "24h" or "custom:start:end"
  startDate?: string
  endDate?: string
}

export function useEndpointDevices(params: UseEndpointDevicesParams) {
  const { page, limit, sortBy, sortDirection, filters, timeRangeKey, startDate, endDate } = params

  // Stringify filters for stable comparison
  const filtersKey = JSON.stringify(filters ?? {})

  return useQuery({
    // Use timeRangeKey instead of dynamic dates for stable query key
    queryKey: [QUERY_KEYS.list, page, limit, sortBy, sortDirection, timeRangeKey, filtersKey],
    queryFn: () =>
      endpointDeviceService.getList({
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

export function useExportEndpointDevices() {
  const exportData = async () => {
    const data = await endpointDeviceService.exportData()
    // Convert to CSV and download
    const headers = Object.keys(data[0] || {}).join(',')
    const rows = data.map((row) => Object.values(row).join(','))
    const csv = [headers, ...rows].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `endpoint-devices-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return { exportData }
}

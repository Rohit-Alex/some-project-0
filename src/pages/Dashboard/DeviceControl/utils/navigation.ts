export interface DeviceControlEventFilters {
  status?: 'total' | 'allowed' | 'blocked' | 'alerted'
  deviceType?: string
  department?: string
  timeRangeKey?: string
  startDate?: string
  endDate?: string
  searchTerm?: string
}

export function openDeviceControlEvents(filters: DeviceControlEventFilters = {}): void {
  const params = new URLSearchParams()

  if (filters.status) {
    params.set('status', filters.status)
  }
  if (filters.deviceType) {
    params.set('deviceType', filters.deviceType)
  }
  if (filters.department) {
    params.set('department', filters.department)
  }
  if (filters.timeRangeKey) {
    params.set('timeRange', filters.timeRangeKey)
  }
  if (filters.startDate) {
    params.set('startDate', filters.startDate)
  }
  if (filters.endDate) {
    params.set('endDate', filters.endDate)
  }
  if (filters.searchTerm) {
    params.set('search', filters.searchTerm)
  }

  const baseUrl = '/events/device-control'
  const url = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl

  window.open(url, '_blank', 'noopener,noreferrer')
}

export function openDeviceControlEventsByStatus(
  status: 'total' | 'allowed' | 'blocked' | 'alerted',
  timeRangeKey?: string,
  startDate?: string,
  endDate?: string
): void {
  openDeviceControlEvents({ status, timeRangeKey, startDate, endDate })
}

export function openDeviceControlEventsByDeviceType(
  deviceType: string,
  status?: 'allowed' | 'blocked',
  timeRangeKey?: string,
  startDate?: string,
  endDate?: string
): void {
  openDeviceControlEvents({ deviceType, status, timeRangeKey, startDate, endDate })
}

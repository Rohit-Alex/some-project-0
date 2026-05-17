export interface DataTransferEventFilters {
  status?: 'total' | 'allowed' | 'blocked' | 'logged'
  fileType?: string
  deviceType?: string
  department?: string
  timeRangeKey?: string
  startDate?: string
  endDate?: string
  searchTerm?: string
}

export function openDataTransferEvents(filters: DataTransferEventFilters = {}): void {
  const params = new URLSearchParams()

  if (filters.status) {
    params.set('status', filters.status)
  }
  if (filters.fileType) {
    params.set('fileType', filters.fileType)
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

  const baseUrl = '/events/data-transfer'
  const url = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl

  window.open(url, '_blank', 'noopener,noreferrer')
}

export function openDataTransferEventsByStatus(
  status: 'total' | 'allowed' | 'blocked' | 'logged',
  timeRangeKey?: string,
  startDate?: string,
  endDate?: string
): void {
  openDataTransferEvents({ status, timeRangeKey, startDate, endDate })
}

export function openDataTransferEventsByDeviceType(
  deviceType: string,
  status?: 'allowed' | 'blocked' | 'logged',
  timeRangeKey?: string,
  startDate?: string,
  endDate?: string
): void {
  openDataTransferEvents({ deviceType, status, timeRangeKey, startDate, endDate })
}

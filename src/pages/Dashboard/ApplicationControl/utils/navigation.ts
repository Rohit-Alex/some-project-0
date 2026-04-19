/**
 * Utility functions for navigating to application lists with specific filters
 */

export interface ApplicationFilters {
  status?: 'total' | 'new' | 'blocked' | 'warned'
  category?: string
  vendor?: string
  department?: string
  timeRangeKey?: string
  startDate?: string
  endDate?: string
  searchTerm?: string
}

/**
 * Opens a new tab with the applications list filtered by the provided criteria
 */
export function openApplicationsList(filters: ApplicationFilters = {}): void {
  const params = new URLSearchParams()
  
  // Add filters as query parameters
  if (filters.status) {
    params.set('status', filters.status)
  }
  if (filters.category) {
    params.set('category', filters.category)
  }
  if (filters.vendor) {
    params.set('vendor', filters.vendor)
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

  // Construct the URL for the applications list page
  const baseUrl = '/policy-management/application-control-policy/application-inventory'
  const url = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl

  // Open in new tab
  window.open(url, '_blank', 'noopener,noreferrer')
}

/**
 * Opens applications list filtered by status (total, new, blocked, warned)
 */
export function openApplicationsByStatus(
  status: 'total' | 'new' | 'blocked' | 'warned',
  timeRangeKey?: string,
  startDate?: string,
  endDate?: string
): void {
  openApplicationsList({ status, timeRangeKey, startDate, endDate })
}

/**
 * Opens applications list filtered by category
 */
export function openApplicationsByCategory(
  category: string,
  timeRangeKey?: string,
  startDate?: string,
  endDate?: string
): void {
  openApplicationsList({ category, timeRangeKey, startDate, endDate })
}

/**
 * Opens applications list filtered by vendor
 */
export function openApplicationsByVendor(
  vendor: string,
  timeRangeKey?: string,
  startDate?: string,
  endDate?: string
): void {
  openApplicationsList({ vendor, timeRangeKey, startDate, endDate })
}

/**
 * Opens applications list filtered by department
 */
export function openApplicationsByDepartment(
  department: string,
  timeRangeKey?: string,
  startDate?: string,
  endDate?: string
): void {
  openApplicationsList({ department, timeRangeKey, startDate, endDate })
}

/**
 * Opens applications list with a specific search term
 */
export function openApplicationsBySearch(
  searchTerm: string,
  timeRangeKey?: string,
  startDate?: string,
  endDate?: string
): void {
  openApplicationsList({ searchTerm, timeRangeKey, startDate, endDate })
}
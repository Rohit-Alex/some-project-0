import { useSearchParams } from 'react-router-dom'
import { useMemo, useCallback } from 'react'
import type { SortDirection, FilterValues } from '@components/Table/types'
import type { TimeRangeValue } from '@components/TimeRangeFilter'

interface TableParamsState {
  page: number
  rowsPerPage: number
  sortBy?: string
  sortDirection: SortDirection
  filters: FilterValues
  timeRange: TimeRangeValue
}

interface UseTableParamsOptions {
  defaultRowsPerPage?: number
  defaultSortBy?: string
  defaultSortDirection?: SortDirection
  defaultTimeRange?: TimeRangeValue
}

// Stable default values - defined outside the hook
const DEFAULT_TIME_RANGE: TimeRangeValue = { range: '24h' }

export function useTableParams(options: UseTableParamsOptions = {}) {
  const [searchParams, setSearchParams] = useSearchParams()

  const {
    defaultRowsPerPage = 10,
    defaultSortBy,
    defaultSortDirection = 'asc',
  } = options
  
  // Use the provided defaultTimeRange or fallback to stable default
  const defaultTimeRangeRange = options.defaultTimeRange?.range ?? DEFAULT_TIME_RANGE.range

  // Parse current state from URL - use primitive values in dependency array
  const page = parseInt(searchParams.get('page') || '0', 10)
  const rowsPerPage = parseInt(searchParams.get('limit') || String(defaultRowsPerPage), 10)
  const sortBy = searchParams.get('sortBy') || defaultSortBy
  const sortDirection = (searchParams.get('sortDir') as SortDirection) || defaultSortDirection

  // Parse time range
  const rangeParam = searchParams.get('range') as TimeRangeValue['range'] | null
  const startDateParam = searchParams.get('startDate')
  const endDateParam = searchParams.get('endDate')
  
  const timeRange: TimeRangeValue = useMemo(() => ({
    range: rangeParam || defaultTimeRangeRange,
    startDate: startDateParam || undefined,
    endDate: endDateParam || undefined,
  }), [rangeParam, startDateParam, endDateParam, defaultTimeRangeRange])

  // Parse filters - memoized with searchParams string as key
  const searchParamsString = searchParams.toString()
  const filters: FilterValues = useMemo(() => {
    const result: FilterValues = {}
    searchParams.forEach((value, key) => {
      if (key.startsWith('f_')) {
        const filterKey = key.slice(2)
        if (value.includes('|')) {
          const [start, end] = value.split('|')
          result[filterKey] = { start, end }
        } else {
          result[filterKey] = value
        }
      }
    })
    return result
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParamsString])

  // Update URL params
  const updateParams = useCallback(
    (updates: Partial<TableParamsState>) => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev)

        if (updates.page !== undefined) {
          if (updates.page === 0) {
            newParams.delete('page')
          } else {
            newParams.set('page', String(updates.page))
          }
        }

        if (updates.rowsPerPage !== undefined) {
          if (updates.rowsPerPage === defaultRowsPerPage) {
            newParams.delete('limit')
          } else {
            newParams.set('limit', String(updates.rowsPerPage))
          }
        }

        if (updates.sortBy !== undefined) {
          if (updates.sortBy === defaultSortBy) {
            newParams.delete('sortBy')
          } else {
            newParams.set('sortBy', updates.sortBy)
          }
        }

        if (updates.sortDirection !== undefined) {
          if (updates.sortDirection === defaultSortDirection) {
            newParams.delete('sortDir')
          } else {
            newParams.set('sortDir', updates.sortDirection)
          }
        }

        if (updates.timeRange !== undefined) {
          if (updates.timeRange.range === defaultTimeRangeRange) {
            newParams.delete('range')
          } else {
            newParams.set('range', updates.timeRange.range)
          }
          if (updates.timeRange.startDate) {
            newParams.set('startDate', updates.timeRange.startDate)
          } else {
            newParams.delete('startDate')
          }
          if (updates.timeRange.endDate) {
            newParams.set('endDate', updates.timeRange.endDate)
          } else {
            newParams.delete('endDate')
          }
        }

        if (updates.filters !== undefined) {
          // Remove old filter params
          const keysToDelete: string[] = []
          newParams.forEach((_, key) => {
            if (key.startsWith('f_')) {
              keysToDelete.push(key)
            }
          })
          keysToDelete.forEach((key) => newParams.delete(key))

          // Add new filter params
          Object.entries(updates.filters).forEach(([key, value]) => {
            if (value) {
              if (typeof value === 'object' && 'start' in value) {
                if (value.start || value.end) {
                  newParams.set(`f_${key}`, `${value.start || ''}|${value.end || ''}`)
                }
              } else if (typeof value === 'string' && value) {
                newParams.set(`f_${key}`, value)
              } else if (Array.isArray(value) && value.length > 0) {
                newParams.set(`f_${key}`, value.join(','))
              }
            }
          })
        }

        return newParams
      })
    },
    [setSearchParams, defaultRowsPerPage, defaultSortBy, defaultSortDirection, defaultTimeRangeRange]
  )

  // Convenience handlers
  const setPage = useCallback(
    (newPage: number) => updateParams({ page: newPage }),
    [updateParams]
  )

  const setRowsPerPage = useCallback(
    (newRowsPerPage: number) => updateParams({ page: 0, rowsPerPage: newRowsPerPage }),
    [updateParams]
  )

  const setSort = useCallback(
    (newSortBy: string, newSortDirection: SortDirection) => 
      updateParams({ sortBy: newSortBy, sortDirection: newSortDirection }),
    [updateParams]
  )

  const setFilter = useCallback(
    (columnId: string, value: string | string[] | { start?: string; end?: string }) => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev)
        
        // Reset to first page
        newParams.delete('page')
        
        // Update the specific filter
        const filterKey = `f_${columnId}`
        if (!value || (typeof value === 'string' && !value) || (Array.isArray(value) && value.length === 0)) {
          newParams.delete(filterKey)
        } else if (typeof value === 'object' && 'start' in value) {
          if (value.start || value.end) {
            newParams.set(filterKey, `${value.start || ''}|${value.end || ''}`)
          } else {
            newParams.delete(filterKey)
          }
        } else if (typeof value === 'string') {
          newParams.set(filterKey, value)
        } else if (Array.isArray(value)) {
          newParams.set(filterKey, value.join(','))
        }
        
        return newParams
      })
    },
    [setSearchParams]
  )

  const setTimeRange = useCallback(
    (newTimeRange: TimeRangeValue) => updateParams({ page: 0, timeRange: newTimeRange }),
    [updateParams]
  )

  const clearFilters = useCallback(() => {
    updateParams({ page: 0, filters: {} })
  }, [updateParams])

  return {
    page,
    rowsPerPage,
    sortBy,
    sortDirection,
    filters,
    timeRange,
    setPage,
    setRowsPerPage,
    setSort,
    setFilter,
    setTimeRange,
    clearFilters,
    updateParams,
  }
}

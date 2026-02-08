import { useQuery } from '@tanstack/react-query'
import {
  getAppControlStats,
  getApplicationFootprint,
  getCategoryInventory,
  getVendorInventory,
  getNewAppTrend,
  getRecentInstalls,
  getDeptApplications,
  getBlockEventsByCategory,
  getTopBlockedApps,
  getUserBlockEvents,
  getEndpointBlockEvents,
} from '../services'
import type { ApplicationControlFilters } from '../types'

// ==============================|| APPLICATION CONTROL HOOKS - PER WIDGET ||============================== //

interface UseWidgetParams extends ApplicationControlFilters {
  timeRangeKey: string
  enabled?: boolean
}

const STALE_TIME = 30000
const QUERY_OPTIONS = { staleTime: STALE_TIME, refetchOnWindowFocus: false }

export const useAppControlStats = (params: UseWidgetParams) => {
  const { timeRangeKey, startDate, endDate, enabled = true } = params
  return useQuery({
    queryKey: ['app-control-stats', timeRangeKey, startDate, endDate],
    queryFn: () => getAppControlStats({ startDate, endDate }),
    enabled,
    ...QUERY_OPTIONS,
  })
}

export const useApplicationFootprint = (params: UseWidgetParams) => {
  const { timeRangeKey, startDate, endDate, enabled = true } = params
  return useQuery({
    queryKey: ['app-control-footprint', timeRangeKey, startDate, endDate],
    queryFn: () => getApplicationFootprint({ startDate, endDate }),
    enabled,
    ...QUERY_OPTIONS,
  })
}

export const useCategoryInventory = (params: UseWidgetParams) => {
  const { timeRangeKey, startDate, endDate, enabled = true } = params
  return useQuery({
    queryKey: ['app-control-categories', timeRangeKey, startDate, endDate],
    queryFn: () => getCategoryInventory({ startDate, endDate }),
    enabled,
    ...QUERY_OPTIONS,
  })
}

export const useVendorInventory = (params: UseWidgetParams) => {
  const { timeRangeKey, startDate, endDate, enabled = true } = params
  return useQuery({
    queryKey: ['app-control-vendors', timeRangeKey, startDate, endDate],
    queryFn: () => getVendorInventory({ startDate, endDate }),
    enabled,
    ...QUERY_OPTIONS,
  })
}

export const useNewAppTrend = (params: UseWidgetParams) => {
  const { timeRangeKey, startDate, endDate, enabled = true } = params
  return useQuery({
    queryKey: ['app-control-new-trend', timeRangeKey, startDate, endDate],
    queryFn: () => getNewAppTrend({ startDate, endDate }),
    enabled,
    ...QUERY_OPTIONS,
  })
}

export const useRecentInstalls = (params: UseWidgetParams) => {
  const { timeRangeKey, startDate, endDate, enabled = true } = params
  return useQuery({
    queryKey: ['app-control-recent-installs', timeRangeKey, startDate, endDate],
    queryFn: () => getRecentInstalls({ startDate, endDate }),
    enabled,
    ...QUERY_OPTIONS,
  })
}

export const useDeptApplications = (params: UseWidgetParams) => {
  const { timeRangeKey, startDate, endDate, enabled = true } = params
  return useQuery({
    queryKey: ['app-control-dept-apps', timeRangeKey, startDate, endDate],
    queryFn: () => getDeptApplications({ startDate, endDate }),
    enabled,
    ...QUERY_OPTIONS,
  })
}

export const useBlockEventsByCategory = (params: UseWidgetParams) => {
  const { timeRangeKey, startDate, endDate, enabled = true } = params
  return useQuery({
    queryKey: ['app-control-block-by-category', timeRangeKey, startDate, endDate],
    queryFn: () => getBlockEventsByCategory({ startDate, endDate }),
    enabled,
    ...QUERY_OPTIONS,
  })
}

export const useTopBlockedApps = (params: UseWidgetParams) => {
  const { timeRangeKey, startDate, endDate, enabled = true } = params
  return useQuery({
    queryKey: ['app-control-top-blocked', timeRangeKey, startDate, endDate],
    queryFn: () => getTopBlockedApps({ startDate, endDate }),
    enabled,
    ...QUERY_OPTIONS,
  })
}

export const useUserBlockEvents = (params: UseWidgetParams) => {
  const { timeRangeKey, startDate, endDate, enabled = true } = params
  return useQuery({
    queryKey: ['app-control-user-blocks', timeRangeKey, startDate, endDate],
    queryFn: () => getUserBlockEvents({ startDate, endDate }),
    enabled,
    ...QUERY_OPTIONS,
  })
}

export const useEndpointBlockEvents = (params: UseWidgetParams) => {
  const { timeRangeKey, startDate, endDate, enabled = true } = params
  return useQuery({
    queryKey: ['app-control-endpoint-blocks', timeRangeKey, startDate, endDate],
    queryFn: () => getEndpointBlockEvents({ startDate, endDate }),
    enabled,
    ...QUERY_OPTIONS,
  })
}

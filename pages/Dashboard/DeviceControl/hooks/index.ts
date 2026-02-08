import { useQuery } from '@tanstack/react-query'
import {
  getDeviceControlStats,
  getRecentDeviceEvents,
  getBlockedByDeviceType,
  getAllowedByDeviceType,
  getTopUsersByEvents,
  getTopEndpointsByEvents,
  getVendorBreakdown,
  getPolicyEvents,
  getDepartmentBlocked,
  getAlertVolume,
  getEventTrend,
  getSuspiciousDevices,
} from '../services'
import type { DeviceControlFilters } from '../types'

// ==============================|| DEVICE CONTROL HOOKS - PER WIDGET ||============================== //

interface UseWidgetParams extends DeviceControlFilters {
  timeRangeKey: string
  enabled?: boolean
}

const STALE_TIME = 30000
const QUERY_OPTIONS = { staleTime: STALE_TIME, refetchOnWindowFocus: false }

export const useDeviceControlStats = (params: UseWidgetParams) => {
  const { timeRangeKey, startDate, endDate, enabled = true } = params
  return useQuery({
    queryKey: ['device-control-stats', timeRangeKey, startDate, endDate],
    queryFn: () => getDeviceControlStats({ startDate, endDate }),
    enabled,
    ...QUERY_OPTIONS,
  })
}

export const useRecentDeviceEvents = (params: UseWidgetParams) => {
  const { timeRangeKey, startDate, endDate, enabled = true } = params
  return useQuery({
    queryKey: ['device-control-recent-events', timeRangeKey, startDate, endDate],
    queryFn: () => getRecentDeviceEvents({ startDate, endDate }),
    enabled,
    ...QUERY_OPTIONS,
  })
}

export const useBlockedByDeviceType = (params: UseWidgetParams) => {
  const { timeRangeKey, startDate, endDate, enabled = true } = params
  return useQuery({
    queryKey: ['device-control-blocked-by-type', timeRangeKey, startDate, endDate],
    queryFn: () => getBlockedByDeviceType({ startDate, endDate }),
    enabled,
    ...QUERY_OPTIONS,
  })
}

export const useAllowedByDeviceType = (params: UseWidgetParams) => {
  const { timeRangeKey, startDate, endDate, enabled = true } = params
  return useQuery({
    queryKey: ['device-control-allowed-by-type', timeRangeKey, startDate, endDate],
    queryFn: () => getAllowedByDeviceType({ startDate, endDate }),
    enabled,
    ...QUERY_OPTIONS,
  })
}

export const useTopUsersByEvents = (params: UseWidgetParams) => {
  const { timeRangeKey, startDate, endDate, enabled = true } = params
  return useQuery({
    queryKey: ['device-control-top-users', timeRangeKey, startDate, endDate],
    queryFn: () => getTopUsersByEvents({ startDate, endDate }),
    enabled,
    ...QUERY_OPTIONS,
  })
}

export const useTopEndpointsByEvents = (params: UseWidgetParams) => {
  const { timeRangeKey, startDate, endDate, enabled = true } = params
  return useQuery({
    queryKey: ['device-control-top-endpoints', timeRangeKey, startDate, endDate],
    queryFn: () => getTopEndpointsByEvents({ startDate, endDate }),
    enabled,
    ...QUERY_OPTIONS,
  })
}

export const useVendorBreakdown = (params: UseWidgetParams) => {
  const { timeRangeKey, startDate, endDate, enabled = true } = params
  return useQuery({
    queryKey: ['device-control-vendor-breakdown', timeRangeKey, startDate, endDate],
    queryFn: () => getVendorBreakdown({ startDate, endDate }),
    enabled,
    ...QUERY_OPTIONS,
  })
}

export const usePolicyEvents = (params: UseWidgetParams) => {
  const { timeRangeKey, startDate, endDate, enabled = true } = params
  return useQuery({
    queryKey: ['device-control-policy-events', timeRangeKey, startDate, endDate],
    queryFn: () => getPolicyEvents({ startDate, endDate }),
    enabled,
    ...QUERY_OPTIONS,
  })
}

export const useDepartmentBlocked = (params: UseWidgetParams) => {
  const { timeRangeKey, startDate, endDate, enabled = true } = params
  return useQuery({
    queryKey: ['device-control-department-blocked', timeRangeKey, startDate, endDate],
    queryFn: () => getDepartmentBlocked({ startDate, endDate }),
    enabled,
    ...QUERY_OPTIONS,
  })
}

export const useAlertVolume = (params: UseWidgetParams) => {
  const { timeRangeKey, startDate, endDate, enabled = true } = params
  return useQuery({
    queryKey: ['device-control-alert-volume', timeRangeKey, startDate, endDate],
    queryFn: () => getAlertVolume({ startDate, endDate }),
    enabled,
    ...QUERY_OPTIONS,
  })
}

export const useEventTrend = (params: UseWidgetParams) => {
  const { timeRangeKey, startDate, endDate, enabled = true } = params
  return useQuery({
    queryKey: ['device-control-event-trend', timeRangeKey, startDate, endDate],
    queryFn: () => getEventTrend({ startDate, endDate }),
    enabled,
    ...QUERY_OPTIONS,
  })
}

export const useSuspiciousDevices = (params: UseWidgetParams) => {
  const { timeRangeKey, startDate, endDate, enabled = true } = params
  return useQuery({
    queryKey: ['device-control-suspicious-devices', timeRangeKey, startDate, endDate],
    queryFn: () => getSuspiciousDevices({ startDate, endDate }),
    enabled,
    ...QUERY_OPTIONS,
  })
}

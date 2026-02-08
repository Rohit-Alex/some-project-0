import { useQuery } from '@tanstack/react-query'
import {
  getDataTransferStats,
  getRecentTransfers,
  getBlockedByDeviceType,
  getAllowedLoggedTransfers,
  getTopUsers,
  getTopEndpoints,
  getFileTypeBreakdown,
  getPolicyEvents,
  getDepartmentBlocked,
  getAlertVolume,
  getTransferTrend,
  getSuspiciousTransfers,
} from '../services'
import type { DataTransferFilters } from '../types'

// ==============================|| DATA TRANSFER HOOKS - PER WIDGET ||============================== //

interface UseWidgetParams extends DataTransferFilters {
  timeRangeKey: string
  enabled?: boolean
}

const STALE_TIME = 30000
const QUERY_OPTIONS = { staleTime: STALE_TIME, refetchOnWindowFocus: false }

export const useDataTransferStats = (params: UseWidgetParams) => {
  const { timeRangeKey, startDate, endDate, enabled = true } = params
  return useQuery({
    queryKey: ['data-transfer-stats', timeRangeKey, startDate, endDate],
    queryFn: () => getDataTransferStats({ startDate, endDate }),
    enabled,
    ...QUERY_OPTIONS,
  })
}

export const useRecentTransfers = (params: UseWidgetParams) => {
  const { timeRangeKey, startDate, endDate, enabled = true } = params
  return useQuery({
    queryKey: ['data-transfer-recent', timeRangeKey, startDate, endDate],
    queryFn: () => getRecentTransfers({ startDate, endDate }),
    enabled,
    ...QUERY_OPTIONS,
  })
}

export const useBlockedByDeviceType = (params: UseWidgetParams) => {
  const { timeRangeKey, startDate, endDate, enabled = true } = params
  return useQuery({
    queryKey: ['data-transfer-blocked-by-type', timeRangeKey, startDate, endDate],
    queryFn: () => getBlockedByDeviceType({ startDate, endDate }),
    enabled,
    ...QUERY_OPTIONS,
  })
}

export const useAllowedLoggedTransfers = (params: UseWidgetParams) => {
  const { timeRangeKey, startDate, endDate, enabled = true } = params
  return useQuery({
    queryKey: ['data-transfer-allowed-logged', timeRangeKey, startDate, endDate],
    queryFn: () => getAllowedLoggedTransfers({ startDate, endDate }),
    enabled,
    ...QUERY_OPTIONS,
  })
}

export const useTopUsers = (params: UseWidgetParams) => {
  const { timeRangeKey, startDate, endDate, enabled = true } = params
  return useQuery({
    queryKey: ['data-transfer-top-users', timeRangeKey, startDate, endDate],
    queryFn: () => getTopUsers({ startDate, endDate }),
    enabled,
    ...QUERY_OPTIONS,
  })
}

export const useTopEndpoints = (params: UseWidgetParams) => {
  const { timeRangeKey, startDate, endDate, enabled = true } = params
  return useQuery({
    queryKey: ['data-transfer-top-endpoints', timeRangeKey, startDate, endDate],
    queryFn: () => getTopEndpoints({ startDate, endDate }),
    enabled,
    ...QUERY_OPTIONS,
  })
}

export const useFileTypeBreakdown = (params: UseWidgetParams) => {
  const { timeRangeKey, startDate, endDate, enabled = true } = params
  return useQuery({
    queryKey: ['data-transfer-file-types', timeRangeKey, startDate, endDate],
    queryFn: () => getFileTypeBreakdown({ startDate, endDate }),
    enabled,
    ...QUERY_OPTIONS,
  })
}

export const usePolicyEvents = (params: UseWidgetParams) => {
  const { timeRangeKey, startDate, endDate, enabled = true } = params
  return useQuery({
    queryKey: ['data-transfer-policy-events', timeRangeKey, startDate, endDate],
    queryFn: () => getPolicyEvents({ startDate, endDate }),
    enabled,
    ...QUERY_OPTIONS,
  })
}

export const useDepartmentBlocked = (params: UseWidgetParams) => {
  const { timeRangeKey, startDate, endDate, enabled = true } = params
  return useQuery({
    queryKey: ['data-transfer-department-blocked', timeRangeKey, startDate, endDate],
    queryFn: () => getDepartmentBlocked({ startDate, endDate }),
    enabled,
    ...QUERY_OPTIONS,
  })
}

export const useAlertVolume = (params: UseWidgetParams) => {
  const { timeRangeKey, startDate, endDate, enabled = true } = params
  return useQuery({
    queryKey: ['data-transfer-alert-volume', timeRangeKey, startDate, endDate],
    queryFn: () => getAlertVolume({ startDate, endDate }),
    enabled,
    ...QUERY_OPTIONS,
  })
}

export const useTransferTrend = (params: UseWidgetParams) => {
  const { timeRangeKey, startDate, endDate, enabled = true } = params
  return useQuery({
    queryKey: ['data-transfer-trend', timeRangeKey, startDate, endDate],
    queryFn: () => getTransferTrend({ startDate, endDate }),
    enabled,
    ...QUERY_OPTIONS,
  })
}

export const useSuspiciousTransfers = (params: UseWidgetParams) => {
  const { timeRangeKey, startDate, endDate, enabled = true } = params
  return useQuery({
    queryKey: ['data-transfer-suspicious', timeRangeKey, startDate, endDate],
    queryFn: () => getSuspiciousTransfers({ startDate, endDate }),
    enabled,
    ...QUERY_OPTIONS,
  })
}

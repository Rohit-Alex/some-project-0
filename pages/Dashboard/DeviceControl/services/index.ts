import { apiGet } from '@services/index'
import { withMockData, shouldUseMockData } from '@utils/withMockData'
import {
  generateMockStats,
  generateMockRecentEvents,
  generateMockBlockedByType,
  generateMockAllowedByType,
  generateMockTopUsers,
  generateMockTopEndpoints,
  generateMockVendorBreakdown,
  generateMockPolicyEvents,
  generateMockDeptBlocked,
  generateMockAlertVolume,
  generateMockEventTrend,
  generateMockSuspiciousDevices,
} from '../mockedData'
import type {
  DeviceControlStats,
  DeviceConnectionEvent,
  DeviceTypeBreakdown,
  TopUserDeviceEvents,
  TopEndpointDeviceEvents,
  DeviceVendorBreakdown,
  PolicyTriggeredEvent,
  DepartmentBlockedAttempts,
  AlertIncidentVolume,
  DeviceEventTrend,
  SuspiciousDevice,
  DeviceControlFilters,
} from '../types'

// ==============================|| DEVICE CONTROL SERVICES - PER WIDGET ||============================== //

export interface WidgetParams extends DeviceControlFilters {
  startDate?: string
  endDate?: string
}

export const getDeviceControlStats = async (params: WidgetParams): Promise<DeviceControlStats> => {
  return withMockData(
    () => apiGet<DeviceControlStats>('/device-control/stats', { params }),
    generateMockStats,
    shouldUseMockData
  )
}

export const getRecentDeviceEvents = async (params: WidgetParams): Promise<DeviceConnectionEvent[]> => {
  return withMockData(
    () => apiGet<DeviceConnectionEvent[]>('/device-control/recent-events', { params }),
    generateMockRecentEvents,
    shouldUseMockData
  )
}

export const getBlockedByDeviceType = async (params: WidgetParams): Promise<DeviceTypeBreakdown[]> => {
  return withMockData(
    () => apiGet<DeviceTypeBreakdown[]>('/device-control/blocked-by-type', { params }),
    generateMockBlockedByType,
    shouldUseMockData
  )
}

export const getAllowedByDeviceType = async (params: WidgetParams): Promise<DeviceTypeBreakdown[]> => {
  return withMockData(
    () => apiGet<DeviceTypeBreakdown[]>('/device-control/allowed-by-type', { params }),
    generateMockAllowedByType,
    shouldUseMockData
  )
}

export const getTopUsersByEvents = async (params: WidgetParams): Promise<TopUserDeviceEvents[]> => {
  return withMockData(
    () => apiGet<TopUserDeviceEvents[]>('/device-control/top-users', { params }),
    generateMockTopUsers,
    shouldUseMockData
  )
}

export const getTopEndpointsByEvents = async (params: WidgetParams): Promise<TopEndpointDeviceEvents[]> => {
  return withMockData(
    () => apiGet<TopEndpointDeviceEvents[]>('/device-control/top-endpoints', { params }),
    generateMockTopEndpoints,
    shouldUseMockData
  )
}

export const getVendorBreakdown = async (params: WidgetParams): Promise<DeviceVendorBreakdown[]> => {
  return withMockData(
    () => apiGet<DeviceVendorBreakdown[]>('/device-control/vendor-breakdown', { params }),
    generateMockVendorBreakdown,
    shouldUseMockData
  )
}

export const getPolicyEvents = async (params: WidgetParams): Promise<PolicyTriggeredEvent[]> => {
  return withMockData(
    () => apiGet<PolicyTriggeredEvent[]>('/device-control/policy-events', { params }),
    generateMockPolicyEvents,
    shouldUseMockData
  )
}

export const getDepartmentBlocked = async (params: WidgetParams): Promise<DepartmentBlockedAttempts[]> => {
  return withMockData(
    () => apiGet<DepartmentBlockedAttempts[]>('/device-control/department-blocked', { params }),
    generateMockDeptBlocked,
    shouldUseMockData
  )
}

export const getAlertVolume = async (params: WidgetParams): Promise<AlertIncidentVolume[]> => {
  return withMockData(
    () => apiGet<AlertIncidentVolume[]>('/device-control/alert-volume', { params }),
    generateMockAlertVolume,
    shouldUseMockData
  )
}

export const getEventTrend = async (params: WidgetParams): Promise<DeviceEventTrend[]> => {
  return withMockData(
    () => apiGet<DeviceEventTrend[]>('/device-control/event-trend', { params }),
    generateMockEventTrend,
    shouldUseMockData
  )
}

export const getSuspiciousDevices = async (params: WidgetParams): Promise<SuspiciousDevice[]> => {
  return withMockData(
    () => apiGet<SuspiciousDevice[]>('/device-control/suspicious-devices', { params }),
    generateMockSuspiciousDevices,
    shouldUseMockData
  )
}

import { apiGet } from '@services/index'
import { withMockData, shouldUseMockData } from '@utils/withMockData'
import {
  generateMockStats,
  generateMockRecentTransfers,
  generateMockBlockedByDeviceType,
  generateMockAllowedLoggedTransfers,
  generateMockTopUsers,
  generateMockTopEndpoints,
  generateMockFileTypeBreakdown,
  generateMockPolicyEvents,
  generateMockDeptBlocked,
  generateMockAlertVolume,
  generateMockTransferTrend,
  generateMockSuspiciousTransfers,
} from '../mockedData'
import type {
  DataTransferStats,
  FileTransferEvent,
  DeviceTypeTransferBreakdown,
  FileTransferTrend,
  TopUserFileTransfer,
  TopEndpointFileTransfer,
  FileTypeBreakdown,
  PolicyTriggeredTransfer,
  DepartmentBlockedTransfers,
  AlertIncidentTransfer,
  TransferTrendOverTime,
  SuspiciousTransfer,
  DataTransferFilters,
} from '../types'

// ==============================|| DATA TRANSFER SERVICES - PER WIDGET ||============================== //

export interface WidgetParams extends DataTransferFilters {
  startDate?: string
  endDate?: string
}

export const getDataTransferStats = async (params: WidgetParams): Promise<DataTransferStats> => {
  return withMockData(
    () => apiGet<DataTransferStats>('/data-transfer/stats', { params }),
    generateMockStats,
    shouldUseMockData
  )
}

export const getRecentTransfers = async (params: WidgetParams): Promise<FileTransferEvent[]> => {
  return withMockData(
    () => apiGet<FileTransferEvent[]>('/data-transfer/recent', { params }),
    generateMockRecentTransfers,
    shouldUseMockData
  )
}

export const getBlockedByDeviceType = async (params: WidgetParams): Promise<DeviceTypeTransferBreakdown[]> => {
  return withMockData(
    () => apiGet<DeviceTypeTransferBreakdown[]>('/data-transfer/blocked-by-type', { params }),
    generateMockBlockedByDeviceType,
    shouldUseMockData
  )
}

export const getAllowedLoggedTransfers = async (params: WidgetParams): Promise<FileTransferTrend[]> => {
  return withMockData(
    () => apiGet<FileTransferTrend[]>('/data-transfer/allowed-logged', { params }),
    generateMockAllowedLoggedTransfers,
    shouldUseMockData
  )
}

export const getTopUsers = async (params: WidgetParams): Promise<TopUserFileTransfer[]> => {
  return withMockData(
    () => apiGet<TopUserFileTransfer[]>('/data-transfer/top-users', { params }),
    generateMockTopUsers,
    shouldUseMockData
  )
}

export const getTopEndpoints = async (params: WidgetParams): Promise<TopEndpointFileTransfer[]> => {
  return withMockData(
    () => apiGet<TopEndpointFileTransfer[]>('/data-transfer/top-endpoints', { params }),
    generateMockTopEndpoints,
    shouldUseMockData
  )
}

export const getFileTypeBreakdown = async (params: WidgetParams): Promise<FileTypeBreakdown[]> => {
  return withMockData(
    () => apiGet<FileTypeBreakdown[]>('/data-transfer/file-types', { params }),
    generateMockFileTypeBreakdown,
    shouldUseMockData
  )
}

export const getPolicyEvents = async (params: WidgetParams): Promise<PolicyTriggeredTransfer[]> => {
  return withMockData(
    () => apiGet<PolicyTriggeredTransfer[]>('/data-transfer/policy-events', { params }),
    generateMockPolicyEvents,
    shouldUseMockData
  )
}

export const getDepartmentBlocked = async (params: WidgetParams): Promise<DepartmentBlockedTransfers[]> => {
  return withMockData(
    () => apiGet<DepartmentBlockedTransfers[]>('/data-transfer/department-blocked', { params }),
    generateMockDeptBlocked,
    shouldUseMockData
  )
}

export const getAlertVolume = async (params: WidgetParams): Promise<AlertIncidentTransfer[]> => {
  return withMockData(
    () => apiGet<AlertIncidentTransfer[]>('/data-transfer/alert-volume', { params }),
    generateMockAlertVolume,
    shouldUseMockData
  )
}

export const getTransferTrend = async (params: WidgetParams): Promise<TransferTrendOverTime[]> => {
  return withMockData(
    () => apiGet<TransferTrendOverTime[]>('/data-transfer/trend', { params }),
    generateMockTransferTrend,
    shouldUseMockData
  )
}

export const getSuspiciousTransfers = async (params: WidgetParams): Promise<SuspiciousTransfer[]> => {
  return withMockData(
    () => apiGet<SuspiciousTransfer[]>('/data-transfer/suspicious', { params }),
    generateMockSuspiciousTransfers,
    shouldUseMockData
  )
}

import { apiGet } from '@services/index'
import { withMockData, shouldUseMockData } from '@utils/withMockData'
import {
  generateMockStats,
  generateMockApplicationFootprint,
  generateMockCategoryInventory,
  generateMockVendorInventory,
  generateMockNewAppTrend,
  generateMockRecentInstalls,
  generateMockDeptApplications,
  generateMockBlockEventsByCategory,
  generateMockTopBlockedApps,
  generateMockUserBlockEvents,
  generateMockEndpointBlockEvents,
} from '../mockedData'
import type {
  ApplicationControlStats,
  ApplicationFootprint,
  CategoryInventory,
  VendorInventory,
  NewApplicationTrend,
  RecentApplicationInstall,
  DepartmentApplications,
  ApplicationBlockEvent,
  TopBlockedApplication,
  UserBlockEvents,
  EndpointBlockEvents,
  ApplicationControlFilters,
} from '../types'

// ==============================|| APPLICATION CONTROL SERVICES - PER WIDGET ||============================== //

export interface WidgetParams extends ApplicationControlFilters {
  startDate?: string
  endDate?: string
}

export const getAppControlStats = async (params: WidgetParams): Promise<ApplicationControlStats> => {
  return withMockData(
    () => apiGet<ApplicationControlStats>('/application-control/stats', { params }),
    generateMockStats,
    shouldUseMockData
  )
}

export const getApplicationFootprint = async (params: WidgetParams): Promise<ApplicationFootprint[]> => {
  return withMockData(
    () => apiGet<ApplicationFootprint[]>('/application-control/footprint', { params }),
    generateMockApplicationFootprint,
    shouldUseMockData
  )
}

export const getCategoryInventory = async (params: WidgetParams): Promise<CategoryInventory[]> => {
  return withMockData(
    () => apiGet<CategoryInventory[]>('/application-control/categories', { params }),
    generateMockCategoryInventory,
    shouldUseMockData
  )
}

export const getVendorInventory = async (params: WidgetParams): Promise<VendorInventory[]> => {
  return withMockData(
    () => apiGet<VendorInventory[]>('/application-control/vendors', { params }),
    generateMockVendorInventory,
    shouldUseMockData
  )
}

export const getNewAppTrend = async (params: WidgetParams): Promise<NewApplicationTrend[]> => {
  return withMockData(
    () => apiGet<NewApplicationTrend[]>('/application-control/new-apps-trend', { params }),
    generateMockNewAppTrend,
    shouldUseMockData
  )
}

export const getRecentInstalls = async (params: WidgetParams): Promise<RecentApplicationInstall[]> => {
  return withMockData(
    () => apiGet<RecentApplicationInstall[]>('/application-control/recent-installs', { params }),
    generateMockRecentInstalls,
    shouldUseMockData
  )
}

export const getDeptApplications = async (params: WidgetParams): Promise<DepartmentApplications[]> => {
  return withMockData(
    () => apiGet<DepartmentApplications[]>('/application-control/dept-apps', { params }),
    generateMockDeptApplications,
    shouldUseMockData
  )
}

export const getBlockEventsByCategory = async (params: WidgetParams): Promise<ApplicationBlockEvent[]> => {
  return withMockData(
    () => apiGet<ApplicationBlockEvent[]>('/application-control/block-by-category', { params }),
    generateMockBlockEventsByCategory,
    shouldUseMockData
  )
}

export const getTopBlockedApps = async (params: WidgetParams): Promise<TopBlockedApplication[]> => {
  return withMockData(
    () => apiGet<TopBlockedApplication[]>('/application-control/top-blocked', { params }),
    generateMockTopBlockedApps,
    shouldUseMockData
  )
}

export const getUserBlockEvents = async (params: WidgetParams): Promise<UserBlockEvents[]> => {
  return withMockData(
    () => apiGet<UserBlockEvents[]>('/application-control/user-blocks', { params }),
    generateMockUserBlockEvents,
    shouldUseMockData
  )
}

export const getEndpointBlockEvents = async (params: WidgetParams): Promise<EndpointBlockEvents[]> => {
  return withMockData(
    () => apiGet<EndpointBlockEvents[]>('/application-control/endpoint-blocks', { params }),
    generateMockEndpointBlockEvents,
    shouldUseMockData
  )
}

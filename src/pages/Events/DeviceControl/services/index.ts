import { apiGet } from '@services/index'
import { withMockData, shouldUseMockData } from '@utils/withMockData'
import { getMockDeviceControlEvents, exportMockData } from '../mockedData'
import type { DeviceControlListParams, DeviceControlListResponse, DeviceControlEvent } from '../types'

const API_ENDPOINTS = {
  LIST: '/events/device-control',
  EXPORT: '/events/device-control/export',
} as const

export const deviceControlService = {
  getList: async (params: DeviceControlListParams): Promise<DeviceControlListResponse> => {
    return withMockData(
      () =>
        apiGet<DeviceControlListResponse>(API_ENDPOINTS.LIST, {
          params: {
            page: params.page,
            limit: params.limit,
            sortBy: params.sortBy,
            sortDirection: params.sortDirection,
            startDate: params.startDate,
            endDate: params.endDate,
            ...params.filters,
          },
        }),
      () =>
        getMockDeviceControlEvents(
          params.page,
          params.limit,
          params.sortBy,
          params.sortDirection,
          params.filters as Record<string, string>
        ),
      shouldUseMockData
    )
  },

  exportData: async (): Promise<DeviceControlEvent[]> => {
    return withMockData(
      () => apiGet<DeviceControlEvent[]>(API_ENDPOINTS.EXPORT),
      () => exportMockData(),
      shouldUseMockData
    )
  },
}

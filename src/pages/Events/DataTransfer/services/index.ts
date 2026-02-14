import { apiGet } from '@services/index'
import { withMockData, shouldUseMockData } from '@utils/withMockData'
import { getMockDataTransferEvents, exportMockData } from '../mockedData'
import type { DataTransferListParams, DataTransferListResponse, DataTransferEvent } from '../types'

const API_ENDPOINTS = {
  LIST: '/events/data-transfer',
  EXPORT: '/events/data-transfer/export',
} as const

export const dataTransferService = {
  getList: async (params: DataTransferListParams): Promise<DataTransferListResponse> => {
    return withMockData(
      () =>
        apiGet<DataTransferListResponse>(API_ENDPOINTS.LIST, {
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
        getMockDataTransferEvents(
          params.page,
          params.limit,
          params.sortBy,
          params.sortDirection,
          params.filters as Record<string, string>
        ),
      shouldUseMockData
    )
  },

  exportData: async (): Promise<DataTransferEvent[]> => {
    return withMockData(
      () => apiGet<DataTransferEvent[]>(API_ENDPOINTS.EXPORT),
      () => exportMockData(),
      shouldUseMockData
    )
  },
}

import { apiGet } from '@services/index'
import { withMockData, shouldUseMockData } from '@utils/withMockData'
import { getMockDataClassificationEvents, exportMockData } from '../mockedData'
import type { DataClassificationListParams, DataClassificationListResponse, DataClassificationEvent } from '../types'

const API_ENDPOINTS = {
  LIST: '/events/data-classification',
  EXPORT: '/events/data-classification/export',
} as const

export const dataClassificationService = {
  getList: async (params: DataClassificationListParams): Promise<DataClassificationListResponse> => {
    return withMockData(
      () =>
        apiGet<DataClassificationListResponse>(API_ENDPOINTS.LIST, {
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
        getMockDataClassificationEvents(
          params.page,
          params.limit,
          params.sortBy,
          params.sortDirection,
          params.filters as Record<string, string>
        ),
      shouldUseMockData
    )
  },

  exportData: async (): Promise<DataClassificationEvent[]> => {
    return withMockData(
      () => apiGet<DataClassificationEvent[]>(API_ENDPOINTS.EXPORT),
      () => exportMockData(),
      shouldUseMockData
    )
  },
}

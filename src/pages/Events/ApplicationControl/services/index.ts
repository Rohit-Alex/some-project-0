import { apiGet } from '@services/index'
import { withMockData, shouldUseMockData } from '@utils/withMockData'
import { getMockApplicationControlEvents, exportMockData } from '../mockedData'
import type { ApplicationControlListParams, ApplicationControlListResponse, ApplicationControlEvent } from '../types'

const API_ENDPOINTS = {
  LIST: '/events/application-control',
  EXPORT: '/events/application-control/export',
} as const

export const applicationControlService = {
  getList: async (params: ApplicationControlListParams): Promise<ApplicationControlListResponse> => {
    return withMockData(
      () =>
        apiGet<ApplicationControlListResponse>(API_ENDPOINTS.LIST, {
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
        getMockApplicationControlEvents(
          params.page,
          params.limit,
          params.sortBy,
          params.sortDirection,
          params.filters as Record<string, string>
        ),
      shouldUseMockData
    )
  },

  exportData: async (): Promise<ApplicationControlEvent[]> => {
    return withMockData(
      () => apiGet<ApplicationControlEvent[]>(API_ENDPOINTS.EXPORT),
      () => exportMockData(),
      shouldUseMockData
    )
  },
}


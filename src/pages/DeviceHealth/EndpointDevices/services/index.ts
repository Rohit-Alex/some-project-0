import { apiGet } from '@services/index';
import { withMockData, shouldUseMockData } from '@utils/withMockData';
import { getMockEndpointDevices, exportMockData } from '../mockedData';
import type { EndpointDeviceListParams, EndpointDeviceListResponse, EndpointDevice } from '../types';

const API_ENDPOINTS = {
	LIST: '/device-health/endpoint-devices',
	EXPORT: '/device-health/endpoint-devices/export',
} as const;

export const endpointDeviceService = {
	getList: async (params: EndpointDeviceListParams): Promise<EndpointDeviceListResponse> => {
		return withMockData(() => apiGet<EndpointDeviceListResponse>(API_ENDPOINTS.LIST, {
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
		() => getMockEndpointDevices(
			params.page,
			params.limit,
			params.sortBy,
			params.sortDirection,
			params.filters as Record<string, string>
		),
		shouldUseMockData
		)
	},

	exportData: async (): Promise<EndpointDevice[]> => {
		return withMockData(
			() => apiGet<EndpointDevice[]>(API_ENDPOINTS.EXPORT),
			() => exportMockData(),
			shouldUseMockData
		);
	},
};

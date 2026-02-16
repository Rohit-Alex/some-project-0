import { useState, useMemo, useCallback } from 'react';
import { Box, Paper, TextField, Typography, InputAdornment } from '@mui/material';
import { UpgradeOutlined, DeleteOutlineOutlined, RestartAltOutlined, BlockOutlined, BugReportOutlined, NoEncryptionOutlined,
    SearchOutlined, RefreshOutlined, DevicesOutlined, ErrorOutlineOutlined, CheckCircleOutlineOutlined
} from '@mui/icons-material';

import Table from '@components/Table/Table';
import DetailPanel from '@components/DetailPanel';
import { getMockDeviceDetail } from './mockedData';
import TableToolbar from '@components/TableToolbar';
import { useTableParams } from '@hooks/useTableParams';
import TimeRangeFilter from '@components/TimeRangeFilter';
import type { DetailSection } from '@components/DetailPanel';
import { useEndpointDevices, useExportEndpointDevices } from './hooks';
import { getDateRangeFromTimeRange, filtersToApiParams } from './helpers';
import { ENDPOINT_DEVICE_COLUMNS, ROWS_PER_PAGE_OPTIONS, INSTALLED_APP_COLUMNS } from './constants';
import type { EndpointDeviceFilters, EndpointDevice, EndpointDeviceDetail, InstalledApplication } from './types';

export default function EndpointDevices() {
    const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);
    const [detailPanel, setDetailPanel] = useState<{ row: EndpointDevice, data: EndpointDeviceDetail } | null>(null)
    const [appSearchFilter, setAppSearchFilter] = useState('')

    const { page, rowsPerPage, sortBy, sortDirection, filters, timeRange, setPage, setRowsPerPage, setSort, setFilter, setTimeRange } = useTableParams({
        defaultRowsPerPage: 10,
        defaultSortBy: 'lastSeenTime',
        defaultSortDirection: 'desc',
    });

    const timeRangeKey = useMemo(() => {
        if (timeRange.range === 'custom') {
            return `custom:${timeRange.startDate || ''}:${timeRange.endDate || ''}`
        }
        return timeRange.range
    }, [timeRange.range, timeRange.startDate, timeRange.endDate])

    const dateRange = useMemo(() => getDateRangeFromTimeRange(timeRange), [timeRange]);

    const apiFilters = useMemo(() => filtersToApiParams(filters) as EndpointDeviceFilters, [filters]);

    const { data, isLoading, refetch } = useEndpointDevices({
        page,
        limit: rowsPerPage,
        sortBy,
        sortDirection,
        filters: apiFilters,
        timeRangeKey,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
    });

    const { exportData } = useExportEndpointDevices();

    const handleRefresh = () => refetch();

    const handleSelectionChange = useCallback((keys: (string | number)[]) => {
        setSelectedRows(keys);
    }, []);

    const handleRowClick = useCallback((row: EndpointDevice) => {
        const detail = getMockDeviceDetail(row);
        setDetailPanel({ row, data: detail });
        setAppSearchFilter('');
    }, []);

    const handleCloseDetailPanel = () => {
        setDetailPanel(null);
    };

    const stats = data?.stats;

    const filteredApps: InstalledApplication[] = useMemo(() => {
        if (!detailPanel?.data.installedApplications) return [];

        if (!appSearchFilter.trim()) return detailPanel.data.installedApplications;

        const searchLower = appSearchFilter.toLowerCase();
        return detailPanel.data.installedApplications.filter(
            (app) => app.applicationName.toLowerCase().includes(searchLower) || app.applicationType.toLowerCase().includes(searchLower)
        );
    }, [detailPanel?.data.installedApplications, appSearchFilter]);

    const detailSections: DetailSection[] = detailPanel?.data ? [
        { title: 'System Details', data: detailPanel.data.systemDetails as unknown as Record<string, string> },
        { title: 'Agent Details', data: detailPanel.data.agentDetails as unknown as Record<string, string> },
        { title: 'Domain Details', data: detailPanel.data.domainDetails as unknown as Record<string, string> },
    ] : [];

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <Typography variant="h5">Endpoint Devices</Typography>
                <TimeRangeFilter value={timeRange} onChange={setTimeRange} />
            </div>

            {/* Toolbar */}
            <Paper elevation={0} className="px-4 py-2 border border-gray-200 dark:border-gray-700">
                <TableToolbar
                    onRefresh={handleRefresh}
                    onExport={exportData}
                    loading={isLoading}
                    stats={[
                        {
                            id: 'total',
                            icon: <DevicesOutlined fontSize="small" />,
                            label: 'Total Devices',
                            value: stats?.totalDevices ?? 0,
                            color: 'info',
                        },
                        {
                            id: 'online',
                            icon: <CheckCircleOutlineOutlined fontSize="small" />,
                            label: 'Online',
                            value: stats?.onlineDevices ?? 0,
                            color: 'success',
                        },
                        {
                            id: 'offline',
                            icon: <ErrorOutlineOutlined fontSize="small" />,
                            label: 'Offline',
                            value: stats?.offlineDevices ?? 0,
                            color: 'error',
                        },
                        {
                            id: 'upgrade',
                            icon: <UpgradeOutlined fontSize="small" />,
                            label: 'Software Upgrade',
                            value: stats?.softwareUpgrade ?? 0,
                            color: 'warning',
                        },
                        {
                            id: 'uninstall',
                            icon: <DeleteOutlineOutlined fontSize="small" />,
                            label: 'Software Uninstall',
                            value: stats?.softwareUninstall ?? 0,
                            color: 'secondary',
                        },
                        {
                            id: 'reset',
                            icon: <RestartAltOutlined fontSize="small" />,
                            label: 'Reset View',
                            value: stats?.resetDefault ?? 0,
                        },
                        {
                            id: 'agent-uninstalled',
                            icon: <BlockOutlined fontSize="small" />,
                            label: 'Agent Uninstalled',
                            value: stats?.agentUninstalled ?? 0,
                            color: 'error',
                        },
                        {
                            id: 'agent-corrupted',
                            icon: <BugReportOutlined fontSize="small" />,
                            label: 'Agent Corrupted',
                            value: stats?.agentCorrupted ?? 0,
                            color: 'warning',
                        },
                        {
                            id: 'unlicensed',
                            icon: <NoEncryptionOutlined fontSize="small" />,
                            label: 'Not Licensed',
                            value: stats?.unlicensedSystems ?? 0,
                            color: 'secondary',
                        },
                    ]}
                    actions={[
                        {
                            id: 'refresh-data',
                            icon: <RefreshOutlined />,
                            tooltip: 'Refresh Data',
                            onClick: handleRefresh,
                            disabled: isLoading,
                        },
                    ]}
                />
            </Paper>

            {/* Main Table */}
            <Table
                data={data?.data ?? []}
                columns={ENDPOINT_DEVICE_COLUMNS}
                rowKey="id"
                loading={isLoading}
                sortable
                sortBy={sortBy}
                sortDirection={sortDirection}
                onSortChange={setSort}
                filterable
                filterValues={filters}
                onFilterChange={setFilter}
                pagination
                page={page}
                rowsPerPage={rowsPerPage}
                totalRows={data?.total ?? 0}
                onPageChange={setPage}
                onRowsPerPageChange={setRowsPerPage}
                rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
                stickyHeader
                maxHeight={600}
                selectable
                selectedRows={selectedRows}
                onSelectionChange={handleSelectionChange}
                maxSelection={5}
                onRowClick={handleRowClick}
                emptyMessage="No endpoint devices found"
                smartActions={[
                    {
                        id: 'view',
                        label: 'View Details',
                        onClick: handleRowClick,
                    },
                    {
                        id: 'reboot',
                        label: 'Reboot Device',
                        onClick: (row) => console.log('Reboot:', row),
                    },
                ]}
            />

            {/* Detail Panel */}
            <DetailPanel open={!!detailPanel} title={`Device Details - ${detailPanel?.row.hostname ?? ''}`} sections={detailSections} onClose={handleCloseDetailPanel}>
                {/* Installed Applications Table */}
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                        <Typography variant="subtitle2" fontWeight={700}>
                            List of Applications Installed
                        </Typography>

                        <TextField size="small" placeholder="Search applications..." value={appSearchFilter} onChange={(e) => setAppSearchFilter(e.target.value)} sx={{ width: 250 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchOutlined fontSize="small" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>

                    <Box sx={{ maxHeight: 250, overflow: 'auto' }}>
                        <Table data={filteredApps} columns={INSTALLED_APP_COLUMNS} rowKey="id" dense stickyHeader />
                    </Box>
                </Box>
            </DetailPanel>
        </div>
    );
};

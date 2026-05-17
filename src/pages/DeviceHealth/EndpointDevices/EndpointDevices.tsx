import { useState, useMemo, useCallback } from 'react';
import { Box, Paper, TextField, Typography, InputAdornment } from '@mui/material';
import { DeleteOutlineOutlined,
    SearchOutlined, DevicesOutlined, ErrorOutlineOutlined, CheckCircleOutlineOutlined, WarningAmberOutlined, FileDownloadOutlined
} from '@mui/icons-material';

import Table from '@components/Table/Table';
import DetailPanel from '@components/DetailPanel';
import { getMockDeviceDetail } from './mockedData';
import TableToolbar from '@components/TableToolbar';
import { TablePageLayout } from '@components/Layout';
import { useTableParams } from '@hooks/useTableParams';
import type { DetailSection } from '@components/DetailPanel';
import { useEndpointDevices, useExportEndpointDevices } from './hooks';
import { getDateRangeFromTimeRange, filtersToApiParams } from './helpers';
import { ENDPOINT_DEVICE_COLUMNS, ROWS_PER_PAGE_OPTIONS, INSTALLED_APP_COLUMNS } from './constants';
import type { EndpointDeviceFilters, EndpointDevice, EndpointDeviceDetail, InstalledApplication } from './types';

export default function EndpointDevices() {
    const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);
    const [detailPanel, setDetailPanel] = useState<{ row: EndpointDevice, data: EndpointDeviceDetail } | null>(null)
    const [appSearchFilter, setAppSearchFilter] = useState('')

    const { page, rowsPerPage, sortBy, sortDirection, filters, timeRange, setPage, setRowsPerPage, setSort, setFilter } = useTableParams({
        defaultRowsPerPage: 100,
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

    const handleCellClick = useCallback((columnId: string, row: EndpointDevice) => {
        if (columnId === 'hostname') {
            handleRowClick(row);
        }
    }, [handleRowClick]);

    const handleCloseDetailPanel = () => {
        setDetailPanel(null);
    };

    const stats = data?.stats;

    const installedApps = useMemo(() => 
        detailPanel?.data?.installedApplications || [], 
        [detailPanel?.data?.installedApplications]
    );
    
    const filteredApps: InstalledApplication[] = useMemo(() => {
        if (!installedApps.length) return [];

        if (!appSearchFilter.trim()) return installedApps;

        const searchLower = appSearchFilter.toLowerCase();
        return installedApps.filter(
            (app) => app.applicationName.toLowerCase().includes(searchLower) || app.applicationType.toLowerCase().includes(searchLower)
        );
    }, [installedApps, appSearchFilter]);

    const detailSections: DetailSection[] = detailPanel?.data ? [
        { title: 'System Details', data: detailPanel.data.systemDetails as unknown as Record<string, string> },
        { title: 'Agent Details', data: detailPanel.data.agentDetails as unknown as Record<string, string> },
        { title: 'Domain Details', data: detailPanel.data.domainDetails as unknown as Record<string, string> },
    ] : [];

    const selectedDevices = useMemo(() => {
        return (data?.data ?? []).filter(device =>
            selectedRows.includes(device.id)
        );
    }, [selectedRows, data?.data]);

    const canDelete = useMemo(() => {
        if (!selectedDevices.length) return false;

        return selectedDevices.every(device =>
            device.systemStatus === "Uninstalled" &&
            device.agentInstalled === false
        );
    }, [selectedDevices]);

    const handleDelete = () => {
        if (!canDelete) {
            alert("Only Uninstalled systems without agent can be deleted.");
            return;
        }

        const idsToDelete = selectedDevices.map(d => d.id);
        console.log("Deleting systems:", idsToDelete);

        /* Call API here: await deleteEndpointDevices(idsToDelete); */

        setSelectedRows([]);
    };

    const downloadCsv = (rows: EndpointDevice[], filename: string) => {
        const headers = ENDPOINT_DEVICE_COLUMNS.map((column) => column.id);
        const csvRows = rows.map((row) =>
            headers.map((header) => JSON.stringify(row[header as keyof EndpointDevice] ?? '')).join(',')
        );
        const csv = [headers.join(','), ...csvRows].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const handleExtendedReportDownload = async () => {
        const rows = selectedDevices.length ? selectedDevices : await exportData();
        downloadCsv(rows, `endpoint-devices-extended-${new Date().toISOString().split('T')[0]}.csv`);
    };

    const handleUninstall = () => {
        if (!selectedDevices.length) {
            alert('Select at least one system to uninstall.');
            return;
        }

        console.log('Uninstalling agents:', selectedDevices.map((device) => device.id));
        setSelectedRows([]);
    };

    return (
        <>
            <TablePageLayout
            title="Endpoint Devices"
            toolbar={
                <Paper elevation={0} className="px-4 py-2 border border-gray-200 dark:border-gray-700">
                    <TableToolbar
                        onRefresh={handleRefresh}
                        showExport={false}
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
                                id: 'warning',
                                icon: <WarningAmberOutlined fontSize="small" />,
                                label: 'Warning',
                                value: stats?.warningDevices ?? 0,
                                color: 'warning',
                            },
                        ]}
                        onExport={handleExtendedReportDownload}
                        actions={[
                            {
                                id: 'delete-system',
                                icon: <DeleteOutlineOutlined color="error" />,
                                tooltip: canDelete
                                    ? 'Delete selected systems'
                                    : 'Only Uninstalled systems without agent can be deleted',
                                onClick: handleDelete,
                                disabled: !canDelete,
                            },
                            {
                                id: 'uninstall-agent',
                                icon: <DeleteOutlineOutlined />,
                                tooltip: 'Uninstall selected agents from console',
                                onClick: handleUninstall,
                                disabled: !selectedDevices.length,
                            },
                            {
                                id: 'extended-report',
                                icon: <FileDownloadOutlined />,
                                tooltip: selectedDevices.length ? 'Download extended report for selected systems' : 'Download extended report',
                                onClick: handleExtendedReportDownload,
                                disabled: isLoading,
                            }
                        ]}
                    />
                </Paper>
            }
        >
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
                maxHeight="100%"
                selectable
                selectedRows={selectedRows}
                onSelectionChange={handleSelectionChange}
                maxSelection={5}
                onCellClick={handleCellClick}
                emptyMessage="No endpoint devices found"
            />
        </TablePageLayout>

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
        </>
    )
};

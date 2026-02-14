import { useState, useMemo, useCallback } from 'react'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import RefreshOutlined from '@mui/icons-material/RefreshOutlined'
import ComputerOutlined from '@mui/icons-material/ComputerOutlined'
import CheckCircleOutlineOutlined from '@mui/icons-material/CheckCircleOutlineOutlined'
import ErrorOutlineOutlined from '@mui/icons-material/ErrorOutlineOutlined'
import DevicesOutlined from '@mui/icons-material/DevicesOutlined'
import CloseOutlined from '@mui/icons-material/CloseOutlined'
import SearchOutlined from '@mui/icons-material/SearchOutlined'

import Table from '@components/Table/Table'
import TimeRangeFilter from '@components/TimeRangeFilter'
import TableToolbar from '@components/TableToolbar'
import { useTableParams } from '@hooks/useTableParams'
import { useEndpointDevices, useExportEndpointDevices } from './hooks'
import { ENDPOINT_DEVICE_COLUMNS, ROWS_PER_PAGE_OPTIONS, INSTALLED_APP_COLUMNS } from './constants'
import { getDateRangeFromTimeRange, filtersToApiParams } from './helpers'
import { getMockDeviceDetail } from './mockedData'
import type { EndpointDeviceFilters, EndpointDevice, EndpointDeviceDetail, InstalledApplication } from './types'

// Detail section component
interface DetailSectionProps {
  title: string
  data: Record<string, string | undefined>
}

function DetailSection({ title, data }: DetailSectionProps) {
  return (
    <Box>
      <Typography
        variant="subtitle2"
        fontWeight={700}
        sx={{
          mb: 1.5,
          pb: 0.5,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        {title}
      </Typography>
      <Grid container spacing={1}>
        {Object.entries(data).map(([key, value]) => (
          <Grid item xs={12} key={key}>
            <Box sx={{ display: 'flex', gap: 1, mb: 0.5 }}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ minWidth: 160, fontWeight: 600 }}
              >
                {formatLabel(key)}
              </Typography>
              <Typography variant="caption" sx={{ wordBreak: 'break-word' }}>
                {key.toLowerCase().includes('link') || key.toLowerCase().includes('download') ? (
                  <Link href="#" underline="hover">
                    {value || '-'}
                  </Link>
                ) : (
                  value || '-'
                )}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

// Format camelCase to readable label
function formatLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim()
}

export default function EndpointDevices() {
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([])
  const [detailPanel, setDetailPanel] = useState<{
    row: EndpointDevice
    data: EndpointDeviceDetail
  } | null>(null)
  const [appSearchFilter, setAppSearchFilter] = useState('')

  const {
    page,
    rowsPerPage,
    sortBy,
    sortDirection,
    filters,
    timeRange,
    setPage,
    setRowsPerPage,
    setSort,
    setFilter,
    setTimeRange,
  } = useTableParams({
    defaultRowsPerPage: 10,
    defaultSortBy: 'lastSeenTime',
    defaultSortDirection: 'desc',
  })

  // Create stable time range key for query caching
  const timeRangeKey = useMemo(() => {
    if (timeRange.range === 'custom') {
      return `custom:${timeRange.startDate || ''}:${timeRange.endDate || ''}`
    }
    return timeRange.range
  }, [timeRange.range, timeRange.startDate, timeRange.endDate])

  // Calculate date range for API call
  const dateRange = useMemo(
    () => getDateRangeFromTimeRange(timeRange),
    [timeRange]
  )

  // Memoize API filters
  const apiFilters = useMemo(
    () => filtersToApiParams(filters) as EndpointDeviceFilters,
    [filters]
  )

  const { data, isLoading, refetch } = useEndpointDevices({
    page,
    limit: rowsPerPage,
    sortBy,
    sortDirection,
    filters: apiFilters,
    timeRangeKey,
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
  })

  const { exportData } = useExportEndpointDevices()

  const handleRefresh = () => {
    refetch()
  }

  const handleSelectionChange = useCallback((keys: (string | number)[]) => {
    setSelectedRows(keys)
  }, [])

  const handleRowClick = useCallback((row: EndpointDevice) => {
    // Get detailed device data
    const detail = getMockDeviceDetail(row)
    setDetailPanel({ row, data: detail })
    setAppSearchFilter('')
  }, [])

  const handleCloseDetailPanel = () => {
    setDetailPanel(null)
  }

  const stats = data?.stats

  // Filter installed applications based on search
  const filteredApps: InstalledApplication[] = useMemo(() => {
    if (!detailPanel?.data.installedApplications) return []
    if (!appSearchFilter.trim()) return detailPanel.data.installedApplications
    const searchLower = appSearchFilter.toLowerCase()
    return detailPanel.data.installedApplications.filter(
      (app) =>
        app.applicationName.toLowerCase().includes(searchLower) ||
        app.applicationType.toLowerCase().includes(searchLower)
    )
  }, [detailPanel?.data.installedApplications, appSearchFilter])

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
              id: 'healthy',
              icon: <ComputerOutlined fontSize="small" />,
              label: 'Healthy',
              value: stats?.healthyDevices ?? 0,
              color: 'primary',
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
      <Collapse in={!!detailPanel}>
        {detailPanel && (
          <Paper elevation={0} className="border border-gray-200 dark:border-gray-700">
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 2,
                py: 1.5,
                borderBottom: 1,
                borderColor: 'divider',
                bgcolor: 'action.hover',
              }}
            >
              <Typography variant="subtitle1" fontWeight={600}>
                Device Details - {detailPanel.row.hostname}
              </Typography>
              <IconButton size="small" onClick={handleCloseDetailPanel}>
                <CloseOutlined fontSize="small" />
              </IconButton>
            </Box>
            <Box sx={{ p: 2 }}>
              <Grid container spacing={3}>
                {/* System Details */}
                <Grid item xs={12} md={6} lg={3}>
                  <DetailSection
                    title="System Details"
                    data={detailPanel.data.systemDetails as unknown as Record<string, string>}
                  />
                </Grid>

                {/* Agent Details */}
                <Grid item xs={12} md={6} lg={3}>
                  <DetailSection
                    title="Agent Details"
                    data={detailPanel.data.agentDetails as unknown as Record<string, string>}
                  />
                </Grid>

                {/* Domain Details */}
                <Grid item xs={12} md={6} lg={3}>
                  <DetailSection
                    title="Domain Details"
                    data={detailPanel.data.domainDetails as unknown as Record<string, string>}
                  />
                </Grid>

                {/* List of Applications Installed */}
                <Grid item xs={12} md={6} lg={3}>
                  <Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 1.5,
                        pb: 0.5,
                        borderBottom: 1,
                        borderColor: 'divider',
                      }}
                    >
                      <Typography variant="subtitle2" fontWeight={700}>
                        List of Applications Installed
                      </Typography>
                    </Box>
                    <TextField
                      size="small"
                      placeholder="Search Filter"
                      value={appSearchFilter}
                      onChange={(e) => setAppSearchFilter(e.target.value)}
                      sx={{ mb: 1, width: '100%' }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchOutlined fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Box sx={{ maxHeight: 200, overflow: 'auto' }}>
                      <Table
                        data={filteredApps}
                        columns={INSTALLED_APP_COLUMNS}
                        rowKey="id"
                        dense
                        stickyHeader={false}
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        )}
      </Collapse>
    </div>
  )
}

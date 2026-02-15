import { useState, useMemo, useCallback } from 'react'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import RefreshOutlined from '@mui/icons-material/RefreshOutlined'
import ComputerOutlined from '@mui/icons-material/ComputerOutlined'
import BlockOutlined from '@mui/icons-material/BlockOutlined'
import CheckCircleOutlineOutlined from '@mui/icons-material/CheckCircleOutlineOutlined'
import EventNoteOutlined from '@mui/icons-material/EventNoteOutlined'

import Table from '@components/Table/Table'
import TimeRangeFilter from '@components/TimeRangeFilter'
import TableToolbar from '@components/TableToolbar'
import DetailPanel from '@components/DetailPanel'
import type { DetailSection } from '@components/DetailPanel'
import { useTableParams } from '@hooks/useTableParams'
import { useApplicationControlEvents, useExportApplicationControlEvents } from './hooks'
import { APPLICATION_CONTROL_COLUMNS, ROWS_PER_PAGE_OPTIONS } from './constants'
import { getDateRangeFromTimeRange, filtersToApiParams } from './helpers'
import { getMockAppEventDetail } from './mockedData'
import type { ApplicationControlFilters, ApplicationControlEvent, AppEventDetail } from './types'

export default function ApplicationControl() {
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([])
  const [detailPanel, setDetailPanel] = useState<{
    row: ApplicationControlEvent
    data: AppEventDetail
  } | null>(null)

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
    defaultSortBy: 'eventTime',
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
    () => filtersToApiParams(filters) as ApplicationControlFilters,
    [filters]
  )

  const { data, isLoading, refetch } = useApplicationControlEvents({
    page,
    limit: rowsPerPage,
    sortBy,
    sortDirection,
    filters: apiFilters,
    timeRangeKey,
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
  })

  const { exportData } = useExportApplicationControlEvents()

  const handleRefresh = () => {
    refetch()
  }

  const handleSelectionChange = useCallback((keys: (string | number)[]) => {
    setSelectedRows(keys)
  }, [])

  const handleRowClick = useCallback((row: ApplicationControlEvent) => {
    // Get detailed event data
    const detail = getMockAppEventDetail(row)
    setDetailPanel({ row, data: detail })
  }, [])

  const handleCloseDetailPanel = () => {
    setDetailPanel(null)
  }

  const stats = data?.stats

  // Build detail sections from data
  const detailSections: DetailSection[] = detailPanel?.data
    ? [
      { title: 'Event Summary', data: detailPanel.data.eventSummary as unknown as Record<string, string> },
      { title: 'Application Attributes', data: detailPanel.data.applicationAttributes as unknown as Record<string, string> },
      { title: 'User Details', data: detailPanel.data.userDetails as unknown as Record<string, string> },
    ]
    : []

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Typography variant="h5">Application Control Events</Typography>
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
              icon: <EventNoteOutlined fontSize="small" />,
              label: 'Total Events',
              value: stats?.totalEvents ?? 0,
              color: 'info',
            },
            {
              id: 'blocked',
              icon: <BlockOutlined fontSize="small" />,
              label: 'Blocked',
              value: stats?.blockedEvents ?? 0,
              color: 'error',
            },
            {
              id: 'allowed',
              icon: <CheckCircleOutlineOutlined fontSize="small" />,
              label: 'Allowed',
              value: stats?.allowedEvents ?? 0,
              color: 'success',
            },
            {
              id: 'users',
              icon: <ComputerOutlined fontSize="small" />,
              label: 'Connected Users',
              value: stats?.connectedUsers ?? 0,
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
        columns={APPLICATION_CONTROL_COLUMNS}
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
        emptyMessage="No application control events found"
        smartActions={[
          {
            id: 'view',
            label: 'View Details',
            onClick: handleRowClick,
          },
          {
            id: 'export-row',
            label: 'Export',
            onClick: (row) => console.log('Export:', row),
          },
        ]}
      />

      {/* Detail Panel */}
      <DetailPanel
        open={!!detailPanel}
        title={`Event Details - ${detailPanel?.row.applicationName ?? ''}`}
        sections={detailSections}
        onClose={handleCloseDetailPanel}
      />
    </div>
  )
}

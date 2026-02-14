import { useState, useMemo, useCallback } from 'react'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import RefreshOutlined from '@mui/icons-material/RefreshOutlined'
import ComputerOutlined from '@mui/icons-material/ComputerOutlined'
import BlockOutlined from '@mui/icons-material/BlockOutlined'
import CheckCircleOutlineOutlined from '@mui/icons-material/CheckCircleOutlineOutlined'
import EventNoteOutlined from '@mui/icons-material/EventNoteOutlined'
import CloseOutlined from '@mui/icons-material/CloseOutlined'

import Table from '@components/Table/Table'
import TimeRangeFilter from '@components/TimeRangeFilter'
import TableToolbar from '@components/TableToolbar'
import { useTableParams } from '@hooks/useTableParams'
import { useDataClassificationEvents, useExportDataClassificationEvents } from './hooks'
import { DATA_CLASSIFICATION_COLUMNS, ROWS_PER_PAGE_OPTIONS, USER_DETAIL_COLUMNS } from './constants'
import { getDateRangeFromTimeRange, filtersToApiParams } from './helpers'
import type { DataClassificationFilters, DataClassificationEvent, UserDetail } from './types'

// Mock user detail data - in real app this would come from API
const getMockUserDetail = (user: string): UserDetail => ({
  domainName: 'xyz.com',
  upnLogonName: user.split('\\')[1] || user,
  adOU: 'Sales',
  adGroups: 'Sales_team, Marketing_insights',
  userTitle: 'Sales Executive',
  emailId: `${user.split('\\')[1] || 'user'}@gmail.com`,
  department: 'Sales',
  managerName: 'Sunil',
  managerEmailId: 'Sunil@gmail.com',
  managerTitle: 'CSO',
})

export default function DataClassification() {
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([])
  const [detailPanel, setDetailPanel] = useState<{
    columnId: string
    row: DataClassificationEvent
    data: UserDetail | null
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
    () => filtersToApiParams(filters) as DataClassificationFilters,
    [filters]
  )

  const { data, isLoading, refetch } = useDataClassificationEvents({
    page,
    limit: rowsPerPage,
    sortBy,
    sortDirection,
    filters: apiFilters,
    timeRangeKey,
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
  })

  const { exportData } = useExportDataClassificationEvents()

  const handleRefresh = () => {
    refetch()
  }

  const handleSelectionChange = useCallback((keys: (string | number)[]) => {
    setSelectedRows(keys)
  }, [])

  const handleCellClick = useCallback((columnId: string, row: DataClassificationEvent) => {
    // Handle clickable columns - fetch detail data
    if (columnId === 'loggedInUser') {
      const userDetail = getMockUserDetail(row.loggedInUser)
      setDetailPanel({ columnId, row, data: userDetail })
    }
  }, [])

  const handleCloseDetailPanel = () => {
    setDetailPanel(null)
  }

  const stats = data?.stats

  // Convert user detail to array format for table display
  const userDetailData = detailPanel?.data
    ? [detailPanel.data]
    : []

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Typography variant="h5">Data Classification Events</Typography>
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
        columns={DATA_CLASSIFICATION_COLUMNS}
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
        onCellClick={handleCellClick}
        emptyMessage="No data classification events found"
        smartActions={[
          {
            id: 'view',
            label: 'View Details',
            onClick: (row) => console.log('View:', row),
          },
          {
            id: 'export-row',
            label: 'Export',
            onClick: (row) => console.log('Export:', row),
          },
        ]}
      />

      {/* Detail Panel */}
      <Collapse in={!!detailPanel}>
        {detailPanel && (
          <Paper elevation={0} className="border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700">
              <Typography variant="subtitle1" fontWeight={600}>
                User Details - {detailPanel.row.loggedInUser}
              </Typography>
              <IconButton size="small" onClick={handleCloseDetailPanel}>
                <CloseOutlined fontSize="small" />
              </IconButton>
            </div>
            <div className="p-4">
              <Table
                data={userDetailData}
                columns={USER_DETAIL_COLUMNS}
                rowKey="emailId"
                dense
                stickyHeader={false}
              />
            </div>
          </Paper>
        )}
      </Collapse>
    </div>
  )
}

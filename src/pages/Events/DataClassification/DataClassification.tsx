import { useState, useMemo, useCallback } from 'react'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import ComputerOutlined from '@mui/icons-material/ComputerOutlined'
import BlockOutlined from '@mui/icons-material/BlockOutlined'
import CheckCircleOutlineOutlined from '@mui/icons-material/CheckCircleOutlineOutlined'
import EventNoteOutlined from '@mui/icons-material/EventNoteOutlined'
import CloseOutlined from '@mui/icons-material/CloseOutlined'

import Table from '@components/Table/Table'
import TimeRangeFilter from '@components/TimeRangeFilter'
import TableToolbar from '@components/TableToolbar'
import DetailPanel from '@components/DetailPanel'
import { useTableParams } from '@hooks/useTableParams'
import { useDataClassificationEvents, useExportDataClassificationEvents } from './hooks'
import { DATA_CLASSIFICATION_COLUMNS, ROWS_PER_PAGE_OPTIONS } from './constants'
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
  const [eventDetailPanel, setEventDetailPanel] = useState<DataClassificationEvent | null>(null)

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
    defaultRowsPerPage: 100,
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

  const handleRowClick = useCallback((row: DataClassificationEvent) => {
    setDetailPanel(null)
    setEventDetailPanel(row)
  }, [])

  const handleCloseEventDetailPanel = () => {
    setEventDetailPanel(null)
  }

  const stats = data?.stats

  const selectedEvents = useMemo(() => {
    return (data?.data ?? []).filter((event) => selectedRows.includes(event.id))
  }, [data?.data, selectedRows])

  // Convert user detail to array format for table display
  const userDetailData = detailPanel?.data
    ? [detailPanel.data]
    : []

  const eventDetailSections = eventDetailPanel
    ? [
        {
          title: 'Event Summary',
          data: {
            eventId: eventDetailPanel.eventId,
            hostname: eventDetailPanel.hostname,
            ipAddress: eventDetailPanel.ipAddress,
            loggedInUser: eventDetailPanel.loggedInUser,
            action: eventDetailPanel.action,
            eventTime: eventDetailPanel.eventTime,
          },
        },
        {
          title: 'File Details',
          data: {
            fileName: eventDetailPanel.fileName,
            fileSize: eventDetailPanel.fileSize,
            classification: eventDetailPanel.classification,
            department: eventDetailPanel.department,
            destinationPath: eventDetailPanel.destinationPath,
          },
        },
      ]
    : []

  return (
    <div className="flex h-full min-h-0 flex-col gap-4">
      <div className="flex items-center justify-between">
        <Typography variant="h5">Data Classification Events</Typography>
        <TimeRangeFilter value={timeRange} onChange={setTimeRange} />
      </div>

      {/* Toolbar */}
      <Paper elevation={0} className="px-4 py-2 border border-gray-200 dark:border-gray-700">
        <TableToolbar
          onRefresh={handleRefresh}
          onExport={() => exportData(selectedEvents)}
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
        />
      </Paper>

      {/* Main Table */}
      <div className={detailPanel ? 'min-h-0 shrink-0' : 'min-h-0 flex-1'}>
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
          maxHeight={detailPanel ? 300 : '100%'}
          selectable
          selectedRows={selectedRows}
          onSelectionChange={handleSelectionChange}
          maxSelection={5}
          onCellClick={handleCellClick}
          onRowClick={handleRowClick}
          emptyMessage="No data classification events found"
        />
      </div>

      {/* Detail Panel */}
      <Collapse in={!!detailPanel} unmountOnExit className="shrink-0">
        {detailPanel && (
          <Paper elevation={0} className="overflow-hidden rounded-2xl border border-blue-500/30 bg-[#111827] shadow-lg shadow-black/20">
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-5 py-4">
              <div>
                <Typography variant="subtitle1" fontWeight={800} className="text-white">
                  User Details - {detailPanel.row.loggedInUser}
                </Typography>
                <Typography variant="caption" className="text-gray-400">Logged in user profile summary</Typography>
              </div>
              <IconButton size="small" onClick={handleCloseDetailPanel} className="text-gray-300 hover:bg-white/10">
                <CloseOutlined fontSize="small" />
              </IconButton>
            </div>
            <div className="flex items-center justify-between gap-3 px-5 pb-3 pt-4">
              <Typography variant="caption" className="font-semibold text-gray-300">
                User profile attributes
              </Typography>
              <Typography variant="caption" className="font-bold text-blue-400">
                Scroll horizontally for more columns →
              </Typography>
            </div>
            <div className="mx-5 mb-5 overflow-x-auto rounded-xl border border-white/10 [color-scheme:dark] [scrollbar-width:thin]">
              {userDetailData.map((user) => (
                <table key={user.emailId} className="min-w-[1180px] w-full border-collapse text-left text-xs">
                  <thead className="bg-white/10 text-gray-200">
                    <tr>
                      {['Domain Name', 'UPN / Logon Name', 'AD OU', 'AD Groups', 'User Title', 'Email ID', 'Department', 'Manager Name', 'Manager Email ID', 'Manager Title'].map((label) => (
                        <th key={label} className="whitespace-nowrap border-b border-white/10 px-4 py-3 font-bold">{label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white/[0.03] transition hover:bg-blue-500/10">
                      {[user.domainName, user.upnLogonName, user.adOU, user.adGroups, user.userTitle, user.emailId, user.department, user.managerName, user.managerEmailId, user.managerTitle].map((value, index) => (
                        <td key={index} className="max-w-[190px] border-b border-white/10 px-4 py-3 font-semibold text-gray-100">
                          <span className="block truncate" title={value || '-'}>{value || '-'}</span>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              ))}
            </div>
          </Paper>
        )}
      </Collapse>
      <DetailPanel
        open={!!eventDetailPanel}
        title={`Event Details - ${eventDetailPanel?.eventId ?? ''}`}
        sections={eventDetailSections}
        onClose={handleCloseEventDetailPanel}
        variant="drawer"
      />
    </div>
  )
}

import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Table from '@components/Table/Table'
import { TablePageLayout } from '@components/Layout'
import { useTableParams } from '@hooks/useTableParams'
import type { Column } from '@components/Table/types'

// Mock data structure - replace with actual API call
interface Application {
  id: string
  name: string
  vendor: string
  category: string
  version: string
  status: 'allowed' | 'blocked' | 'warned'
  lastSeen: string
  users: number
}

// Mock data - replace with actual API hook
const mockApplications: Application[] = [
  {
    id: '1',
    name: 'Chrome',
    vendor: 'Google',
    category: 'Web Browser',
    version: '119.0.6045.199',
    status: 'allowed',
    lastSeen: '2026-04-19T10:30:00Z',
    users: 245,
  },
  {
    id: '2',
    name: 'Slack',
    vendor: 'Slack Technologies',
    category: 'Communication',
    version: '4.34.119',
    status: 'allowed',
    lastSeen: '2026-04-19T09:15:00Z',
    users: 156,
  },
  {
    id: '3',
    name: 'TikTok',
    vendor: 'ByteDance',
    category: 'Social Media',
    version: '27.8.3',
    status: 'blocked',
    lastSeen: '2026-04-19T08:45:00Z',
    users: 23,
  },
]

const statusColors = {
  allowed: 'success',
  blocked: 'error',
  warned: 'warning',
} as const

export default function ApplicationList() {
  const [searchParams] = useSearchParams()
  const {
    page,
    rowsPerPage,
    sortBy,
    sortDirection,
    setPage,
    setRowsPerPage,
    setSort,
  } = useTableParams({ defaultRowsPerPage: 25 })

  // Parse filters from URL parameters
  const filters = useMemo(() => {
    return {
      status: searchParams.get('status'),
      category: searchParams.get('category'),
      vendor: searchParams.get('vendor'),
      department: searchParams.get('department'),
      search: searchParams.get('search'),
      timeRange: searchParams.get('timeRange'),
      startDate: searchParams.get('startDate'),
      endDate: searchParams.get('endDate'),
    }
  }, [searchParams])

  // Filter applications based on URL parameters
  const filteredApplications = useMemo(() => {
    let results = [...mockApplications]

    if (filters.status && filters.status !== 'total') {
      results = results.filter(app => app.status === filters.status)
    }
    if (filters.category) {
      results = results.filter(app => 
        app.category.toLowerCase().includes(filters.category!.toLowerCase())
      )
    }
    if (filters.vendor) {
      results = results.filter(app =>
        app.vendor.toLowerCase().includes(filters.vendor!.toLowerCase())
      )
    }
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      results = results.filter(app =>
        app.name.toLowerCase().includes(searchTerm) ||
        app.vendor.toLowerCase().includes(searchTerm) ||
        app.category.toLowerCase().includes(searchTerm)
      )
    }

    return results
  }, [filters])

  const activeFiltersCount = Object.values(filters).filter(Boolean).length

  const columns: Column<Application>[] = [
    {
      id: 'name',
      label: 'Application Name',
      accessor: 'name',
      sortable: true,
      render: (_, row) => (
        <Box>
          <Typography variant="body2" fontWeight={500}>
            {row.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            v{row.version}
          </Typography>
        </Box>
      ),
    },
    {
      id: 'vendor',
      label: 'Vendor',
      accessor: 'vendor',
      sortable: true,
    },
    {
      id: 'category',
      label: 'Category',
      accessor: 'category',
      sortable: true,
    },
    {
      id: 'status',
      label: 'Status',
      accessor: 'status',
      sortable: true,
      render: (_, row) => (
        <Chip
          label={row.status.charAt(0).toUpperCase() + row.status.slice(1)}
          color={statusColors[row.status]}
          size="small"
          variant="outlined"
        />
      ),
    },
    {
      id: 'users',
      label: 'Users',
      accessor: 'users',
      sortable: true,
      render: (_, row) => row.users.toLocaleString(),
    },
    {
      id: 'lastSeen',
      label: 'Last Seen',
      accessor: 'lastSeen',
      sortable: true,
      render: (_, row) => 
        new Date(row.lastSeen).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
    },
  ]

  return (
    <TablePageLayout
      title="Applications"
      headerActions={
        <Typography variant="body2" color="text.secondary">
          {filteredApplications.length} application{filteredApplications.length !== 1 ? 's' : ''} found
          {activeFiltersCount > 0 && ` (${activeFiltersCount} filter${activeFiltersCount > 1 ? 's' : ''} applied)`}
        </Typography>
      }
      toolbar={
        activeFiltersCount > 0 ? (
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {Object.entries(filters).map(([key, value]) => {
              if (!value) return null
              return (
                <Chip
                  key={key}
                  label={`${key}: ${value}`}
                  size="small"
                  variant="outlined"
                  onDelete={() => {
                    const newParams = new URLSearchParams(searchParams)
                    newParams.delete(key)
                    window.history.replaceState(null, '', `?${newParams.toString()}`)
                  }}
                />
              )
            })}
          </Box>
        ) : undefined
      }
    >
      <Table<Application>
        data={filteredApplications}
        columns={columns}
        rowKey="id"
        loading={false}
        pagination={true}
        page={page}
        rowsPerPage={rowsPerPage}
        totalRows={filteredApplications.length}
        onPageChange={setPage}
        onRowsPerPageChange={setRowsPerPage}
        sortable={true}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortChange={setSort}
        maxHeight="100%"
        emptyMessage={
          activeFiltersCount > 0
            ? "No applications match the current filters. Try adjusting your search criteria."
            : "No applications have been discovered yet."
        }
      />
    </TablePageLayout>
  )
}
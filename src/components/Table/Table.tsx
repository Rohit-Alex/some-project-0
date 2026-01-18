import type { ReactNode } from 'react'
import MuiTable from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TablePagination from '@mui/material/TablePagination'
import TableSortLabel from '@mui/material/TableSortLabel'
import Checkbox from '@mui/material/Checkbox'
import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import SmartActionsCell from './SmartActionsCell'
import type { TableProps, Column, SortDirection } from './types'

export default function Table<T>({
  data,
  columns,
  rowKey,
  loading = false,
  selectable = false,
  selectedRows = [],
  onSelectionChange,
  sortable = false,
  sortBy,
  sortDirection = 'asc',
  onSortChange,
  stickyHeader = true,
  maxHeight = 600,
  pagination = false,
  page = 0,
  rowsPerPage = 10,
  totalRows,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [10, 25, 50, 100],
  smartActions,
  emptyMessage = 'No data available',
  dense = false,
  elevation = 0,
  className,
}: TableProps<T>): ReactNode {
  // Get row key
  const getRowKey = (row: T): string | number => {
    if (typeof rowKey === 'function') {
      return rowKey(row)
    }
    return row[rowKey] as string | number
  }

  // Get cell value
  const getCellValue = (row: T, column: Column<T>): ReactNode => {
    if (column.render) {
      const rawValue = typeof column.accessor === 'function'
        ? column.accessor(row)
        : row[column.accessor]
      return column.render(rawValue, row, data.indexOf(row))
    }

    if (typeof column.accessor === 'function') {
      return column.accessor(row)
    }

    return row[column.accessor] as ReactNode
  }


  const isSelected = (row: T): boolean => {
    return selectedRows.includes(getRowKey(row))
  }

  const isAllSelected = data.length > 0 && selectedRows.length === data.length
  const isIndeterminate = selectedRows.length > 0 && selectedRows.length < data.length

  const handleSelectAll = () => {
    if (isAllSelected) {
      onSelectionChange?.([])
    } else {
      onSelectionChange?.(data.map(getRowKey))
    }
  }

  const handleSelectRow = (row: T) => {
    const key = getRowKey(row)
    if (isSelected(row)) {
      onSelectionChange?.(selectedRows.filter((k) => k !== key))
    } else {
      onSelectionChange?.([...selectedRows, key])
    }
  }

  // Sort handler
  const handleSort = (columnId: string) => {
    const newDirection: SortDirection = sortBy === columnId && sortDirection === 'asc' ? 'desc' : 'asc'
    onSortChange?.(columnId, newDirection)
  }

  // Pagination handlers
  const handlePageChange = (_: unknown, newPage: number) => {
    onPageChange?.(newPage)
  }

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onRowsPerPageChange?.(parseInt(event.target.value, 10))
    onPageChange?.(0)
  }

  // Calculate total rows
  const total = totalRows ?? data.length

  // Skeleton rows for loading
  const skeletonRows = Array.from({ length: rowsPerPage }, (_, i) => i)

  // Sticky column styles
  const getStickyStyles = (column: Column<T>, isHeader = false) => {
    if (column.sticky === 'left') {
      return {
        position: 'sticky' as const,
        left: selectable ? 42 : 0,
        zIndex: isHeader ? 3 : 2,        
      }
    }
    if (column.sticky === 'right') {
      return {
        position: 'sticky' as const,
        right: smartActions ? 48 : 0,
        zIndex: isHeader ? 3 : 2,      
      }
    }
    return {}
  }

  return (
    <Paper elevation={elevation} className={className}>
      <TableContainer sx={{ maxHeight: stickyHeader ? maxHeight : undefined }}>
        <MuiTable stickyHeader={stickyHeader} size={dense ? 'small' : 'medium'}>
          <TableHead>
            <TableRow>              
              {selectable && (
                <TableCell
                  padding="checkbox"
                  sx={{
                    position: 'sticky',
                    left: 0,                    
                    zIndex: 4,
                  }}
                >
                  <Checkbox
                    indeterminate={isIndeterminate}
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    inputProps={{ 'aria-label': 'select all' }}
                  />
                </TableCell>
              )}

              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align ?? 'left'}
                  sx={{
                    minWidth: column.minWidth,
                    width: column.width,
                    ...getStickyStyles(column, true),
                  }}
                >
                  {sortable && column.sortable !== false ? (
                    <TableSortLabel
                      active={sortBy === column.id}
                      direction={sortBy === column.id ? sortDirection : 'asc'}
                      onClick={() => handleSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}

              {/* Smart actions header */}
              {smartActions && (
                <TableCell
                  align="center"
                  sx={{
                    position: 'sticky',
                    right: 0,                    
                    zIndex: 4,
                    width: 48,
                  }}
                >
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              // Loading skeleton
              skeletonRows.map((i) => (
                <TableRow key={i}>
                  {selectable && (
                    <TableCell padding="checkbox">
                      <Skeleton variant="rectangular" width={20} height={20} />
                    </TableCell>
                  )}
                  {columns.map((column) => (
                    <TableCell key={column.id}>
                      <Skeleton variant="text" />
                    </TableCell>
                  ))}
                  {smartActions && (
                    <TableCell>
                      <Skeleton variant="circular" width={24} height={24} />
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : data.length === 0 ? (
              // Empty state
              <TableRow>
                <TableCell
                  colSpan={columns.length + (selectable ? 1 : 0) + (smartActions ? 1 : 0)}
                  align="center"
                  sx={{ py: 6 }}
                >
                  <Typography color="text.secondary">{emptyMessage}</Typography>
                </TableCell>
              </TableRow>
            ) : (
              // Data rows
              data.map((row, rowIndex) => {
                const selected = isSelected(row)
                return (
                  <TableRow
                    key={getRowKey(row)}                    
                    selected={selected}
                    classes={{ selected: '!bg-transparent' }}                    
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    {/* Row checkbox */}
                    {selectable && (
                      <TableCell
                        padding="checkbox"
                        sx={{
                          position: 'sticky',
                          left: 0,
                          bgcolor: 'background.paper',
                          zIndex: 2,
                        }}
                      >
                        <Checkbox
                          checked={selected}
                          onChange={() => handleSelectRow(row)}
                          inputProps={{ 'aria-label': `select row ${rowIndex}` }}
                        />
                      </TableCell>
                    )}

                    {/* Data cells */}
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align ?? 'left'}
                        sx={getStickyStyles(column)}
                      >
                        {getCellValue(row, column)}
                      </TableCell>
                    ))}

                    {/* Smart actions cell */}
                    {smartActions && (
                      <TableCell
                        align="center"
                        sx={{
                          position: 'sticky',
                          right: 0,
                          bgcolor: 'background.paper',
                          zIndex: 2,
                        }}
                      >
                        <SmartActionsCell row={row} rowIndex={rowIndex} actions={smartActions} />
                      </TableCell>
                    )}
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </MuiTable>
      </TableContainer>

      {/* Pagination */}
      {pagination && (
        <TablePagination
          component="div"
          count={total}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      )}
    </Paper>
  )
}


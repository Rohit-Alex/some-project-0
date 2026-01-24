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
import ColumnFilterCell from './ColumnFilterCell'
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
  filterable = false,
  filterValues = {},
  onFilterChange,
  maxSelection,
  onCellClick,
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
      // Respect maxSelection when selecting all
      const allKeys = data.map(getRowKey)
      const keysToSelect = maxSelection ? allKeys.slice(0, maxSelection) : allKeys
      onSelectionChange?.(keysToSelect)
    }
  }

  const handleSelectRow = (row: T) => {
    const key = getRowKey(row)
    if (isSelected(row)) {
      onSelectionChange?.(selectedRows.filter((k) => k !== key))
    } else {
      // Check max selection limit
      if (maxSelection && selectedRows.length >= maxSelection) {
        return // Don't allow more selections
      }
      onSelectionChange?.([...selectedRows, key])
    }
  }

  // Check if selection is at max
  const isMaxSelected = maxSelection ? selectedRows.length >= maxSelection : false

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
    const baseStyles = {
      bgcolor: 'background.paper',
    }

    if (column.sticky === 'left') {
      return {
        ...baseStyles,
        position: 'sticky' as const,
        left: selectable ? 42 : 0,
        zIndex: isHeader ? 3 : 2,
      }
    }
    if (column.sticky === 'right') {
      return {
        ...baseStyles,
        position: 'sticky' as const,
        right: smartActions ? 48 : 0,
        zIndex: isHeader ? 3 : 2,
      }
    }
    return {}
  }

  // Clickable cell styles
  const getClickableCellStyles = (column: Column<T>) => {
    if (column.clickable && onCellClick) {
      return {
        cursor: 'pointer',
        color: 'primary.main',
        '&:hover': {
          bgcolor: 'action.hover',
          textDecoration: 'underline',
        },
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
                    bgcolor: 'background.paper',
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
                    bgcolor: 'background.paper',
                    zIndex: 4,
                    width: 48,
                  }}
                >
                  Actions
                </TableCell>
              )}
            </TableRow>

            {/* Filter row */}
            {filterable && columns.some((col) => col.filter) && (
              <TableRow>
                {selectable && (
                  <TableCell
                    sx={{
                      bgcolor: 'background.paper',
                      position: 'sticky',
                      left: 0,
                      zIndex: 3,
                    }}
                  />
                )}
                {columns.map((column) => (
                  <TableCell
                    key={`filter-${column.id}`}
                    sx={{
                      py: 1,
                      bgcolor: 'background.paper',
                      ...getStickyStyles(column, true),
                    }}
                  >
                    {column.filter && onFilterChange ? (
                      <ColumnFilterCell
                        columnId={column.id}
                        filter={column.filter}
                        value={filterValues[column.id]}
                        onChange={onFilterChange}
                      />
                    ) : null}
                  </TableCell>
                ))}
                {smartActions && (
                  <TableCell
                    sx={{
                      bgcolor: 'background.paper',
                      position: 'sticky',
                      right: 0,
                      zIndex: 3,
                    }}
                  />
                )}
              </TableRow>
            )}
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
                          disabled={!selected && isMaxSelected}
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
                        onClick={
                          column.clickable && onCellClick
                            ? () => onCellClick(column.id, row, rowIndex)
                            : undefined
                        }
                        sx={{
                          ...getStickyStyles(column),
                          ...getClickableCellStyles(column),
                        }}
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


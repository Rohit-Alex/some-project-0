import type { ReactNode } from 'react'

// ==============================|| TABLE TYPES ||============================== //

export type SortDirection = 'asc' | 'desc'

export interface Column<T> {
  /** Unique key for the column */
  id: string
  /** Column header label */
  label: string
  /** Field accessor - key of the data object or custom accessor function */
  accessor: keyof T | ((row: T) => ReactNode)
  /** Column width */
  width?: number | string
  /** Minimum column width */
  minWidth?: number
  /** Whether column is sortable */
  sortable?: boolean
  /** Text alignment */
  align?: 'left' | 'center' | 'right'
  /** Make column sticky (first or last) */
  sticky?: 'left' | 'right'
  /** Custom cell renderer */
  render?: (value: unknown, row: T, rowIndex: number) => ReactNode
  /** Hide column on smaller screens */
  hideOnMobile?: boolean
}

export interface SmartAction<T> {
  /** Unique key for the action */
  id: string
  /** Action label */
  label: string
  /** Action icon */
  icon?: ReactNode
  /** Action handler */
  onClick: (row: T, rowIndex: number) => void
  /** Disable condition */
  disabled?: boolean | ((row: T) => boolean)
  /** Color for the action */
  color?: 'inherit' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
  /** Divider above this action */
  divider?: boolean
}

export interface TableProps<T> {
  /** Table data */
  data: T[]
  /** Column definitions */
  columns: Column<T>[]
  /** Unique row key accessor */
  rowKey: keyof T | ((row: T) => string | number)
  /** Loading state */
  loading?: boolean
  /** Enable row selection with checkboxes */
  selectable?: boolean
  /** Currently selected row keys */
  selectedRows?: (string | number)[]
  /** Selection change handler */
  onSelectionChange?: (selectedKeys: (string | number)[]) => void
  /** Enable sorting */
  sortable?: boolean
  /** Current sort column */
  sortBy?: string
  /** Current sort direction */
  sortDirection?: SortDirection
  /** Sort change handler */
  onSortChange?: (columnId: string, direction: SortDirection) => void
  /** Make header sticky */
  stickyHeader?: boolean
  /** Max height for scrollable table body */
  maxHeight?: number | string
  /** Enable pagination */
  pagination?: boolean
  /** Current page (0-indexed) */
  page?: number
  /** Rows per page */
  rowsPerPage?: number
  /** Total row count (for server-side pagination) */
  totalRows?: number
  /** Page change handler */
  onPageChange?: (page: number) => void
  /** Rows per page change handler */
  onRowsPerPageChange?: (rowsPerPage: number) => void
  /** Rows per page options */
  rowsPerPageOptions?: number[]
  /** Smart actions for each row (3-dot menu) */
  smartActions?: SmartAction<T>[]
  /** Empty state message */
  emptyMessage?: string
  /** Enable dense mode */
  dense?: boolean
  /** Table elevation */
  elevation?: number
  /** Custom class name */
  className?: string
}


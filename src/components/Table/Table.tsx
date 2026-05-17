import type { ReactNode } from 'react';
import SmartActionsCell from './SmartActionsCell';
import ColumnFilterCell from './ColumnFilterCell';
import type { TableProps, Column, SortDirection } from './types';
import { Table as MuiTable, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TableSortLabel, Checkbox, Paper, Skeleton, Typography, Box } from '@mui/material';

export default function Table<T>({
    data, columns, rowKey, loading = false, selectable = false, selectedRows = [], onSelectionChange, sortable = false,
    sortBy, sortDirection = 'asc', onSortChange, stickyHeader = true, maxHeight = 600, pagination = false, page = 0,
    rowsPerPage = 10, totalRows, onPageChange, onRowsPerPageChange, rowsPerPageOptions = [10, 25, 50, 100], smartActions,
    emptyMessage = 'No data available', dense = false, elevation = 0, className, filterable = false, filterValues = {},
    onFilterChange, maxSelection, onCellClick, onRowClick,
}: TableProps<T>): ReactNode {
    const getRowKey = (row: T): string | number => {
        if (typeof rowKey === 'function') {
            return rowKey(row);
        }
        return row[rowKey] as string | number;
    };

    const getCellValue = (row: T, column: Column<T>): ReactNode => {
        if (column.render) {
            const rawValue = typeof column.accessor === 'function' ? column.accessor(row) : row[column.accessor];
            return column.render(rawValue, row, data.indexOf(row));
        }

        if (typeof column.accessor === 'function') {
            return column.accessor(row);
        }

        return row[column.accessor] as ReactNode;
    };

    const isSelected = (row: T): boolean => {
        return selectedRows.includes(getRowKey(row));
    };

    const isAllSelected = data.length > 0 && selectedRows.length === data.length;
    const isIndeterminate = selectedRows.length > 0 && selectedRows.length < data.length;

    const handleSelectAll = () => {
        if (isAllSelected) {
            onSelectionChange?.([]);
        } else {
            // Respect maxSelection when selecting all
            const allKeys = data.map(getRowKey);
            const keysToSelect = maxSelection ? allKeys.slice(0, maxSelection) : allKeys;
            onSelectionChange?.(keysToSelect);
        }
    };

    const handleSelectRow = (row: T) => {
        const key = getRowKey(row);
        if (isSelected(row)) {
            onSelectionChange?.(selectedRows.filter((k) => k !== key));
        } else {
            // Check max selection limit
            if (maxSelection && selectedRows.length >= maxSelection) {
                return; // Don't allow more selections
            }
            onSelectionChange?.([...selectedRows, key]);
        }
    };

    // Check if selection is at max
    const isMaxSelected = maxSelection ? selectedRows.length >= maxSelection : false;

    // Sort handler
    const handleSort = (columnId: string) => {
        const newDirection: SortDirection = sortBy === columnId && sortDirection === 'asc' ? 'desc' : 'asc';
        onSortChange?.(columnId, newDirection);
    };

    // Pagination handlers
    const handlePageChange = (_: unknown, newPage: number) => {
        onPageChange?.(newPage);
    };

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onRowsPerPageChange?.(parseInt(event.target.value, 10));
        onPageChange?.(0);
    };

    // Calculate total rows
    const total = totalRows ?? data.length;

    // Skeleton rows for loading
    const skeletonRows = Array.from({ length: rowsPerPage }, (_, i) => i);

    // Sticky column styles
    const getStickyStyles = (column: Column<T>, isHeader = false) => {
        const baseStyles = {
            bgcolor: isHeader ? 'background.default' : 'background.paper',
        };

        if (column.sticky === 'left') {
            return {
                ...baseStyles,
                position: 'sticky' as const,
                left: selectable ? 42 : 0,
                zIndex: isHeader ? 7 : 2,
            }
        }
        if (column.sticky === 'right') {
            return {
                ...baseStyles,
                position: 'sticky' as const,
                right: smartActions ? 48 : 0,
                zIndex: isHeader ? 7 : 2,
            }
        }
        return {};
    };

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
        return {};
    };

    // Row click handler with priority: checkbox > cell click > row click
    const handleRowClick = (row: T, rowIndex: number, event: React.MouseEvent<HTMLTableRowElement>) => {
        // Check if click was on checkbox or clickable cell - these are handled separately
        const target = event.target as HTMLElement;
        const isCheckbox = target.closest('input[type="checkbox"]') || target.closest('.MuiCheckbox-root');
        const isClickableCell = target.closest('[data-clickable="true"]');
        const isSmartAction = target.closest('[data-smart-actions="true"]');

        // Don't fire row click if it was checkbox, clickable cell, or smart action
        if (isCheckbox || isClickableCell || isSmartAction) {
            return;
        }

        // Fire row click
        onRowClick?.(row, rowIndex);
    };

    // Check if row is interactive (selectable or clickable)
    const isRowInteractive = selectable || onRowClick;

    return (
        <Paper elevation={elevation} className={className} sx={{ height: maxHeight === '100%' ? '100%' : undefined, display: 'flex', flexDirection: 'column', minHeight: 0, border: 1, borderColor: 'divider', borderRadius: 2, overflow: 'hidden', bgcolor: 'background.paper' }}>
            <TableContainer sx={{ maxHeight: stickyHeader ? maxHeight : undefined, overflow: 'auto', width: '100%', flex: maxHeight === '100%' ? 1 : undefined, minHeight: 0, scrollbarWidth: 'none', msOverflowStyle: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
                <MuiTable stickyHeader={stickyHeader} size={dense ? 'small' : 'medium'} sx={{ width: '100%', tableLayout: 'fixed' }}>
                    <TableHead sx={{ '& .MuiTableCell-root': { bgcolor: 'background.default', position: stickyHeader ? 'sticky' : undefined, top: stickyHeader ? 0 : undefined, zIndex: stickyHeader ? 6 : undefined, boxShadow: stickyHeader ? '0 1px 0 rgba(255,255,255,0.08), 0 6px 12px rgba(0,0,0,0.18)' : undefined } }}>
                        <TableRow>              
                            {selectable && (
                                <TableCell padding="checkbox" sx={{ position: stickyHeader ? 'sticky' : undefined, top: stickyHeader ? 0 : undefined, left: 0, bgcolor: 'background.default', zIndex: 8, boxShadow: stickyHeader ? '0 1px 0 rgba(255,255,255,0.08), 0 6px 12px rgba(0,0,0,0.18)' : undefined }}>
                                    <Checkbox indeterminate={isIndeterminate} checked={isAllSelected} onChange={handleSelectAll} slotProps={{ input: { 'aria-label': 'select all' } }} />
                                </TableCell>
                            )}

                            {columns.map((column) => (
                                <TableCell key={column.id} align={column.align ?? 'left'} sx={{ minWidth: 0, width: column.width ?? column.minWidth, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', py: 1.25, fontWeight: 700, bgcolor: 'background.default', borderColor: 'divider', ...getStickyStyles(column, true)}}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, minWidth: 0 }}>
                                        {sortable && column.sortable !== false ? (
                                            <TableSortLabel active={sortBy === column.id} direction={sortBy === column.id ? sortDirection : 'asc'} onClick={() => handleSort(column.id)}>
                                                <Box component="span" sx={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>{column.label}</Box>
                                            </TableSortLabel>
                                        ) : (
                                            <Box component="span" sx={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>{column.label}</Box>
                                        )}

                                        {filterable && column.filter && onFilterChange && (
                                            <ColumnFilterCell columnId={column.id} filter={column.filter} value={filterValues[column.id]} onChange={onFilterChange} />
                                        )}
                                    </Box>
                                </TableCell>
                            ))}

                            {/* Smart actions header */}
                            {smartActions && (
                                <TableCell align="center" sx={{ position: 'sticky', right: 0, bgcolor: 'background.paper', zIndex: 4, width: 48 }}>
                                    Actions
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {loading ? (
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
                            <TableRow>
                                <TableCell colSpan={columns.length + (selectable ? 1 : 0) + (smartActions ? 1 : 0)} align="center" sx={{ py: 6 }}>
                                    <Typography color="text.secondary">{emptyMessage}</Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((row, rowIndex) => {
                                const selected = isSelected(row)
                                return (
                                    <TableRow
                                        key={getRowKey(row)}
                                        hover={!!isRowInteractive}
                                        selected={selected}
                                        onClick={onRowClick ? (e: React.MouseEvent<HTMLTableRowElement>) => handleRowClick(row, rowIndex, e) : undefined}
                                        classes={{ selected: '!bg-transparent' }}
                                        sx={{
                                            '&:last-child td, &:last-child th': { borderBottom: 0 },
                                            '&:nth-of-type(even)': { bgcolor: 'action.hover' },
                                            ...(isRowInteractive && {
                                                cursor: 'pointer',
                                                transition: 'background-color 0.15s ease-in-out',
                                            '&:hover': { bgcolor: 'action.selected' },
                                            }),
                                            ...(selected && {
                                                bgcolor: 'action.selected',
                                                '&:hover': {
                                                bgcolor: 'action.selected',
                                                },
                                            }),
                                        }}
                                    >
                                    {selectable && (
                                        <TableCell padding="checkbox" sx={{ position: 'sticky', left: 0, bgcolor: 'background.paper', zIndex: 2 }}>
                                            <Checkbox checked={selected} disabled={!selected && isMaxSelected} onChange={() => handleSelectRow(row)} slotProps={{ input: { 'aria-label': `select row ${rowIndex}` } }} />
                                        </TableCell>
                                    )}

                                    {/* Data cells */}
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align ?? 'left'}
                                            data-clickable={column.clickable && onCellClick ? 'true' : undefined}
                                            onClick={
                                                column.clickable && onCellClick ? () => onCellClick(column.id, row, rowIndex) : undefined
                                            }
                                            sx={{
                                                minWidth: 0,
                                                width: column.width ?? column.minWidth,
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                py: dense ? 0.75 : 1.25,
                                                borderColor: 'divider',
                                                ...getStickyStyles(column),
                                                ...getClickableCellStyles(column),
                                            }}
                                        >
                                            {getCellValue(row, column)}
                                        </TableCell>
                                    ))}

                                    {/* Smart actions cell */}
                                    {smartActions && (
                                        <TableCell align="center" data-smart-actions="true" sx={{ position: 'sticky', right: 0, bgcolor: 'background.paper', zIndex: 2 }}>
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
                    sx={{ overflow: 'hidden', borderTop: 1, borderColor: 'divider', bgcolor: 'background.paper', minHeight: 52 }}
                />
            )}
        </Paper>
    );
};


import type { ReactNode } from "react";
import { RefreshOutlined, FileDownloadOutlined } from "@mui/icons-material";
import { IconButton, Tooltip, Typography, Badge, Stack, Divider, Skeleton } from "@mui/material";

export interface ToolbarAction {
    id: string
    icon: ReactNode
    tooltip: string
    onClick?: () => void
    disabled?: boolean
};

export interface ToolbarStat {
    id: string
    icon: ReactNode
    label: string
    value: number | string
    color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
    tooltip?: string
};

export interface TableToolbarProps {
    actions?: ToolbarAction[]
    stats?: ToolbarStat[]
    onRefresh?: () => void
    onExport?: () => void
    showRefresh?: boolean
    showExport?: boolean
    loading?: boolean
    className?: string
    children?: ReactNode
};

export default function TableToolbar({
    actions = [],
    stats = [],
    onRefresh,
    onExport,
    showRefresh = true,
    showExport = true,
    loading = false,
    className,
    children,
}: TableToolbarProps) {
    const defaultActions: ToolbarAction[] = []

    if (showRefresh && onRefresh) {
        defaultActions.push({
            id: 'refresh',
            icon: <RefreshOutlined />,
            tooltip: 'Refresh',
            onClick: onRefresh,
            disabled: loading,
        })
    }

    if (showExport && onExport) {
        defaultActions.push({
            id: 'export',
            icon: <FileDownloadOutlined />,
            tooltip: 'Export',
            onClick: onExport,
            disabled: loading,
        })
    }

    const allActions = [...defaultActions, ...actions];

    return (
        <div className={`flex items-center justify-between gap-4 py-2 ${className || ''}`}>
            {/* Left side - Stats */}
            <Stack direction="row" spacing={2} alignItems="center" divider={<Divider orientation="vertical" flexItem />}>
                {loading ? (
                    Array.from({ length: stats.length || 4 }).map((_, index) => (
                        <Stack key={index} direction="row" spacing={1} alignItems="center">
                            <Skeleton variant="circular" width={24} height={24} />
                            <Skeleton variant="text" width={80} height={20} sx={{ display: { xs: 'none', sm: 'block' } }} />
                        </Stack>
                    ))
                ) : (
                    stats.map((stat) => (
                        <Stack key={stat.id} direction="row" spacing={1} alignItems="center">
                            <Badge badgeContent={stat.value} color={stat.color || 'primary'} max={9999} sx={{ '& .MuiBadge-badge': { position: 'relative', transform: 'none', ml: 1 }}}>
                                <Tooltip title={stat.label}>
                                    <span className="flex items-center text-gray-500">{stat.icon}</span>
                                </Tooltip>
                            </Badge>

                            <Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>
                                {stat.label}
                            </Typography>
                        </Stack>
                    ))
                )}
                {children}
            </Stack>

            {/* Right side - Actions */}
            <Stack direction="row" spacing={0.5}>
                {allActions.map((action) => (
                    <Tooltip key={action.id} title={action.tooltip}>
                        <span>
                            <IconButton size="small" onClick={action.onClick} disabled={action.disabled} sx={{ color: 'text.secondary' }}>
                                {action.icon}
                            </IconButton>
                        </span>
                    </Tooltip>
                ))}
            </Stack>
        </div>
    );
};

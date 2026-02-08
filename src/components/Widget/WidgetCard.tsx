import type { ReactNode } from 'react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Skeleton from '@mui/material/Skeleton'
import IconButton from '@mui/material/IconButton'
import InfoOutlined from '@mui/icons-material/InfoOutlined'
import type { WidgetCardProps } from './types'

export default function WidgetCard({
  title,
  subtitle,
  tooltip,
  children,
  loading = false,
  className = '',
  headerAction,
  minHeight = 200,
}: WidgetCardProps): ReactNode {
  return (
    <Paper
      elevation={0}
      className={`border border-gray-200 dark:border-gray-700 h-full flex flex-col ${className}`}
      sx={{ minHeight }}
    >
      {/* Header */}
      <div className="flex items-start justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <Typography variant="subtitle1" fontWeight={600} noWrap>
              {title}
            </Typography>
            {tooltip && (
              <Tooltip title={tooltip} arrow placement="top">
                <IconButton size="small" className="opacity-60">
                  <InfoOutlined sx={{ fontSize: 16 }} />
                </IconButton>
              </Tooltip>
            )}
          </div>
          {subtitle && (
            <Typography variant="caption" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </div>
        {headerAction && <div className="ml-2">{headerAction}</div>}
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        {loading ? (
          <Skeleton variant="rectangular" height="100%" sx={{ borderRadius: 1 }} />
        ) : (
          children
        )}
      </div>
    </Paper>
  )
}


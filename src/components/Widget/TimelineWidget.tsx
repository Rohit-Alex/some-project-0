import type { ReactNode } from 'react'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import { useTheme } from '@mui/material/styles'
import FiberManualRecordOutlined from '@mui/icons-material/FiberManualRecordOutlined'
import type { TimelineWidgetProps, TimelineEventProps } from './types'

function TimelineEvent({ event }: { event: TimelineEventProps }): ReactNode {
  const theme = useTheme()
  
  const colorMap = {
    success: theme.palette.success.main,
    error: theme.palette.error.main,
    warning: theme.palette.warning.main,
    info: theme.palette.info.main,
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
  }
  
  const dotColor = colorMap[event.color ?? 'primary']

  return (
    <div className="flex gap-3 py-2">
      {/* Timeline dot and line */}
      <div className="flex flex-col items-center">
        <FiberManualRecordOutlined sx={{ fontSize: 12, color: dotColor }} />
        <div className="flex-1 w-px bg-gray-200 dark:bg-gray-700 mt-1" />
      </div>

      {/* Event content */}
      <div className="flex-1 min-w-0 pb-3">
        <div className="flex items-center justify-between gap-2">
          <Typography variant="body2" fontWeight={500} noWrap>
            {event.title}
          </Typography>
          <Typography variant="caption" color="text.secondary" className="shrink-0">
            {event.timestamp}
          </Typography>
        </div>
        
        {event.subtitle && (
          <Typography variant="caption" color="text.secondary" className="block">
            {event.subtitle}
          </Typography>
        )}

        {/* Event details as chips */}
        {event.details && Object.keys(event.details).length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {Object.entries(event.details).map(([key, value]) => (
              <Chip
                key={key}
                size="small"
                label={`${key}: ${value}`}
                variant="outlined"
                sx={{ height: 20, fontSize: 10 }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function TimelineWidget({
  events,
  loading = false,
  maxHeight = 400,
  className = '',
}: TimelineWidgetProps): ReactNode {
  if (loading) {
    return (
      <Box className={className}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-3 py-2">
            <Skeleton variant="circular" width={12} height={12} />
            <div className="flex-1">
              <Skeleton variant="text" width="80%" height={20} />
              <Skeleton variant="text" width="60%" height={16} />
            </div>
          </div>
        ))}
      </Box>
    )
  }

  if (events.length === 0) {
    return (
      <Box className={`flex items-center justify-center ${className}`} sx={{ minHeight: 200 }}>
        <Typography variant="body2" color="text.secondary">
          No recent events
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      className={`overflow-y-auto ${className}`}
      sx={{ maxHeight }}
    >
      {events.map((event) => (
        <TimelineEvent key={event.id} event={event} />
      ))}
    </Box>
  )
}


import { useMemo } from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

import TimeRangeFilter from '@components/TimeRangeFilter'
import { LazyWidget } from '@components/Widget'
import { useTableParams } from '@hooks/useTableParams'

import {
  KpiStatsWidget,
  RecentTransfersWidget,
  TotalEventsWidget,
  BlockedByTypeWidget,
  AllowedLoggedWidget,
  TopUsersWidget,
  TopEndpointsWidget,
  FileTypeWidget,
  PolicyEventsWidget,
  DeptBlockedWidget,
  AlertVolumeWidget,
  TransferTrendWidget,
  SuspiciousTransfersWidget,
} from './widgets'

export default function DataTransfer() {
  const { timeRange, setTimeRange } = useTableParams({
    defaultRowsPerPage: 10,
  })

  const timeRangeKey = useMemo(() => {
    if (timeRange.range === 'custom') {
      return `custom:${timeRange.startDate || ''}:${timeRange.endDate || ''}`
    }
    return timeRange.range
  }, [timeRange.range, timeRange.startDate, timeRange.endDate])

  const widgetProps = {
    timeRangeKey,
    startDate: timeRange.startDate,
    endDate: timeRange.endDate,
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Typography variant="h5">Data Transfer Dashboard</Typography>
        <TimeRangeFilter value={timeRange} onChange={setTimeRange} />
      </div>

      {/* KPI Cards Row */}
      <KpiStatsWidget {...widgetProps} />

      {/* Row 1: Timeline + KPI Sparkline */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 5 }}>
          <RecentTransfersWidget {...widgetProps} />
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <TotalEventsWidget {...widgetProps} />
        </Grid>
      </Grid>

      {/* Row 2: Blocked by Type + Allowed/Logged Area */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <LazyWidget minHeight={350}>
            <BlockedByTypeWidget {...widgetProps} />
          </LazyWidget>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <LazyWidget minHeight={350}>
            <AllowedLoggedWidget {...widgetProps} />
          </LazyWidget>
        </Grid>
      </Grid>

      {/* Row 3: Top Users + Top Endpoints */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <LazyWidget minHeight={350}>
            <TopUsersWidget {...widgetProps} />
          </LazyWidget>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <LazyWidget minHeight={350}>
            <TopEndpointsWidget {...widgetProps} />
          </LazyWidget>
        </Grid>
      </Grid>

      {/* Row 4: File Types + Policy Events */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <LazyWidget minHeight={350}>
            <FileTypeWidget {...widgetProps} />
          </LazyWidget>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <LazyWidget minHeight={350}>
            <PolicyEventsWidget {...widgetProps} />
          </LazyWidget>
        </Grid>
      </Grid>

      {/* Row 5: Department Blocked + Alert Volume */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <LazyWidget minHeight={350}>
            <DeptBlockedWidget {...widgetProps} />
          </LazyWidget>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <LazyWidget minHeight={350}>
            <AlertVolumeWidget {...widgetProps} />
          </LazyWidget>
        </Grid>
      </Grid>

      {/* Row 6: Trend + Suspicious Transfers */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <LazyWidget minHeight={350}>
            <TransferTrendWidget {...widgetProps} />
          </LazyWidget>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <LazyWidget minHeight={350}>
            <SuspiciousTransfersWidget {...widgetProps} />
          </LazyWidget>
        </Grid>
      </Grid>
    </div>
  )
}

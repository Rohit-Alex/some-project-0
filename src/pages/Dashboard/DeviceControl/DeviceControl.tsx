import { useMemo } from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

import TimeRangeFilter from '@components/TimeRangeFilter'
import { LazyWidget } from '@components/Widget'
import { useTableParams } from '@hooks/useTableParams'

import {
  KpiStatsWidget,
  RecentEventsWidget,
  TotalEventsChartWidget,
  BlockedByTypeWidget,
  AllowedByTypeWidget,
  TopUsersWidget,
  TopEndpointsWidget,
  VendorBreakdownWidget,
  PolicyEventsWidget,
  DeptBlockedWidget,
  AlertVolumeWidget,
  EventTrendWidget,
  SuspiciousDevicesWidget,
} from './widgets'

export default function DeviceControl() {
  const { timeRange, setTimeRange } = useTableParams({
    defaultRowsPerPage: 10,
  })

  // Stable time range key for caching
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
        <Typography variant="h5">Device Control Dashboard</Typography>
        <TimeRangeFilter value={timeRange} onChange={setTimeRange} />
      </div>

      {/* KPI Cards Row - Always visible, no lazy loading */}
      <KpiStatsWidget {...widgetProps} />

      {/* Row 1: Timeline + Total Events Stacked Chart */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 5 }}>
          <RecentEventsWidget {...widgetProps} />
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <TotalEventsChartWidget {...widgetProps} />
        </Grid>
      </Grid>

      {/* Row 2: Blocked by Type + Allowed by Type */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <LazyWidget minHeight={350}>
            <BlockedByTypeWidget {...widgetProps} />
          </LazyWidget>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <LazyWidget minHeight={350}>
            <AllowedByTypeWidget {...widgetProps} />
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

      {/* Row 4: Vendor Breakdown + Policy Events */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <LazyWidget minHeight={350}>
            <VendorBreakdownWidget {...widgetProps} />
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

      {/* Row 6: Event Trend + Suspicious Devices */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <LazyWidget minHeight={350}>
            <EventTrendWidget {...widgetProps} />
          </LazyWidget>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <LazyWidget minHeight={350}>
            <SuspiciousDevicesWidget {...widgetProps} />
          </LazyWidget>
        </Grid>
      </Grid>
    </div>
  )
}

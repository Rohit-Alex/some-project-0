import { useMemo } from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

import TimeRangeFilter from '@components/TimeRangeFilter'
import { LazyWidget } from '@components/Widget'
import { useTableParams } from '@hooks/useTableParams'

import {
  KpiStatsWidget,
  FootprintWidget,
  CategoryInventoryWidget,
  VendorInventoryWidget,
  NewAppTrendWidget,
  RecentInstallsWidget,
  DeptApplicationsWidget,
  BlockByCategoryWidget,
  TopBlockedAppsWidget,
  UserBlockWidget,
  EndpointBlockWidget,
} from './widgets'

export default function ApplicationControl() {
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
        <Typography variant="h5">Application Control Dashboard</Typography>
        <TimeRangeFilter value={timeRange} onChange={setTimeRange} />
      </div>

      {/* KPI Cards Row */}
      <KpiStatsWidget {...widgetProps} />

      {/* Row 1: Application Footprint KPI + Category Inventory */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 7 }}>
          <FootprintWidget {...widgetProps} />
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <CategoryInventoryWidget {...widgetProps} />
        </Grid>
      </Grid>

      {/* Row 2: Vendor Inventory + New App Trend */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <LazyWidget minHeight={350}>
            <VendorInventoryWidget {...widgetProps} />
          </LazyWidget>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <LazyWidget minHeight={350}>
            <NewAppTrendWidget {...widgetProps} />
          </LazyWidget>
        </Grid>
      </Grid>

      {/* Row 3: Recent Installs Timeline + Department Applications */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 5 }}>
          <LazyWidget minHeight={400}>
            <RecentInstallsWidget {...widgetProps} />
          </LazyWidget>
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <LazyWidget minHeight={400}>
            <DeptApplicationsWidget {...widgetProps} />
          </LazyWidget>
        </Grid>
      </Grid>

      {/* Row 4: Block Events Total + Top Blocked Apps */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <LazyWidget minHeight={350}>
            <BlockByCategoryWidget {...widgetProps} />
          </LazyWidget>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <LazyWidget minHeight={350}>
            <TopBlockedAppsWidget {...widgetProps} />
          </LazyWidget>
        </Grid>
      </Grid>

      {/* Row 5: User Block Events + Endpoint Block Events */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <LazyWidget minHeight={350}>
            <UserBlockWidget {...widgetProps} />
          </LazyWidget>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <LazyWidget minHeight={350}>
            <EndpointBlockWidget {...widgetProps} />
          </LazyWidget>
        </Grid>
      </Grid>
    </div>
  )
}

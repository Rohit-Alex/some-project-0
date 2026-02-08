import Grid from '@mui/material/Grid'
import UsbOutlined from '@mui/icons-material/UsbOutlined'
import BlockOutlined from '@mui/icons-material/BlockOutlined'
import CheckCircleOutlineOutlined from '@mui/icons-material/CheckCircleOutlineOutlined'
import WarningAmberOutlined from '@mui/icons-material/WarningAmberOutlined'

import { KpiCard } from '@components/Widget'
import { useDeviceControlStats, useEventTrend } from '../hooks'
import { CHART_COLORS } from '../constants'

interface KpiStatsWidgetProps {
  timeRangeKey: string
  startDate?: string
  endDate?: string
}

export default function KpiStatsWidget({ timeRangeKey, startDate, endDate }: KpiStatsWidgetProps) {
  const { data: stats, isLoading: statsLoading } = useDeviceControlStats({ timeRangeKey, startDate, endDate })
  const { data: eventTrend, isLoading: trendLoading } = useEventTrend({ timeRangeKey, startDate, endDate })

  const sparklineData = eventTrend?.map((e) => e.total) ?? []
  const isLoading = statsLoading || trendLoading

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          title="Total Events"
          value={stats?.totalEvents ?? 0}
          change={12}
          trend="up"
          changeLabel="vs previous period"
          sparklineData={sparklineData}
          loading={isLoading}
          icon={<UsbOutlined color="primary" />}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          title="Allowed Events"
          value={stats?.allowedEvents ?? 0}
          change={8}
          trend="up"
          changeLabel="vs previous period"
          sparklineColor={CHART_COLORS.allowed}
          loading={isLoading}
          icon={<CheckCircleOutlineOutlined color="success" />}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          title="Blocked Events"
          value={stats?.blockedEvents ?? 0}
          change={-5}
          trend="down"
          changeLabel="vs previous period"
          sparklineColor={CHART_COLORS.blocked}
          loading={isLoading}
          icon={<BlockOutlined color="error" />}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          title="Alerted Events"
          value={stats?.alertedEvents ?? 0}
          change={3}
          trend="up"
          changeLabel="vs previous period"
          sparklineColor={CHART_COLORS.alerted}
          loading={isLoading}
          icon={<WarningAmberOutlined color="warning" />}
        />
      </Grid>
    </Grid>
  )
}


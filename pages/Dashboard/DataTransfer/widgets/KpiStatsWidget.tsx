import Grid from '@mui/material/Grid'
import SyncOutlined from '@mui/icons-material/SyncOutlined'
import BlockOutlined from '@mui/icons-material/BlockOutlined'
import CheckCircleOutlineOutlined from '@mui/icons-material/CheckCircleOutlineOutlined'
import DescriptionOutlined from '@mui/icons-material/DescriptionOutlined'

import { KpiCard } from '@components/Widget'
import { useDataTransferStats, useTransferTrend } from '../hooks'
import { CHART_COLORS } from '../constants'

interface KpiStatsWidgetProps {
  timeRangeKey: string
  startDate?: string
  endDate?: string
}

export default function KpiStatsWidget({ timeRangeKey, startDate, endDate }: KpiStatsWidgetProps) {
  const { data: stats, isLoading: statsLoading } = useDataTransferStats({ timeRangeKey, startDate, endDate })
  const { data: trend, isLoading: trendLoading } = useTransferTrend({ timeRangeKey, startDate, endDate })

  const sparklineData = trend?.map((t) => t.total) ?? []
  const isLoading = statsLoading || trendLoading

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          title="Total Events"
          value={stats?.totalEvents ?? 0}
          change={15}
          trend="up"
          changeLabel="vs previous period"
          sparklineData={sparklineData}
          loading={isLoading}
          icon={<SyncOutlined color="primary" />}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          title="Allowed Events"
          value={stats?.allowedEvents ?? 0}
          change={10}
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
          change={-8}
          trend="down"
          changeLabel="vs previous period"
          sparklineColor={CHART_COLORS.blocked}
          loading={isLoading}
          icon={<BlockOutlined color="error" />}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          title="Logged Events"
          value={stats?.loggedEvents ?? 0}
          change={5}
          trend="up"
          changeLabel="vs previous period"
          sparklineColor={CHART_COLORS.logged}
          loading={isLoading}
          icon={<DescriptionOutlined color="info" />}
        />
      </Grid>
    </Grid>
  )
}


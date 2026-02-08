import Grid from '@mui/material/Grid'
import AppsOutlined from '@mui/icons-material/AppsOutlined'
import BlockOutlined from '@mui/icons-material/BlockOutlined'
import AddCircleOutlineOutlined from '@mui/icons-material/AddCircleOutlineOutlined'
import WarningAmberOutlined from '@mui/icons-material/WarningAmberOutlined'

import { KpiCard } from '@components/Widget'
import { useAppControlStats, useApplicationFootprint } from '../hooks'
import { CHART_COLORS } from '../constants'

interface KpiStatsWidgetProps {
  timeRangeKey: string
  startDate?: string
  endDate?: string
}

export default function KpiStatsWidget({ timeRangeKey, startDate, endDate }: KpiStatsWidgetProps) {
  const { data: stats, isLoading: statsLoading } = useAppControlStats({ timeRangeKey, startDate, endDate })
  const { data: footprint, isLoading: footprintLoading } = useApplicationFootprint({ timeRangeKey, startDate, endDate })

  const sparklineData = footprint?.slice(-7).map((f) => f.uniqueApps) ?? []
  const isLoading = statsLoading || footprintLoading

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          title="Total Applications"
          value={stats?.totalApplications ?? 0}
          change={5}
          trend="up"
          changeLabel="growth (24h)"
          sparklineData={sparklineData}
          loading={isLoading}
          icon={<AppsOutlined color="primary" />}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          title="New Applications"
          value={stats?.newApplications ?? 0}
          change={12}
          trend="up"
          changeLabel="vs previous period"
          sparklineColor={CHART_COLORS.allowed}
          loading={isLoading}
          icon={<AddCircleOutlineOutlined color="success" />}
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
          title="Warned Events"
          value={stats?.warnedEvents ?? 0}
          change={3}
          trend="up"
          changeLabel="vs previous period"
          sparklineColor={CHART_COLORS.warned}
          loading={isLoading}
          icon={<WarningAmberOutlined color="warning" />}
        />
      </Grid>
    </Grid>
  )
}


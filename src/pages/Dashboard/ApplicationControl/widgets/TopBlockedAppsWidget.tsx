import Chart from '@components/Chart/Chart'
import { WidgetCard } from '@components/Widget'
import { useTopBlockedApps } from '../hooks'
import { CHART_COLORS } from '../constants'

interface TopBlockedAppsWidgetProps {
  timeRangeKey: string
  startDate?: string
  endDate?: string
}

export default function TopBlockedAppsWidget({ timeRangeKey, startDate, endDate }: TopBlockedAppsWidgetProps) {
  const { data, isLoading } = useTopBlockedApps({ timeRangeKey, startDate, endDate })

  const sorted = data ? [...data].sort((a, b) => b.blockCount - a.blockCount) : []
  const chartData = {
    categories: sorted.map((a) => a.application),
    series: [{ name: 'Block Count', data: sorted.map((a) => a.blockCount) }],
  }

  return (
    <WidgetCard
      title="Top Blocked Applications"
      subtitle="Identify most violated apps"
      loading={isLoading}
    >
      <Chart
        type="bar"
        series={chartData.series}
        categories={chartData.categories}
        height={300}
        colors={[CHART_COLORS.blocked]}
        options={{ plotOptions: { bar: { horizontal: true } } }}
      />
    </WidgetCard>
  )
}


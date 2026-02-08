import Chart from '@components/Chart/Chart'
import { WidgetCard } from '@components/Widget'
import { useTopUsersByEvents } from '../hooks'
import { CHART_COLORS } from '../constants'

interface TopUsersWidgetProps {
  timeRangeKey: string
  startDate?: string
  endDate?: string
}

export default function TopUsersWidget({ timeRangeKey, startDate, endDate }: TopUsersWidgetProps) {
  const { data, isLoading } = useTopUsersByEvents({ timeRangeKey, startDate, endDate })

  const chartData = {
    categories: data?.map((u) => u.displayName) ?? [],
    series: [
      { name: 'Allowed', data: data?.map((u) => u.allowed) ?? [] },
      { name: 'Blocked', data: data?.map((u) => u.blocked) ?? [] },
      { name: 'Read-Only', data: data?.map((u) => u.readOnly) ?? [] },
      { name: 'Alerted', data: data?.map((u) => u.alerted) ?? [] },
      { name: 'Override', data: data?.map((u) => u.override) ?? [] },
    ],
  }

  return (
    <WidgetCard
      title="Top Users by Device Control Events"
      subtitle="Users triggering the most events"
      loading={isLoading}
    >
      <Chart
        type="bar"
        series={chartData.series}
        categories={chartData.categories}
        height={300}
        stacked
        colors={[CHART_COLORS.allowed, CHART_COLORS.blocked, CHART_COLORS.readOnly, CHART_COLORS.alerted, CHART_COLORS.override]}
      />
    </WidgetCard>
  )
}


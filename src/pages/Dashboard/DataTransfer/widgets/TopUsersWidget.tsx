import Chart from '@components/Chart/Chart'
import { WidgetCard } from '@components/Widget'
import { useTopUsers } from '../hooks'
import { CHART_COLORS } from '../constants'

interface TopUsersWidgetProps {
  timeRangeKey: string
  startDate?: string
  endDate?: string
}

export default function TopUsersWidget({ timeRangeKey, startDate, endDate }: TopUsersWidgetProps) {
  const { data, isLoading } = useTopUsers({ timeRangeKey, startDate, endDate })

  const chartData = {
    categories: data?.map((u) => u.displayName) ?? [],
    series: [
      { name: 'Allowed', data: data?.map((u) => u.allowed) ?? [] },
      { name: 'Logged', data: data?.map((u) => u.logged) ?? [] },
      { name: 'Blocked', data: data?.map((u) => u.blocked) ?? [] },
    ],
  }

  return (
    <WidgetCard
      title="Top Users by File Transfer Events"
      subtitle="Users triggering the most transfer events"
      loading={isLoading}
    >
      <Chart
        type="bar"
        series={chartData.series}
        categories={chartData.categories}
        height={300}
        stacked
        colors={[CHART_COLORS.allowed, CHART_COLORS.logged, CHART_COLORS.blocked]}
        options={{ plotOptions: { bar: { horizontal: true } } }}
      />
    </WidgetCard>
  )
}


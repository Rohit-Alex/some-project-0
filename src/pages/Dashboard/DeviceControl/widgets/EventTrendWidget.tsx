import Chart from '@components/Chart/Chart'
import { WidgetCard } from '@components/Widget'
import { useEventTrend } from '../hooks'

interface EventTrendWidgetProps {
  timeRangeKey: string
  startDate?: string
  endDate?: string
}

export default function EventTrendWidget({ timeRangeKey, startDate, endDate }: EventTrendWidgetProps) {
  const { data, isLoading } = useEventTrend({ timeRangeKey, startDate, endDate })

  const chartData = {
    categories: data?.map((e) => e.date) ?? [],
    series: [
      { name: 'Allowed Events', data: data?.map((e) => e.allowed) ?? [] },
      { name: 'Total Events', data: data?.map((e) => e.total) ?? [] },
      { name: 'Blocked Events', data: data?.map((e) => e.blocked) ?? [] },
    ],
  }

  return (
    <WidgetCard
      title="Device Control Events Over Time"
      subtitle="Trend analysis"
      loading={isLoading}
    >
      <Chart
        type="line"
        series={chartData.series}
        categories={chartData.categories}
        height={300}
        curve="smooth"
      />
    </WidgetCard>
  )
}


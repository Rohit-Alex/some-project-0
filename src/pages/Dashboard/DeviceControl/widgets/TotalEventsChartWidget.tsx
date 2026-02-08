import Chart from '@components/Chart/Chart'
import { WidgetCard } from '@components/Widget'
import { useEventTrend } from '../hooks'
import { CHART_COLORS } from '../constants'

interface TotalEventsChartWidgetProps {
  timeRangeKey: string
  startDate?: string
  endDate?: string
}

export default function TotalEventsChartWidget({ timeRangeKey, startDate, endDate }: TotalEventsChartWidgetProps) {
  const { data, isLoading } = useEventTrend({ timeRangeKey, startDate, endDate })
  const chartData = {
    categories: data?.map((d) => d.date) ?? [],
    series: [
      { name: 'Allowed', data: data?.map((d) => d.allowed) ?? [] },
      { name: 'Blocked', data: data?.map((d) => d.blocked) ?? [] },
    ],
  }

  return (
    <WidgetCard
      title="Total Device Control Events"
      subtitle="Events split by action type"
      tooltip="Stacked bar chart showing total events per time bucket"
      loading={isLoading}
      minHeight={400}
    >
      <Chart
        type="bar"
        series={chartData.series}
        categories={chartData.categories}
        height={320}
        stacked
        colors={[CHART_COLORS.allowed, CHART_COLORS.blocked]}
      />
    </WidgetCard>
  )
}


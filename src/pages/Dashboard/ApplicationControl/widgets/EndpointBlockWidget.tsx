import Chart from '@components/Chart/Chart'
import { WidgetCard } from '@components/Widget'
import { useEndpointBlockEvents } from '../hooks'
import { CHART_COLORS } from '../constants'

interface EndpointBlockWidgetProps {
  timeRangeKey: string
  startDate?: string
  endDate?: string
}

export default function EndpointBlockWidget({ timeRangeKey, startDate, endDate }: EndpointBlockWidgetProps) {
  const { data, isLoading } = useEndpointBlockEvents({ timeRangeKey, startDate, endDate })

  const sorted = data ? [...data].sort((a, b) => b.blocked - a.blocked) : []
  const chartData = {
    categories: sorted.map((e) => e.endpoint),
    series: [{ name: 'Blocked', data: sorted.map((e) => e.blocked) }],
  }

  return (
    <WidgetCard
      title="Application Block Events by Endpoint"
      subtitle="Compromised devices investigation"
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


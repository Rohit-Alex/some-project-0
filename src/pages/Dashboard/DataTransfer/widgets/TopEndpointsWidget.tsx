import Chart from '@components/Chart/Chart'
import { WidgetCard } from '@components/Widget'
import { useTopEndpoints } from '../hooks'
import { CHART_COLORS } from '../constants'

interface TopEndpointsWidgetProps {
  timeRangeKey: string
  startDate?: string
  endDate?: string
}

export default function TopEndpointsWidget({ timeRangeKey, startDate, endDate }: TopEndpointsWidgetProps) {
  const { data, isLoading } = useTopEndpoints({ timeRangeKey, startDate, endDate })

  const chartData = {
    categories: data?.map((e) => e.endpoint) ?? [],
    series: [
      { name: 'Allowed', data: data?.map((e) => e.allowed) ?? [] },
      { name: 'Logged', data: data?.map((e) => e.logged) ?? [] },
      { name: 'Blocked', data: data?.map((e) => e.blocked) ?? [] },
    ],
  }

  return (
    <WidgetCard
      title="Top Devices (Endpoints) by Events"
      subtitle="Endpoints with most file transfer events"
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


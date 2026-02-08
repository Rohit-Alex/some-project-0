import Chart from '@components/Chart/Chart'
import { WidgetCard } from '@components/Widget'
import { useTopEndpointsByEvents } from '../hooks'
import { CHART_COLORS } from '../constants'

interface TopEndpointsWidgetProps {
  timeRangeKey: string
  startDate?: string
  endDate?: string
}

export default function TopEndpointsWidget({ timeRangeKey, startDate, endDate }: TopEndpointsWidgetProps) {
  const { data, isLoading } = useTopEndpointsByEvents({ timeRangeKey, startDate, endDate })

  const chartData = {
    categories: data?.map((e) => e.endpoint) ?? [],
    series: [
      { name: 'Allowed', data: data?.map((e) => e.allowed) ?? [] },
      { name: 'Blocked', data: data?.map((e) => e.blocked) ?? [] },
      { name: 'Read-Only', data: data?.map((e) => e.readOnly) ?? [] },
      { name: 'Alerted', data: data?.map((e) => e.alerted) ?? [] },
      { name: 'Override', data: data?.map((e) => e.override) ?? [] },
    ],
  }

  return (
    <WidgetCard
      title="Top Devices (Endpoints) by Events"
      subtitle="Endpoints with most device control events"
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


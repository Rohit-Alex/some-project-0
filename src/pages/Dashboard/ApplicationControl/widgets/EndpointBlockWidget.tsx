import Chart from '@components/Chart/Chart'
import { WidgetCard } from '@components/Widget'
import { useEndpointBlockEvents } from '../hooks'
import { CHART_COLORS } from '../constants'
import { openApplicationsBySearch } from '../utils/navigation'

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

  const handleDataPointClick = (_event: unknown, _chartContext: unknown, opts: { dataPointIndex?: number }) => {
    if (opts?.dataPointIndex !== undefined && sorted[opts.dataPointIndex]) {
      const selectedEndpoint = sorted[opts.dataPointIndex].endpoint
      openApplicationsBySearch(selectedEndpoint, timeRangeKey, startDate, endDate)
    }
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
        onDataPointClick={handleDataPointClick}
      />
    </WidgetCard>
  )
}


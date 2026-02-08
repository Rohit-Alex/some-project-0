import Chart from '@components/Chart/Chart'
import { WidgetCard } from '@components/Widget'
import { useAllowedLoggedTransfers } from '../hooks'
import { CHART_COLORS } from '../constants'

interface AllowedLoggedWidgetProps {
  timeRangeKey: string
  startDate?: string
  endDate?: string
}

export default function AllowedLoggedWidget({ timeRangeKey, startDate, endDate }: AllowedLoggedWidgetProps) {
  const { data, isLoading } = useAllowedLoggedTransfers({ timeRangeKey, startDate, endDate })

  const hourlyData = data?.slice(0, 24) ?? []
  const chartData = {
    categories: hourlyData.map((d) => `${d.hour}:00`),
    series: [
      { name: 'Allowed (No Logging)', data: hourlyData.map((d) => d.blockedNoLogging ?? 0) },
      { name: 'Allowed & Logged', data: hourlyData.map((d) => d.logged) },
    ],
  }

  return (
    <WidgetCard
      title="Allowed & Logged File Transfers"
      subtitle="Stacked area chart by hour"
      loading={isLoading}
    >
      <Chart
        type="area"
        series={chartData.series}
        categories={chartData.categories}
        height={300}
        stacked
        fillType="gradient"
        colors={[CHART_COLORS.allowed, CHART_COLORS.logged]}
      />
    </WidgetCard>
  )
}


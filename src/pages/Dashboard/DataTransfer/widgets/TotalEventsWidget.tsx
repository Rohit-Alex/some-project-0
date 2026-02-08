import Chart from '@components/Chart/Chart'
import { WidgetCard } from '@components/Widget'
import { useTransferTrend } from '../hooks'

interface TotalEventsWidgetProps {
  timeRangeKey: string
  startDate?: string
  endDate?: string
}

export default function TotalEventsWidget({ timeRangeKey, startDate, endDate }: TotalEventsWidgetProps) {
  const { data, isLoading } = useTransferTrend({ timeRangeKey, startDate, endDate })

  const chartData = {
    categories: data?.map((t) => t.date) ?? [],
    series: [{ name: 'Total Events', data: data?.map((t) => t.total) ?? [] }],
  }

  return (
    <WidgetCard
      title="Total File Transfer Events"
      subtitle="High-level metric over time"
      tooltip="Total file transfers with split by status"
      loading={isLoading}
      minHeight={400}
    >
      <Chart
        type="area"
        series={chartData.series}
        categories={chartData.categories}
        height={320}
        fillType="gradient"
      />
    </WidgetCard>
  )
}


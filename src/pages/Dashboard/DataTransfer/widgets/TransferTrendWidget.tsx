import Chart from '@components/Chart/Chart'
import { WidgetCard } from '@components/Widget'
import { useTransferTrend } from '../hooks'

interface TransferTrendWidgetProps {
  timeRangeKey: string
  startDate?: string
  endDate?: string
}

export default function TransferTrendWidget({ timeRangeKey, startDate, endDate }: TransferTrendWidgetProps) {
  const { data, isLoading } = useTransferTrend({ timeRangeKey, startDate, endDate })

  const chartData = {
    categories: data?.map((t) => t.date) ?? [],
    series: [
      { name: 'Allowed Events', data: data?.map((t) => t.allowed) ?? [] },
      { name: 'Total Events', data: data?.map((t) => t.total) ?? [] },
      { name: 'Blocked Events', data: data?.map((t) => t.blocked) ?? [] },
    ],
  }

  return (
    <WidgetCard
      title="File Transfer Events Over Time"
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


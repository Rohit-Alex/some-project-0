import Chart from '@components/Chart/Chart'
import { WidgetCard } from '@components/Widget'
import { useTransferTrend } from '../hooks'
import { openDataTransferEventsByStatus } from '../utils/navigation'

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

  const handleDataPointClick = (_event: any, _chartContext: any, opts: any) => {
    if (opts?.dataPointIndex !== undefined && data?.[opts.dataPointIndex]) {
      const selectedData = data[opts.dataPointIndex]
      const filterDate = selectedData.timestamp || selectedData.date
      openDataTransferEventsByStatus('total', timeRangeKey, filterDate, filterDate)
    }
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
        onDataPointClick={handleDataPointClick}
      />
    </WidgetCard>
  )
}


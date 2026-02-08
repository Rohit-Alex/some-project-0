import Chart from '@components/Chart/Chart'
import { WidgetCard } from '@components/Widget'
import { useVendorBreakdown } from '../hooks'

interface VendorBreakdownWidgetProps {
  timeRangeKey: string
  startDate?: string
  endDate?: string
}

export default function VendorBreakdownWidget({ timeRangeKey, startDate, endDate }: VendorBreakdownWidgetProps) {
  const { data, isLoading } = useVendorBreakdown({ timeRangeKey, startDate, endDate })

  const sorted = data ? [...data].sort((a, b) => b.events - a.events) : []
  const chartData = {
    categories: sorted.map((v) => v.vendor),
    series: [{ name: 'Events', data: sorted.map((v) => v.events) }],
  }

  return (
    <WidgetCard
      title="Device Vendor/Model Breakdown"
      subtitle="Most common vendors in events"
      loading={isLoading}
    >
      <Chart
        type="bar"
        series={chartData.series}
        categories={chartData.categories}
        height={300}
        options={{
          plotOptions: { bar: { horizontal: true } },
        }}
      />
    </WidgetCard>
  )
}


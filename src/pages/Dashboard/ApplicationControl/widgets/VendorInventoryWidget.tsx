import Chart from '@components/Chart/Chart'
import { WidgetCard } from '@components/Widget'
import { useVendorInventory } from '../hooks'

interface VendorInventoryWidgetProps {
  timeRangeKey: string
  startDate?: string
  endDate?: string
}

export default function VendorInventoryWidget({ timeRangeKey, startDate, endDate }: VendorInventoryWidgetProps) {
  const { data, isLoading } = useVendorInventory({ timeRangeKey, startDate, endDate })

  const sorted = data ? [...data].sort((a, b) => b.count - a.count).slice(0, 10) : []
  const chartData = {
    categories: sorted.map((v) => v.vendor),
    series: [{ name: 'Applications', data: sorted.map((v) => v.count) }],
  }

  return (
    <WidgetCard
      title="Application Inventory by Vendor"
      subtitle="Top 10 vendors - detect shadow IT"
      loading={isLoading}
    >
      <Chart
        type="bar"
        series={chartData.series}
        categories={chartData.categories}
        height={300}
        options={{ plotOptions: { bar: { horizontal: true } } }}
      />
    </WidgetCard>
  )
}


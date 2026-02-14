import Chart from '@components/Chart/Chart'
import { WidgetCard } from '@components/Widget'
import { useCategoryInventory } from '../hooks'

interface CategoryInventoryWidgetProps {
  timeRangeKey: string
  startDate?: string
  endDate?: string
}

export default function CategoryInventoryWidget({ timeRangeKey, startDate, endDate }: CategoryInventoryWidgetProps) {
  const { data, isLoading } = useCategoryInventory({ timeRangeKey, startDate, endDate })

  const sorted = data ? [...data].sort((a, b) => b.count - a.count) : []
  const chartData = {
    categories: sorted.map((c) => c.category),
    series: [{ name: 'Applications', data: sorted.map((c) => c.count) }],
  }

  return (
    <WidgetCard
      title="Application Inventory by Category"
      subtitle="Understand software landscape"
      loading={isLoading}
      minHeight={400}
    >
      <Chart
        type="bar"
        series={chartData.series}
        categories={chartData.categories}
        height={320}
        options={{ plotOptions: { bar: { horizontal: true } } }}
      />
    </WidgetCard>
  )
}


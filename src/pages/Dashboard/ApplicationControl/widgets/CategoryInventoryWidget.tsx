import Chart from '@components/Chart/Chart'
import { WidgetCard } from '@components/Widget'
import { useCategoryInventory } from '../hooks'
import { openApplicationsByCategory } from '../utils/navigation'

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

  const handleDataPointClick = (_event: any, _chartContext: any, opts: any) => {
    // Open applications list filtered by the selected category
    if (opts?.dataPointIndex !== undefined && sorted[opts.dataPointIndex]) {
      const selectedCategory = sorted[opts.dataPointIndex].category
      openApplicationsByCategory(selectedCategory, timeRangeKey, startDate, endDate)
    }
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
        onDataPointClick={handleDataPointClick}
      />
    </WidgetCard>
  )
}


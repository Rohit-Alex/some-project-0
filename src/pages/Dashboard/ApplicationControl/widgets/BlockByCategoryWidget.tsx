import Chart from '@components/Chart/Chart'
import { WidgetCard } from '@components/Widget'
import { useBlockEventsByCategory } from '../hooks'
import { CHART_COLORS } from '../constants'
import { openApplicationsByCategory } from '../utils/navigation'

interface BlockByCategoryWidgetProps {
  timeRangeKey: string
  startDate?: string
  endDate?: string
}

export default function BlockByCategoryWidget({ timeRangeKey, startDate, endDate }: BlockByCategoryWidgetProps) {
  const { data, isLoading } = useBlockEventsByCategory({ timeRangeKey, startDate, endDate })

  const chartData = {
    categories: data?.map((b) => b.category) ?? [],
    series: [
      { name: 'Blocked', data: data?.map((b) => b.blocked) ?? [] },
      { name: 'Warned', data: data?.map((b) => b.warned ?? 0) ?? [] },
    ],
  }

  const handleDataPointClick = (event: any, chartContext: any, opts: any) => {
    // Open applications list filtered by the selected category
    if (opts?.dataPointIndex !== undefined && data?.[opts.dataPointIndex]) {
      const selectedCategory = data[opts.dataPointIndex].category
      openApplicationsByCategory(selectedCategory, timeRangeKey, startDate, endDate)
    }
  }

  return (
    <WidgetCard
      title="Application Block Events by Category"
      subtitle="Policy effectiveness"
      loading={isLoading}
    >
      <Chart
        type="bar"
        series={chartData.series}
        categories={chartData.categories}
        height={300}
        stacked
        colors={[CHART_COLORS.blocked, CHART_COLORS.warned]}
        onDataPointClick={handleDataPointClick}
      />
    </WidgetCard>
  )
}


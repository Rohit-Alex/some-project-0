import Chart from '@components/Chart/Chart'
import { WidgetCard } from '@components/Widget'
import { useNewAppTrend } from '../hooks'
import { openApplicationsByStatus } from '../utils/navigation'

interface NewAppTrendWidgetProps {
  timeRangeKey: string
  startDate?: string
  endDate?: string
}

export default function NewAppTrendWidget({ timeRangeKey, startDate, endDate }: NewAppTrendWidgetProps) {
  const { data, isLoading } = useNewAppTrend({ timeRangeKey, startDate, endDate })

  const chartData = {
    categories: data?.map((t) => t.date) ?? [],
    series: [{ name: 'New Installs', data: data?.map((t) => t.newInstalls) ?? [] }],
  }

  const handleDataPointClick = (event: any, chartContext: any, opts: any) => {
    // Open new applications list filtered by the selected date
    if (opts?.dataPointIndex !== undefined && data?.[opts.dataPointIndex]) {
      const selectedData = data[opts.dataPointIndex]
      // Use timestamp for backend filtering, fallback to date for display
      const filterDate = selectedData.timestamp || selectedData.date
      openApplicationsByStatus('new', timeRangeKey, filterDate, filterDate)
    }
  }

  return (
    <WidgetCard
      title="New Applications Installed (Trend)"
      subtitle="Change detection from previously installed apps"
      loading={isLoading}
    >
      <Chart
        type="line"
        series={chartData.series}
        categories={chartData.categories}
        height={300}
        curve="smooth"
        onDataPointClick={handleDataPointClick}
      />
    </WidgetCard>
  )
}


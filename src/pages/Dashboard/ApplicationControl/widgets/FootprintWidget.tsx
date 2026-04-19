import Chart from '@components/Chart/Chart'
import { WidgetCard } from '@components/Widget'
import { useApplicationFootprint } from '../hooks'
import { openApplicationsByStatus } from '../utils/navigation'

interface FootprintWidgetProps {
  timeRangeKey: string
  startDate?: string
  endDate?: string
}

export default function FootprintWidget({ timeRangeKey, startDate, endDate }: FootprintWidgetProps) {
  const { data, isLoading } = useApplicationFootprint({ timeRangeKey, startDate, endDate })

  const chartData = {
    categories: data?.map((f) => f.date) ?? [],
    series: [{ name: 'Unique Applications', data: data?.map((f) => f.uniqueApps) ?? [] }],
  }

  const handleDataPointClick = (event: any, chartContext: any, opts: any) => {
    // Open applications list filtered by the selected date
    if (opts?.dataPointIndex !== undefined && data?.[opts.dataPointIndex]) {
      const selectedData = data[opts.dataPointIndex]
      // Use timestamp for backend filtering, fallback to date for display
      const filterDate = selectedData.timestamp || selectedData.date
      // For footprint widget, we'll show total applications for that date
      openApplicationsByStatus('total', timeRangeKey, filterDate, filterDate)
    }
  }

  return (
    <WidgetCard
      title="Overall Application Footprint"
      subtitle="Total unique applications discovered"
      tooltip="KPI Tile showing total unique applications with growth trend"
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


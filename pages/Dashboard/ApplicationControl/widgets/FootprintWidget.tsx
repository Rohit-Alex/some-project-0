import Chart from '@components/Chart/Chart'
import { WidgetCard } from '@components/Widget'
import { useApplicationFootprint } from '../hooks'

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
      />
    </WidgetCard>
  )
}


import Chart from '@components/Chart/Chart'
import { WidgetCard } from '@components/Widget'
import { useNewAppTrend } from '../hooks'

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
      />
    </WidgetCard>
  )
}


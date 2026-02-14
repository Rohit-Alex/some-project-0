import Chart from '@components/Chart/Chart'
import { WidgetCard } from '@components/Widget'
import { useFileTypeBreakdown } from '../hooks'
import { CHART_COLORS } from '../constants'

interface FileTypeWidgetProps {
  timeRangeKey: string
  startDate?: string
  endDate?: string
}

export default function FileTypeWidget({ timeRangeKey, startDate, endDate }: FileTypeWidgetProps) {
  const { data, isLoading } = useFileTypeBreakdown({ timeRangeKey, startDate, endDate })

  const chartData = {
    categories: data?.map((f) => f.fileType) ?? [],
    series: [
      { name: 'Allowed', data: data?.map((f) => f.allowed) ?? [] },
      { name: 'Logged', data: data?.map((f) => f.logged) ?? [] },
      { name: 'Blocked', data: data?.map((f) => f.blocked) ?? [] },
    ],
  }

  return (
    <WidgetCard
      title="File Types Breakdown for Events"
      subtitle="Most common file types in events"
      loading={isLoading}
    >
      <Chart
        type="bar"
        series={chartData.series}
        categories={chartData.categories}
        height={300}
        stacked
        colors={[CHART_COLORS.allowed, CHART_COLORS.logged, CHART_COLORS.blocked]}
        options={{ plotOptions: { bar: { horizontal: true } } }}
      />
    </WidgetCard>
  )
}


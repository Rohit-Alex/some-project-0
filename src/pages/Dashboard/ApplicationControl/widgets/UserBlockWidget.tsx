import Chart from '@components/Chart/Chart'
import { WidgetCard } from '@components/Widget'
import { useUserBlockEvents } from '../hooks'
import { CHART_COLORS } from '../constants'
import { openApplicationsBySearch } from '../utils/navigation'

interface UserBlockWidgetProps {
  timeRangeKey: string
  startDate?: string
  endDate?: string
}

export default function UserBlockWidget({ timeRangeKey, startDate, endDate }: UserBlockWidgetProps) {
  const { data, isLoading } = useUserBlockEvents({ timeRangeKey, startDate, endDate })

  const chartData = {
    categories: data?.map((u) => u.displayName) ?? [],
    series: [
      { name: 'Blocked', data: data?.map((u) => u.blocked) ?? [] },
      { name: 'Warned', data: data?.map((u) => u.warned) ?? [] },
    ],
  }

  const handleDataPointClick = (_event: unknown, _chartContext: unknown, opts: { dataPointIndex?: number }) => {
    if (opts?.dataPointIndex !== undefined && data?.[opts.dataPointIndex]) {
      const selectedUser = data[opts.dataPointIndex].displayName || data[opts.dataPointIndex].user
      openApplicationsBySearch(selectedUser, timeRangeKey, startDate, endDate)
    }
  }

  return (
    <WidgetCard
      title="Application Block Events by User"
      subtitle="Insider risk & misuse tracking"
      loading={isLoading}
    >
      <Chart
        type="bar"
        series={chartData.series}
        categories={chartData.categories}
        height={300}
        stacked
        colors={[CHART_COLORS.blocked, CHART_COLORS.warned]}
        options={{ plotOptions: { bar: { horizontal: true } } }}
        onDataPointClick={handleDataPointClick}
      />
    </WidgetCard>
  )
}


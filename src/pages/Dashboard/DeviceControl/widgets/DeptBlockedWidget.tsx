import Chart from '@components/Chart/Chart'
import { WidgetCard } from '@components/Widget'
import { useDepartmentBlocked } from '../hooks'
import { CHART_COLORS } from '../constants'

interface DeptBlockedWidgetProps {
  timeRangeKey: string
  startDate?: string
  endDate?: string
}

export default function DeptBlockedWidget({ timeRangeKey, startDate, endDate }: DeptBlockedWidgetProps) {
  const { data, isLoading } = useDepartmentBlocked({ timeRangeKey, startDate, endDate })

  const sorted = data ? [...data].sort((a, b) => b.blockedCount - a.blockedCount) : []
  const chartData = {
    categories: sorted.map((d) => d.department),
    series: [{ name: 'Blocked Attempts', data: sorted.map((d) => d.blockedCount) }],
  }

  return (
    <WidgetCard
      title="Blocked Device Attempts by Department"
      subtitle="High-risk zones by blocked count"
      loading={isLoading}
    >
      <Chart
        type="bar"
        series={chartData.series}
        categories={chartData.categories}
        height={300}
        colors={[CHART_COLORS.blocked]}
        options={{
          plotOptions: { bar: { horizontal: true } },
        }}
      />
    </WidgetCard>
  )
}


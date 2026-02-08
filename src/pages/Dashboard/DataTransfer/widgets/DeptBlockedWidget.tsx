import Chart from '@components/Chart/Chart'
import { WidgetCard } from '@components/Widget'
import { useDepartmentBlocked } from '../hooks'

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
    series: [
      { name: 'Documents', data: sorted.map((d) => d.fileTypes.documents) },
      { name: 'Archives', data: sorted.map((d) => d.fileTypes.archives) },
      { name: 'Executables', data: sorted.map((d) => d.fileTypes.executables) },
      { name: 'Media', data: sorted.map((d) => d.fileTypes.media) },
    ],
  }

  return (
    <WidgetCard
      title="Blocked File Type Transfers by Department"
      subtitle="High-risk zones by file type"
      loading={isLoading}
    >
      <Chart
        type="bar"
        series={chartData.series}
        categories={chartData.categories}
        height={300}
        stacked
        options={{ plotOptions: { bar: { horizontal: true } } }}
      />
    </WidgetCard>
  )
}


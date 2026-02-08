import Chart from '@components/Chart/Chart'
import { WidgetCard } from '@components/Widget'
import { useDeptApplications } from '../hooks'

interface DeptApplicationsWidgetProps {
  timeRangeKey: string
  startDate?: string
  endDate?: string
}

export default function DeptApplicationsWidget({ timeRangeKey, startDate, endDate }: DeptApplicationsWidgetProps) {
  const { data, isLoading } = useDeptApplications({ timeRangeKey, startDate, endDate })

  const sorted = data ? [...data].sort((a, b) => b.newInstalls - a.newInstalls) : []
  const chartData = {
    categories: sorted.map((d) => d.department),
    series: [{ name: 'New Installs', data: sorted.map((d) => d.newInstalls) }],
  }

  return (
    <WidgetCard
      title="New Applications by Department"
      subtitle="Identify risky teams"
      loading={isLoading}
      minHeight={400}
    >
      <Chart
        type="bar"
        series={chartData.series}
        categories={chartData.categories}
        height={320}
        options={{ plotOptions: { bar: { horizontal: true } } }}
      />
    </WidgetCard>
  )
}


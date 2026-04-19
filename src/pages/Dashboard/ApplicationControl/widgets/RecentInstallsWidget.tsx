import Chart from '@components/Chart/Chart'
import { WidgetCard } from '@components/Widget'
import { useRecentInstalls } from '../hooks'
import { CHART_COLORS } from '../constants'
import { openApplicationsBySearch } from '../utils/navigation'

interface RecentInstallsWidgetProps {
  timeRangeKey: string
  startDate?: string
  endDate?: string
}

export default function RecentInstallsWidget({ timeRangeKey, startDate, endDate }: RecentInstallsWidgetProps) {
  const { data, isLoading } = useRecentInstalls({ timeRangeKey, startDate, endDate })

  const recent = data?.slice(0, 10) ?? []
  const chartData = {
    categories: recent.map((install) => `${install.appName} v${install.version}`),
    series: [{ name: 'Recent installs', data: recent.map(() => 1) }],
  }

  const handleDataPointClick = (_event: unknown, _chartContext: unknown, opts: { dataPointIndex?: number }) => {
    if (opts?.dataPointIndex !== undefined && recent[opts.dataPointIndex]) {
      const selectedApp = recent[opts.dataPointIndex].appName
      openApplicationsBySearch(selectedApp, timeRangeKey, startDate, endDate)
    }
  }

  return (
    <WidgetCard
      title="Newly Installed Applications (Live/Recent)"
      subtitle="Near real-time visibility"
      tooltip="Recent app installations (click a bar to open the applications list)"
      loading={isLoading}
      minHeight={400}
    >
      <Chart
        type="bar"
        series={chartData.series}
        categories={chartData.categories}
        height={300}
        showDataLabels={false}
        showLegend={false}
        colors={[CHART_COLORS.allowed]}
        options={{ plotOptions: { bar: { horizontal: true } } }}
        onDataPointClick={handleDataPointClick}
      />
    </WidgetCard>
  )
}


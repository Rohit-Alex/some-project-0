import Chart from '@components/Chart/Chart'
import { WidgetCard } from '@components/Widget'
import { useBlockedByDeviceType } from '../hooks'
import { CHART_COLORS } from '../constants'

interface BlockedByTypeWidgetProps {
  timeRangeKey: string
  startDate?: string
  endDate?: string
}

export default function BlockedByTypeWidget({ timeRangeKey, startDate, endDate }: BlockedByTypeWidgetProps) {
  const { data, isLoading } = useBlockedByDeviceType({ timeRangeKey, startDate, endDate })

  const chartData = {
    categories: data?.map((d) => d.deviceType) ?? [],
    series: [{ name: 'Blocked Attempts', data: data?.map((d) => d.blocked) ?? [] }],
  }

  return (
    <WidgetCard
      title="Blocked File Transfer Attempts by Device Type"
      subtitle="Breakdown by device type"
      loading={isLoading}
    >
      <Chart
        type="bar"
        series={chartData.series}
        categories={chartData.categories}
        height={300}
        colors={[CHART_COLORS.blocked]}
        options={{ plotOptions: { bar: { horizontal: true } } }}
      />
    </WidgetCard>
  )
}


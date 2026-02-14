import Chart from '@components/Chart/Chart'
import { WidgetCard } from '@components/Widget'
import { useAllowedByDeviceType } from '../hooks'
import { CHART_COLORS } from '../constants'

interface AllowedByTypeWidgetProps {
  timeRangeKey: string
  startDate?: string
  endDate?: string
}

export default function AllowedByTypeWidget({ timeRangeKey, startDate, endDate }: AllowedByTypeWidgetProps) {
  const { data, isLoading } = useAllowedByDeviceType({ timeRangeKey, startDate, endDate })

  const chartData = {
    categories: data?.map((d) => d.deviceType) ?? [],
    series: [{ name: 'Allowed Connections', data: data?.map((d) => d.count) ?? [] }],
  }

  return (
    <WidgetCard
      title="Allowed Device Connections by Type"
      subtitle="Device types allowed to connect"
      loading={isLoading}
    >
      <Chart
        type="bar"
        series={chartData.series}
        categories={chartData.categories}
        height={300}
        colors={[CHART_COLORS.allowed]}
        options={{
          plotOptions: { bar: { horizontal: true } },
        }}
      />
    </WidgetCard>
  )
}


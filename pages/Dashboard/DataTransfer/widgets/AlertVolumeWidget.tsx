import Chart from '@components/Chart/Chart'
import { WidgetCard } from '@components/Widget'
import { useAlertVolume } from '../hooks'

interface AlertVolumeWidgetProps {
  timeRangeKey: string
  startDate?: string
  endDate?: string
}

export default function AlertVolumeWidget({ timeRangeKey, startDate, endDate }: AlertVolumeWidgetProps) {
  const { data, isLoading } = useAlertVolume({ timeRangeKey, startDate, endDate })

  const chartData = {
    categories: data?.map((a) => a.date) ?? [],
    series: [
      { name: 'Alerts', data: data?.map((a) => a.alerts) ?? [] },
      { name: 'Incidents', data: data?.map((a) => a.incidents) ?? [] },
    ],
  }

  return (
    <WidgetCard
      title="Alert/Incident Volume from File Transfer Events"
      subtitle="Events triggering alerts or incidents"
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


import Chart from '@components/Chart/Chart'
import { WidgetCard } from '@components/Widget'
import { usePolicyEvents } from '../hooks'
import { CHART_COLORS } from '../constants'

interface PolicyEventsWidgetProps {
  timeRangeKey: string
  startDate?: string
  endDate?: string
}

export default function PolicyEventsWidget({ timeRangeKey, startDate, endDate }: PolicyEventsWidgetProps) {
  const { data, isLoading } = usePolicyEvents({ timeRangeKey, startDate, endDate })

  const chartData = {
    categories: data?.map((p) => p.policyName) ?? [],
    series: [
      { name: 'Audit', data: data?.map((p) => p.audit) ?? [] },
      { name: 'Enforce', data: data?.map((p) => p.enforce) ?? [] },
    ],
  }

  return (
    <WidgetCard
      title="Policy Triggered Events (Audit vs Enforce)"
      subtitle="Events by policy mode"
      loading={isLoading}
    >
      <Chart
        type="bar"
        series={chartData.series}
        categories={chartData.categories}
        height={300}
        stacked
        colors={[CHART_COLORS.audit, CHART_COLORS.enforce]}
      />
    </WidgetCard>
  )
}


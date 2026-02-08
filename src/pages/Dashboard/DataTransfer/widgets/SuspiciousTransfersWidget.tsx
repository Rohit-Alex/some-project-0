import Chart from '@components/Chart/Chart'
import { WidgetCard } from '@components/Widget'
import { useSuspiciousTransfers } from '../hooks'
import { RISK_COLORS } from '../constants'

interface SuspiciousTransfersWidgetProps {
  timeRangeKey: string
  startDate?: string
  endDate?: string
}

export default function SuspiciousTransfersWidget({ timeRangeKey, startDate, endDate }: SuspiciousTransfersWidgetProps) {
  const { data, isLoading } = useSuspiciousTransfers({ timeRangeKey, startDate, endDate })

  const sorted = data ? [...data].sort((a, b) => b.riskScore - a.riskScore) : []
  const chartData = {
    categories: sorted.map((s) => s.device),
    series: [{ name: 'Risk Score', data: sorted.map((s) => s.riskScore) }],
    colors: sorted.map((s) =>
      s.riskScore >= 70 ? RISK_COLORS.high : s.riskScore >= 50 ? RISK_COLORS.medium : RISK_COLORS.low
    ),
  }

  return (
    <WidgetCard
      title="Top Risks / Suspicious File Transfers"
      subtitle="Devices with high risk scores"
      tooltip="Risk Score = (Blocked Attempts × 2) + (Policy Violations × 3) + (Unusual Device Types × 2) + (Off-Hours Activity × 5)"
      loading={isLoading}
    >
      <Chart
        type="bar"
        series={chartData.series}
        categories={chartData.categories}
        height={300}
        colors={chartData.colors}
        options={{
          plotOptions: { bar: { horizontal: true, distributed: true } },
          legend: { show: false },
        }}
      />
    </WidgetCard>
  )
}


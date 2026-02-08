import Chart from '@components/Chart/Chart'
import { WidgetCard } from '@components/Widget'
import { useSuspiciousDevices } from '../hooks'
import { RISK_COLORS } from '../constants'

interface SuspiciousDevicesWidgetProps {
  timeRangeKey: string
  startDate?: string
  endDate?: string
}

export default function SuspiciousDevicesWidget({ timeRangeKey, startDate, endDate }: SuspiciousDevicesWidgetProps) {
  const { data, isLoading } = useSuspiciousDevices({ timeRangeKey, startDate, endDate })

  const sorted = data ? [...data].sort((a, b) => b.riskScore - a.riskScore) : []
  const chartData = {
    categories: sorted.map((d) => d.device),
    series: [{ name: 'Risk Score', data: sorted.map((d) => d.riskScore) }],
    colors: sorted.map((d) =>
      d.riskScore >= 70 ? RISK_COLORS.high : d.riskScore >= 50 ? RISK_COLORS.medium : RISK_COLORS.low
    ),
  }

  return (
    <WidgetCard
      title="Top Risks / Suspicious Devices"
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
          plotOptions: {
            bar: {
              horizontal: true,
              distributed: true,
            },
          },
          legend: { show: false },
        }}
      />
    </WidgetCard>
  )
}


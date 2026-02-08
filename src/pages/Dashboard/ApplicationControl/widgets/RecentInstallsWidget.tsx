import { WidgetCard, TimelineWidget } from '@components/Widget'
import { useRecentInstalls } from '../hooks'
import { STATUS_COLORS } from '../constants'
import type { TimelineEventProps } from '@components/Widget'

interface RecentInstallsWidgetProps {
  timeRangeKey: string
  startDate?: string
  endDate?: string
}

export default function RecentInstallsWidget({ timeRangeKey, startDate, endDate }: RecentInstallsWidgetProps) {
  const { data, isLoading } = useRecentInstalls({ timeRangeKey, startDate, endDate })

  const timelineEvents: TimelineEventProps[] = data?.slice(0, 10).map((install) => ({
    id: install.id,
    title: `${install.appName} v${install.version}`,
    subtitle: `${install.user} on ${install.endpoint}`,
    timestamp: new Date(install.timestamp).toLocaleTimeString(),
    color: STATUS_COLORS.install as TimelineEventProps['color'],
    details: {
      Vendor: install.vendor,
      Dept: install.department,
    },
  })) ?? []

  return (
    <WidgetCard
      title="Newly Installed Applications (Live/Recent)"
      subtitle="Near real-time visibility"
      tooltip="Timeline showing recent app installations"
      loading={isLoading}
      minHeight={400}
    >
      <TimelineWidget events={timelineEvents} maxHeight={320} />
    </WidgetCard>
  )
}


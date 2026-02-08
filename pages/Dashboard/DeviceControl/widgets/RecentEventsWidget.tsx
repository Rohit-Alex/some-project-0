import { WidgetCard, TimelineWidget } from '@components/Widget'
import { useRecentDeviceEvents } from '../hooks'
import { STATUS_COLORS } from '../constants'
import type { TimelineEventProps } from '@components/Widget'

interface RecentEventsWidgetProps {
  timeRangeKey: string
  startDate?: string
  endDate?: string
}

export default function RecentEventsWidget({ timeRangeKey, startDate, endDate }: RecentEventsWidgetProps) {
  const { data, isLoading } = useRecentDeviceEvents({ timeRangeKey, startDate, endDate })

  const timelineEvents: TimelineEventProps[] = data?.slice(0, 10).map((event) => ({
    id: event.id,
    title: `${event.deviceType} - ${event.action}`,
    subtitle: `${event.user} on ${event.endpoint}`,
    timestamp: new Date(event.timestamp).toLocaleTimeString(),
    color: STATUS_COLORS[event.action] as TimelineEventProps['color'],
    details: {
      Vendor: event.deviceVendor,
      Status: event.status,
    },
  })) ?? []

  return (
    <WidgetCard
      title="Recent Device Connections"
      subtitle="Live / Near Real-Time"
      tooltip="Timeline showing recent device connect/disconnect events"
      loading={isLoading}
      minHeight={400}
    >
      <TimelineWidget events={timelineEvents} maxHeight={320} />
    </WidgetCard>
  )
}


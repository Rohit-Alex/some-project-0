import { WidgetCard, TimelineWidget } from '@components/Widget'
import { useRecentTransfers } from '../hooks'
import { STATUS_COLORS } from '../constants'
import type { TimelineEventProps } from '@components/Widget'

interface RecentTransfersWidgetProps {
  timeRangeKey: string
  startDate?: string
  endDate?: string
}

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1048576).toFixed(1)} MB`
}

export default function RecentTransfersWidget({ timeRangeKey, startDate, endDate }: RecentTransfersWidgetProps) {
  const { data, isLoading } = useRecentTransfers({ timeRangeKey, startDate, endDate })

  const timelineEvents: TimelineEventProps[] = data?.slice(0, 10).map((transfer) => ({
    id: transfer.id,
    title: `${transfer.fileName} (${formatFileSize(transfer.fileSize)})`,
    subtitle: `${transfer.user} → ${transfer.destination}`,
    timestamp: new Date(transfer.timestamp).toLocaleTimeString(),
    color: STATUS_COLORS[transfer.status] as TimelineEventProps['color'],
    details: {
      Type: transfer.fileType,
      Direction: transfer.transferDirection,
    },
  })) ?? []

  return (
    <WidgetCard
      title="Recent File Transfer Timeline"
      subtitle="Live / Near Real-Time"
      tooltip="Timeline showing recent file transfer events"
      loading={isLoading}
      minHeight={400}
    >
      <TimelineWidget events={timelineEvents} maxHeight={320} />
    </WidgetCard>
  )
}


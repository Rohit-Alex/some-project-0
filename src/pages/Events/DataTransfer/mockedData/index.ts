import type { DataTransferEvent, DataTransferListResponse, DataTransferStats } from '../types'

const generateMockEvents = (count: number): DataTransferEvent[] => {
  const hostnames = ['vikram', 'vikram1', 'desktop-01', 'laptop-02', 'server-03']
  const users = ['xyz.com\\vikram', 'xyz.com\\vikram1', 'xyz.com\\admin', 'xyz.com\\user1']
  const actions: ('Blocked' | 'Allowed' | 'Warned')[] = ['Blocked', 'Allowed', 'Warned']
  const transferTypes: ('USB' | 'Network' | 'Cloud' | 'Email')[] = ['USB', 'Network', 'Cloud', 'Email']
  const sourceDevices = ['Local Drive C:', 'Local Drive D:', 'Network Share', 'Desktop', 'Documents']
  const targetDevices = ['USB Drive E:', 'USB Drive F:', 'Network Share', 'Cloud Storage', 'Email Attachment']
  const fileNames = [
    'financial_report.xlsx',
    'customer_data.csv',
    'project_files.zip',
    'presentation.pptx',
    'source_code.zip',
    'database_backup.sql',
  ]
  const fileSizes = ['1.2 MB', '5.8 MB', '120 KB', '3.4 MB', '15.7 MB', '250 KB', '890 KB']
  const protocols = ['USB 3.0', 'SMB', 'FTP', 'HTTPS', 'SMTP', 'SFTP']
  const transferStatuses: ('Success' | 'Failed' | 'InProgress' | 'Cancelled')[] = [
    'Success',
    'Failed',
    'InProgress',
    'Cancelled',
  ]

  return Array.from({ length: count }, (_, i) => ({
    id: `event-${i + 1}`,
    eventId: `EVT-${String(i + 1).padStart(6, '0')}`,
    hostname: hostnames[i % hostnames.length],
    ipAddress: `192.168.1.${(i % 254) + 1}`,
    loggedInUser: users[i % users.length],
    action: actions[i % actions.length],
    transferType: transferTypes[i % transferTypes.length],
    sourceDevice: sourceDevices[i % sourceDevices.length],
    targetDevice: targetDevices[i % targetDevices.length],
    fileName: fileNames[i % fileNames.length],
    fileSize: fileSizes[i % fileSizes.length],
    protocol: protocols[i % protocols.length],
    transferStatus: transferStatuses[i % transferStatuses.length],
    eventTime: new Date(Date.now() - i * 3600000).toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }),
  }))
}

const ALL_MOCK_EVENTS = generateMockEvents(150)

export const getMockStats = (): DataTransferStats => ({
  totalEvents: ALL_MOCK_EVENTS.length,
  blockedEvents: ALL_MOCK_EVENTS.filter((e) => e.action === 'Blocked').length,
  allowedEvents: ALL_MOCK_EVENTS.filter((e) => e.action === 'Allowed').length,
  connectedUsers: 28,
})

export const getMockDataTransferEvents = (
  page: number,
  limit: number,
  _sortBy?: string,
  _sortDirection?: 'asc' | 'desc',
  _filters?: Record<string, string>
): DataTransferListResponse => {
  // In real implementation, apply filters and sorting
  const start = page * limit
  const end = start + limit
  const paginatedData = ALL_MOCK_EVENTS.slice(start, end)

  return {
    data: paginatedData,
    total: ALL_MOCK_EVENTS.length,
    page,
    limit,
    stats: getMockStats(),
  }
}

export const exportMockData = (): DataTransferEvent[] => {
  return ALL_MOCK_EVENTS
}

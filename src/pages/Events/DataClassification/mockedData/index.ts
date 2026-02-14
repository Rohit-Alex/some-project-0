import type { DataClassificationEvent, DataClassificationListResponse, DataClassificationStats } from '../types'

const generateMockEvents = (count: number): DataClassificationEvent[] => {
  const hostnames = ['vikram', 'vikram1', 'desktop-01', 'laptop-02', 'server-03']
  const users = ['xyz.com\\vikram', 'xyz.com\\vikram1', 'xyz.com\\admin', 'xyz.com\\user1']
  const actions: ('Blocked' | 'Allowed' | 'Warned')[] = ['Blocked', 'Allowed', 'Warned']
  const fileNames = ['financial_report.xlsx', 'employee_data.docx', 'project_plan.pdf', 'budget.xlsx', 'contract.pdf']
  const fileSizes = ['1.2 MB', '450 KB', '3.5 MB', '800 KB', '2.1 MB']
  const classifications: ('Confidential' | 'Internal' | 'Public' | 'Restricted')[] = [
    'Confidential',
    'Internal',
    'Public',
    'Restricted',
  ]
  const departments = ['Finance', 'HR', 'Engineering', 'Sales', 'Marketing']
  const destinationPaths = [
    'C:\\Users\\vikram\\Documents',
    'D:\\Shared\\Finance',
    'E:\\Backup\\HR',
    'C:\\Temp',
    'D:\\Projects',
  ]

  return Array.from({ length: count }, (_, i) => ({
    id: `event-${i + 1}`,
    eventId: `DCE-${String(i + 1).padStart(6, '0')}`,
    hostname: hostnames[i % hostnames.length],
    ipAddress: `192.168.1.${(i % 254) + 1}`,
    loggedInUser: users[i % users.length],
    action: actions[i % actions.length],
    fileName: fileNames[i % fileNames.length],
    fileSize: fileSizes[i % fileSizes.length],
    classification: classifications[i % classifications.length],
    department: departments[i % departments.length],
    destinationPath: destinationPaths[i % destinationPaths.length],
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

export const getMockStats = (): DataClassificationStats => ({
  totalEvents: ALL_MOCK_EVENTS.length,
  blockedEvents: ALL_MOCK_EVENTS.filter((e) => e.action === 'Blocked').length,
  allowedEvents: ALL_MOCK_EVENTS.filter((e) => e.action === 'Allowed').length,
  connectedUsers: 28,
})

export const getMockDataClassificationEvents = (
  page: number,
  limit: number,
  _sortBy?: string,
  _sortDirection?: 'asc' | 'desc',
  _filters?: Record<string, string>
): DataClassificationListResponse => {
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

export const exportMockData = (): DataClassificationEvent[] => {
  return ALL_MOCK_EVENTS
}

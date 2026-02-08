import type { ApplicationControlEvent, ApplicationControlListResponse, ApplicationControlStats } from '../types'

const generateMockEvents = (count: number): ApplicationControlEvent[] => {
  const hostnames = ['vikram', 'vikram1', 'desktop-01', 'laptop-02', 'server-03']
  const users = ['xyz.com\\vikram', 'xyz.com\\vikram1', 'xyz.com\\admin', 'xyz.com\\user1']
  const actions: ('Blocked' | 'Allowed' | 'Warned')[] = ['Blocked', 'Allowed', 'Warned']
  const channels = ['Application Control', 'Network Control', 'Device Control']
  const applications = ['Anydesk.exe', 'TeamViewer.exe', 'Chrome.exe', 'Firefox.exe', 'VSCode.exe']
  const companies = ['Anydesk INC', 'TeamViewer GmbH', 'Google LLC', 'Mozilla', 'Microsoft']
  const fileTypes = ['Executable', 'Script', 'Document', 'Archive']

  return Array.from({ length: count }, (_, i) => ({
    id: `event-${i + 1}`,
    eventId: `EVT-${String(i + 1).padStart(6, '0')}`,
    hostname: hostnames[i % hostnames.length],
    ipAddress: `192.168.1.${(i % 254) + 1}`,
    loggedInUser: users[i % users.length],
    action: actions[i % actions.length],
    channel: channels[i % channels.length],
    applicationName: applications[i % applications.length],
    companyName: companies[i % companies.length],
    filename: applications[i % applications.length],
    fileType: fileTypes[i % fileTypes.length],
    fileVersion: `${Math.floor(i / 10) + 1}.${i % 10}`,
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

export const getMockStats = (): ApplicationControlStats => ({
  totalEvents: ALL_MOCK_EVENTS.length,
  blockedEvents: ALL_MOCK_EVENTS.filter((e) => e.action === 'Blocked').length,
  allowedEvents: ALL_MOCK_EVENTS.filter((e) => e.action === 'Allowed').length,
  connectedUsers: 32,
})

export const getMockApplicationControlEvents = (
  page: number,
  limit: number,
  _sortBy?: string,
  _sortDirection?: 'asc' | 'desc',
  _filters?: Record<string, string>
): ApplicationControlListResponse => {
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

export const exportMockData = (): ApplicationControlEvent[] => {
  return ALL_MOCK_EVENTS
}


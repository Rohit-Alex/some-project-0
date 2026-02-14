import type {
  ApplicationControlEvent,
  ApplicationControlListResponse,
  ApplicationControlStats,
  AppEventDetail,
} from '../types'

const generateMockEvents = (count: number): ApplicationControlEvent[] => {
  const hostnames = ['vikram', 'vikram1', 'desktop-01', 'laptop-02', 'server-03']
  const users = ['xyz.com\\vikram', 'xyz.com\\vikram1', 'xyz.com\\admin', 'xyz.com\\user1']
  const actions: ApplicationControlEvent['action'][] = ['Blocked', 'Allowed', 'Online']
  const channels: ApplicationControlEvent['channel'][] = ['Application Control', 'USB', 'Network']
  const fileTypes: ApplicationControlEvent['fileType'][] = ['Executable', 'DLL', 'Script', 'Installer', 'Document']
  const applications = [
    { name: 'Anydesk.exe', company: 'Anydesk INC' },
    { name: 'Zoom.exe', company: 'Zoom Video Communications' },
    { name: 'WhatsApp.exe', company: 'Meta Platforms' },
    { name: 'TeamViewer.exe', company: 'TeamViewer AG' },
    { name: 'Slack.exe', company: 'Salesforce' },
    { name: 'Discord.exe', company: 'Discord Inc' },
  ]

  return Array.from({ length: count }, (_, i) => {
    const app = applications[i % applications.length]
    const version = `${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 100)}`

    return {
      id: `event-${i + 1}`,
      eventId: `${i + 1}`,
      hostname: hostnames[i % hostnames.length],
      ipAddress: `192.168.1.${(i % 10) + 1}`,
      loggedInUser: users[i % users.length],
      action: actions[i % actions.length],
      channel: channels[i % channels.length],
      applicationName: app.name.replace('.exe', ''),
      companyName: app.company,
      filename: app.name,
      fileType: fileTypes[i % fileTypes.length],
      fileVersion: version,
      eventTime: new Date(Date.now() - i * 3600000).toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }),
    }
  })
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

export const getMockAppEventDetail = (event: ApplicationControlEvent): AppEventDetail => ({
  eventSummary: {
    hostname: event.hostname,
    ipAddress: event.ipAddress,
    loggedInUser: event.loggedInUser,
    applicationName: event.applicationName,
    companyName: event.companyName,
    applicationCategory: 'Remote Access',
    subCategory: 'Screen Sharing',
    productVersion: event.fileVersion,
    actionTaken: event.action,
    eventTime: event.eventTime,
  },
  applicationAttributes: {
    fileName: event.filename,
    filePath: 'C:\\Program Files\\' + event.applicationName + '\\',
    categoryType: 'Built-in / Custom',
    violatedPolicy: event.action === 'Blocked' ? 'Yes' : 'No',
    policyName: 'Block Remote Access Apps',
    fileSize: '24.5 MB',
    sha256Value: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6...',
    severity: event.action === 'Blocked' ? 'High' : 'Low',
    policyAction: 'Allow/Block',
    userNotified: 'Yes',
    managerNotified: 'No',
  },
  userDetails: {
    domainName: 'xyz.com',
    upnLogonName: event.loggedInUser.split('\\')[1] || 'Vikram',
    adOU: 'Sales',
    adGroups: 'Sales_team, Marketing_insights',
    userTitle: 'Sales Executive',
    emailId: 'vikram@gmail.com',
    department: 'Sales',
    managerName: 'Sunil',
    managerEmailId: 'Sunil@gmail.com',
    managerTitle: 'CSO',
  },
})

export const exportMockData = (): ApplicationControlEvent[] => {
  return ALL_MOCK_EVENTS
}

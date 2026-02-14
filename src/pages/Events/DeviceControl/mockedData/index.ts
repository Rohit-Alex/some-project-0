import type {
  DeviceControlEvent,
  DeviceControlListResponse,
  DeviceControlStats,
  DeviceEventDetail,
} from '../types'

const generateMockEvents = (count: number): DeviceControlEvent[] => {
  const hostnames = ['vikram', 'vikram1', 'desktop-01', 'laptop-02', 'server-03']
  const users = ['xyz.com\\vikram', 'xyz.com\\vikram1', 'xyz.com\\admin', 'xyz.com\\user1']
  const actions: DeviceControlEvent['action'][] = ['Blocked', 'Allowed', 'Read Only']
  const channels: DeviceControlEvent['channel'][] = ['USB', 'Bluetooth', 'WiFi', 'Ethernet', 'Thunderbolt']
  const deviceNames = [
    'TOSHIBA USB Device',
    'Kingston DataTraveler',
    'SanDisk Ultra USB',
    'Generic BT Device',
    'Unknown Mobile',
    'Western Digital HDD',
  ]
  const vendorIds = [
    'USBSTOR\\DiskTOSHIBA_TransMemory',
    'USBSTOR\\DiskKingston',
    'USBSTOR\\DiskSanDisk',
    'BTHENUM\\Device',
    'USB\\VID_1234',
  ]

  return Array.from({ length: count }, (_, i) => {
    const serialNumber = `1B${Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, '0')}`

    return {
      id: `event-${i + 1}`,
      eventId: `${i + 1}`,
      hostname: hostnames[i % hostnames.length],
      ipAddress: `192.168.1.${(i % 10) + 1}`,
      loggedInUser: users[i % users.length],
      action: actions[i % actions.length],
      channel: channels[i % channels.length],
      deviceName: deviceNames[i % deviceNames.length],
      deviceSerialNumber: serialNumber,
      deviceVendorId: vendorIds[i % vendorIds.length],
      mount: i % 3 === 0 ? 'E:/' : '',
      domainName: 'xyz.com',
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

export const getMockStats = (): DeviceControlStats => ({
  totalEvents: ALL_MOCK_EVENTS.length,
  blockedEvents: ALL_MOCK_EVENTS.filter((e) => e.action === 'Blocked').length,
  allowedEvents: ALL_MOCK_EVENTS.filter((e) => e.action === 'Allowed').length,
  connectedUsers: 32,
})

export const getMockDeviceControlEvents = (
  page: number,
  limit: number,
  _sortBy?: string,
  _sortDirection?: 'asc' | 'desc',
  _filters?: Record<string, string>
): DeviceControlListResponse => {
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

export const getMockEventDetail = (event: DeviceControlEvent): DeviceEventDetail => ({
  eventSummary: {
    hostname: event.hostname,
    ipAddress: event.ipAddress,
    loggedInUser: event.loggedInUser,
    deviceType: event.channel,
    deviceName: event.deviceName,
    deviceSerialNumber: event.deviceSerialNumber,
    deviceVendorId: event.deviceVendorId,
    eventTime: event.eventTime,
    actionTaken: event.action,
    deviceDisconnect: event.eventTime,
  },
  fileAttributes: {
    fileName: 'confidential_data.xlsx',
    filePath: 'C:\\Users\\Documents\\',
    fileOwner: event.loggedInUser.split('\\')[1] || 'unknown',
    fileType: 'Excel Spreadsheet',
    fileSize: '2.4 MB',
    fileHash: 'SHA256:a1b2c3d4e5f6...',
    fileCreatedTime: event.eventTime,
    lastAccessTime: event.eventTime,
    lastModifiedTime: event.eventTime,
    classificationTag: 'Confidential',
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
  dlpDetails: {
    dlpPolicyName: 'PII Protection Policy',
    dlpRuleName: 'Block USB File Transfer',
    severity: 'High',
    application: 'Explorer.exe',
    destination: 'USB Drive (E:)',
    violatedContent: 'SSN, Credit Card Numbers',
    userJustification: '',
    previewScreenshot: 'Link to download screenshot taken at the time of event',
    downloadForensicFile: 'Link to download copy of the file at time of event',
    encryptedFile: 'No',
  },
})

export const exportMockData = (): DeviceControlEvent[] => {
  return ALL_MOCK_EVENTS
}

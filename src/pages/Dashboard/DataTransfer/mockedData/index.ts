import type {
  DataTransferStats,
  FileTransferEvent,
  DeviceTypeTransferBreakdown,
  FileTransferTrend,
  TopUserFileTransfer,
  TopEndpointFileTransfer,
  FileTypeBreakdown,
  PolicyTriggeredTransfer,
  DepartmentBlockedTransfers,
  AlertIncidentTransfer,
  TransferTrendOverTime,
  SuspiciousTransfer,
} from '../types'

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

export const generateMockStats = (): DataTransferStats => ({
  totalEvents: randomInt(3000, 7000),
  allowedEvents: randomInt(2000, 5000),
  blockedEvents: randomInt(400, 1000),
  loggedEvents: randomInt(500, 1500),
  warningEvents: randomInt(50, 200),
})

export const generateMockRecentTransfers = (): FileTransferEvent[] => {
  const fileNames = ['report.pdf', 'data.xlsx', 'backup.zip', 'presentation.pptx', 'config.json', 'image.png']
  const fileTypes = ['PDF', 'Excel', 'Archive', 'PowerPoint', 'JSON', 'Image']
  const directions: FileTransferEvent['transferDirection'][] = ['inbound', 'outbound']
  const statuses: FileTransferEvent['status'][] = ['allowed', 'blocked', 'warned', 'logged']
  const users = ['john.doe', 'jane.smith', 'mike.wilson', 'sarah.jones', 'tom.brown']
  const endpoints = ['WS-001', 'WS-002', 'LAPTOP-101', 'LAPTOP-102', 'PC-SALES-01']

  return Array.from({ length: 20 }, (_, i) => ({
    id: `transfer-${i + 1}`,
    fileName: fileNames[randomInt(0, fileNames.length - 1)],
    fileType: fileTypes[randomInt(0, fileTypes.length - 1)],
    fileSize: randomInt(1024, 10485760),
    transferDirection: directions[randomInt(0, 1)],
    source: endpoints[randomInt(0, endpoints.length - 1)],
    destination: `USB-${randomInt(100, 999)}`,
    status: statuses[randomInt(0, statuses.length - 1)],
    policyTriggered: randomInt(0, 1) ? 'DLP Policy' : undefined,
    user: users[randomInt(0, users.length - 1)],
    endpoint: endpoints[randomInt(0, endpoints.length - 1)],
    timestamp: new Date(Date.now() - randomInt(0, 3600000)).toISOString(),
  }))
}

export const generateMockBlockedByDeviceType = (): DeviceTypeTransferBreakdown[] => [
  { deviceType: 'USB Storage Device', blocked: randomInt(100, 400), allowed: randomInt(200, 600), logged: randomInt(150, 400) },
  { deviceType: 'Smart Phone', blocked: randomInt(80, 300), allowed: randomInt(150, 500), logged: randomInt(100, 350) },
  { deviceType: 'CD/DVD', blocked: randomInt(50, 200), allowed: randomInt(80, 300), logged: randomInt(60, 200) },
  { deviceType: 'Network Share', blocked: randomInt(30, 150), allowed: randomInt(100, 400), logged: randomInt(80, 250) },
  { deviceType: 'Bluetooth', blocked: randomInt(40, 180), allowed: randomInt(60, 250), logged: randomInt(50, 180) },
]

export const generateMockAllowedLoggedTransfers = (): FileTransferTrend[] => {
  const data: FileTransferTrend[] = []
  for (let hour = 0; hour < 24; hour++) {
    data.push({
      date: new Date().toISOString().split('T')[0],
      hour,
      allowed: randomInt(10, 80),
      logged: randomInt(5, 40),
      blockedNoLogging: randomInt(2, 15),
    })
  }
  return data
}

export const generateMockTopUsers = (): TopUserFileTransfer[] => [
  { user: 'john.doe', displayName: 'John Doe', totalEvents: 312, allowed: 200, logged: 80, blocked: 32 },
  { user: 'jane.smith', displayName: 'Jane Smith', totalEvents: 287, allowed: 180, logged: 75, blocked: 32 },
  { user: 'mike.wilson', displayName: 'Mike Wilson', totalEvents: 245, allowed: 160, logged: 60, blocked: 25 },
  { user: 'sarah.jones', displayName: 'Sarah Jones', totalEvents: 198, allowed: 130, logged: 48, blocked: 20 },
  { user: 'tom.brown', displayName: 'Tom Brown', totalEvents: 176, allowed: 115, logged: 43, blocked: 18 },
]

export const generateMockTopEndpoints = (): TopEndpointFileTransfer[] => [
  { endpoint: 'WS-001', hostname: 'ws-001.corp.local', totalEvents: 425, allowed: 300, logged: 90, blocked: 35, policyViolations: 12 },
  { endpoint: 'LAPTOP-101', hostname: 'laptop-101.corp.local', totalEvents: 387, allowed: 270, logged: 85, blocked: 32, policyViolations: 10 },
  { endpoint: 'PC-SALES-01', hostname: 'pc-sales-01.corp.local', totalEvents: 356, allowed: 250, logged: 76, blocked: 30, policyViolations: 8 },
  { endpoint: 'WS-002', hostname: 'ws-002.corp.local', totalEvents: 298, allowed: 210, logged: 63, blocked: 25, policyViolations: 7 },
  { endpoint: 'LAPTOP-102', hostname: 'laptop-102.corp.local', totalEvents: 267, allowed: 185, logged: 57, blocked: 25, policyViolations: 6 },
]

export const generateMockFileTypeBreakdown = (): FileTypeBreakdown[] => [
  { fileType: 'Documents', extension: '.doc, .docx, .pdf', events: randomInt(200, 500), allowed: randomInt(150, 350), logged: randomInt(50, 150), blocked: randomInt(20, 80) },
  { fileType: 'Archives', extension: '.zip, .rar', events: randomInt(150, 400), allowed: randomInt(100, 280), logged: randomInt(40, 120), blocked: randomInt(30, 100) },
  { fileType: 'Executables', extension: '.exe, .msi', events: randomInt(80, 250), allowed: randomInt(30, 100), logged: randomInt(20, 80), blocked: randomInt(50, 150) },
  { fileType: 'Media', extension: '.mp4, .jpg, .png', events: randomInt(100, 300), allowed: randomInt(80, 220), logged: randomInt(30, 90), blocked: randomInt(15, 50) },
  { fileType: 'Spreadsheets', extension: '.xls, .xlsx', events: randomInt(120, 350), allowed: randomInt(90, 260), logged: randomInt(35, 100), blocked: randomInt(18, 60) },
]

export const generateMockPolicyEvents = (): PolicyTriggeredTransfer[] => [
  { policyName: 'USB DLP Policy', audit: randomInt(100, 300), enforce: randomInt(50, 200), total: 0 },
  { policyName: 'Cloud Upload Block', audit: randomInt(80, 250), enforce: randomInt(40, 150), total: 0 },
  { policyName: 'Sensitive Data Policy', audit: randomInt(60, 200), enforce: randomInt(30, 120), total: 0 },
  { policyName: 'Executable Block', audit: randomInt(40, 150), enforce: randomInt(20, 80), total: 0 },
].map(item => ({ ...item, total: item.audit + item.enforce }))

export const generateMockDeptBlocked = (): DepartmentBlockedTransfers[] => [
  { department: 'Finance', blockedCount: 178, fileTypes: { documents: 60, archives: 45, executables: 40, media: 33 } },
  { department: 'HR', blockedCount: 134, fileTypes: { documents: 50, archives: 35, executables: 28, media: 21 } },
  { department: 'R&D', blockedCount: 112, fileTypes: { documents: 40, archives: 30, executables: 25, media: 17 } },
  { department: 'Sales', blockedCount: 98, fileTypes: { documents: 35, archives: 28, executables: 20, media: 15 } },
  { department: 'IT', blockedCount: 67, fileTypes: { documents: 22, archives: 18, executables: 15, media: 12 } },
]

export const generateMockAlertVolume = (): AlertIncidentTransfer[] => {
  const data: AlertIncidentTransfer[] = []
  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    data.push({
      date: date.toISOString().split('T')[0],
      alerts: randomInt(25, 95),
      incidents: randomInt(8, 35),
    })
  }
  return data
}

export const generateMockTransferTrend = (): TransferTrendOverTime[] => {
  const data: TransferTrendOverTime[] = []
  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const allowed = randomInt(600, 1400)
    const blocked = randomInt(80, 250)
    data.push({
      date: date.toISOString().split('T')[0],
      allowed,
      blocked,
      total: allowed + blocked,
    })
  }
  return data
}

export const generateMockSuspiciousTransfers = (): SuspiciousTransfer[] => [
  { device: 'Unknown USB (VID:5678)', hostname: 'ws-finance-02', riskScore: 92, blockedAttempts: 18, policyViolations: 8, unusualDeviceTypes: 3, offHoursActivity: 6 },
  { device: 'Unrecognized Phone', hostname: 'laptop-hr-01', riskScore: 78, blockedAttempts: 12, policyViolations: 5, unusualDeviceTypes: 2, offHoursActivity: 4 },
  { device: 'Suspicious BT Device', hostname: 'ws-rd-03', riskScore: 65, blockedAttempts: 8, policyViolations: 4, unusualDeviceTypes: 2, offHoursActivity: 3 },
  { device: 'Unknown Network Share', hostname: 'pc-sales-02', riskScore: 52, blockedAttempts: 5, policyViolations: 3, unusualDeviceTypes: 1, offHoursActivity: 2 },
  { device: 'Unverified HDD', hostname: 'laptop-it-02', riskScore: 41, blockedAttempts: 3, policyViolations: 2, unusualDeviceTypes: 1, offHoursActivity: 1 },
]

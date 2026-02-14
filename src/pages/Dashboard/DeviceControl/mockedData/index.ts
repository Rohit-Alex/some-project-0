import type {
  DeviceControlStats,
  DeviceConnectionEvent,
  DeviceTypeBreakdown,
  TopUserDeviceEvents,
  TopEndpointDeviceEvents,
  DeviceVendorBreakdown,
  PolicyTriggeredEvent,
  DepartmentBlockedAttempts,
  AlertIncidentVolume,
  DeviceEventTrend,
  SuspiciousDevice,
} from '../types'

// Helper to generate random data
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

// Generate stats
export const generateMockStats = (): DeviceControlStats => ({
  totalEvents: randomInt(2000, 5000),
  allowedEvents: randomInt(1500, 3500),
  blockedEvents: randomInt(300, 800),
  readOnlyEvents: randomInt(50, 200),
  alertedEvents: randomInt(30, 100),
  overrideEvents: randomInt(10, 50),
})

// Generate recent device connection events
export const generateMockRecentEvents = (): DeviceConnectionEvent[] => {
  const deviceTypes = ['USB Storage Device', 'Smart Phone', 'CD/DVD', 'Bluetooth', 'Network Share']
  const vendors = ['SanDisk', 'Kingston', 'Seagate', 'Apple', 'Samsung', 'Western Digital']
  const actions: DeviceConnectionEvent['action'][] = ['connect', 'disconnect', 'blocked']
  const statuses: DeviceConnectionEvent['status'][] = ['allowed', 'blocked', 'read-only', 'alerted', 'override']
  const users = ['john.doe', 'jane.smith', 'mike.wilson', 'sarah.jones', 'tom.brown']
  const departments = ['Sales', 'HR', 'Finance', 'IT', 'Marketing']
  const endpoints = ['WS-001', 'WS-002', 'LAPTOP-101', 'LAPTOP-102', 'PC-SALES-01']

  return Array.from({ length: 20 }, (_, i) => ({
    id: `event-${i + 1}`,
    deviceType: deviceTypes[randomInt(0, deviceTypes.length - 1)],
    deviceVendor: vendors[randomInt(0, vendors.length - 1)],
    deviceModel: `Model-${randomInt(100, 999)}`,
    serialNumber: `SN-${randomInt(10000, 99999)}`,
    action: actions[randomInt(0, actions.length - 1)],
    status: statuses[randomInt(0, statuses.length - 1)],
    endpoint: endpoints[randomInt(0, endpoints.length - 1)],
    user: users[randomInt(0, users.length - 1)],
    department: departments[randomInt(0, departments.length - 1)],
    timestamp: new Date(Date.now() - randomInt(0, 3600000)).toISOString(),
  }))
}

// Generate blocked by device type data
export const generateMockBlockedByType = (): DeviceTypeBreakdown[] => [
  { deviceType: 'USB Storage Device', count: randomInt(100, 500) },
  { deviceType: 'Smart Phone', count: randomInt(80, 300) },
  { deviceType: 'CD/DVD', count: randomInt(50, 200) },
  { deviceType: 'Windows Portable Device', count: randomInt(30, 150) },
  { deviceType: 'Bluetooth', count: randomInt(40, 180) },
  { deviceType: 'Network Share', count: randomInt(20, 100) },
  { deviceType: 'Local Printers', count: randomInt(10, 50) },
]

// Generate allowed by device type data
export const generateMockAllowedByType = (): DeviceTypeBreakdown[] => [
  { deviceType: 'USB Storage Device', count: randomInt(200, 800) },
  { deviceType: 'Smart Phone', count: randomInt(150, 600) },
  { deviceType: 'CD/DVD', count: randomInt(80, 300) },
  { deviceType: 'Windows Portable Device', count: randomInt(100, 400) },
  { deviceType: 'Bluetooth', count: randomInt(120, 450) },
  { deviceType: 'Local Printers', count: randomInt(200, 600) },
  { deviceType: 'Network Printers', count: randomInt(150, 500) },
]

// Generate top users data
export const generateMockTopUsers = (): TopUserDeviceEvents[] => [
  { user: 'john.doe', displayName: 'John Doe', events: 245, allowed: 180, blocked: 30, readOnly: 20, alerted: 10, override: 5 },
  { user: 'jane.smith', displayName: 'Jane Smith', events: 198, allowed: 150, blocked: 25, readOnly: 15, alerted: 5, override: 3 },
  { user: 'mike.wilson', displayName: 'Mike Wilson', events: 176, allowed: 140, blocked: 20, readOnly: 10, alerted: 4, override: 2 },
  { user: 'sarah.jones', displayName: 'Sarah Jones', events: 154, allowed: 120, blocked: 18, readOnly: 10, alerted: 4, override: 2 },
  { user: 'tom.brown', displayName: 'Tom Brown', events: 132, allowed: 100, blocked: 16, readOnly: 10, alerted: 4, override: 2 },
]

// Generate top endpoints data
export const generateMockTopEndpoints = (): TopEndpointDeviceEvents[] => [
  { endpoint: 'WS-001', hostname: 'ws-001.corp.local', events: 312, allowed: 250, blocked: 35, readOnly: 15, alerted: 8, override: 4 },
  { endpoint: 'LAPTOP-101', hostname: 'laptop-101.corp.local', events: 287, allowed: 230, blocked: 30, readOnly: 15, alerted: 8, override: 4 },
  { endpoint: 'PC-SALES-01', hostname: 'pc-sales-01.corp.local', events: 256, allowed: 200, blocked: 28, readOnly: 16, alerted: 8, override: 4 },
  { endpoint: 'WS-002', hostname: 'ws-002.corp.local', events: 234, allowed: 180, blocked: 28, readOnly: 14, alerted: 8, override: 4 },
  { endpoint: 'LAPTOP-102', hostname: 'laptop-102.corp.local', events: 198, allowed: 155, blocked: 23, readOnly: 12, alerted: 5, override: 3 },
]

// Generate vendor breakdown data
export const generateMockVendorBreakdown = (): DeviceVendorBreakdown[] => [
  { vendor: 'SanDisk', events: randomInt(200, 500) },
  { vendor: 'Kingston', events: randomInt(180, 450) },
  { vendor: 'Seagate', events: randomInt(150, 400) },
  { vendor: 'Western Digital', events: randomInt(120, 350) },
  { vendor: 'Samsung', events: randomInt(100, 300) },
  { vendor: 'Apple', events: randomInt(80, 250) },
  { vendor: 'Unknown', events: randomInt(50, 150) },
]

// Generate policy triggered events
export const generateMockPolicyEvents = (): PolicyTriggeredEvent[] => [
  { policyCategory: 'USB', audit: randomInt(100, 300), enforce: randomInt(50, 200), total: 0 },
  { policyCategory: 'Bluetooth', audit: randomInt(80, 250), enforce: randomInt(40, 150), total: 0 },
  { policyCategory: 'Mobile', audit: randomInt(60, 200), enforce: randomInt(30, 120), total: 0 },
  { policyCategory: 'Printer', audit: randomInt(40, 150), enforce: randomInt(20, 80), total: 0 },
].map(item => ({ ...item, total: item.audit + item.enforce }))

// Generate department blocked attempts
export const generateMockDeptBlocked = (): DepartmentBlockedAttempts[] => [
  { department: 'Finance', blockedCount: 145, deviceTypes: { usbStorage: 50, smartphone: 30, cdDvd: 20, portableDevice: 15, printer: 10, bluetooth: 10, networkShare: 10 } },
  { department: 'HR', blockedCount: 98, deviceTypes: { usbStorage: 35, smartphone: 25, cdDvd: 15, portableDevice: 8, printer: 5, bluetooth: 5, networkShare: 5 } },
  { department: 'R&D', blockedCount: 87, deviceTypes: { usbStorage: 30, smartphone: 20, cdDvd: 12, portableDevice: 10, printer: 5, bluetooth: 5, networkShare: 5 } },
  { department: 'Sales', blockedCount: 76, deviceTypes: { usbStorage: 25, smartphone: 20, cdDvd: 10, portableDevice: 8, printer: 5, bluetooth: 4, networkShare: 4 } },
  { department: 'IT', blockedCount: 45, deviceTypes: { usbStorage: 15, smartphone: 10, cdDvd: 8, portableDevice: 5, printer: 3, bluetooth: 2, networkShare: 2 } },
]

// Generate alert volume data (last 7 days)
export const generateMockAlertVolume = (): AlertIncidentVolume[] => {
  const data: AlertIncidentVolume[] = []
  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    data.push({
      date: date.toISOString().split('T')[0],
      alerts: randomInt(20, 80),
      incidents: randomInt(5, 25),
    })
  }
  return data
}

// Generate event trend data (last 7 days)
export const generateMockEventTrend = (): DeviceEventTrend[] => {
  const data: DeviceEventTrend[] = []
  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const allowed = randomInt(500, 1200)
    const blocked = randomInt(50, 200)
    data.push({
      date: date.toISOString().split('T')[0],
      allowed,
      blocked,
      total: allowed + blocked,
    })
  }
  return data
}

// Generate suspicious devices data
export const generateMockSuspiciousDevices = (): SuspiciousDevice[] => [
  { device: 'Unknown USB (VID:1234)', hostname: 'ws-finance-01', riskScore: 85, blockedAttempts: 12, policyViolations: 5, unusualDeviceTypes: 2, offHoursActivity: 4 },
  { device: 'Generic BT Device', hostname: 'laptop-sales-03', riskScore: 72, blockedAttempts: 8, policyViolations: 3, unusualDeviceTypes: 2, offHoursActivity: 3 },
  { device: 'Unrecognized HDD', hostname: 'ws-hr-02', riskScore: 68, blockedAttempts: 6, policyViolations: 4, unusualDeviceTypes: 1, offHoursActivity: 2 },
  { device: 'Unknown Mobile', hostname: 'pc-rd-05', riskScore: 55, blockedAttempts: 4, policyViolations: 2, unusualDeviceTypes: 1, offHoursActivity: 2 },
  { device: 'Suspicious USB Drive', hostname: 'laptop-it-01', riskScore: 45, blockedAttempts: 3, policyViolations: 1, unusualDeviceTypes: 1, offHoursActivity: 1 },
]

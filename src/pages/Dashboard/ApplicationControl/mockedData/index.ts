import type {
  ApplicationControlStats,
  ApplicationFootprint,
  CategoryInventory,
  VendorInventory,
  NewApplicationTrend,
  RecentApplicationInstall,
  DepartmentApplications,
  ApplicationBlockEvent,
  TopBlockedApplication,
  UserBlockEvents,
  EndpointBlockEvents,
} from '../types'

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

export const generateMockStats = (): ApplicationControlStats => ({
  totalApplications: randomInt(400, 700),
  newApplications: randomInt(30, 80),
  blockedEvents: randomInt(300, 700),
  allowedEvents: randomInt(500, 1500),
  warnedEvents: randomInt(50, 200),
})

export const generateMockApplicationFootprint = (): ApplicationFootprint[] => {
  const data: ApplicationFootprint[] = []
  let baseApps = 450
  for (let i = 29; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const growth = randomInt(-5, 15)
    baseApps += growth
    data.push({
      date: date.toISOString().split('T')[0],
      uniqueApps: baseApps,
      growth,
    })
  }
  return data
}

export const generateMockCategoryInventory = (): CategoryInventory[] => {
  const categories = [
    { category: 'Productivity', count: randomInt(150, 300) },
    { category: 'Browsers', count: randomInt(80, 150) },
    { category: 'Development Tools', count: randomInt(100, 200) },
    { category: 'Media', count: randomInt(60, 120) },
    { category: 'File Sharing', count: randomInt(40, 80) },
    { category: 'Remote Access', count: randomInt(30, 60) },
    { category: 'Unknown / Custom', count: randomInt(50, 100) },
  ]
  const total = categories.reduce((sum, c) => sum + c.count, 0)
  return categories.map((c) => ({
    ...c,
    percentage: Math.round((c.count / total) * 100),
  }))
}

export const generateMockVendorInventory = (): VendorInventory[] => [
  { vendor: 'Microsoft', count: randomInt(200, 400) },
  { vendor: 'Google', count: randomInt(100, 200) },
  { vendor: 'Adobe', count: randomInt(80, 150) },
  { vendor: 'Zoom', count: randomInt(40, 80) },
  { vendor: 'TeamViewer', count: randomInt(20, 50) },
  { vendor: 'Apple', count: randomInt(30, 60) },
  { vendor: 'Mozilla', count: randomInt(25, 55) },
  { vendor: 'Unknown Vendors', count: randomInt(100, 200) },
]

export const generateMockNewAppTrend = (): NewApplicationTrend[] => {
  const data: NewApplicationTrend[] = []
  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    data.push({
      date: date.toISOString().split('T')[0],
      newInstalls: randomInt(10, 50),
    })
  }
  return data
}

export const generateMockRecentInstalls = (): RecentApplicationInstall[] => {
  const apps = ['Slack', 'Zoom', 'VS Code', 'Chrome', 'Notion', 'Discord', 'Postman', 'Figma']
  const vendors = ['Slack Technologies', 'Zoom Video', 'Microsoft', 'Google', 'Notion Labs', 'Discord Inc', 'Postman', 'Figma Inc']
  const users = ['john.doe', 'jane.smith', 'mike.wilson', 'sarah.jones', 'tom.brown']
  const departments = ['Sales', 'HR', 'Engineering', 'Marketing', 'Finance']
  const endpoints = ['WS-001', 'WS-002', 'LAPTOP-101', 'LAPTOP-102', 'PC-DEV-01']

  return Array.from({ length: 15 }, (_, i) => ({
    id: `install-${i + 1}`,
    appName: apps[randomInt(0, apps.length - 1)],
    version: `${randomInt(1, 5)}.${randomInt(0, 9)}.${randomInt(0, 99)}`,
    vendor: vendors[randomInt(0, vendors.length - 1)],
    endpoint: endpoints[randomInt(0, endpoints.length - 1)],
    user: users[randomInt(0, users.length - 1)],
    department: departments[randomInt(0, departments.length - 1)],
    timestamp: new Date(Date.now() - randomInt(0, 3600000)).toISOString(),
  }))
}

export const generateMockDeptApplications = (): DepartmentApplications[] => [
  { department: 'Engineering', newInstalls: randomInt(80, 150) },
  { department: 'Sales', newInstalls: randomInt(40, 80) },
  { department: 'Marketing', newInstalls: randomInt(35, 70) },
  { department: 'HR', newInstalls: randomInt(20, 45) },
  { department: 'Finance', newInstalls: randomInt(25, 50) },
  { department: 'IT', newInstalls: randomInt(60, 100) },
]

export const generateMockBlockEventsByCategory = (): ApplicationBlockEvent[] => [
  { category: 'Remote Access', blocked: randomInt(100, 250), warned: randomInt(30, 80) },
  { category: 'File Sharing', blocked: randomInt(80, 200), warned: randomInt(25, 60) },
  { category: 'Gaming', blocked: randomInt(150, 300), warned: randomInt(40, 100) },
  { category: 'Media', blocked: randomInt(50, 120), warned: randomInt(15, 40) },
  { category: 'Unknown', blocked: randomInt(60, 150), warned: randomInt(20, 50) },
]

export const generateMockTopBlockedApps = (): TopBlockedApplication[] => [
  { application: 'BitTorrent', category: 'File Sharing', blockCount: randomInt(150, 300) },
  { application: 'TeamViewer (unauthorized)', category: 'Remote Access', blockCount: randomInt(100, 200) },
  { application: 'Unknown Browser', category: 'Browsers', blockCount: randomInt(80, 160) },
  { application: 'Crypto Miner', category: 'Unknown', blockCount: randomInt(50, 120) },
  { application: 'Game Client', category: 'Gaming', blockCount: randomInt(60, 140) },
]

export const generateMockUserBlockEvents = (): UserBlockEvents[] => [
  { user: 'john.doe', displayName: 'John Doe', blocked: randomInt(40, 100), warned: randomInt(15, 40) },
  { user: 'jane.smith', displayName: 'Jane Smith', blocked: randomInt(35, 85), warned: randomInt(12, 35) },
  { user: 'mike.wilson', displayName: 'Mike Wilson', blocked: randomInt(30, 70), warned: randomInt(10, 30) },
  { user: 'sarah.jones', displayName: 'Sarah Jones', blocked: randomInt(25, 60), warned: randomInt(8, 25) },
  { user: 'tom.brown', displayName: 'Tom Brown', blocked: randomInt(20, 50), warned: randomInt(6, 20) },
]

export const generateMockEndpointBlockEvents = (): EndpointBlockEvents[] => [
  { endpoint: 'WS-SALES-01', hostname: 'ws-sales-01.corp.local', blocked: randomInt(50, 120) },
  { endpoint: 'LAPTOP-DEV-03', hostname: 'laptop-dev-03.corp.local', blocked: randomInt(45, 100) },
  { endpoint: 'PC-HR-02', hostname: 'pc-hr-02.corp.local', blocked: randomInt(40, 90) },
  { endpoint: 'WS-MARKETING-01', hostname: 'ws-marketing-01.corp.local', blocked: randomInt(35, 80) },
  { endpoint: 'LAPTOP-FINANCE-01', hostname: 'laptop-finance-01.corp.local', blocked: randomInt(30, 70) },
]

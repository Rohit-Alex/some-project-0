// ==============================|| DEVICE CONTROL TYPES ||============================== //

export interface DeviceControlStats {
  totalEvents: number
  allowedEvents: number
  blockedEvents: number
  readOnlyEvents: number
  alertedEvents: number
  overrideEvents: number
}

export interface DeviceConnectionEvent {
  id: string
  deviceType: string
  deviceVendor: string
  deviceModel: string
  serialNumber: string
  action: 'connect' | 'disconnect' | 'blocked'
  status: 'allowed' | 'blocked' | 'read-only' | 'alerted' | 'override'
  endpoint: string
  user: string
  department: string
  timestamp: string
}

export interface DeviceTypeBreakdown {
  deviceType: string
  count: number
  category?: string
}

export interface TopUserDeviceEvents {
  user: string
  displayName: string
  events: number
  allowed: number
  blocked: number
  readOnly: number
  alerted: number
  override: number
}

export interface TopEndpointDeviceEvents {
  endpoint: string
  hostname: string
  events: number
  allowed: number
  blocked: number
  readOnly: number
  alerted: number
  override: number
}

export interface DeviceVendorBreakdown {
  vendor: string
  model?: string
  events: number
}

export interface PolicyTriggeredEvent {
  policyCategory: string
  audit: number
  enforce: number
  total: number
}

export interface DepartmentBlockedAttempts {
  department: string
  blockedCount: number
  deviceTypes: {
    usbStorage: number
    smartphone: number
    cdDvd: number
    portableDevice: number
    printer: number
    bluetooth: number
    networkShare: number
  }
}

export interface AlertIncidentVolume {
  date: string
  alerts: number
  incidents: number
}

export interface DeviceEventTrend {
  date: string
  allowed: number
  total: number
  blocked: number
}

export interface SuspiciousDevice {
  device: string
  hostname: string
  riskScore: number
  blockedAttempts: number
  policyViolations: number
  unusualDeviceTypes: number
  offHoursActivity: number
}

export interface DeviceControlDashboardData {
  stats: DeviceControlStats
  recentEvents: DeviceConnectionEvent[]
  blockedByDeviceType: DeviceTypeBreakdown[]
  allowedByDeviceType: DeviceTypeBreakdown[]
  topUsers: TopUserDeviceEvents[]
  topEndpoints: TopEndpointDeviceEvents[]
  vendorBreakdown: DeviceVendorBreakdown[]
  policyEvents: PolicyTriggeredEvent[]
  departmentBlocked: DepartmentBlockedAttempts[]
  alertVolume: AlertIncidentVolume[]
  eventTrend: DeviceEventTrend[]
  suspiciousDevices: SuspiciousDevice[]
}

export interface DeviceControlFilters {
  startDate?: string
  endDate?: string
  deviceType?: string
  status?: string
  department?: string
}


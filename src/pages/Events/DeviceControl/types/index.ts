export interface DeviceControlEvent {
  id: string
  eventId: string
  hostname: string
  ipAddress: string
  loggedInUser: string
  action: 'Blocked' | 'Allowed' | 'Read Only'
  channel: 'USB' | 'Bluetooth' | 'WiFi' | 'Ethernet' | 'Thunderbolt'
  deviceName: string
  deviceSerialNumber: string
  deviceVendorId: string
  mount: string
  domainName: string
  eventTime: string
}

export interface DeviceControlFilters {
  hostname?: string
  ipAddress?: string
  loggedInUser?: string
  action?: string
  channel?: string
  deviceName?: string
  deviceSerialNumber?: string
  deviceVendorId?: string
  domainName?: string
}

export interface DeviceControlStats {
  totalEvents: number
  blockedEvents: number
  allowedEvents: number
  connectedUsers: number
}

export interface DeviceControlListParams {
  page: number
  limit: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
  filters?: DeviceControlFilters
  startDate?: string
  endDate?: string
}

export interface DeviceControlListResponse {
  data: DeviceControlEvent[]
  total: number
  page: number
  limit: number
  stats: DeviceControlStats
}

// Event Summary for detail panel
export interface EventSummary {
  hostname: string
  ipAddress: string
  loggedInUser: string
  deviceType: string
  deviceName: string
  deviceSerialNumber: string
  deviceVendorId: string
  eventTime: string
  actionTaken: string
  deviceDisconnect: string
}

// File Attributes for detail panel
export interface FileAttributes {
  fileName: string
  filePath: string
  fileOwner: string
  fileType: string
  fileSize: string
  fileHash: string
  fileCreatedTime: string
  lastAccessTime: string
  lastModifiedTime: string
  classificationTag: string
}

// User Details for detail panel
export interface UserDetail {
  domainName: string
  upnLogonName: string
  adOU: string
  adGroups: string
  userTitle: string
  emailId: string
  department: string
  managerName: string
  managerEmailId: string
  managerTitle: string
}

// DLP Details for detail panel
export interface DlpDetails {
  dlpPolicyName: string
  dlpRuleName: string
  severity: 'High' | 'Medium' | 'Low'
  application: string
  destination: string
  violatedContent: string
  userJustification: string
  previewScreenshot: string
  downloadForensicFile: string
  encryptedFile: 'Yes' | 'No'
}

// Combined detail panel data
export interface DeviceEventDetail {
  eventSummary: EventSummary
  fileAttributes: FileAttributes
  userDetails: UserDetail
  dlpDetails: DlpDetails
}

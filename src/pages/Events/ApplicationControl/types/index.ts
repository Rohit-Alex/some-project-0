export interface ApplicationControlEvent {
  id: string
  eventId: string
  hostname: string
  ipAddress: string
  loggedInUser: string
  action: 'Blocked' | 'Allowed' | 'Online'
  channel: 'Application Control' | 'USB' | 'Network'
  applicationName: string
  companyName: string
  filename: string
  fileType: 'Executable' | 'DLL' | 'Script' | 'Installer' | 'Document'
  fileVersion: string
  eventTime: string
}

export interface ApplicationControlFilters {
  hostname?: string
  ipAddress?: string
  loggedInUser?: string
  action?: string
  channel?: string
  applicationName?: string
  companyName?: string
  filename?: string
  fileType?: string
}

export interface ApplicationControlStats {
  totalEvents: number
  blockedEvents: number
  allowedEvents: number
  connectedUsers: number
}

export interface ApplicationControlListParams {
  page: number
  limit: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
  filters?: ApplicationControlFilters
  startDate?: string
  endDate?: string
}

export interface ApplicationControlListResponse {
  data: ApplicationControlEvent[]
  total: number
  page: number
  limit: number
  stats: ApplicationControlStats
}

// Event Summary for detail panel
export interface AppEventSummary {
  hostname: string
  ipAddress: string
  loggedInUser: string
  applicationName: string
  companyName: string
  applicationCategory: string
  subCategory: string
  productVersion: string
  actionTaken: string
  eventTime: string
}

// Application Attributes for detail panel
export interface ApplicationAttributes {
  fileName: string
  filePath: string
  categoryType: string
  violatedPolicy: string
  policyName: string
  fileSize: string
  sha256Value: string
  severity: 'High' | 'Medium' | 'Low'
  policyAction: string
  userNotified: 'Yes' | 'No'
  managerNotified: 'Yes' | 'No'
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

// Combined detail panel data
export interface AppEventDetail {
  eventSummary: AppEventSummary
  applicationAttributes: ApplicationAttributes
  userDetails: UserDetail
}

export interface ApplicationControlEvent {
  id: string
  eventId: string
  hostname: string
  ipAddress: string
  loggedInUser: string
  action: 'Blocked' | 'Allowed' | 'Warned'
  channel: string
  applicationName: string
  companyName: string
  filename: string
  fileType: string
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


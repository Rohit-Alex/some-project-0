export interface DataClassificationEvent {
  id: string
  eventId: string
  hostname: string
  ipAddress: string
  loggedInUser: string
  action: 'Blocked' | 'Allowed' | 'Warned'
  fileName: string
  fileSize: string
  classification: 'Confidential' | 'Internal' | 'Public' | 'Restricted'
  department: string
  destinationPath: string
  eventTime: string
}

export interface DataClassificationFilters {
  hostname?: string
  ipAddress?: string
  loggedInUser?: string
  action?: string
  fileName?: string
  classification?: string
  department?: string
  destinationPath?: string
}

export interface DataClassificationStats {
  totalEvents: number
  blockedEvents: number
  allowedEvents: number
  connectedUsers: number
}

export interface DataClassificationListParams {
  page: number
  limit: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
  filters?: DataClassificationFilters
  startDate?: string
  endDate?: string
}

export interface DataClassificationListResponse {
  data: DataClassificationEvent[]
  total: number
  page: number
  limit: number
  stats: DataClassificationStats
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

export interface DataTransferEvent {
  id: string
  eventId: string
  hostname: string
  ipAddress: string
  loggedInUser: string
  action: 'Blocked' | 'Allowed' | 'Warned'
  transferType: 'USB' | 'Network' | 'Cloud' | 'Email'
  sourceDevice: string
  targetDevice: string
  fileName: string
  fileSize: string
  protocol: string
  transferStatus: 'Success' | 'Failed' | 'InProgress' | 'Cancelled'
  eventTime: string
}

export interface DataTransferFilters {
  hostname?: string
  ipAddress?: string
  loggedInUser?: string
  action?: string
  transferType?: string
  sourceDevice?: string
  targetDevice?: string
  fileName?: string
  protocol?: string
  transferStatus?: string
}

export interface DataTransferStats {
  totalEvents: number
  blockedEvents: number
  allowedEvents: number
  connectedUsers: number
}

export interface DataTransferListParams {
  page: number
  limit: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
  filters?: DataTransferFilters
  startDate?: string
  endDate?: string
}

export interface DataTransferListResponse {
  data: DataTransferEvent[]
  total: number
  page: number
  limit: number
  stats: DataTransferStats
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

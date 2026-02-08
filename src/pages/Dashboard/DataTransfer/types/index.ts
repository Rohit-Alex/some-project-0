// ==============================|| DATA TRANSFER TYPES ||============================== //

export interface DataTransferStats {
  totalEvents: number
  allowedEvents: number
  blockedEvents: number
  loggedEvents: number
  warningEvents: number
}

export interface FileTransferEvent {
  id: string
  fileName: string
  fileType: string
  fileSize: number
  transferDirection: 'inbound' | 'outbound'
  source: string
  destination: string
  status: 'allowed' | 'blocked' | 'warned' | 'logged'
  policyTriggered?: string
  user: string
  endpoint: string
  timestamp: string
}

export interface DeviceTypeTransferBreakdown {
  deviceType: string
  blocked: number
  allowed: number
  logged: number
}

export interface FileTransferTrend {
  date: string
  hour?: number
  allowed: number
  logged: number
  blockedNoLogging?: number
}

export interface TopUserFileTransfer {
  user: string
  displayName: string
  totalEvents: number
  allowed: number
  logged: number
  blocked: number
}

export interface TopEndpointFileTransfer {
  endpoint: string
  hostname: string
  totalEvents: number
  allowed: number
  logged: number
  blocked: number
  policyViolations: number
}

export interface FileTypeBreakdown {
  fileType: string
  extension: string
  events: number
  allowed: number
  logged: number
  blocked: number
}

export interface PolicyTriggeredTransfer {
  policyName: string
  audit: number
  enforce: number
  total: number
}

export interface DepartmentBlockedTransfers {
  department: string
  blockedCount: number
  fileTypes: {
    documents: number
    archives: number
    executables: number
    media: number
  }
}

export interface AlertIncidentTransfer {
  date: string
  alerts: number
  incidents: number
}

export interface TransferTrendOverTime {
  date: string
  allowed: number
  total: number
  blocked: number
}

export interface SuspiciousTransfer {
  device: string
  hostname: string
  riskScore: number
  blockedAttempts: number
  policyViolations: number
  unusualDeviceTypes: number
  offHoursActivity: number
}

export interface DataTransferDashboardData {
  stats: DataTransferStats
  recentTransfers: FileTransferEvent[]
  blockedByDeviceType: DeviceTypeTransferBreakdown[]
  allowedLoggedTransfers: FileTransferTrend[]
  topUsers: TopUserFileTransfer[]
  topEndpoints: TopEndpointFileTransfer[]
  fileTypeBreakdown: FileTypeBreakdown[]
  policyEvents: PolicyTriggeredTransfer[]
  departmentBlocked: DepartmentBlockedTransfers[]
  alertVolume: AlertIncidentTransfer[]
  transferTrend: TransferTrendOverTime[]
  suspiciousTransfers: SuspiciousTransfer[]
}

export interface DataTransferFilters {
  startDate?: string
  endDate?: string
  fileType?: string
  status?: string
  department?: string
}


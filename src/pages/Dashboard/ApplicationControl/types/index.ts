// ==============================|| APPLICATION CONTROL DASHBOARD TYPES ||============================== //

export interface ApplicationControlStats {
  totalApplications: number
  newApplications: number
  blockedEvents: number
  allowedEvents: number
  warnedEvents: number
}

export interface ApplicationFootprint {
  date: string
  uniqueApps: number
  growth: number
}

export interface CategoryInventory {
  category: string
  count: number
  percentage: number
}

export interface VendorInventory {
  vendor: string
  count: number
}

export interface NewApplicationTrend {
  date: string
  newInstalls: number
}

export interface RecentApplicationInstall {
  id: string
  appName: string
  version: string
  vendor: string
  endpoint: string
  user: string
  department: string
  timestamp: string
}

export interface DepartmentApplications {
  department: string
  newInstalls: number
}

export interface ApplicationBlockEvent {
  category: string
  blocked: number
  warned?: number
}

export interface TopBlockedApplication {
  application: string
  category: string
  blockCount: number
}

export interface UserBlockEvents {
  user: string
  displayName: string
  blocked: number
  warned: number
}

export interface EndpointBlockEvents {
  endpoint: string
  hostname: string
  blocked: number
}

export interface ApplicationControlDashboardData {
  stats: ApplicationControlStats
  applicationFootprint: ApplicationFootprint[]
  categoryInventory: CategoryInventory[]
  vendorInventory: VendorInventory[]
  newApplicationTrend: NewApplicationTrend[]
  recentInstalls: RecentApplicationInstall[]
  departmentApplications: DepartmentApplications[]
  blockEventsByCategory: ApplicationBlockEvent[]
  topBlockedApps: TopBlockedApplication[]
  userBlockEvents: UserBlockEvents[]
  endpointBlockEvents: EndpointBlockEvents[]
}

export interface ApplicationControlFilters {
  startDate?: string
  endDate?: string
  category?: string
  vendor?: string
  department?: string
}


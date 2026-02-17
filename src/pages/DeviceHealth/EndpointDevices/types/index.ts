export interface EndpointDevice {
    id: string
    slNo: number
    hostname: string
    ipAddress: string
    systemStatus: 'Online' | 'Offline' | 'Disconnected' | 'Uninstalled'
    agentInstalled: boolean
    lastSeenTime: string
    agentVersion: string
    os: string
    osDetails: string
    domain: string
    loggedInUser: string
    loggedInTime: string
    machineSerialNumber: string
    license: 'Enabled' | 'Disabled' | 'Expired'
    rebootNeeded: 'Yes' | 'No' | 'Optional'
};

export interface EndpointDeviceFilters {
    hostname?: string
    ipAddress?: string
    systemStatus?: string
    agentVersion?: string
    os?: string
    domain?: string
    loggedInUser?: string
    license?: string
};

export interface EndpointDeviceStats {
    totalDevices: number
    onlineDevices: number
    offlineDevices: number

    softwareUpgrade: number
    softwareUninstall: number
    resetDefault: number
    agentUninstalled: number
    agentCorrupted: number
    unlicensedSystems: number
};

export interface EndpointDeviceListParams {
    page: number
    limit: number
    sortBy?: string
    sortDirection?: 'asc' | 'desc'
    filters?: EndpointDeviceFilters
    startDate?: string
    endDate?: string
};

export interface EndpointDeviceListResponse {
    data: EndpointDevice[]
    total: number
    page: number
    limit: number
    stats: EndpointDeviceStats
};

// System Details for detail panel
export interface SystemDetails {
    hostname: string
    ipAddress: string
    systemStatus: string
    os: string
    loggedInUser: string
    freeDiskSpace: string
    cpu: string
    ram: string
    serialNumber: string
    macAddress: string
};

// Agent Details for detail panel
export interface AgentDetails {
    agentInstallationDate: string
    agentVersion: string
    lastSeenTime: string
    license: string
    usbModuleStatus: 'Healthy' | 'Warning' | 'Error'
    appControlStatus: 'Healthy' | 'Warning' | 'Error'
    networkModuleStatus: 'Healthy' | 'Warning' | 'Error'
    downloadLatestAgentLogs: string
    policiesDeployedOnSystem: string
    lastPolicyDeployedWithTime: string
};

// Domain Details for detail panel
export interface DomainDetails {
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
};

// Installed Application
export interface InstalledApplication {
    id: string
    applicationName: string
    applicationVersion: string
    applicationType: 'Windows Application' | 'Windows Store' | 'System' | 'Custom'
};

// Combined detail panel data
export interface EndpointDeviceDetail {
    systemDetails: SystemDetails
    agentDetails: AgentDetails
    domainDetails: DomainDetails
    installedApplications: InstalledApplication[]
};

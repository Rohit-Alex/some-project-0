import type { EndpointDevice, EndpointDeviceListResponse, EndpointDeviceStats, EndpointDeviceDetail, InstalledApplication } from '../types';

const generateMockDevices = (count: number): EndpointDevice[] => {
	const hostnames = ['vikram', 'vikram1', 'desktop-01', 'laptop-02', 'server-03'];
	const statuses: EndpointDevice['systemStatus'][] = ['Online', 'Offline', 'Disconnected', 'Uninstalled'];
	const licenses: EndpointDevice['license'][] = ['Enabled', 'Disabled', 'Expired'];
	const rebootOptions: EndpointDevice['rebootNeeded'][] = ['Yes', 'No', 'Optional'];

	return Array.from({ length: count }, (_, i) => {
		return {
			id: `device-${i + 1}`,
			slNo: i + 1,
			hostname: hostnames[i % hostnames.length],
			ipAddress: `192.168.1.${(i % 10) + 1}`,
			systemStatus: statuses[i % statuses.length],
			agentInstalled: statuses[i % statuses.length] !== 'Uninstalled',
			lastSeenTime: new Date(Date.now() - i * 3600000).toLocaleString('en-US', {
				month: '2-digit',
				day: '2-digit',
				year: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
				hour12: true,
			}),
			agentVersion: '1',
			os: 'Windows 11',
			osDetails: 'xyz.com',
			domain: 'xyz.com',
			loggedInUser: `xyz.com\\vikram`,
			loggedInTime: new Date(Date.now() - i * 3600000 * 2).toLocaleString('en-US', {
				month: '2-digit',
				day: '2-digit',
				year: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
				hour12: true,
			}),
			machineSerialNumber: `PG03SW2${i.toString().padStart(2, '0')}`,
			license: licenses[i % licenses.length],
			rebootNeeded: rebootOptions[i % rebootOptions.length],
		}
	});
};

const ALL_MOCK_DEVICES = generateMockDevices(150)

const normalizeFilterValues = (value: string | string[] | undefined): string[] => {
	if (!value) return []
	return (Array.isArray(value) ? value : value.split(',')).map((item) => item.trim().toLowerCase()).filter(Boolean)
}

const matchesFilter = (fieldValue: unknown, filterValue: string | string[] | undefined): boolean => {
	const values = normalizeFilterValues(filterValue)
	if (!values.length) return true
	const candidate = String(fieldValue ?? '').toLowerCase()
	return values.some((value) => candidate.includes(value))
}

const compareValues = (a: unknown, b: unknown): number => {
	const firstDate = Date.parse(String(a))
	const secondDate = Date.parse(String(b))
	if (!Number.isNaN(firstDate) && !Number.isNaN(secondDate)) {
		return firstDate - secondDate
	}
	if (typeof a === 'number' && typeof b === 'number') {
		return a - b
	}
	return String(a ?? '').localeCompare(String(b ?? ''), undefined, { numeric: true, sensitivity: 'base' })
}

export const getMockStats = (): EndpointDeviceStats => ({
	totalDevices: ALL_MOCK_DEVICES.length,
	onlineDevices: ALL_MOCK_DEVICES.filter((d) => d.systemStatus === 'Online').length,
	offlineDevices: ALL_MOCK_DEVICES.filter((d) => d.systemStatus === 'Offline').length,
	warningDevices: ALL_MOCK_DEVICES.filter((d) => d.license !== 'Enabled' || d.rebootNeeded !== 'No' || d.systemStatus === 'Disconnected').length,

	softwareUpgrade: ALL_MOCK_DEVICES.filter(d => d.agentVersion < '3.0.0').length,
	softwareUninstall: ALL_MOCK_DEVICES.filter(d => d.license === 'Expired').length,
	resetDefault: ALL_MOCK_DEVICES.filter(d => d.systemStatus === 'Disconnected').length,
	agentUninstalled: ALL_MOCK_DEVICES.filter(d => !d.agentVersion).length,
	agentCorrupted: ALL_MOCK_DEVICES.filter(d => d.agentVersion === '0.0.0').length,
	unlicensedSystems: ALL_MOCK_DEVICES.filter(d => d.license !== 'Enabled').length,
});

export const getMockEndpointDevices = ( page: number, limit: number, sortBy?: string, sortDirection?: 'asc' | 'desc', filters?: Record<string, string | string[]>): EndpointDeviceListResponse => {
	const filteredData = ALL_MOCK_DEVICES.filter((device) =>
		Object.entries(filters ?? {}).every(([key, value]) => matchesFilter(device[key as keyof EndpointDevice], value))
	)
	const sortedData = sortBy
		? [...filteredData].sort((a, b) => {
			const direction = sortDirection === 'desc' ? -1 : 1
			return compareValues(a[sortBy as keyof EndpointDevice], b[sortBy as keyof EndpointDevice]) * direction
		})
		: filteredData
	const start = page * limit;
	const end = start + limit;
	const paginatedData = sortedData.slice(start, end);

	return {
		data: paginatedData,
		total: filteredData.length,
		page,
		limit,
		stats: getMockStats(),
	}
};

const generateMockInstalledApps = (): InstalledApplication[] => [
	{ id: '1', applicationName: 'Zoom.exe', applicationVersion: '6.1.12.46889', applicationType: 'Windows Application' },
	{ id: '2', applicationName: 'WhatsApp.exe', applicationVersion: '', applicationType: 'Windows Store' },
	{ id: '3', applicationName: 'Chrome.exe', applicationVersion: '121.0.6167.140', applicationType: 'Windows Application' },
	{ id: '4', applicationName: 'VSCode.exe', applicationVersion: '1.87.0', applicationType: 'Windows Application' },
	{ id: '5', applicationName: 'Slack.exe', applicationVersion: '4.36.140', applicationType: 'Windows Store' },
];

export const getMockDeviceDetail = (device: EndpointDevice): EndpointDeviceDetail => ({
	systemDetails: {
		hostname: device.hostname,
		ipAddress: device.ipAddress,
		systemStatus: device.systemStatus,
		os: device.os,
		loggedInUser: device.loggedInUser,
		freeDiskSpace: '100 GB',
		cpu: '11th Gen Intel(R) Core (TM) i3-1115G4 @ 3.00 GHz',
		ram: '8 GB',
		serialNumber: device.machineSerialNumber,
		macAddress: '8A:A4:C2:7A:06:CB',
	},
	agentDetails: {
		agentInstallationDate: device.lastSeenTime,
		agentVersion: device.agentVersion,
		lastSeenTime: device.lastSeenTime,
		license: device.license,
		usbModuleStatus: device.license === 'Enabled' ? 'Warning' : 'Error',
		appControlStatus: device.rebootNeeded === 'No' ? 'Warning' : 'Error',
		networkModuleStatus: device.systemStatus === 'Online' ? 'Warning' : 'Error',
		downloadLatestAgentLogs: 'Link/Icon',
		policiesDeployedOnSystem: 'USB Monitoring, Nw, keyword',
		lastPolicyDeployedWithTime: device.lastSeenTime,
	},
	domainDetails: {
		domainName: 'xyz.com',
		upnLogonName: device.loggedInUser.split('\\')[1] || 'Vikram',
		adOU: 'Sales',
		adGroups: 'Sales_team, Marketing_insights',
		userTitle: 'Sales Executive',
		emailId: 'vikram@gmail.com',
		department: 'Sales',
		managerName: 'Sunil',
		managerEmailId: 'Sunil@gmail.com',
		managerTitle: 'CSO',
	},
  	installedApplications: generateMockInstalledApps(),
});

export const exportMockData = (): EndpointDevice[] => {
  	return ALL_MOCK_DEVICES
};

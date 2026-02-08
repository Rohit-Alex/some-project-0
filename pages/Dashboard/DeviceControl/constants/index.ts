// ==============================|| DEVICE CONTROL CONSTANTS ||============================== //

export const DEVICE_TYPES = [
  'USB Storage Device',
  'Smart Phone',
  'CD/DVD',
  'Windows Portable Device',
  'Local Printers',
  'Bluetooth',
  'iPhone / iPad / iPod',
  'Network Share',
  'Android Smartphone',
  'Network Printers',
] as const

export const EVENT_STATUSES = [
  'allowed',
  'blocked',
  'read-only',
  'alerted',
  'override',
] as const

export const DEPARTMENTS = [
  'Finance',
  'HR',
  'R&D',
  'Sales',
  'IT',
  'Marketing',
  'Operations',
] as const

export const WIDGET_IDS = {
  RECENT_CONNECTIONS: 'recent-device-connections',
  TOTAL_EVENTS: 'total-device-events',
  BLOCKED_BY_TYPE: 'blocked-by-device-type',
  ALLOWED_BY_TYPE: 'allowed-by-device-type',
  TOP_USERS: 'top-users',
  TOP_ENDPOINTS: 'top-endpoints',
  VENDOR_BREAKDOWN: 'vendor-breakdown',
  POLICY_EVENTS: 'policy-events',
  DEPT_BLOCKED: 'department-blocked',
  ALERT_VOLUME: 'alert-volume',
  EVENT_TREND: 'event-trend',
  SUSPICIOUS_DEVICES: 'suspicious-devices',
} as const

export const CHART_COLORS = {
  allowed: '#4caf50',
  blocked: '#f44336',
  readOnly: '#ff9800',
  alerted: '#2196f3',
  override: '#9c27b0',
  audit: '#42a5f5',
  enforce: '#ef5350',
}

export const RISK_COLORS = {
  high: '#f44336',
  medium: '#ff9800',
  low: '#ffc107',
}

// Status color mapping
export const STATUS_COLORS = {
  connect: 'success',
  disconnect: 'warning',
  blocked: 'error',
  allowed: 'success',
  'read-only': 'info',
  alerted: 'warning',
  override: 'secondary',
} as const


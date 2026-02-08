// ==============================|| DATA TRANSFER CONSTANTS ||============================== //

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

export const FILE_TYPES = [
  'Documents (.doc, .docx, .pdf)',
  'Archives (.zip, .rar)',
  'Executables (.exe, .msi)',
  'Media (.mp4, .jpg)',
  'Spreadsheets (.xls, .xlsx)',
  'Source Code',
] as const

export const TRANSFER_STATUSES = [
  'allowed',
  'blocked',
  'warned',
  'logged',
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
  RECENT_TRANSFERS: 'recent-file-transfers',
  TOTAL_EVENTS: 'total-transfer-events',
  BLOCKED_BY_TYPE: 'blocked-by-device-type',
  ALLOWED_LOGGED: 'allowed-logged-transfers',
  TOP_USERS: 'top-users',
  TOP_ENDPOINTS: 'top-endpoints',
  FILE_TYPE_BREAKDOWN: 'file-type-breakdown',
  POLICY_EVENTS: 'policy-events',
  DEPT_BLOCKED: 'department-blocked',
  ALERT_VOLUME: 'alert-volume',
  TRANSFER_TREND: 'transfer-trend',
  SUSPICIOUS_TRANSFERS: 'suspicious-transfers',
} as const

export const CHART_COLORS = {
  allowed: '#4caf50',
  blocked: '#f44336',
  logged: '#2196f3',
  warned: '#ff9800',
  audit: '#42a5f5',
  enforce: '#ef5350',
}

export const RISK_COLORS = {
  high: '#f44336',
  medium: '#ff9800',
  low: '#ffc107',
}

export const STATUS_COLORS = {
  allowed: 'success',
  blocked: 'error',
  warned: 'warning',
  logged: 'info',
} as const


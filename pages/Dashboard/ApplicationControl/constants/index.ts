// ==============================|| APPLICATION CONTROL DASHBOARD CONSTANTS ||============================== //

export const APPLICATION_CATEGORIES = [
  'Productivity',
  'Browsers',
  'Development Tools',
  'Media',
  'File Sharing',
  'Remote Access',
  'Gaming',
  'Unknown / Custom',
] as const

export const TOP_VENDORS = [
  'Microsoft',
  'Google',
  'Adobe',
  'Zoom',
  'TeamViewer',
  'Apple',
  'Mozilla',
  'Unknown Vendors',
] as const

export const WIDGET_IDS = {
  APPLICATION_FOOTPRINT: 'application-footprint',
  CATEGORY_INVENTORY: 'category-inventory',
  VENDOR_INVENTORY: 'vendor-inventory',
  NEW_APP_TREND: 'new-app-trend',
  RECENT_INSTALLS: 'recent-installs',
  DEPT_APPLICATIONS: 'department-applications',
  BLOCK_EVENTS_TOTAL: 'block-events-total',
  TOP_BLOCKED_APPS: 'top-blocked-apps',
  BLOCK_BY_CATEGORY: 'block-by-category',
  USER_BLOCK_EVENTS: 'user-block-events',
  ENDPOINT_BLOCK_EVENTS: 'endpoint-block-events',
} as const

export const CHART_COLORS = {
  productivity: '#4caf50',
  browsers: '#2196f3',
  devTools: '#9c27b0',
  media: '#ff9800',
  fileSharing: '#00bcd4',
  remoteAccess: '#f44336',
  gaming: '#e91e63',
  unknown: '#607d8b',
  blocked: '#f44336',
  warned: '#ff9800',
  allowed: '#4caf50',
}

export const STATUS_COLORS = {
  install: 'success',
  update: 'info',
  uninstall: 'warning',
} as const


// Icon identifiers - resolved to actual components in DrawerContent
export type IconName =
    | 'dashboard'
    | 'devices'
    | 'swap'
    | 'apps'
    | 'monitor-heart'
    | 'computer'
    | 'event-note'
    | 'usb'
    | 'sync'
    | 'category'
    | 'policy'
    | 'security'
    | 'tune'
    | 'rule'
    | 'playlist-check'
    | 'widgets'
    | 'list-alt'
    | 'settings-apps'
    | 'class'
    | 'settings'
    | 'people'
    | 'person-add'
    | 'edit'
    | 'login'
    | 'admin'
    | 'notifications'
    | 'folder'
    | 'add-circle'
    | 'dns'
    | 'search'
    | 'email'
    | 'mail-add'
    | 'key'
    | 'mail-settings'
    | 'file-copy'
    | 'mail-outline'

export interface NavItem {
    id: string
    title: string
    icon?: IconName
    children?: NavItem[]
}

// Navigation items without paths - paths are generated from hierarchy
export const NAV_ITEMS: NavItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        icon: 'dashboard',
        children: [
            {
                id: 'device-control',
                title: 'Device Control',
                icon: 'devices',
            },
            {
                id: 'data-transfer',
                title: 'Data Transfer',
                icon: 'swap',
            },
            {
                id: 'application-control',
                title: 'Application Control',
                icon: 'apps',
            },
        ],
    },
    {
        id: 'device-health',
        title: 'Device Health',
        icon: 'monitor-heart',
        children: [
            {
                id: 'endpoint-devices',
                title: 'Endpoint Devices',
                icon: 'computer',
            },
        ],
    },
    {
        id: 'events',
        title: 'Events',
        icon: 'event-note',
        children: [
            {
                id: 'device-control',
                title: 'Device Control Events',
                icon: 'usb',
            },
            {
                id: 'data-transfer',
                title: 'Data Transfer Events',
                icon: 'sync',
            },
            {
                id: 'application-control',
                title: 'Application Control Events',
                icon: 'apps',
            },
            {
                id: 'data-classification',
                title: 'File Classification Events',
                icon: 'category',
            },
        ],
    },
    {
        id: 'policy-management',
        title: 'Policy Management',
        icon: 'policy',
        children: [
            {
                id: 'device-control-policy',
                title: 'Device Control Policy',
                icon: 'security',
                children: [
                    {
                        id: 'default-policy',
                        title: 'Default Policy',
                        icon: 'tune',
                    },
                    {
                        id: 'device-policy',
                        title: 'Device Policy',
                        icon: 'rule',
                    },
                    {
                        id: 'manage-device-policies',
                        title: 'Manage Device Policies',
                        icon: 'playlist-check',
                    },
                ],
            },
            {
                id: 'application-control-policy',
                title: 'Application Control Policy',
                icon: 'apps',
                children: [
                    {
                        id: 'application-categories',
                        title: 'Application Categories',
                        icon: 'category',
                    },
                    {
                        id: 'application-inventory',
                        title: 'Application Inventory',
                        icon: 'list-alt',
                    },
                    {
                        id: 'manage-application-policies',
                        title: 'Manage Application Policies',
                        icon: 'settings-apps',
                    },
                ],
            },
            {
                id: 'data-classification-policy',
                title: 'Data Classification Policies',
                icon: 'class',
                children: [
                    {
                        id: 'file-classification-policy',
                        title: 'File Classification Policy',
                        icon: 'file-copy',
                    },
                    {
                        id: 'email-classification-policy',
                        title: 'Email Classification Policy',
                        icon: 'mail-outline',
                    },
                ],
            },
        ],
    },
    {
        id: 'incident-management',
        title: 'Incident Management Configuration',
        icon: 'settings',
        children: [
            {
                id: 'console-users',
                title: 'Console Users',
                icon: 'people',
                children: [
                    {
                        id: 'add-new-users',
                        title: 'Add New Users',
                        icon: 'person-add',
                    },
                    {
                        id: 'modify-existing-users',
                        title: 'Modify Existing Users',
                        icon: 'edit',
                    },
                    {
                        id: 'local-user-login-settings',
                        title: 'Local User Login Settings',
                        icon: 'login',
                    },
                    {
                        id: 'console-admin-settings',
                        title: 'Console Admin Settings',
                        icon: 'admin',
                    },
                    {
                        id: 'notification-message',
                        title: 'Notification Message',
                        icon: 'notifications',
                    },
                ],
            },
            {
                id: 'directory-integration',
                title: 'Directory Integration',
                icon: 'folder',
                children: [
                    {
                        id: 'add-new-directory',
                        title: 'Add New Directory',
                        icon: 'add-circle',
                    },
                    {
                        id: 'manage-directory-servers',
                        title: 'Manage Directory Servers',
                        icon: 'dns',
                    },
                    {
                        id: 'search-user-attributes',
                        title: 'Search User Attributes',
                        icon: 'search',
                    },
                ],
            },
            {
                id: 'smtp-integration',
                title: 'SMTP Integration',
                icon: 'email',
                children: [
                    {
                        id: 'add-smtp-server',
                        title: 'Add SMTP Server',
                        icon: 'mail-add',
                    },
                    {
                        id: 'oauth-configuration',
                        title: 'OAuth Configuration',
                        icon: 'key',
                    },
                    {
                        id: 'manage-smtp-servers',
                        title: 'Manage SMTP Servers',
                        icon: 'mail-settings',
                    },
                ],
            },
        ],
    },
]

// Helper to generate path from nav item hierarchy
export const buildPath = (parentPath: string, id: string): string => {
    return `${parentPath}/${id}`
}

// Flatten nav items with full paths for route generation
export interface FlatNavItem {
    id: string
    title: string
    path: string
    icon?: IconName
    hasChildren: boolean
}

export const flattenNavItems = (items: NavItem[], parentPath = ''): FlatNavItem[] => {
    const result: FlatNavItem[] = []

    items.forEach((item) => {
        const path = buildPath(parentPath, item.id)
        const hasChildren = !!item.children?.length

        // Only add leaf nodes (items without children) as navigable routes
        if (!hasChildren) {
            result.push({
                id: item.id,
                title: item.title,
                path,
                icon: item.icon,
                hasChildren: false,
            })
        }

        if (item.children) {
            result.push(...flattenNavItems(item.children, path))
        }
    })

    return result
}

// Get all navigable routes
export const NAVIGABLE_ROUTES = flattenNavItems(NAV_ITEMS)

// Check if a path is active or a parent of active path
export const isPathActive = (itemPath: string, currentPath: string): boolean => {
    return currentPath === itemPath || currentPath.startsWith(itemPath + '/')
}

// Get all parent paths for a given path (for auto-expanding)
export const getParentPaths = (path: string): string[] => {
    const segments = path.split('/').filter(Boolean)
    const parents: string[] = []
    let currentPath = ''

    for (let i = 0; i < segments.length - 1; i++) {
        currentPath += '/' + segments[i]
        parents.push(currentPath)
    }

    return parents
}

// ============================================================================
// ROUTE CONSTANTS - Generated from navigation structure
// ============================================================================

// Build route constants from NAVIGABLE_ROUTES for type-safe access
const buildRouteKey = (path: string): string => {
    return path
        .slice(1) // Remove leading slash
        .replace(/-/g, '_')
        .replace(/\//g, '_')
        .toUpperCase()
}

// Static route constants for commonly used routes
export const ROUTES = {
    // Public
    ROOT: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    CHECK_EMAIL: '/check-mail',
    LOGOUT: '/logout',

    // Protected - Main
    PROFILE: '/profile/view',
    PROFILE_EDIT: '/profile/edit',
    SETTINGS: '/settings',

    // Dashboard Modules
    DASHBOARD_DEVICE_CONTROL: '/dashboard/device-control',
    DASHBOARD_DATA_TRANSFER: '/dashboard/data-transfer',
    DASHBOARD_APPLICATION_CONTROL: '/dashboard/application-control',

    // Device Health
    DEVICE_HEALTH_ENDPOINTS: '/device-health/endpoint-devices',

    // Events
    EVENTS_DEVICE_CONTROL: '/events/device-control',
    EVENTS_DATA_TRANSFER: '/events/data-transfer',
    EVENTS_APPLICATION_CONTROL: '/events/application-control',
    EVENTS_DATA_CLASSIFICATION: '/events/data-classification',

    // Policy Management - Device Control
    POLICY_DEVICE_CONTROL_DEFAULT: '/policy-management/device-control-policy/default-policy',
    POLICY_DEVICE_CONTROL_DEVICE: '/policy-management/device-control-policy/device-policy',
    POLICY_DEVICE_CONTROL_MANAGE: '/policy-management/device-control-policy/manage-device-policies',

    // Policy Management - Application Control
    POLICY_APP_CONTROL_CATEGORIES: '/policy-management/application-control-policy/application-categories',
    POLICY_APP_CONTROL_INVENTORY: '/policy-management/application-control-policy/application-inventory',
    POLICY_APP_CONTROL_MANAGE: '/policy-management/application-control-policy/manage-application-policies',

    // Policy Management - Data Classification
    POLICY_DATA_CLASSIFICATION_FILE: '/policy-management/data-classification-policy/file-classification-policy',
    POLICY_DATA_CLASSIFICATION_EMAIL: '/policy-management/data-classification-policy/email-classification-policy',

    // Incident Management - Console Users
    INCIDENT_CONSOLE_ADD_USER: '/incident-management/console-users/add-new-users',
    INCIDENT_CONSOLE_MODIFY_USER: '/incident-management/console-users/modify-existing-users',
    INCIDENT_CONSOLE_LOGIN_SETTINGS: '/incident-management/console-users/local-user-login-settings',
    INCIDENT_CONSOLE_ADMIN_SETTINGS: '/incident-management/console-users/console-admin-settings',
    INCIDENT_CONSOLE_NOTIFICATION: '/incident-management/console-users/notification-message',

    // Incident Management - Directory Integration
    INCIDENT_DIR_ADD: '/incident-management/directory-integration/add-new-directory',
    INCIDENT_DIR_MANAGE: '/incident-management/directory-integration/manage-directory-servers',
    INCIDENT_DIR_SEARCH: '/incident-management/directory-integration/search-user-attributes',

    // Incident Management - SMTP Integration
    INCIDENT_SMTP_ADD: '/incident-management/smtp-integration/add-smtp-server',
    INCIDENT_SMTP_OAUTH: '/incident-management/smtp-integration/oauth-configuration',
    INCIDENT_SMTP_MANAGE: '/incident-management/smtp-integration/manage-smtp-servers',

    // Catch all
    NOT_FOUND: '*',
} as const

export type RouteKey = keyof typeof ROUTES
export type RoutePath = (typeof ROUTES)[RouteKey]

// Helper to get route by path
export const getRouteByPath = (path: string): FlatNavItem | undefined => {
    return NAVIGABLE_ROUTES.find((r) => r.path === path)
}

// Expose buildRouteKey for dynamic usage
export { buildRouteKey }

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

export interface NavItem {
    id: string
    title: string
    icon?: IconName
    children?: NavItem[]
};

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
                title: 'Device Control',
                icon: 'usb',
            },
            {
                id: 'data-transfer',
                title: 'Data Transfer',
                icon: 'sync',
            },
            {
                id: 'application-control',
                title: 'Application Control',
                icon: 'apps',
            },
            {
                id: 'data-classification',
                title: 'Data Classification',
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
                        id: 'application-groups',
                        title: 'Application Groups',
                        icon: 'widgets',
                    },
                    {
                        id: 'application-control-policies',
                        title: 'Application Control Policies',
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
                title: 'Data Classification Policy',
                icon: 'class',
            },
        ],
    },
];

// Helper to generate path from nav item hierarchy
export const buildPath = (parentPath: string, id: string): string => {
    return `${parentPath}/${id}`;
};

// Flatten nav items with full paths for route generation
export interface FlatNavItem {
    id: string
    title: string
    path: string
    icon?: IconName
    hasChildren: boolean
};

export const flattenNavItems = (items: NavItem[], parentPath = ''): FlatNavItem[] => {
    const result: FlatNavItem[] = [];

    items.forEach((item) => {
        const path = buildPath(parentPath, item.id);
        const hasChildren = !!item.children?.length;

        // Only add leaf nodes (items without children) as navigable routes
        if (!hasChildren) {
            result.push({
                id: item.id,
                title: item.title,
                path,
                icon: item.icon,
                hasChildren: false,
            })
        };

        if (item.children) {
            result.push(...flattenNavItems(item.children, path));
        }
    })

    return result;
};

// Get all navigable routes
export const NAVIGABLE_ROUTES = flattenNavItems(NAV_ITEMS);

// Check if a path is active or a parent of active path
export const isPathActive = (itemPath: string, currentPath: string): boolean => {
    return currentPath === itemPath || currentPath.startsWith(itemPath + '/');
};

// Get all parent paths for a given path (for auto-expanding)
export const getParentPaths = (path: string): string[] => {
    const segments = path.split('/').filter(Boolean);
    const parents: string[] = [];
    let currentPath = '';

    for (let i = 0; i < segments.length - 1; i++) {
        currentPath += '/' + segments[i];
        parents.push(currentPath);
    }

    return parents
};

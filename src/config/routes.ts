// Route constants - single source of truth
export const ROUTES = {
    // Public
    ROOT: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    CHECK_EMAIL: '/check-mail',
    LOGOUT: '/logout',

    // Protected - Dashboard
    DASHBOARD: '/dashboard',
    PROFILE: '/profile/view',
    PROFILE_EDIT: '/profile/edit',
    SETTINGS: '/settings',

    // Protected - Events
    EVENTS_APPLICATION_CONTROL: '/events/application-control',
    EVENTS_DEVICE_CONTROL: '/events/device-control',
    EVENTS_DATA_TRANSFER: '/events/data-transfer',
    EVENTS_DATA_CLASSIFICATION: '/events/data-classification',

    // Protected - Device Health
    DEVICE_HEALTH_ENDPOINTS: '/device-health/endpoint-devices',

    // Protected - Policy Management
    POLICY_DEVICE_CONTROL_DEFAULT: '/policy-management/device-control-policy/default-policy',
    POLICY_DEVICE_CONTROL_DEVICE: '/policy-management/device-control-policy/device-policy',
    POLICY_DEVICE_CONTROL_MANAGE: '/policy-management/device-control-policy/manage-device-policies',
    POLICY_APP_CONTROL_GROUPS: '/policy-management/application-control-policy/application-groups',
    POLICY_APP_CONTROL_POLICIES: '/policy-management/application-control-policy/application-control-policies',
    POLICY_APP_CONTROL_MANAGE: '/policy-management/application-control-policy/manage-application-policies',
    POLICY_DATA_CLASSIFICATION: '/policy-management/data-classification-policy',

    // Catch all
    NOT_FOUND: '*',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];

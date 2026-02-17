import type { Column } from '@components/Table/types';
import type { EndpointDevice, InstalledApplication } from '../types';

export const ENDPOINT_DEVICE_COLUMNS: Column<EndpointDevice>[] = [
    {
        id: 'slNo',
        label: 'SI No',
        accessor: 'slNo',
        minWidth: 70,
        sticky: 'left',
        filter: { type: 'text', placeholder: 'Filter Search' },
    },
    {
        id: 'hostname',
        label: 'Hostname',
        accessor: 'hostname',
        minWidth: 120,
        filter: { type: 'text', placeholder: 'Filter Search' },
    },
    {
        id: 'ipAddress',
        label: 'IP Address',
        accessor: 'ipAddress',
        minWidth: 130,
        filter: { type: 'text', placeholder: 'Filter Search' },
    },
    {
        id: 'systemStatus',
        label: 'System Status',
        accessor: 'systemStatus',
        minWidth: 120,
        filter: {
            type: 'select',
            placeholder: 'All',
            options: [
                { value: 'Online', label: 'Online' },
                { value: 'Offline', label: 'Offline' },
                { value: 'Disconnected', label: 'Disconnected' },
            ],
        },
    },
    {
        id: 'lastSeenTime',
        label: 'Last Seen Time',
        accessor: 'lastSeenTime',
        minWidth: 180,
        filter: { type: 'date' },
    },
    {
        id: 'agentVersion',
        label: 'Agent Version',
        accessor: 'agentVersion',
        minWidth: 120,
        filter: { type: 'text', placeholder: 'Filter Search' },
    },
    {
        id: 'osDetails',
        label: 'OS Details',
        accessor: 'osDetails',
        minWidth: 130,
        filter: { type: 'text', placeholder: 'Filter Search' },
    },
    {
        id: 'domain',
        label: 'Domain',
        accessor: 'domain',
        minWidth: 100,
        filter: { type: 'text', placeholder: 'Filter Search' },
    },
    {
        id: 'loggedInUser',
        label: 'Logged in User',
        accessor: 'loggedInUser',
        minWidth: 140,
        filter: { type: 'text', placeholder: 'Filter Search' },
        clickable: true,
    },
    {
        id: 'loggedInTime',
        label: 'Logged in Time',
        accessor: 'loggedInTime',
        minWidth: 160,
        filter: { type: 'date' },
    },
    {
        id: 'machineSerialNumber',
        label: 'Machine Serial Number',
        accessor: 'machineSerialNumber',
        minWidth: 170,
        filter: { type: 'text', placeholder: 'Filter Search' },
    },
    {
        id: 'license',
        label: 'License',
        accessor: 'license',
        minWidth: 100,
        filter: {
            type: 'select',
            placeholder: 'All',
            options: [
                { value: 'Enabled', label: 'Enabled' },
                { value: 'Disabled', label: 'Disabled' },
                { value: 'Expired', label: 'Expired' },
            ],
        },
    },
    {
        id: 'rebootNeeded',
        label: 'Reboot Needed',
        accessor: 'rebootNeeded',
        minWidth: 130,
        sticky: 'right',
        filter: {
            type: 'select',
            placeholder: 'All',
            options: [
                { value: 'Yes', label: 'Yes' },
                { value: 'No', label: 'No' },
                { value: 'Optional', label: 'Optional' },
            ],
        },
    },
];

export const ROWS_PER_PAGE_OPTIONS = [10, 25, 50, 100];

export const INSTALLED_APP_COLUMNS: Column<InstalledApplication>[] = [
    {
        id: 'applicationName',
        label: 'Application Name',
        accessor: 'applicationName',
        minWidth: 200,
    },
    {
        id: 'applicationVersion',
        label: 'Application Version',
        accessor: 'applicationVersion',
        minWidth: 150,
    },
    {
        id: 'applicationType',
        label: 'Application Type',
        accessor: 'applicationType',
        minWidth: 150,
    },
];


import type { Column } from '@components/Table/types'
import type { DataTransferEvent, UserDetail } from '../types'

export const DATA_TRANSFER_COLUMNS: Column<DataTransferEvent>[] = [
  {
    id: 'eventId',
    label: 'Event ID',
    accessor: 'eventId',
    minWidth: 100,
    sticky: 'left',
    filter: { type: 'text', placeholder: 'Search...' },
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
    id: 'loggedInUser',
    label: 'Logged in User',
    accessor: 'loggedInUser',
    minWidth: 140,
    filter: { type: 'text', placeholder: 'Filter Search' },
    clickable: true,
  },
  {
    id: 'action',
    label: 'Action',
    accessor: 'action',
    minWidth: 100,
    filter: {
      type: 'select',
      placeholder: 'All',
      options: [
        { value: 'Blocked', label: 'Blocked' },
        { value: 'Allowed', label: 'Allowed' },
        { value: 'Warned', label: 'Warned' },
      ],
    },
  },
  {
    id: 'transferType',
    label: 'Transfer Type',
    accessor: 'transferType',
    minWidth: 120,
    filter: {
      type: 'select',
      placeholder: 'All',
      options: [
        { value: 'USB', label: 'USB' },
        { value: 'Network', label: 'Network' },
        { value: 'Cloud', label: 'Cloud' },
        { value: 'Email', label: 'Email' },
      ],
    },
  },
  {
    id: 'sourceDevice',
    label: 'Source Device',
    accessor: 'sourceDevice',
    minWidth: 140,
    filter: { type: 'text', placeholder: 'Filter Search' },
  },
  {
    id: 'targetDevice',
    label: 'Target Device',
    accessor: 'targetDevice',
    minWidth: 140,
    filter: { type: 'text', placeholder: 'Filter Search' },
  },
  {
    id: 'fileName',
    label: 'File Name',
    accessor: 'fileName',
    minWidth: 150,
    filter: { type: 'text', placeholder: 'Filter Search' },
  },
  {
    id: 'fileSize',
    label: 'File Size',
    accessor: 'fileSize',
    minWidth: 100,
    filter: { type: 'text', placeholder: 'Filter Search' },
  },
  {
    id: 'protocol',
    label: 'Protocol',
    accessor: 'protocol',
    minWidth: 100,
    filter: { type: 'text', placeholder: 'Filter Search' },
  },
  {
    id: 'transferStatus',
    label: 'Transfer Status',
    accessor: 'transferStatus',
    minWidth: 130,
    filter: {
      type: 'select',
      placeholder: 'All',
      options: [
        { value: 'Success', label: 'Success' },
        { value: 'Failed', label: 'Failed' },
        { value: 'InProgress', label: 'In Progress' },
        { value: 'Cancelled', label: 'Cancelled' },
      ],
    },
  },
  {
    id: 'eventTime',
    label: 'Event Time',
    accessor: 'eventTime',
    minWidth: 180,
    filter: { type: 'date' },
  },
]

export const ROWS_PER_PAGE_OPTIONS = [10, 25, 50, 100]

export const USER_DETAIL_COLUMNS: Column<UserDetail>[] = [
  {
    id: 'domainName',
    label: 'Domain Name',
    accessor: 'domainName',
    minWidth: 120,
  },
  {
    id: 'upnLogonName',
    label: 'UPN / Logon Name',
    accessor: 'upnLogonName',
    minWidth: 140,
  },
  {
    id: 'adOU',
    label: 'AD OU',
    accessor: 'adOU',
    minWidth: 100,
  },
  {
    id: 'adGroups',
    label: 'AD Groups',
    accessor: 'adGroups',
    minWidth: 180,
  },
  {
    id: 'userTitle',
    label: 'User Title',
    accessor: 'userTitle',
    minWidth: 120,
  },
  {
    id: 'emailId',
    label: 'Email ID',
    accessor: 'emailId',
    minWidth: 180,
  },
  {
    id: 'department',
    label: 'Department',
    accessor: 'department',
    minWidth: 100,
  },
  {
    id: 'managerName',
    label: 'Manager Name',
    accessor: 'managerName',
    minWidth: 120,
  },
  {
    id: 'managerEmailId',
    label: 'Manager Email ID',
    accessor: 'managerEmailId',
    minWidth: 180,
  },
  {
    id: 'managerTitle',
    label: 'Manager Title',
    accessor: 'managerTitle',
    minWidth: 100,
  },
]

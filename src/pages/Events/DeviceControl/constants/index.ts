import type { Column } from '@components/Table/types'
import type { DeviceControlEvent } from '../types'

export const DEVICE_CONTROL_COLUMNS: Column<DeviceControlEvent>[] = [
  {
    id: 'eventId',
    label: 'Event ID',
    accessor: 'eventId',
    minWidth: 100,
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
        { value: 'Read Only', label: 'Read Only' },
      ],
    },
  },
  {
    id: 'channel',
    label: 'Channel',
    accessor: 'channel',
    minWidth: 100,
    filter: {
      type: 'select',
      placeholder: 'All',
      options: [
        { value: 'USB', label: 'USB' },
        { value: 'Bluetooth', label: 'Bluetooth' },
        { value: 'WiFi', label: 'WiFi' },
        { value: 'Ethernet', label: 'Ethernet' },
        { value: 'Thunderbolt', label: 'Thunderbolt' },
      ],
    },
  },
  {
    id: 'deviceName',
    label: 'Device Name',
    accessor: 'deviceName',
    minWidth: 150,
    filter: { type: 'text', placeholder: 'Filter Search' },
  },
  {
    id: 'deviceSerialNumber',
    label: 'Device Serial Number',
    accessor: 'deviceSerialNumber',
    minWidth: 160,
    filter: { type: 'text', placeholder: 'Filter Search' },
  },
  {
    id: 'deviceVendorId',
    label: 'Device Vendor Id',
    accessor: 'deviceVendorId',
    minWidth: 150,
    filter: { type: 'text', placeholder: 'Filter Search' },
  },
  {
    id: 'mount',
    label: 'Mount',
    accessor: 'mount',
    minWidth: 80,
    filter: { type: 'text', placeholder: 'Filter Search' },
  },
  {
    id: 'domainName',
    label: 'Domain Name',
    accessor: 'domainName',
    minWidth: 120,
    filter: { type: 'text', placeholder: 'Filter Search' },
  },
  {
    id: 'eventTime',
    label: 'Event Time',
    accessor: 'eventTime',
    minWidth: 180,
    sticky: 'right',
    filter: { type: 'date' },
  },
]

export const ROWS_PER_PAGE_OPTIONS = [10, 25, 50, 100]

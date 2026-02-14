import type { Column } from '@components/Table/types'
import type { ApplicationControlEvent } from '../types'

export const APPLICATION_CONTROL_COLUMNS: Column<ApplicationControlEvent>[] = [
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
        { value: 'Online', label: 'Online' },
      ],
    },
  },
  {
    id: 'channel',
    label: 'Channel',
    accessor: 'channel',
    minWidth: 150,
    filter: {
      type: 'select',
      placeholder: 'All',
      options: [
        { value: 'Application Control', label: 'Application Control' },
        { value: 'USB', label: 'USB' },
        { value: 'Network', label: 'Network' },
      ],
    },
  },
  {
    id: 'applicationName',
    label: 'Application Name',
    accessor: 'applicationName',
    minWidth: 150,
    filter: { type: 'text', placeholder: 'Filter Search' },
  },
  {
    id: 'companyName',
    label: 'Company Name',
    accessor: 'companyName',
    minWidth: 130,
    filter: { type: 'text', placeholder: 'Filter Search' },
  },
  {
    id: 'filename',
    label: 'Filename',
    accessor: 'filename',
    minWidth: 140,
    filter: { type: 'text', placeholder: 'Filter Search' },
  },
  {
    id: 'fileType',
    label: 'File Type',
    accessor: 'fileType',
    minWidth: 120,
    filter: {
      type: 'select',
      placeholder: 'All',
      options: [
        { value: 'Executable', label: 'Executable' },
        { value: 'DLL', label: 'DLL' },
        { value: 'Script', label: 'Script' },
        { value: 'Installer', label: 'Installer' },
        { value: 'Document', label: 'Document' },
      ],
    },
  },
  {
    id: 'fileVersion',
    label: 'File Version',
    accessor: 'fileVersion',
    minWidth: 110,
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

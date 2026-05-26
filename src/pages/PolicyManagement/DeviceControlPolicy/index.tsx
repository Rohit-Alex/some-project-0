import { useEffect, useState, type ChangeEvent, type ReactNode } from 'react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import Switch from '@mui/material/Switch'
import AddCircleOutlineOutlined from '@mui/icons-material/AddCircleOutlineOutlined'
import EditOutlined from '@mui/icons-material/EditOutlined'
import DeleteOutlineOutlined from '@mui/icons-material/DeleteOutlineOutlined'
import FileDownloadOutlined from '@mui/icons-material/FileDownloadOutlined'
import FileUploadOutlined from '@mui/icons-material/FileUploadOutlined'
import SaveOutlined from '@mui/icons-material/SaveOutlined'
import RestartAltOutlined from '@mui/icons-material/RestartAltOutlined'
import SearchOutlined from '@mui/icons-material/SearchOutlined'
import SecurityOutlined from '@mui/icons-material/SecurityOutlined'
import DevicesOutlined from '@mui/icons-material/DevicesOutlined'
import AssignmentTurnedInOutlined from '@mui/icons-material/AssignmentTurnedInOutlined'
import type { SelectChangeEvent } from '@mui/material/Select'

type DeviceCategory = 'Removable Storage' | 'Mobile Phones' | 'Printers' | 'Network Share' | 'Bluetooth'
type PolicyAction = 'Allow' | 'Block' | 'Read Only'
type YesNo = 'Yes' | 'No'

interface DefaultPolicyRow {
  category: DeviceCategory
  subCategory: string
  allow?: boolean
  block?: boolean
  readOnly?: boolean
  generateEvent?: boolean
  userNotification?: boolean
  alertManager?: boolean
}

type DefaultPolicyField = 'allow' | 'block' | 'readOnly' | 'generateEvent' | 'userNotification' | 'alertManager'

interface DevicePolicyRow {
  id: number
  priority: number
  name: string
  description: string
  user: string
  userGroup: string
  hostNames: string
  hostGroup: string
  deviceCategory: DeviceCategory
  deviceSubCategory: string
  deviceDetails: string
  policyState: 'Enabled' | 'Disabled'
  policyAction: string
  userNotification: boolean
  generateEvent: boolean
  alertManager: boolean
  recycleBin: boolean
  policySchedule?: string
}

interface DeviceOption {
  uid: string
  id: string
  name: string
  type: string
  serial: string
}

interface PolicyFormState {
  policyName: string
  description: string
  category: DeviceCategory
  subCategory: string
  action: PolicyAction
  userNotification: YesNo
  managerNotification: YesNo
  generateEvent: YesNo
  allowObex: boolean
  allowMappingShares: boolean
  selectedDevices: string[]
  assignments: AssignmentState
  policySchedule: string
}

interface AssignmentState {
  users: string[]
  userGroups: string[]
  hostNames: string[]
  hostGroups: string[]
}

const defaultPolicyRows: DefaultPolicyRow[] = [
  { category: 'Removable Storage', subCategory: 'USB Storage Device', allow: true, block: true, readOnly: true, generateEvent: true },
  { category: 'Removable Storage', subCategory: 'CD/DVD', allow: true, block: true },
  { category: 'Removable Storage', subCategory: 'External Floppy / FDD', allow: true, block: true },
  { category: 'Mobile Phones', subCategory: 'Windows Portable Device', allow: true, block: true, generateEvent: true },
  { category: 'Mobile Phones', subCategory: 'iPhone / iPad / iPod', allow: true, block: true },
  { category: 'Mobile Phones', subCategory: 'Android Smartphone', allow: true, block: true },
  { category: 'Printers', subCategory: 'Local Printer', allow: true, block: true, generateEvent: true },
  { category: 'Printers', subCategory: 'Network Printer', allow: true, block: true },
  { category: 'Network Share', subCategory: 'Network Shares', allow: true, block: true, generateEvent: true },
  { category: 'Bluetooth', subCategory: 'Bluetooth', allow: true, block: true, readOnly: true },
]

const policyRows: DevicePolicyRow[] = [
  {
    id: 1,
    priority: 1,
    name: 'Bluetooth',
    description: 'Block bluetooth device connections',
    user: '-',
    userGroup: '-',
    hostNames: '-',
    hostGroup: '-',
    deviceCategory: 'Bluetooth',
    deviceSubCategory: 'Bluetooth',
    deviceDetails: 'N/A',
    policyState: 'Enabled',
    policyAction: 'Allow',
    userNotification: false,
    generateEvent: false,
    alertManager: false,
    recycleBin: false,
    policySchedule: '',
  },
  {
    id: 2,
    priority: 2,
    name: 'Critical policy',
    description: 'This policy is applied when agent gets deployed',
    user: 'All Users',
    userGroup: 'All User Group',
    hostNames: 'All Host Groups',
    hostGroup: 'All Host Groups',
    deviceCategory: 'Removable Storage',
    deviceSubCategory: 'Default',
    deviceDetails: 'Default',
    policyState: 'Enabled',
    policyAction: 'Default actions',
    userNotification: false,
    generateEvent: false,
    alertManager: false,
    recycleBin: false,
    policySchedule: '',
  },
]

const defaultAssignments: AssignmentState = {
  users: ['Vikram'],
  userGroups: ['All User Group'],
  hostNames: ['desktop-01'],
  hostGroups: ['All Host Groups'],
}

const categories: DeviceCategory[] = ['Removable Storage', 'Mobile Phones', 'Printers', 'Network Share', 'Bluetooth']

const subCategoryOptions: Record<DeviceCategory, string[]> = {
  'Removable Storage': ['USB Storage Device', 'CD/DVD', 'External Device'],
  'Mobile Phones': ['Portable Devices', 'iPhone / iPad', 'Android Smartphone'],
  Printers: ['Local Printer', 'Network Printer'],
  'Network Share': ['Network Shares'],
  Bluetooth: ['Bluetooth'],
}

const devicesByCategory: Record<DeviceCategory, DeviceOption[]> = {
  'Removable Storage': [
    { uid: 'removable-storage-1', id: 'DEV-USB-001', name: 'Kingston', type: 'Pen Drive', serial: '12345abc' },
    { uid: 'removable-storage-2', id: 'DEV-USB-002', name: 'SanDisk', type: 'USB Storage', serial: '98765xyz' },
    { uid: 'removable-storage-3', id: 'DEV-USB-003', name: 'Removable Storage Device 3', type: 'Removable Storage', serial: 'REM-5927' },
  ],
  'Mobile Phones': [
    { uid: 'mobile-phones-1', id: 'DEV-MOB-001', name: 'iPhone', type: 'iOS', serial: 'APL-2837' },
    { uid: 'mobile-phones-2', id: 'DEV-MOB-002', name: 'Samsung', type: 'Android', serial: 'SM-9901' },
  ],
  Printers: [
    { uid: 'printers-1', id: 'DEV-PRN-001', name: 'HP LaserJet', type: 'Local Printer', serial: 'HP-4455' },
    { uid: 'printers-2', id: 'DEV-PRN-002', name: 'Canon Office', type: 'Network Printer', serial: 'CN-1122' },
  ],
  'Network Share': [
    { uid: 'network-share-1', id: 'DEV-SHR-001', name: 'Finance Share', type: 'Network Share', serial: 'SHARE-01' },
    { uid: 'network-share-2', id: 'DEV-SHR-002', name: 'Project Share', type: 'Network Share', serial: 'SHARE-02' },
  ],
  Bluetooth: [
    { uid: 'bluetooth-1', id: 'DEV-BT-001', name: 'Bluetooth Adapter', type: 'Bluetooth', serial: 'BT-7788' },
    { uid: 'bluetooth-2', id: 'DEV-BT-002', name: 'OBEX Device', type: 'Bluetooth Transfer', serial: 'OBEX-12' },
  ],
}

const initialForm: PolicyFormState = {
  policyName: '',
  description: '',
  category: 'Removable Storage',
  subCategory: 'USB Storage Device',
  action: 'Allow',
  userNotification: 'No',
  managerNotification: 'No',
  generateEvent: 'No',
  allowObex: false,
  allowMappingShares: false,
  selectedDevices: [],
  assignments: defaultAssignments,
  policySchedule: '',
}

function SectionCard({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <Paper elevation={0} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="border-b border-gray-200 bg-gray-50 px-5 py-4 dark:border-gray-700 dark:bg-white/5">
        <Typography variant="h6" fontWeight={800}>{title}</Typography>
        {subtitle && <Typography variant="caption" color="text.secondary">{subtitle}</Typography>}
      </div>
      <div className="p-5">{children}</div>
    </Paper>
  )
}

function FlagCell({ checked, onChange, disabled }: { checked?: boolean; onChange?: (checked: boolean) => void; disabled?: boolean }) {
  return <Checkbox size="small" checked={!!checked} disabled={disabled} onChange={(event) => onChange?.(event.target.checked)} />
}

function DefaultPolicyPage() {
  const [rows, setRows] = useState<DefaultPolicyRow[]>(defaultPolicyRows)
  const [message, setMessage] = useState('')

  const updateRow = (index: number, field: DefaultPolicyField, checked: boolean) => {
    setRows((current) => current.map((row, rowIndex) => {
      if (rowIndex !== index) return row

      if (field === 'allow' || field === 'block' || field === 'readOnly') {
        return {
          ...row,
          allow: field === 'allow' ? checked : checked ? false : row.allow,
          block: field === 'block' ? checked : checked ? false : row.block,
          readOnly: field === 'readOnly' ? checked : checked ? false : row.readOnly,
        }
      }

      return { ...row, [field]: checked }
    }))
  }

  const renderPolicyControl = (index: number, row: DefaultPolicyRow, field: DefaultPolicyField, type: 'radio' | 'checkbox' = 'checkbox') => {
    const isReadOnlyDisabled = field === 'readOnly' && row.category !== 'Removable Storage'
    return (
      <input
        type={type}
        checked={!!row[field]}
        disabled={isReadOnlyDisabled}
        name={`${row.category}-${row.subCategory}-action`}
        onChange={(event) => updateRow(index, field, event.target.checked)}
        className="h-4 w-4 cursor-pointer accent-blue-500 align-middle drop-shadow-sm disabled:cursor-not-allowed disabled:opacity-40"
      />
    )
  }

  const renderCategoryCard = (category: DeviceCategory, actionHeaders: string[], optionFields: DefaultPolicyField[]) => {
    const categoryRows = rows
      .map((row, index) => ({ row, index }))
      .filter(({ row }) => row.category === category)

    return (
      <div className="w-full overflow-hidden rounded-xl border border-zinc-600/80 bg-[#2c2c2a] text-xs text-zinc-200 shadow-lg shadow-black/20">
        <div className="flex items-center justify-between border-b border-zinc-600/80 bg-gradient-to-r from-[#343431] to-[#292927] px-5 py-3">
          <span className="text-sm font-black text-white">{category}</span>
          <span className="rounded-full border border-zinc-600 bg-black/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-zinc-300">{categoryRows.length} Rules</span>
        </div>
        <div
          className="grid border-b border-zinc-600/80 bg-[#3a3a36] px-5 py-2.5 font-bold uppercase tracking-wide text-zinc-300"
          style={{ gridTemplateColumns: `minmax(260px, 2fr) repeat(${actionHeaders.length}, minmax(130px, 1fr))` }}
        >
          <div>Device Sub Category</div>
          {actionHeaders.map((header) => (
            <div key={header} className="text-center">{header}</div>
          ))}
        </div>
        {categoryRows.map(({ row, index }) => (
          <div
            key={`${row.category}-${row.subCategory}`}
            className="grid items-center border-b border-zinc-700/80 px-5 py-3 last:border-b-0 hover:bg-blue-500/[0.06]"
            style={{ gridTemplateColumns: `minmax(260px, 2fr) repeat(${actionHeaders.length}, minmax(130px, 1fr))` }}
          >
            <div className="font-bold text-white">{row.subCategory}</div>
            {optionFields.map((field) => (
              <div key={field} className="text-center">
                {renderPolicyControl(index, row, field, field === 'allow' || field === 'block' || field === 'readOnly' ? 'radio' : 'checkbox')}
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl border border-slate-700/70 bg-gradient-to-br from-[#252525] via-[#1f1f1f] to-[#171717] p-5 shadow-2xl">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <Typography variant="h6" fontWeight={900} className="text-white">Global Default Policy</Typography>
            <Typography variant="body2" className="text-slate-400">Configure default device permissions by category and sub-category.</Typography>
          </div>
          <Chip size="small" color="primary" variant="outlined" label={`${rows.length} sub-categories`} />
        </div>
        <div className="w-full space-y-5">
        {renderCategoryCard('Removable Storage', ['Allow', 'Block', 'Read Only', 'Generate Event'], ['allow', 'block', 'readOnly', 'generateEvent'])}
        {renderCategoryCard('Mobile Phones', ['Allow', 'Block', 'Generate Event'], ['allow', 'block', 'generateEvent'])}
        {renderCategoryCard('Printers', ['Allow', 'Block', 'Generate Event'], ['allow', 'block', 'generateEvent'])}
        {renderCategoryCard('Network Share', ['Allow', 'Block', 'Allow mapping shares', 'Generate Event'], ['allow', 'block', 'userNotification', 'generateEvent'])}
        {renderCategoryCard('Bluetooth', ['Allow', 'Block OBEX File Transfer', 'Generate Event'], ['allow', 'block', 'generateEvent'])}
        </div>
        <div className="mt-5 flex justify-end gap-3 border-t border-white/10 pt-4">
          <button type="button" className="rounded-lg bg-emerald-500 px-8 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-950/30 transition hover:-translate-y-0.5 hover:bg-emerald-400" onClick={() => setMessage('Default policy saved successfully')}>Save Policy</button>
          <button type="button" className="rounded-lg border border-zinc-600 bg-zinc-900/60 px-8 py-2.5 text-xs font-bold text-zinc-200 transition hover:-translate-y-0.5 hover:border-zinc-400 hover:bg-zinc-800" onClick={() => {
            setRows(defaultPolicyRows)
            setMessage('Default policy reset successfully')
          }}>Reset</button>
        </div>
      </div>
      <Snackbar open={!!message} autoHideDuration={2500} onClose={() => setMessage('')} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" onClose={() => setMessage('')}>{message}</Alert>
      </Snackbar>
    </div>
  )
}

interface PolicyListPageProps {
  policies: DevicePolicyRow[]
  selectedPolicyId: number | null
  onSelect: (policyId: number) => void
  onCreate: () => void
  onEdit: () => void
  onDelete: () => void
  onExport: () => void
  onExportJson: () => void
  onImport: (event: ChangeEvent<HTMLInputElement>) => void
  onToggleState?: (policyId: number, enabled: boolean) => void
  onMovePriority?: (policyId: number, direction: 'up' | 'down') => void
  hasPendingChanges?: boolean
  onSaveChanges?: () => void
  onCancelChanges?: () => void
  showCreateButton?: boolean
}

function isDefaultPolicy(policy: DevicePolicyRow) {
  return policy.deviceSubCategory === 'Default' || policy.name.toLowerCase().includes('critical')
}

function PolicyListPage({ policies, selectedPolicyId, onSelect, onCreate, onEdit, onDelete, onExport, onExportJson, onImport, onToggleState, onMovePriority, hasPendingChanges, onSaveChanges, onCancelChanges, showCreateButton = false }: PolicyListPageProps) {
  return (
    <div className="flex flex-col gap-4">
      <SectionCard title="Device Control Policy List" subtitle="Create, edit, delete, import, export, and assign device policies">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Tooltip title="Add policy"><IconButton color="success" onClick={onCreate}><AddCircleOutlineOutlined /></IconButton></Tooltip>
            <Tooltip title="Edit selected policy"><span><IconButton color="primary" disabled={!selectedPolicyId} onClick={onEdit}><EditOutlined /></IconButton></span></Tooltip>
            <Tooltip title="Delete selected policy"><span><IconButton color="error" disabled={!selectedPolicyId} onClick={onDelete}><DeleteOutlineOutlined /></IconButton></span></Tooltip>
            <Tooltip title="Import policy JSON">
              <IconButton color="info" component="label">
                <FileUploadOutlined />
                <input hidden type="file" accept="application/json" onChange={onImport} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Download CSV"><IconButton color="info" onClick={onExport}><FileDownloadOutlined /></IconButton></Tooltip>
            <Tooltip title="Export Policies JSON"><IconButton color="secondary" onClick={onExportJson}><FileDownloadOutlined /></IconButton></Tooltip>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            {hasPendingChanges && <Chip color="warning" size="small" label="Unsaved priority/state changes" className="animate-pulse" />}
            {hasPendingChanges && <Button size="small" variant="contained" onClick={onSaveChanges}>Save Changes</Button>}
            {hasPendingChanges && <Button size="small" variant="outlined" onClick={onCancelChanges}>Cancel</Button>}
            {showCreateButton && <Button variant="contained" startIcon={<AddCircleOutlineOutlined />} onClick={onCreate}>Create New Policy</Button>}
          </Stack>
        </div>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="min-w-[1720px] w-full border-collapse text-left text-xs">
            <thead className="bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-200">
              <tr>
                {['Policy Priority', 'Move', 'Policy Name', 'Description', 'User', 'User Group', 'Host Names', 'Host Group', 'Device Category', 'Device Sub Category', 'Device Details', 'Policy State', 'Policy Action', 'User Notification', 'Generate Event', 'Alert Manager', 'Policy Schedule'].map((label) => (
                  <th key={label} className="whitespace-nowrap border-b border-gray-200 px-4 py-3 font-bold dark:border-gray-700">{label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {policies.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => onSelect(row.id)}
                  className={`cursor-pointer border-t border-gray-200 transition dark:border-gray-700 ${selectedPolicyId === row.id ? 'bg-blue-50 dark:bg-blue-950/30' : 'hover:bg-blue-50 dark:hover:bg-blue-950/20'}`}
                >
                  <td className="px-4 py-3 font-bold">{row.priority}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <Button size="small" disabled={isDefaultPolicy(row)} onClick={(event) => { event.stopPropagation(); onMovePriority?.(row.id, 'up') }}>Up</Button>
                    <Button size="small" disabled={isDefaultPolicy(row)} onClick={(event) => { event.stopPropagation(); onMovePriority?.(row.id, 'down') }}>Down</Button>
                  </td>
                  <td className="px-4 py-3 font-semibold">{row.name}</td>
                  <td className="max-w-[220px] px-4 py-3"><span className="block truncate" title={row.description}>{row.description}</span></td>
                  <td className="px-4 py-3">{row.user}</td>
                  <td className="px-4 py-3">{row.userGroup}</td>
                  <td className="px-4 py-3">{row.hostNames}</td>
                  <td className="px-4 py-3">{row.hostGroup}</td>
                  <td className="px-4 py-3">{row.deviceCategory}</td>
                  <td className="px-4 py-3">{row.deviceSubCategory}</td>
                  <td className="px-4 py-3">{row.deviceDetails}</td>
                  <td className="px-4 py-3">
                    <Switch size="small" checked={row.policyState === 'Enabled'} disabled={isDefaultPolicy(row)} onClick={(event) => event.stopPropagation()} onChange={(event) => onToggleState?.(row.id, event.target.checked)} />
                    <Chip size="small" color={row.policyState === 'Enabled' ? 'success' : 'default'} label={row.policyState} />
                  </td>
                  <td className="px-4 py-3">{row.policyAction}</td>
                  <td className="px-4 py-2 text-center"><FlagCell checked={row.userNotification} /></td>
                  <td className="px-4 py-2 text-center"><FlagCell checked={row.generateEvent} /></td>
                  <td className="px-4 py-2 text-center"><FlagCell checked={row.alertManager} /></td>
                  <td className="px-4 py-2">{row.policySchedule || 'Not time bound'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  )
}

function DeviceSelector({ category, selectedDevices, onSelectedDevicesChange }: { category: DeviceCategory; selectedDevices: string[]; onSelectedDevicesChange: (serials: string[]) => void }) {
  const [devices, setDevices] = useState<DeviceOption[]>(devicesByCategory[category])
  const [search, setSearch] = useState('')
  const [editingUid, setEditingUid] = useState<string | null>(null)
  const filteredDevices = devices.filter((device) => [device.name, device.type, device.id, device.serial].some((value) => value.toLowerCase().includes(search.toLowerCase())))

  useEffect(() => {
    setDevices(devicesByCategory[category])
    setEditingUid(null)
    onSelectedDevicesChange([])
  }, [category])

  const handleAddDevice = () => {
    const nextNumber = devices.length + 1
    const nextDevice: DeviceOption = {
      uid: `${category.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}`,
      id: `${category.replace(/\s+/g, '-').toUpperCase()}-${String(Date.now()).slice(-5)}`,
      name: `${category} Device ${nextNumber}`,
      type: category,
      serial: `${category.replace(/\s+/g, '-').toUpperCase()}-${String(Date.now()).slice(-5)}`,
    }
    setDevices((current) => [...current, nextDevice])
    onSelectedDevicesChange([...selectedDevices, nextDevice.serial])
    setEditingUid(nextDevice.uid)
  }

  const toggleDevice = (serial: string, checked: boolean) => {
    onSelectedDevicesChange(checked ? [...selectedDevices, serial] : selectedDevices.filter((item) => item !== serial))
  }

  const updateDevice = (uid: string, field: keyof DeviceOption, value: string) => {
    const previousSerial = devices.find((device) => device.uid === uid)?.serial
    setDevices((current) => current.map((device) => device.uid === uid ? { ...device, [field]: value } : device))
    if (field === 'serial' && previousSerial && selectedDevices.includes(previousSerial)) {
      onSelectedDevicesChange(selectedDevices.map((item) => item === previousSerial ? value : item))
    }
  }

  const deleteDevice = (uid: string) => {
    const serial = devices.find((device) => device.uid === uid)?.serial
    setDevices((current) => current.filter((device) => device.uid !== uid))
    if (serial) onSelectedDevicesChange(selectedDevices.filter((item) => item !== serial))
    if (editingUid === uid) setEditingUid(null)
  }

  const handleImportDevices = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const lines = String(reader.result)
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean)
      const dataLines = lines[0]?.toLowerCase().includes('device name') ? lines.slice(1) : lines
      const importedDevices = dataLines.map((line, index) => {
        const [name, type, id, serial] = line.split(',').map((value) => value?.trim())
        return {
          uid: `${category.replace(/\s+/g, '-').toLowerCase()}-import-${Date.now()}-${index}`,
          name: name || `${category} Imported ${index + 1}`,
          type: type || category,
          id: id || `${category.replace(/\s+/g, '-').toUpperCase()}-IMPORT-${index + 1}`,
          serial: serial || `${category.replace(/\s+/g, '-').toUpperCase()}-IMPORT-${index + 1}`,
        }
      })
      setDevices((current) => [...current, ...importedDevices])
      onSelectedDevicesChange([...selectedDevices, ...importedDevices.map((device) => device.serial)])
    }
    reader.readAsText(file)
    event.target.value = ''
  }

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between border-b border-gray-200 px-3 py-2 dark:border-gray-700">
        <Typography variant="subtitle2" fontWeight={700}>Select Devices</Typography>
        <Stack direction="row" spacing={1}>
          <Button size="small" component="label" startIcon={<FileUploadOutlined />}>
            Import
            <input hidden type="file" accept=".csv,text/csv" onChange={handleImportDevices} />
          </Button>
          <Button size="small" startIcon={<AddCircleOutlineOutlined />} onClick={handleAddDevice}>Add</Button>
        </Stack>
      </div>
      <div className="border-b border-gray-200 p-3 dark:border-gray-700">
        <TextField fullWidth size="small" placeholder="Search by device name, type, device id, or serial number" value={search} onChange={(event) => setSearch(event.target.value)} InputProps={{ startAdornment: <SearchOutlined fontSize="small" className="mr-2 text-gray-400" /> }} />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-xs">
          <thead className="bg-gray-100 dark:bg-white/10">
            <tr>
              <th className="px-3 py-2">Select</th>
              <th className="px-3 py-2">Device Name</th>
              <th className="px-3 py-2">Device Type</th>
              <th className="px-3 py-2">Device ID</th>
              <th className="px-3 py-2">Device Serial</th>
              <th className="px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredDevices.map((device) => {
              const isEditing = editingUid === device.uid
              return (
                <tr key={device.uid} className="border-t border-gray-200 dark:border-gray-700">
                  <td className="px-3 py-2"><Checkbox size="small" checked={selectedDevices.includes(device.serial)} onChange={(event) => toggleDevice(device.serial, event.target.checked)} /></td>
                  <td className="px-3 py-2 font-semibold">
                    {isEditing ? <TextField size="small" value={device.name} onChange={(event) => updateDevice(device.uid, 'name', event.target.value)} /> : device.name}
                  </td>
                  <td className="px-3 py-2">
                    {isEditing ? <TextField size="small" value={device.type} onChange={(event) => updateDevice(device.uid, 'type', event.target.value)} /> : device.type}
                  </td>
                  <td className="px-3 py-2">
                    {isEditing ? <TextField size="small" value={device.id} onChange={(event) => updateDevice(device.uid, 'id', event.target.value)} /> : device.id}
                  </td>
                  <td className="px-3 py-2">
                    {isEditing ? <TextField size="small" value={device.serial} onChange={(event) => updateDevice(device.uid, 'serial', event.target.value)} /> : device.serial}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2">
                    <Button size="small" onClick={() => setEditingUid(isEditing ? null : device.uid)}>{isEditing ? 'Done' : 'Edit'}</Button>
                    <IconButton size="small" color="error" onClick={() => deleteDevice(device.uid)}><DeleteOutlineOutlined fontSize="small" /></IconButton>
                  </td>
                </tr>
              )
            })}
            {!filteredDevices.length && (
              <tr>
                <td colSpan={6} className="px-3 py-6 text-center text-gray-500">No devices found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function policyToForm(policy: DevicePolicyRow | null): PolicyFormState {
  if (!policy) return initialForm
  return {
    policyName: policy.name,
    description: policy.description,
    category: policy.deviceCategory,
    subCategory: subCategoryOptions[policy.deviceCategory].includes(policy.deviceSubCategory) ? policy.deviceSubCategory : subCategoryOptions[policy.deviceCategory][0],
    action: policy.policyAction === 'Block' || policy.policyAction === 'Read Only' ? policy.policyAction : 'Allow',
    userNotification: policy.userNotification ? 'Yes' : 'No',
    managerNotification: policy.alertManager ? 'Yes' : 'No',
    generateEvent: policy.generateEvent ? 'Yes' : 'No',
    allowObex: policy.policyAction.includes('OBEX'),
    allowMappingShares: policy.policyAction.includes('Mapping'),
    selectedDevices: policy.deviceDetails && policy.deviceDetails !== 'Default' && policy.deviceDetails !== 'N/A' ? policy.deviceDetails.split(',').map((device) => device.trim()) : [],
    assignments: {
      users: policy.user && policy.user !== '-' ? policy.user.split(',').map((value) => value.trim()) : defaultAssignments.users,
      userGroups: policy.userGroup && policy.userGroup !== '-' ? policy.userGroup.split(',').map((value) => value.trim()) : defaultAssignments.userGroups,
      hostNames: policy.hostNames && policy.hostNames !== '-' ? policy.hostNames.split(',').map((value) => value.trim()) : defaultAssignments.hostNames,
      hostGroups: policy.hostGroup && policy.hostGroup !== '-' ? policy.hostGroup.split(',').map((value) => value.trim()) : defaultAssignments.hostGroups,
    },
    policySchedule: policy.policySchedule ?? '',
  }
}

function PolicyForm({ onBack, onSave, editingPolicy }: { onBack?: () => void; onSave?: (form: PolicyFormState) => void; editingPolicy?: DevicePolicyRow | null }) {
  const [form, setForm] = useState<PolicyFormState>(() => policyToForm(editingPolicy ?? null))

  const update = <K extends keyof PolicyFormState>(key: K, value: PolicyFormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }))
  }

  const handleCategoryChange = (event: SelectChangeEvent<DeviceCategory>) => {
    const category = event.target.value as DeviceCategory
    setForm((current) => ({ ...current, category, subCategory: subCategoryOptions[category][0] }))
  }

  const updateAssignment = (key: keyof AssignmentState, values: string[]) => {
    update('assignments', { ...form.assignments, [key]: values })
  }

  return (
    <SectionCard title="Create New Policy" subtitle="Build a device control rule for selected users, devices, and hosts">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="grid gap-4 md:grid-cols-2">
          <TextField label="Policy Name" value={form.policyName} onChange={(event) => update('policyName', event.target.value)} size="small" />
          <FormControl size="small">
            <InputLabel>Category Type</InputLabel>
            <Select label="Category Type" value={form.category} onChange={handleCategoryChange}>
              {categories.map((category) => <MenuItem key={category} value={category}>{category}</MenuItem>)}
            </Select>
          </FormControl>
          <TextField label="Policy Description" value={form.description} onChange={(event) => update('description', event.target.value)} size="small" multiline minRows={3} className="md:col-span-2" />
          <FormControl size="small">
            <InputLabel>Sub Category</InputLabel>
            <Select label="Sub Category" value={form.subCategory} onChange={(event) => update('subCategory', event.target.value)}>
              {subCategoryOptions[form.category].map((subCategory) => <MenuItem key={subCategory} value={subCategory}>{subCategory}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl>
            <Typography variant="subtitle2" fontWeight={700}>Policy Action</Typography>
            <RadioGroup row value={form.action} onChange={(event) => update('action', event.target.value as PolicyAction)}>
              <FormControlLabel value="Allow" control={<Radio size="small" />} label="Allow" />
              <FormControlLabel value="Block" control={<Radio size="small" />} label="Block" />
              {(form.category === 'Removable Storage' || form.category === 'Bluetooth') && <FormControlLabel value="Read Only" control={<Radio size="small" />} label="Read Only" />}
            </RadioGroup>
          </FormControl>
          {form.category === 'Bluetooth' && <FormControlLabel control={<Checkbox checked={form.allowObex} onChange={(event) => update('allowObex', event.target.checked)} />} label="Allow OBEX File Transfer" />}
          {form.category === 'Network Share' && <FormControlLabel control={<Checkbox checked={form.allowMappingShares} onChange={(event) => update('allowMappingShares', event.target.checked)} />} label="Allow Mapping Shares" />}
          <DeviceSelector category={form.category} selectedDevices={form.selectedDevices} onSelectedDevicesChange={(serials) => update('selectedDevices', serials)} />
          <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
            {(['userNotification', 'managerNotification', 'generateEvent'] as const).map((key) => (
              <div key={key} className="flex items-center justify-between gap-4 py-1">
                <Typography variant="body2" fontWeight={600}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())}</Typography>
                <RadioGroup row value={form[key]} onChange={(event) => update(key, event.target.value as YesNo)}>
                  <FormControlLabel value="Yes" control={<Radio size="small" />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio size="small" />} label="No" />
                </RadioGroup>
              </div>
            ))}
          </div>
          <AssignmentEditor assignments={form.assignments} onChange={updateAssignment} schedule={form.policySchedule} onScheduleChange={(value) => update('policySchedule', value)} />
          <div className="flex gap-2 md:col-span-2">
            <Button variant="contained" startIcon={<SaveOutlined />} onClick={() => onSave?.(form)}>{editingPolicy ? 'Update' : 'Save'}</Button>
            <Button variant="outlined" startIcon={<RestartAltOutlined />} onClick={() => setForm(initialForm)}>Clear</Button>
            {onBack && <Button onClick={onBack}>Back to List</Button>}
          </div>
        </div>
        <Paper elevation={0} className="rounded-2xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/20">
          <Typography variant="subtitle1" fontWeight={800}>Policy Preview</Typography>
          <Divider className="!my-3" />
          <Stack spacing={1}>
            <Chip icon={<SecurityOutlined />} label={form.category} color="primary" variant="outlined" />
            <Chip icon={<DevicesOutlined />} label={form.subCategory} variant="outlined" />
            <Chip icon={<AssignmentTurnedInOutlined />} label={`Action: ${form.action}`} color={form.action === 'Block' ? 'error' : 'success'} />
          </Stack>
          <Typography variant="body2" color="text.secondary" className="mt-4">
            Once saved, this policy remains disabled until it is manually enabled from Policy List. Assignment is saved with users, user groups, host names, host groups, and schedule.
          </Typography>
        </Paper>
      </div>
    </SectionCard>
  )
}

function AssignmentEditor({ assignments, onChange, schedule, onScheduleChange }: { assignments: AssignmentState; onChange: (key: keyof AssignmentState, values: string[]) => void; schedule: string; onScheduleChange: (value: string) => void }) {
  const lists = [
    { key: 'users' as const, title: 'Users', values: ['Vikram', 'Admin', 'User1'] },
    { key: 'userGroups' as const, title: 'Users Group', values: ['All User Group', 'Sales Team', 'Finance'] },
    { key: 'hostNames' as const, title: 'Host Names', values: ['desktop-01', 'laptop-02', 'server-03'] },
    { key: 'hostGroups' as const, title: 'Host Groups', values: ['All Host Groups', 'Engineering', 'Marketing'] },
  ]
  const [searches, setSearches] = useState<Record<string, string>>({})

  const toggleAssignment = (key: keyof AssignmentState, value: string, checked: boolean) => {
    const current = assignments[key] ?? []
    onChange(key, checked ? [...current, value] : current.filter((item) => item !== value))
  }

  return (
    <div className="md:col-span-2 rounded-xl border border-gray-200 p-4 dark:border-gray-700">
      <Typography variant="subtitle2" fontWeight={800}>Policy Assignment</Typography>
      <Typography variant="caption" color="text.secondary">Assign before saving. New policies are saved disabled until manually enabled in Policy List.</Typography>
      <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {lists.map((list) => (
          <Paper key={list.key} elevation={0} className="rounded-xl border border-gray-200 p-3 dark:border-gray-700">
            <TextField fullWidth size="small" placeholder="Search" value={searches[list.key] ?? ''} onChange={(event) => setSearches((current) => ({ ...current, [list.key]: event.target.value }))} InputProps={{ startAdornment: <SearchOutlined fontSize="small" className="mr-2 text-gray-400" /> }} />
            <div className="mt-3 h-36 overflow-auto rounded-lg border border-gray-200 p-2 dark:border-gray-700">
              {list.values
                .filter((value) => value.toLowerCase().includes((searches[list.key] ?? '').toLowerCase()))
                .map((value) => (
                  <FormControlLabel key={value} control={<Checkbox size="small" checked={(assignments[list.key] ?? []).includes(value)} onChange={(event) => toggleAssignment(list.key, value, event.target.checked)} />} label={value} className="block" />
                ))}
            </div>
            <Typography variant="caption" color="text.secondary" className="mt-2 block text-center">{list.title}</Typography>
          </Paper>
        ))}
      </div>
      <TextField fullWidth label="Policy Schedule" size="small" placeholder="From Date / Time to Date / Time. Leave blank for non-time-bound policy." value={schedule} onChange={(event) => onScheduleChange(event.target.value)} className="!mt-4" />
    </div>
  )
}

function createPolicyFromForm(form: PolicyFormState, id: number, priority: number): DevicePolicyRow {
  const policyAction = form.category === 'Bluetooth' && form.allowObex
    ? `${form.action} + OBEX File Transfer`
    : form.category === 'Network Share' && form.allowMappingShares
      ? `${form.action} + Mapping Shares`
      : form.action

  return {
    id,
    priority,
    name: form.policyName || `${form.category} Policy`,
    description: form.description || `Policy for ${form.category}`,
    user: form.assignments.users.join(', ') || '-',
    userGroup: form.assignments.userGroups.join(', ') || '-',
    hostNames: form.assignments.hostNames.join(', ') || '-',
    hostGroup: form.assignments.hostGroups.join(', ') || '-',
    deviceCategory: form.category,
    deviceSubCategory: form.subCategory,
    deviceDetails: form.selectedDevices.length ? form.selectedDevices.join(', ') : devicesByCategory[form.category][0]?.serial ?? 'Default',
    policyState: 'Disabled',
    policyAction,
    userNotification: form.userNotification === 'Yes',
    generateEvent: form.generateEvent === 'Yes',
    alertManager: form.managerNotification === 'Yes',
    recycleBin: false,
    policySchedule: form.policySchedule,
  }
}

function downloadTextFile(fileName: string, content: string, type: string) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = fileName
  anchor.click()
  URL.revokeObjectURL(url)
}

function exportPoliciesToCsv(policies: DevicePolicyRow[]) {
  const headers = ['Priority', 'Policy Name', 'Description', 'User', 'User Group', 'Host Names', 'Host Group', 'Device Category', 'Device Sub Category', 'Device Details', 'Policy State', 'Policy Action', 'User Notification', 'Generate Event', 'Alert Manager', 'Policy Schedule']
  const rows = policies.map((policy) => [
    policy.priority,
    policy.name,
    policy.description,
    policy.user,
    policy.userGroup,
    policy.hostNames,
    policy.hostGroup,
    policy.deviceCategory,
    policy.deviceSubCategory,
    policy.deviceDetails,
    policy.policyState,
    policy.policyAction,
    policy.userNotification ? 'Yes' : 'No',
    policy.generateEvent ? 'Yes' : 'No',
    policy.alertManager ? 'Yes' : 'No',
    policy.policySchedule || 'Not time bound',
  ])
  const csv = [headers, ...rows].map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(',')).join('\n')
  downloadTextFile('device-control-policies.csv', csv, 'text/csv;charset=utf-8')
}

function exportPoliciesToJson(policies: DevicePolicyRow[]) {
  downloadTextFile('device-control-policies-backup.json', JSON.stringify(policies, null, 2), 'application/json;charset=utf-8')
}
export function DeviceControlDefaultPolicy() {
  return (
    <div className="flex w-full flex-col gap-4 pb-24">
      <Typography variant="h5" fontWeight={800}>Default Policy</Typography>
      <DefaultPolicyPage />
    </div>
  )
}

export function DeviceControlDevicePolicy() {
  return <ManageDevicePolicies />
}

export function ManageDevicePolicies() {
  const [tab, setTab] = useState(0)
  const [policies, setPolicies] = useState<DevicePolicyRow[]>(policyRows)
  const [savedPolicies, setSavedPolicies] = useState<DevicePolicyRow[]>(policyRows)
  const [selectedPolicyId, setSelectedPolicyId] = useState<number | null>(policyRows[0]?.id ?? null)
  const [editingPolicy, setEditingPolicy] = useState<DevicePolicyRow | null>(null)
  const [message, setMessage] = useState('')

  const hasPendingChanges = JSON.stringify(policies) !== JSON.stringify(savedPolicies)
  const selectedPolicy = policies.find((policy) => policy.id === selectedPolicyId) ?? null
  const orderedPolicies = [...policies].sort((a, b) => a.priority - b.priority)

  const normalizePolicies = (items: DevicePolicyRow[]) => {
    const regular = items.filter((policy) => !isDefaultPolicy(policy))
    const defaults = items.filter(isDefaultPolicy)
    return [...regular, ...defaults].map((policy, index) => ({ ...policy, priority: index + 1 }))
  }

  const handleCreate = () => {
    setEditingPolicy(null)
    setTab(1)
  }

  const handleEdit = () => {
    if (!selectedPolicy || isDefaultPolicy(selectedPolicy)) {
      setMessage('Default policy cannot be edited from policy list')
      return
    }
    setEditingPolicy(selectedPolicy)
    setTab(1)
  }

  const handleDelete = () => {
    if (!selectedPolicyId || !selectedPolicy) return
    if (isDefaultPolicy(selectedPolicy)) {
      setMessage('Default policy cannot be deleted')
      return
    }
    if (!window.confirm('Are you sure you want to delete this?')) return
    const nextPolicies = normalizePolicies(policies.filter((policy) => policy.id !== selectedPolicyId))
    setPolicies(nextPolicies)
    setSavedPolicies(nextPolicies)
    setSelectedPolicyId(null)
    setMessage('Policy deleted successfully')
  }

  const handleSave = (form: PolicyFormState) => {
    const normalizedName = form.policyName.trim().toLowerCase()
    if (!normalizedName) {
      setMessage('Policy name is required')
      return
    }
    const isDuplicateName = policies.some((policy) => policy.name.trim().toLowerCase() === normalizedName && policy.id !== editingPolicy?.id)
    if (isDuplicateName) {
      setMessage('Policy name must be unique')
      return
    }

    if (editingPolicy) {
      const nextPolicies = normalizePolicies(policies.map((policy) => policy.id === editingPolicy.id ? { ...createPolicyFromForm(form, policy.id, policy.priority), policyState: policy.policyState } : policy))
      setPolicies(nextPolicies)
      setSavedPolicies(nextPolicies)
      setMessage('Policy updated successfully')
    } else {
      const nextId = Math.max(0, ...policies.map((policy) => policy.id)) + 1
      const newPolicy = createPolicyFromForm(form, nextId, 1)
      const nextPolicies = normalizePolicies([newPolicy, ...policies])
      setPolicies(nextPolicies)
      setSavedPolicies(nextPolicies)
      setSelectedPolicyId(newPolicy.id)
      setMessage('Policy created successfully. It is disabled by default until manually enabled.')
    }
    setEditingPolicy(null)
    setTab(2)
  }

  const handleToggleState = (policyId: number, enabled: boolean) => {
    setPolicies((current) => current.map((policy) => policy.id === policyId ? { ...policy, policyState: enabled ? 'Enabled' : 'Disabled' } : policy))
  }

  const handleMovePriority = (policyId: number, direction: 'up' | 'down') => {
    setPolicies((current) => {
      const normalized = normalizePolicies(current)
      const index = normalized.findIndex((policy) => policy.id === policyId)
      const targetIndex = direction === 'up' ? index - 1 : index + 1
      if (index < 0 || targetIndex < 0 || targetIndex >= normalized.length || isDefaultPolicy(normalized[targetIndex])) return normalized
      const next = [...normalized]
      const [moved] = next.splice(index, 1)
      next.splice(targetIndex, 0, moved)
      return normalizePolicies(next)
    })
  }

  const savePolicyListChanges = () => {
    setSavedPolicies(policies)
    setMessage('Policy list changes saved successfully')
  }

  const cancelPolicyListChanges = () => {
    setPolicies(savedPolicies)
    setMessage('Policy list changes discarded')
  }

  const handleImport = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as DevicePolicyRow[]
        if (!Array.isArray(parsed)) throw new Error('Invalid policy file')
        const importedPolicies = normalizePolicies(parsed)
        setPolicies(importedPolicies)
        setSavedPolicies(importedPolicies)
        setSelectedPolicyId(importedPolicies[0]?.id ?? null)
        setMessage('Policies imported successfully')
      } catch {
        setMessage('Invalid JSON policy file')
      }
    }
    reader.readAsText(file)
    event.target.value = ''
  }

  return (
    <div className="flex w-full flex-col gap-4 pb-24">
      <div>
        <Typography variant="h5" fontWeight={800}>Manage Device Policies</Typography>
        <Typography variant="body2" color="text.secondary">Manage default policy, explicit policy creation, assignment, priority, and final policy list.</Typography>
      </div>
      <Paper elevation={0} className="rounded-2xl border border-gray-200 dark:border-gray-700">
        <Tabs value={tab} onChange={(_, value) => setTab(value)} variant="scrollable" scrollButtons="auto">
          <Tab label="Default Policies" />
          <Tab label={editingPolicy ? 'Edit Policy' : 'Create New Policy'} />
          <Tab label="Policy List" />
        </Tabs>
      </Paper>
      {tab === 0 && <DefaultPolicyPage />}
      {tab === 1 && <PolicyForm editingPolicy={editingPolicy} onSave={handleSave} onBack={() => setTab(2)} />}
      {tab === 2 && (
        <PolicyListPage
          policies={orderedPolicies}
          selectedPolicyId={selectedPolicyId}
          onSelect={setSelectedPolicyId}
          onCreate={handleCreate}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onExport={() => exportPoliciesToCsv(orderedPolicies)}
          onExportJson={() => exportPoliciesToJson(orderedPolicies)}
          onImport={handleImport}
          onToggleState={handleToggleState}
          onMovePriority={handleMovePriority}
          hasPendingChanges={hasPendingChanges}
          onSaveChanges={savePolicyListChanges}
          onCancelChanges={cancelPolicyListChanges}
        />
      )}
      <Snackbar open={!!message} autoHideDuration={2500} onClose={() => setMessage('')} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity={message.includes('Invalid') || message.includes('required') || message.includes('unique') || message.includes('cannot') ? 'error' : 'success'} variant="filled" onClose={() => setMessage('')}>{message}</Alert>
      </Snackbar>
    </div>
  )
}



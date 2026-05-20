import { useEffect, useMemo, useState, type ChangeEvent, type ReactNode } from 'react'
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
}

interface DeviceOption {
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
  },
]

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
    { name: 'Kingston', type: 'Pen Drive', serial: '12345abc' },
    { name: 'SanDisk', type: 'USB Storage', serial: '98765xyz' },
  ],
  'Mobile Phones': [
    { name: 'iPhone', type: 'iOS', serial: 'APL-2837' },
    { name: 'Samsung', type: 'Android', serial: 'SM-9901' },
  ],
  Printers: [
    { name: 'HP LaserJet', type: 'Local Printer', serial: 'HP-4455' },
    { name: 'Canon Office', type: 'Network Printer', serial: 'CN-1122' },
  ],
  'Network Share': [
    { name: 'Finance Share', type: 'Network Share', serial: 'SHARE-01' },
    { name: 'Project Share', type: 'Network Share', serial: 'SHARE-02' },
  ],
  Bluetooth: [
    { name: 'Bluetooth Adapter', type: 'Bluetooth', serial: 'BT-7788' },
    { name: 'OBEX Device', type: 'Bluetooth Transfer', serial: 'OBEX-12' },
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
  onImport: (event: ChangeEvent<HTMLInputElement>) => void
}

function PolicyListPage({ policies, selectedPolicyId, onSelect, onCreate, onEdit, onDelete, onExport, onImport }: PolicyListPageProps) {
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
          </Stack>
          <Button variant="contained" startIcon={<AddCircleOutlineOutlined />} onClick={onCreate}>Create New Policy</Button>
        </div>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="min-w-[1500px] w-full border-collapse text-left text-xs">
            <thead className="bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-200">
              <tr>
                {['Policy Priority', 'Policy Name', 'Description', 'User', 'User Group', 'Host Names', 'Host Group', 'Device Category', 'Device Sub Category', 'Device Details', 'Policy State', 'Policy Action', 'User Notification', 'Generate Event', 'Alert Manager', 'Policy Schedule with Recycle Previlege'].map((label) => (
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
                  <td className="px-4 py-3 font-semibold">{row.name}</td>
                  <td className="max-w-[220px] px-4 py-3"><span className="block truncate" title={row.description}>{row.description}</span></td>
                  <td className="px-4 py-3">{row.user}</td>
                  <td className="px-4 py-3">{row.userGroup}</td>
                  <td className="px-4 py-3">{row.hostNames}</td>
                  <td className="px-4 py-3">{row.hostGroup}</td>
                  <td className="px-4 py-3">{row.deviceCategory}</td>
                  <td className="px-4 py-3">{row.deviceSubCategory}</td>
                  <td className="px-4 py-3">{row.deviceDetails}</td>
                  <td className="px-4 py-3"><Chip size="small" color={row.policyState === 'Enabled' ? 'success' : 'default'} label={row.policyState} /></td>
                  <td className="px-4 py-3">{row.policyAction}</td>
                  <td className="px-4 py-2 text-center"><FlagCell checked={row.userNotification} /></td>
                  <td className="px-4 py-2 text-center"><FlagCell checked={row.generateEvent} /></td>
                  <td className="px-4 py-2 text-center"><FlagCell checked={row.alertManager} /></td>
                  <td className="px-4 py-2 text-center"><FlagCell checked={row.recycleBin} /></td>
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

  useEffect(() => {
    setDevices(devicesByCategory[category])
    onSelectedDevicesChange([])
  }, [category])

  const handleAddDevice = () => {
    const nextNumber = devices.length + 1
    const nextDevice: DeviceOption = {
      name: `${category} Device ${nextNumber}`,
      type: category,
      serial: `${category.replace(/\s+/g, '-').toUpperCase()}-${String(Date.now()).slice(-5)}`,
    }
    setDevices((current) => [...current, nextDevice])
    onSelectedDevicesChange([...selectedDevices, nextDevice.serial])
  }

  const toggleDevice = (serial: string, checked: boolean) => {
    onSelectedDevicesChange(checked ? [...selectedDevices, serial] : selectedDevices.filter((item) => item !== serial))
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
      const importedDevices = lines.map((line, index) => {
        const [name, type, serial] = line.split(',').map((value) => value?.trim())
        return {
          name: name || `${category} Imported ${index + 1}`,
          type: type || category,
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
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-xs">
          <thead className="bg-gray-100 dark:bg-white/10">
            <tr>
              <th className="px-3 py-2">Select</th>
              <th className="px-3 py-2">Device Name</th>
              <th className="px-3 py-2">Device Type</th>
              <th className="px-3 py-2">Device Serial</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device) => (
              <tr key={device.serial} className="border-t border-gray-200 dark:border-gray-700">
                <td className="px-3 py-2"><Checkbox size="small" checked={selectedDevices.includes(device.serial)} onChange={(event) => toggleDevice(device.serial, event.target.checked)} /></td>
                <td className="px-3 py-2 font-semibold">{device.name}</td>
                <td className="px-3 py-2">{device.type}</td>
                <td className="px-3 py-2">{device.serial}</td>
              </tr>
            ))}
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
            Once saved, this policy can be assigned to users, user groups, host names, and host groups from the assignment page.
          </Typography>
        </Paper>
      </div>
    </SectionCard>
  )
}

function AssignmentPage() {
  const lists = useMemo(() => [
    { title: 'Users', values: ['Vikram', 'Admin', 'User1'] },
    { title: 'Users Group', values: ['All User Group', 'Sales Team', 'Finance'] },
    { title: 'Host Names', values: ['desktop-01', 'laptop-02', 'server-03'] },
    { title: 'Host Groups', values: ['All Host Groups', 'Engineering', 'Marketing'] },
  ], [])
  const initialAssignments = useMemo(() => lists.reduce<Record<string, string[]>>((acc, list) => {
    acc[list.title] = list.values.slice(0, 1)
    return acc
  }, {}), [lists])
  const [searches, setSearches] = useState<Record<string, string>>({})
  const [assignments, setAssignments] = useState<Record<string, string[]>>(initialAssignments)
  const [schedule, setSchedule] = useState('')
  const [order, setOrder] = useState('')
  const [message, setMessage] = useState('')

  const toggleAssignment = (title: string, value: string, checked: boolean) => {
    setAssignments((current) => ({
      ...current,
      [title]: checked ? [...(current[title] ?? []), value] : (current[title] ?? []).filter((item) => item !== value),
    }))
  }

  const resetAssignment = () => {
    setAssignments(initialAssignments)
    setSearches({})
    setSchedule('')
    setOrder('')
    setMessage('Policy assignment reset successfully')
  }

  return (
    <SectionCard title="Policy Assignment" subtitle="Assign selected policies to users, groups, hosts, and schedule order">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {lists.map((list) => (
          <Paper key={list.title} elevation={0} className="rounded-xl border border-gray-200 p-3 dark:border-gray-700">
            <TextField fullWidth size="small" placeholder="Search" value={searches[list.title] ?? ''} onChange={(event) => setSearches((current) => ({ ...current, [list.title]: event.target.value }))} InputProps={{ startAdornment: <SearchOutlined fontSize="small" className="mr-2 text-gray-400" /> }} />
            <div className="mt-3 h-48 overflow-auto rounded-lg border border-gray-200 p-2 dark:border-gray-700">
              {list.values
                .filter((value) => value.toLowerCase().includes((searches[list.title] ?? '').toLowerCase()))
                .map((value) => (
                  <FormControlLabel key={value} control={<Checkbox size="small" checked={(assignments[list.title] ?? []).includes(value)} onChange={(event) => toggleAssignment(list.title, value, event.target.checked)} />} label={value} className="block" />
                ))}
            </div>
            <Typography variant="caption" color="text.secondary" className="mt-2 block text-center">{list.title}</Typography>
          </Paper>
        ))}
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <TextField label="Policy Schedule" size="small" placeholder="From Date / Time to Date / Time" value={schedule} onChange={(event) => setSchedule(event.target.value)} />
        <TextField label="Policy Order" size="small" placeholder="Top / Bottom / After Policy Number" value={order} onChange={(event) => setOrder(event.target.value)} />
      </div>
      <div className="mt-4 flex gap-2">
        <Button variant="contained" startIcon={<SaveOutlined />} onClick={() => setMessage('Policy assignment saved successfully')}>Save</Button>
        <Button variant="outlined" startIcon={<RestartAltOutlined />} onClick={resetAssignment}>Reset</Button>
      </div>
      <Snackbar open={!!message} autoHideDuration={2500} onClose={() => setMessage('')} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" onClose={() => setMessage('')}>{message}</Alert>
      </Snackbar>
    </SectionCard>
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
    user: 'All Users',
    userGroup: 'All User Group',
    hostNames: 'All Host Groups',
    hostGroup: 'All Host Groups',
    deviceCategory: form.category,
    deviceSubCategory: form.subCategory,
    deviceDetails: form.selectedDevices.length ? form.selectedDevices.join(', ') : devicesByCategory[form.category][0]?.serial ?? 'Default',
    policyState: 'Enabled',
    policyAction,
    userNotification: form.userNotification === 'Yes',
    generateEvent: form.generateEvent === 'Yes',
    alertManager: form.managerNotification === 'Yes',
    recycleBin: false,
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
  const headers = ['Priority', 'Policy Name', 'Description', 'User', 'User Group', 'Host Names', 'Host Group', 'Device Category', 'Device Sub Category', 'Device Details', 'Policy State', 'Policy Action', 'User Notification', 'Generate Event', 'Alert Manager']
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
  ])
  const csv = [headers, ...rows].map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(',')).join('\n')
  downloadTextFile('device-control-policies.csv', csv, 'text/csv;charset=utf-8')
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
  const [tab, setTab] = useState(0)
  const [policies, setPolicies] = useState<DevicePolicyRow[]>(policyRows)
  const [selectedPolicyId, setSelectedPolicyId] = useState<number | null>(policyRows[0]?.id ?? null)
  const [editingPolicy, setEditingPolicy] = useState<DevicePolicyRow | null>(null)
  const [message, setMessage] = useState('')

  const selectedPolicy = policies.find((policy) => policy.id === selectedPolicyId) ?? null

  const handleCreate = () => {
    setEditingPolicy(null)
    setTab(1)
  }

  const handleEdit = () => {
    if (!selectedPolicy) return
    setEditingPolicy(selectedPolicy)
    setTab(1)
  }

  const handleDelete = () => {
    if (!selectedPolicyId) return
    setPolicies((current) => current.filter((policy) => policy.id !== selectedPolicyId).map((policy, index) => ({ ...policy, priority: index + 1 })))
    setSelectedPolicyId(null)
    setMessage('Policy deleted successfully')
  }

  const handleSave = (form: PolicyFormState) => {
    if (editingPolicy) {
      setPolicies((current) => current.map((policy) => policy.id === editingPolicy.id ? { ...createPolicyFromForm(form, policy.id, policy.priority), user: policy.user, userGroup: policy.userGroup, hostNames: policy.hostNames, hostGroup: policy.hostGroup } : policy))
      setMessage('Policy updated successfully')
    } else {
      const nextId = Math.max(0, ...policies.map((policy) => policy.id)) + 1
      const newPolicy = createPolicyFromForm(form, nextId, policies.length + 1)
      setPolicies((current) => [...current, newPolicy])
      setSelectedPolicyId(newPolicy.id)
      setMessage('Policy created successfully')
    }
    setEditingPolicy(null)
    setTab(0)
  }

  const handleImport = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as DevicePolicyRow[]
        if (!Array.isArray(parsed)) throw new Error('Invalid policy file')
        setPolicies(parsed.map((policy, index) => ({ ...policy, priority: index + 1 })))
        setSelectedPolicyId(parsed[0]?.id ?? null)
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
      <div className="flex items-center justify-between gap-3">
        <div>
          <Typography variant="h5" fontWeight={800}>Device Policy</Typography>
          <Typography variant="body2" color="text.secondary">Manage endpoint device control policies, actions, assignments, and notifications.</Typography>
        </div>
        <Button variant="contained" startIcon={<AddCircleOutlineOutlined />} onClick={handleCreate}>Create Policy</Button>
      </div>
      <Paper elevation={0} className="rounded-2xl border border-gray-200 dark:border-gray-700">
        <Tabs value={tab} onChange={(_, value) => setTab(value)} variant="scrollable" scrollButtons="auto">
          <Tab label="Policy List" />
          <Tab label={editingPolicy ? 'Edit Policy' : 'Create New Policy'} />
          <Tab label="Policy Assignment" />
        </Tabs>
      </Paper>
      {tab === 0 && (
        <PolicyListPage
          policies={policies}
          selectedPolicyId={selectedPolicyId}
          onSelect={setSelectedPolicyId}
          onCreate={handleCreate}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onExport={() => exportPoliciesToCsv(policies)}
          onImport={handleImport}
        />
      )}
      {tab === 1 && <PolicyForm editingPolicy={editingPolicy} onSave={handleSave} onBack={() => setTab(0)} />}
      {tab === 2 && <AssignmentPage />}
      <Snackbar open={!!message} autoHideDuration={2500} onClose={() => setMessage('')} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity={message.includes('Invalid') ? 'error' : 'success'} variant="filled" onClose={() => setMessage('')}>{message}</Alert>
      </Snackbar>
    </div>
  )
}

export function ManageDevicePolicies() {
  const [policies, setPolicies] = useState<DevicePolicyRow[]>(policyRows)
  const [selectedPolicyId, setSelectedPolicyId] = useState<number | null>(policyRows[0]?.id ?? null)
  const [message, setMessage] = useState('')

  const handleImport = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as DevicePolicyRow[]
        if (!Array.isArray(parsed)) throw new Error('Invalid policy file')
        setPolicies(parsed.map((policy, index) => ({ ...policy, priority: index + 1 })))
        setSelectedPolicyId(parsed[0]?.id ?? null)
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
      <Typography variant="h5" fontWeight={800}>Manage Device Policies</Typography>
      <AssignmentPage />
      <PolicyListPage
        policies={policies}
        selectedPolicyId={selectedPolicyId}
        onSelect={setSelectedPolicyId}
        onCreate={() => setMessage('Use Device Policy > Create New Policy to add policies')}
        onEdit={() => setMessage('Use Device Policy page to edit selected policies')}
        onDelete={() => {
          if (!selectedPolicyId) return
          setPolicies((current) => current.filter((policy) => policy.id !== selectedPolicyId).map((policy, index) => ({ ...policy, priority: index + 1 })))
          setSelectedPolicyId(null)
          setMessage('Policy deleted successfully')
        }}
        onExport={() => exportPoliciesToCsv(policies)}
        onImport={handleImport}
      />
      <Snackbar open={!!message} autoHideDuration={2500} onClose={() => setMessage('')} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity={message.includes('Invalid') ? 'error' : 'success'} variant="filled" onClose={() => setMessage('')}>{message}</Alert>
      </Snackbar>
    </div>
  )
}



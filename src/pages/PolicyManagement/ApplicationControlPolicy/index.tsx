import { useState, type ChangeEvent, type ReactNode } from 'react'
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
import AppsOutlined from '@mui/icons-material/AppsOutlined'
import AssignmentTurnedInOutlined from '@mui/icons-material/AssignmentTurnedInOutlined'

type ApplicationCategory = 'Productivity' | 'Communication' | 'Development' | 'Utilities' | 'Entertainment' | 'Security' | 'System'
type PolicyAction = 'Allow' | 'Block' | 'Monitor'
type YesNo = 'Yes' | 'No'

interface ApplicationCategoryRow {
  id: number
  name: string
  description: string
  applicationCount: number
  isDefault: boolean
}

interface ApplicationInventoryRow {
  id: number
  name: string
  version: string
  publisher: string
  category: ApplicationCategory
  path: string
  installedOn: string
  lastUsed: string
  size: string
  isWhitelisted: boolean
}

interface DefaultPolicyRow {
  category: ApplicationCategory
  subCategory: string
  allow?: boolean
  block?: boolean
  monitor?: boolean
  generateEvent?: boolean
  userNotification?: boolean
  alertManager?: boolean
}

type DefaultPolicyField = 'allow' | 'block' | 'monitor' | 'generateEvent' | 'userNotification' | 'alertManager'

interface ApplicationPolicyRow {
  id: number
  priority: number
  name: string
  description: string
  user: string
  userGroup: string
  hostNames: string
  hostGroup: string
  category: ApplicationCategory
  applicationCategory: string
  policyState: 'Enabled' | 'Disabled'
  policyAction: string
  userNotification: boolean
  generateEvent: boolean
  alertManager: boolean
  policySchedule?: string
}

interface PolicyFormState {
  policyName: string
  description: string
  category: ApplicationCategory
  subCategory: string
  action: PolicyAction
  userNotification: YesNo
  managerNotification: YesNo
  generateEvent: YesNo
  assignments: AssignmentState
  policySchedule: string
}

interface AssignmentState {
  users: string[]
  userGroups: string[]
  hostNames: string[]
  hostGroups: string[]
}

const applicationCategories: ApplicationCategoryRow[] = [
  { id: 1, name: 'Productivity', description: 'Office and productivity applications', applicationCount: 15, isDefault: true },
  { id: 2, name: 'Communication', description: 'Email, chat, and communication tools', applicationCount: 8, isDefault: true },
  { id: 3, name: 'Development', description: 'Development tools and IDEs', applicationCount: 12, isDefault: true },
  { id: 4, name: 'Utilities', description: 'System utilities and tools', applicationCount: 20, isDefault: true },
  { id: 5, name: 'Entertainment', description: 'Entertainment and media applications', applicationCount: 5, isDefault: false },
  { id: 6, name: 'Security', description: 'Security and antivirus software', applicationCount: 3, isDefault: true },
  { id: 7, name: 'System', description: 'System and OS applications', applicationCount: 10, isDefault: true },
]

const applicationInventory: ApplicationInventoryRow[] = [
  { id: 1, name: 'Microsoft Word', version: '16.0.1', publisher: 'Microsoft Corporation', category: 'Productivity', path: 'C:\\Program Files\\Microsoft Office\\root\\Office16\\WINWORD.EXE', installedOn: '2024-01-15', lastUsed: '2024-06-01', size: '2.5 GB', isWhitelisted: true },
  { id: 2, name: 'Microsoft Excel', version: '16.0.1', publisher: 'Microsoft Corporation', category: 'Productivity', path: 'C:\\Program Files\\Microsoft Office\\root\\Office16\\EXCEL.EXE', installedOn: '2024-01-15', lastUsed: '2024-06-02', size: '2.3 GB', isWhitelisted: true },
  { id: 3, name: 'Google Chrome', version: '125.0.6422', publisher: 'Google LLC', category: 'Communication', path: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', installedOn: '2024-02-10', lastUsed: '2024-06-05', size: '1.8 GB', isWhitelisted: true },
  { id: 4, name: 'Visual Studio Code', version: '1.89.1', publisher: 'Microsoft Corporation', category: 'Development', path: 'C:\\Users\\User\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe', installedOn: '2024-03-05', lastUsed: '2024-06-05', size: '850 MB', isWhitelisted: true },
  { id: 5, name: 'Notepad++', version: '8.6.0', publisher: 'Don Ho', category: 'Utilities', path: 'C:\\Program Files\\Notepad++\\notepad++.exe', installedOn: '2024-01-20', lastUsed: '2024-05-28', size: '5.2 MB', isWhitelisted: true },
  { id: 6, name: 'Spotify', version: '1.2.30', publisher: 'Spotify AB', category: 'Entertainment', path: 'C:\\Users\\User\\AppData\\Roaming\\Spotify\\Spotify.exe', installedOn: '2024-02-15', lastUsed: '2024-06-04', size: '650 MB', isWhitelisted: false },
  { id: 7, name: 'Windows Defender', version: '4.18.2405', publisher: 'Microsoft Corporation', category: 'Security', path: 'C:\\ProgramData\\Microsoft\\Windows Defender\\Platform\\4.18.2405.4\\MsMpEng.exe', installedOn: '2024-01-01', lastUsed: '2024-06-05', size: '1.2 GB', isWhitelisted: true },
]

const defaultPolicyRows: DefaultPolicyRow[] = [
  { category: 'Productivity', subCategory: 'Office Suite', allow: true, block: true, generateEvent: true },
  { category: 'Productivity', subCategory: 'Email Clients', allow: true, block: true, generateEvent: true },
  { category: 'Communication', subCategory: 'Web Browsers', allow: true, block: true, generateEvent: true },
  { category: 'Communication', subCategory: 'Chat Applications', allow: true, block: true, generateEvent: true },
  { category: 'Development', subCategory: 'IDEs and Editors', allow: true, block: true, generateEvent: true },
  { category: 'Development', subCategory: 'Development Tools', allow: true, block: true, generateEvent: true },
  { category: 'Utilities', subCategory: 'System Utilities', allow: true, block: true, generateEvent: true },
  { category: 'Utilities', subCategory: 'File Managers', allow: true, block: true, generateEvent: true },
  { category: 'Entertainment', subCategory: 'Media Players', allow: true, block: true, generateEvent: true },
  { category: 'Entertainment', subCategory: 'Games', allow: true, block: true, generateEvent: true },
  { category: 'Security', subCategory: 'Antivirus', allow: true, block: true, generateEvent: true },
  { category: 'Security', subCategory: 'Firewall', allow: true, block: true, generateEvent: true },
  { category: 'System', subCategory: 'OS Components', allow: true, block: true, generateEvent: true },
]

const applicationPolicies: ApplicationPolicyRow[] = [
  {
    id: 1,
    priority: 1,
    name: 'Block Entertainment Apps',
    description: 'Block all entertainment applications during work hours',
    user: 'All Users',
    userGroup: 'All User Group',
    hostNames: 'All Host Groups',
    hostGroup: 'All Host Groups',
    category: 'Entertainment',
    applicationCategory: 'Entertainment',
    policyState: 'Enabled',
    policyAction: 'Block',
    userNotification: true,
    generateEvent: true,
    alertManager: false,
    policySchedule: '09:00-18:00',
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
    category: 'Productivity',
    applicationCategory: 'Default',
    policyState: 'Enabled',
    policyAction: 'Default actions',
    userNotification: false,
    generateEvent: false,
    alertManager: false,
    policySchedule: '',
  },
]

const defaultAssignments: AssignmentState = {
  users: ['Vikram'],
  userGroups: ['All User Group'],
  hostNames: ['desktop-01'],
  hostGroups: ['All Host Groups'],
}

const categories: ApplicationCategory[] = ['Productivity', 'Communication', 'Development', 'Utilities', 'Entertainment', 'Security', 'System']

const subCategoryOptions: Record<ApplicationCategory, string[]> = {
  'Productivity': ['Office Suite', 'Email Clients', 'PDF Readers', 'Note Taking'],
  'Communication': ['Web Browsers', 'Chat Applications', 'Video Conferencing', 'Email Clients'],
  'Development': ['IDEs and Editors', 'Development Tools', 'Version Control', 'Database Tools'],
  'Utilities': ['System Utilities', 'File Managers', 'Compression Tools', 'Backup Tools'],
  'Entertainment': ['Media Players', 'Games', 'Streaming Services'],
  'Security': ['Antivirus', 'Firewall', 'Encryption Tools', 'Password Managers'],
  'System': ['OS Components', 'Drivers', 'System Services'],
}

const initialForm: PolicyFormState = {
  policyName: '',
  description: '',
  category: 'Productivity',
  subCategory: 'Office Suite',
  action: 'Allow',
  userNotification: 'No',
  managerNotification: 'No',
  generateEvent: 'No',
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

function DefaultPolicyPage() {
  const [rows, setRows] = useState<DefaultPolicyRow[]>(defaultPolicyRows)
  const [message, setMessage] = useState('')

  const updateRow = (index: number, field: DefaultPolicyField, checked: boolean) => {
    setRows((current) => current.map((row, rowIndex) => {
      if (rowIndex !== index) return row

      if (field === 'allow' || field === 'block' || field === 'monitor') {
        return {
          ...row,
          allow: field === 'allow' ? checked : checked ? false : row.allow,
          block: field === 'block' ? checked : checked ? false : row.block,
          monitor: field === 'monitor' ? checked : checked ? false : row.monitor,
        }
      }

      return { ...row, [field]: checked }
    }))
  }

  const renderPolicyControl = (index: number, row: DefaultPolicyRow, field: DefaultPolicyField, type: 'radio' | 'checkbox' = 'checkbox') => {
    return (
      <input
        type={type}
        checked={!!row[field]}
        name={`${row.category}-${row.subCategory}-action`}
        onChange={(event) => updateRow(index, field, event.target.checked)}
        className="h-4 w-4 cursor-pointer accent-blue-500 align-middle drop-shadow-sm disabled:cursor-not-allowed disabled:opacity-40"
      />
    )
  }

  const renderCategoryCard = (category: ApplicationCategory, actionHeaders: string[], optionFields: DefaultPolicyField[]) => {
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
          <div>Application Sub Category</div>
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
                {renderPolicyControl(index, row, field, field === 'allow' || field === 'block' || field === 'monitor' ? 'radio' : 'checkbox')}
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
            <Typography variant="body2" className="text-slate-400">Configure default application permissions by category and sub-category.</Typography>
          </div>
          <Chip size="small" color="primary" variant="outlined" label={`${rows.length} sub-categories`} />
        </div>
        <div className="w-full space-y-5">
        {renderCategoryCard('Productivity', ['Allow', 'Block', 'Monitor', 'Generate Event'], ['allow', 'block', 'monitor', 'generateEvent'])}
        {renderCategoryCard('Communication', ['Allow', 'Block', 'Generate Event'], ['allow', 'block', 'generateEvent'])}
        {renderCategoryCard('Development', ['Allow', 'Block', 'Generate Event'], ['allow', 'block', 'generateEvent'])}
        {renderCategoryCard('Utilities', ['Allow', 'Block', 'Generate Event'], ['allow', 'block', 'generateEvent'])}
        {renderCategoryCard('Entertainment', ['Allow', 'Block', 'Generate Event'], ['allow', 'block', 'generateEvent'])}
        {renderCategoryCard('Security', ['Allow', 'Block', 'Generate Event'], ['allow', 'block', 'generateEvent'])}
        {renderCategoryCard('System', ['Allow', 'Block', 'Generate Event'], ['allow', 'block', 'generateEvent'])}
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

function ApplicationCategoriesPage() {
  const [categories, setCategories] = useState<ApplicationCategoryRow[]>(applicationCategories)
  const [editingCategory, setEditingCategory] = useState<ApplicationCategoryRow | null>(null)
  const [message, setMessage] = useState('')

  const handleAddCategory = () => {
    const newCategory: ApplicationCategoryRow = {
      id: Math.max(0, ...categories.map((c) => c.id)) + 1,
      name: '',
      description: '',
      applicationCount: 0,
      isDefault: false,
    }
    setEditingCategory(newCategory)
  }

  const handleSaveCategory = () => {
    if (!editingCategory) return
    if (!editingCategory.name.trim()) {
      setMessage('Category name is required')
      return
    }
    const existingIndex = categories.findIndex((c) => c.name.toLowerCase() === editingCategory.name.toLowerCase() && c.id !== editingCategory.id)
    if (existingIndex >= 0) {
      setMessage('Category name must be unique')
      return
    }
    if (editingCategory.id === 0 || !categories.find((c) => c.id === editingCategory.id)) {
      setCategories([...categories, { ...editingCategory, id: Math.max(0, ...categories.map((c) => c.id)) + 1 }])
      setMessage('Category added successfully')
    } else {
      setCategories(categories.map((c) => (c.id === editingCategory.id ? editingCategory : c)))
      setMessage('Category updated successfully')
    }
    setEditingCategory(null)
  }

  const handleDeleteCategory = (id: number) => {
    const category = categories.find((c) => c.id === id)
    if (category?.isDefault) {
      setMessage('Default categories cannot be deleted')
      return
    }
    if (!window.confirm('Are you sure you want to delete this category?')) return
    setCategories(categories.filter((c) => c.id !== id))
    setMessage('Category deleted successfully')
  }

  return (
    <div className="flex flex-col gap-4">
      <SectionCard title="Application Categories" subtitle="Create and manage application categories for policy assignment">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Tooltip title="Add category"><IconButton color="success" onClick={handleAddCategory}><AddCircleOutlineOutlined /></IconButton></Tooltip>
          </Stack>
          <Typography variant="body2" color="text.secondary">Default categories cannot be deleted</Typography>
        </div>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="min-w-[600px] w-full border-collapse text-left text-xs">
            <thead className="bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-200">
              <tr>
                <th className="border-b border-gray-200 px-4 py-3 font-bold dark:border-gray-700">Category Name</th>
                <th className="border-b border-gray-200 px-4 py-3 font-bold dark:border-gray-700">Description</th>
                <th className="border-b border-gray-200 px-4 py-3 font-bold dark:border-gray-700">Application Count</th>
                <th className="border-b border-gray-200 px-4 py-3 font-bold dark:border-gray-700">Type</th>
                <th className="border-b border-gray-200 px-4 py-3 font-bold dark:border-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="border-t border-gray-200 transition dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-950/20">
                  <td className="px-4 py-3 font-semibold">{category.name}</td>
                  <td className="px-4 py-3">{category.description}</td>
                  <td className="px-4 py-3">{category.applicationCount}</td>
                  <td className="px-4 py-3">
                    <Chip size="small" color={category.isDefault ? 'info' : 'default'} label={category.isDefault ? 'Default' : 'Custom'} />
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <Tooltip title="Edit category"><IconButton color="primary" size="small" onClick={() => setEditingCategory(category)}><EditOutlined fontSize="small" /></IconButton></Tooltip>
                    <Tooltip title="Delete category"><span><IconButton color="error" size="small" disabled={category.isDefault} onClick={() => handleDeleteCategory(category.id)}><DeleteOutlineOutlined fontSize="small" /></IconButton></span></Tooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
      {editingCategory && (
        <SectionCard title={editingCategory.id === 0 || !categories.find((c) => c.id === editingCategory.id) ? 'Add New Category' : 'Edit Category'}>
          <div className="grid gap-4 md:grid-cols-2">
            <TextField label="Category Name" value={editingCategory.name} onChange={(event) => setEditingCategory({ ...editingCategory, name: event.target.value })} size="small" />
            <TextField label="Description" value={editingCategory.description} onChange={(event) => setEditingCategory({ ...editingCategory, description: event.target.value })} size="small" />
            <div className="flex gap-2 md:col-span-2">
              <Button variant="contained" startIcon={<SaveOutlined />} onClick={handleSaveCategory}>Save</Button>
              <Button variant="outlined" onClick={() => setEditingCategory(null)}>Cancel</Button>
            </div>
          </div>
        </SectionCard>
      )}
      <Snackbar open={!!message} autoHideDuration={2500} onClose={() => setMessage('')} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity={message.includes('required') || message.includes('unique') || message.includes('cannot') ? 'error' : 'success'} variant="filled" onClose={() => setMessage('')}>{message}</Alert>
      </Snackbar>
    </div>
  )
}

function ApplicationInventoryPage() {
  const [applications, setApplications] = useState<ApplicationInventoryRow[]>(applicationInventory)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<ApplicationCategory | 'All'>('All')
  const [message, setMessage] = useState('')

  const filteredApplications = applications.filter((app) => {
    const matchesSearch = [app.name, app.publisher, app.path].some((value) => value.toLowerCase().includes(search.toLowerCase()))
    const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleToggleWhitelist = (id: number) => {
    setApplications(applications.map((app) => (app.id === id ? { ...app, isWhitelisted: !app.isWhitelisted } : app)))
    setMessage('Application whitelist status updated')
  }

  return (
    <div className="flex flex-col gap-4">
      <SectionCard title="Application Inventory" subtitle="View and manage installed applications across endpoints">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Category</InputLabel>
              <Select label="Category" value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value as ApplicationCategory | 'All')}>
                <MenuItem value="All">All Categories</MenuItem>
                {categories.map((category) => <MenuItem key={category} value={category}>{category}</MenuItem>)}
              </Select>
            </FormControl>
            <TextField size="small" placeholder="Search by name, publisher, or path" value={search} onChange={(event) => setSearch(event.target.value)} InputProps={{ startAdornment: <SearchOutlined fontSize="small" className="mr-2 text-gray-400" /> }} />
          </Stack>
          <Typography variant="body2" color="text.secondary">{filteredApplications.length} applications found</Typography>
        </div>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="min-w-[1200px] w-full border-collapse text-left text-xs">
            <thead className="bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-200">
              <tr>
                <th className="border-b border-gray-200 px-4 py-3 font-bold dark:border-gray-700">Application Name</th>
                <th className="border-b border-gray-200 px-4 py-3 font-bold dark:border-gray-700">Version</th>
                <th className="border-b border-gray-200 px-4 py-3 font-bold dark:border-gray-700">Publisher</th>
                <th className="border-b border-gray-200 px-4 py-3 font-bold dark:border-gray-700">Category</th>
                <th className="border-b border-gray-200 px-4 py-3 font-bold dark:border-gray-700">Path</th>
                <th className="border-b border-gray-200 px-4 py-3 font-bold dark:border-gray-700">Installed On</th>
                <th className="border-b border-gray-200 px-4 py-3 font-bold dark:border-gray-700">Last Used</th>
                <th className="border-b border-gray-200 px-4 py-3 font-bold dark:border-gray-700">Size</th>
                <th className="border-b border-gray-200 px-4 py-3 font-bold dark:border-gray-700">Whitelisted</th>
                <th className="border-b border-gray-200 px-4 py-3 font-bold dark:border-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((app) => (
                <tr key={app.id} className="border-t border-gray-200 transition dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-950/20">
                  <td className="px-4 py-3 font-semibold">{app.name}</td>
                  <td className="px-4 py-3">{app.version}</td>
                  <td className="px-4 py-3">{app.publisher}</td>
                  <td className="px-4 py-3">
                    <Chip size="small" variant="outlined" label={app.category} />
                  </td>
                  <td className="max-w-[200px] px-4 py-3"><span className="block truncate" title={app.path}>{app.path}</span></td>
                  <td className="px-4 py-3">{app.installedOn}</td>
                  <td className="px-4 py-3">{app.lastUsed}</td>
                  <td className="px-4 py-3">{app.size}</td>
                  <td className="px-4 py-3">
                    <Switch size="small" checked={app.isWhitelisted} onChange={() => handleToggleWhitelist(app.id)} />
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <Tooltip title="View details"><IconButton color="info" size="small"><FileDownloadOutlined fontSize="small" /></IconButton></Tooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
      <Snackbar open={!!message} autoHideDuration={2500} onClose={() => setMessage('')} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" onClose={() => setMessage('')}>{message}</Alert>
      </Snackbar>
    </div>
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

function PolicyForm({ onBack, onSave, editingPolicy }: { onBack?: () => void; onSave?: (form: PolicyFormState) => void; editingPolicy?: ApplicationPolicyRow | null }) {
  const [form, setForm] = useState<PolicyFormState>(() => editingPolicy ? {
    policyName: editingPolicy.name,
    description: editingPolicy.description,
    category: editingPolicy.category,
    subCategory: editingPolicy.applicationCategory,
    action: editingPolicy.policyAction === 'Block' || editingPolicy.policyAction === 'Monitor' ? editingPolicy.policyAction : 'Allow',
    userNotification: editingPolicy.userNotification ? 'Yes' : 'No',
    managerNotification: editingPolicy.alertManager ? 'Yes' : 'No',
    generateEvent: editingPolicy.generateEvent ? 'Yes' : 'No',
    assignments: {
      users: editingPolicy.user && editingPolicy.user !== '-' ? editingPolicy.user.split(',').map((value) => value.trim()) : defaultAssignments.users,
      userGroups: editingPolicy.userGroup && editingPolicy.userGroup !== '-' ? editingPolicy.userGroup.split(',').map((value) => value.trim()) : defaultAssignments.userGroups,
      hostNames: editingPolicy.hostNames && editingPolicy.hostNames !== '-' ? editingPolicy.hostNames.split(',').map((value) => value.trim()) : defaultAssignments.hostNames,
      hostGroups: editingPolicy.hostGroup && editingPolicy.hostGroup !== '-' ? editingPolicy.hostGroup.split(',').map((value) => value.trim()) : defaultAssignments.hostGroups,
    },
    policySchedule: editingPolicy.policySchedule ?? '',
  } : initialForm)

  const update = <K extends keyof PolicyFormState>(key: K, value: PolicyFormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }))
  }

  const updateAssignment = (key: keyof AssignmentState, values: string[]) => {
    update('assignments', { ...form.assignments, [key]: values })
  }

  const handleCategoryChange = (category: ApplicationCategory) => {
    update('category', category)
    update('subCategory', subCategoryOptions[category][0])
  }

  return (
    <SectionCard title="Create New Policy" subtitle="Build an application control rule for selected users, categories, and hosts">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="grid gap-4 md:grid-cols-2">
          <TextField label="Policy Name" value={form.policyName} onChange={(event) => update('policyName', event.target.value)} size="small" />
          <FormControl size="small">
            <InputLabel>Category Type</InputLabel>
            <Select label="Category Type" value={form.category} onChange={(event) => handleCategoryChange(event.target.value as ApplicationCategory)}>
              {categories.map((category) => <MenuItem key={category} value={category}>{category}</MenuItem>)}
            </Select>
          </FormControl>
          <TextField label="Policy Description" value={form.description} onChange={(event) => update('description', event.target.value)} size="small" multiline minRows={3} className="md:col-span-2" />
          <FormControl size="small">
            <InputLabel>Sub Category</InputLabel>
            <Select label="Sub Category" value={form.subCategory} onChange={(event) => update('subCategory', event.target.value)}>
              {subCategoryOptions[form.category].map((subCat) => <MenuItem key={subCat} value={subCat}>{subCat}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl>
            <Typography variant="subtitle2" fontWeight={700}>Policy Action</Typography>
            <RadioGroup row value={form.action} onChange={(event) => update('action', event.target.value as PolicyAction)}>
              <FormControlLabel value="Allow" control={<Radio size="small" />} label="Allow" />
              <FormControlLabel value="Block" control={<Radio size="small" />} label="Block" />
              <FormControlLabel value="Monitor" control={<Radio size="small" />} label="Monitor" />
            </RadioGroup>
          </FormControl>
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
            <Chip icon={<AppsOutlined />} label={form.subCategory} variant="outlined" />
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

interface PolicyListPageProps {
  policies: ApplicationPolicyRow[]
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
  onToggleUserNotification?: (policyId: number, checked: boolean) => void
  onToggleGenerateEvent?: (policyId: number, checked: boolean) => void
  onToggleAlertManager?: (policyId: number, checked: boolean) => void
  hasPendingChanges?: boolean
  onSaveChanges?: () => void
  onCancelChanges?: () => void
  showCreateButton?: boolean
}

function isDefaultPolicy(policy: ApplicationPolicyRow) {
  return policy.applicationCategory === 'Default' || policy.name.toLowerCase().includes('critical')
}

function PolicyListPage({ policies, selectedPolicyId, onSelect, onCreate, onEdit, onDelete, onExport, onExportJson, onImport, onToggleState, onMovePriority, onToggleUserNotification, onToggleGenerateEvent, onToggleAlertManager, hasPendingChanges, onSaveChanges, onCancelChanges, showCreateButton = false }: PolicyListPageProps) {
  return (
    <div className="flex flex-col gap-4">
      <SectionCard title="Application Control Policy List" subtitle="Create, edit, delete, import, export, and assign application policies">
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
          <table className="min-w-[1600px] w-full border-collapse text-left text-xs">
            <thead className="bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-200">
              <tr>
                {['Policy Priority', 'Move', 'Policy Name', 'Description', 'User', 'User Group', 'Host Names', 'Host Group', 'Category', 'Application Category', 'Policy State', 'Policy Action', 'User Notification', 'Generate Event', 'Alert Manager', 'Policy Schedule'].map((label) => (
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
                  <td className="px-4 py-3">{row.category}</td>
                  <td className="px-4 py-3">{row.applicationCategory}</td>
                  <td className="px-4 py-3">
                    <Switch size="small" checked={row.policyState === 'Enabled'} disabled={isDefaultPolicy(row)} onClick={(event) => event.stopPropagation()} onChange={(event) => onToggleState?.(row.id, event.target.checked)} />
                    <Chip size="small" color={row.policyState === 'Enabled' ? 'success' : 'default'} label={row.policyState} />
                  </td>
                  <td className="px-4 py-3">{row.policyAction}</td>
                  <td className="px-4 py-2 text-center"><Checkbox size="small" checked={row.userNotification} disabled={isDefaultPolicy(row)} onClick={(event) => event.stopPropagation()} onChange={(event) => onToggleUserNotification?.(row.id, event.target.checked)} /></td>
                  <td className="px-4 py-2 text-center"><Checkbox size="small" checked={row.generateEvent} disabled={isDefaultPolicy(row)} onClick={(event) => event.stopPropagation()} onChange={(event) => onToggleGenerateEvent?.(row.id, event.target.checked)} /></td>
                  <td className="px-4 py-2 text-center"><Checkbox size="small" checked={row.alertManager} disabled={isDefaultPolicy(row)} onClick={(event) => event.stopPropagation()} onChange={(event) => onToggleAlertManager?.(row.id, event.target.checked)} /></td>
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

function downloadTextFile(fileName: string, content: string, type: string) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = fileName
  anchor.click()
  URL.revokeObjectURL(url)
}

function exportPoliciesToCsv(policies: ApplicationPolicyRow[]) {
  const headers = ['Priority', 'Policy Name', 'Description', 'User', 'User Group', 'Host Names', 'Host Group', 'Category', 'Application Category', 'Policy State', 'Policy Action', 'User Notification', 'Generate Event', 'Alert Manager', 'Policy Schedule']
  const rows = policies.map((policy) => [
    policy.priority,
    policy.name,
    policy.description,
    policy.user,
    policy.userGroup,
    policy.hostNames,
    policy.hostGroup,
    policy.category,
    policy.applicationCategory,
    policy.policyState,
    policy.policyAction,
    policy.userNotification ? 'Yes' : 'No',
    policy.generateEvent ? 'Yes' : 'No',
    policy.alertManager ? 'Yes' : 'No',
    policy.policySchedule || 'Not time bound',
  ])
  const csv = [headers, ...rows].map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(',')).join('\n')
  downloadTextFile('application-control-policies.csv', csv, 'text/csv;charset=utf-8')
}

function exportPoliciesToJson(policies: ApplicationPolicyRow[]) {
  downloadTextFile('application-control-policies-backup.json', JSON.stringify(policies, null, 2), 'application/json;charset=utf-8')
}

export function ManageApplicationPolicies() {
  const [tab, setTab] = useState(0)
  const [policies, setPolicies] = useState<ApplicationPolicyRow[]>(applicationPolicies)
  const [savedPolicies, setSavedPolicies] = useState<ApplicationPolicyRow[]>(applicationPolicies)
  const [selectedPolicyId, setSelectedPolicyId] = useState<number | null>(applicationPolicies[0]?.id ?? null)
  const [editingPolicy, setEditingPolicy] = useState<ApplicationPolicyRow | null>(null)
  const [message, setMessage] = useState('')

  const hasPendingChanges = JSON.stringify(policies) !== JSON.stringify(savedPolicies)
  const selectedPolicy = policies.find((policy) => policy.id === selectedPolicyId) ?? null
  const orderedPolicies = [...policies].sort((a, b) => a.priority - b.priority)

  const normalizePolicies = (items: ApplicationPolicyRow[]) => {
    const regular = items.filter((policy) => !isDefaultPolicy(policy))
    const defaults = items.filter(isDefaultPolicy)
    return [...regular, ...defaults].map((policy, index) => ({ ...policy, priority: index + 1 }))
  }

  const handleCreate = () => {
    setEditingPolicy(null)
    setTab(3)
  }

  const handleEdit = () => {
    if (!selectedPolicy || isDefaultPolicy(selectedPolicy)) {
      setMessage('Default policy cannot be edited from policy list')
      return
    }
    setEditingPolicy(selectedPolicy)
    setTab(3)
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
      const nextPolicies = normalizePolicies(policies.map((policy) => policy.id === editingPolicy.id ? {
        ...policy,
        name: form.policyName || `${form.category} Policy`,
        description: form.description || `Policy for ${form.category}`,
        user: form.assignments.users.join(', ') || '-',
        userGroup: form.assignments.userGroups.join(', ') || '-',
        hostNames: form.assignments.hostNames.join(', ') || '-',
        hostGroup: form.assignments.hostGroups.join(', ') || '-',
        category: form.category,
        applicationCategory: form.subCategory,
        policyAction: form.action,
        userNotification: form.userNotification === 'Yes',
        generateEvent: form.generateEvent === 'Yes',
        alertManager: form.managerNotification === 'Yes',
        policySchedule: form.policySchedule,
        policyState: policy.policyState,
      } : policy))
      setPolicies(nextPolicies)
      setSavedPolicies(nextPolicies)
      setMessage('Policy updated successfully')
    } else {
      const nextId = Math.max(0, ...policies.map((policy) => policy.id)) + 1
      const newPolicy: ApplicationPolicyRow = {
        id: nextId,
        priority: 1,
        name: form.policyName || `${form.category} Policy`,
        description: form.description || `Policy for ${form.category}`,
        user: form.assignments.users.join(', ') || '-',
        userGroup: form.assignments.userGroups.join(', ') || '-',
        hostNames: form.assignments.hostNames.join(', ') || '-',
        hostGroup: form.assignments.hostGroups.join(', ') || '-',
        category: form.category,
        applicationCategory: form.subCategory,
        policyState: 'Disabled',
        policyAction: form.action,
        userNotification: form.userNotification === 'Yes',
        generateEvent: form.generateEvent === 'Yes',
        alertManager: form.managerNotification === 'Yes',
        policySchedule: form.policySchedule,
      }
      const nextPolicies = normalizePolicies([newPolicy, ...policies])
      setPolicies(nextPolicies)
      setSavedPolicies(nextPolicies)
      setSelectedPolicyId(newPolicy.id)
      setMessage('Policy created successfully. It is disabled by default until manually enabled.')
    }
    setEditingPolicy(null)
    setTab(4)
  }

  const handleToggleState = (policyId: number, enabled: boolean) => {
    setPolicies((current) => current.map((policy) => policy.id === policyId ? { ...policy, policyState: enabled ? 'Enabled' : 'Disabled' } : policy))
  }

  const handleToggleUserNotification = (policyId: number, checked: boolean) => {
    setPolicies((current) => current.map((policy) => policy.id === policyId ? { ...policy, userNotification: checked } : policy))
  }

  const handleToggleGenerateEvent = (policyId: number, checked: boolean) => {
    setPolicies((current) => current.map((policy) => policy.id === policyId ? { ...policy, generateEvent: checked } : policy))
  }

  const handleToggleAlertManager = (policyId: number, checked: boolean) => {
    setPolicies((current) => current.map((policy) => policy.id === policyId ? { ...policy, alertManager: checked } : policy))
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
        const parsed = JSON.parse(String(reader.result)) as ApplicationPolicyRow[]
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
        <Typography variant="h5" fontWeight={800}>Manage Application Policies</Typography>
        <Typography variant="body2" color="text.secondary">Manage application categories, inventory, and policy creation with assignment and priority.</Typography>
      </div>
      <Paper elevation={0} className="rounded-2xl border border-gray-200 dark:border-gray-700">
        <Tabs value={tab} onChange={(_, value) => setTab(value)} variant="scrollable" scrollButtons="auto">
          <Tab label="Default Policies" />
          <Tab label="Application Categories" />
          <Tab label="Application Inventory" />
          <Tab label={editingPolicy ? 'Edit Policy' : 'Create New Policy'} />
          <Tab label="Policy List" />
        </Tabs>
      </Paper>
      {tab === 0 && <DefaultPolicyPage />}
      {tab === 1 && <ApplicationCategoriesPage />}
      {tab === 2 && <ApplicationInventoryPage />}
      {tab === 3 && <PolicyForm editingPolicy={editingPolicy} onSave={handleSave} onBack={() => setTab(4)} />}
      {tab === 4 && (
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
          onToggleUserNotification={handleToggleUserNotification}
          onToggleGenerateEvent={handleToggleGenerateEvent}
          onToggleAlertManager={handleToggleAlertManager}
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

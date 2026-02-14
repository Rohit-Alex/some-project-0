import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import Popover from '@mui/material/Popover'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Badge from '@mui/material/Badge'
import FilterListOutlined from '@mui/icons-material/FilterListOutlined'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs, { Dayjs } from 'dayjs'
import type { ColumnFilter, SelectOption } from './types'

interface ColumnFilterCellProps {
  columnId: string
  filter: ColumnFilter
  value?: string | string[] | { start?: string; end?: string }
  onChange: (columnId: string, value: string | string[] | { start?: string; end?: string }) => void
}

export default function ColumnFilterCell({ columnId, filter, value, onChange }: ColumnFilterCellProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  // Temporary state for filter values (before Apply)
  const [tempTextValue, setTempTextValue] = useState((value as string) || '')
  const [tempSelectValue, setTempSelectValue] = useState((value as string) || '')
  const [tempDateValue, setTempDateValue] = useState<Dayjs | null>(
    (value as string) ? dayjs(value as string) : null
  )
  const [tempDateStart, setTempDateStart] = useState<Dayjs | null>(
    (value as { start?: string })?.start ? dayjs((value as { start?: string }).start) : null
  )
  const [tempDateEnd, setTempDateEnd] = useState<Dayjs | null>(
    (value as { end?: string })?.end ? dayjs((value as { end?: string }).end) : null
  )

  // Check if filter has an active value
  const hasValue =
    (typeof value === 'string' && value) ||
    (Array.isArray(value) && value.length > 0) ||
    (typeof value === 'object' && value && ((value as { start?: string }).start || (value as { end?: string }).end))

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    // Initialize temp values with current values when opening
    if (filter.type === 'text') {
      setTempTextValue((value as string) || '')
    } else if (filter.type === 'select') {
      setTempSelectValue((value as string) || '')
    } else if (filter.type === 'date') {
      setTempDateValue((value as string) ? dayjs(value as string) : null)
    } else if (filter.type === 'dateRange') {
      setTempDateStart((value as { start?: string })?.start ? dayjs((value as { start?: string }).start) : null)
      setTempDateEnd((value as { end?: string })?.end ? dayjs((value as { end?: string }).end) : null)
    }
  }

  const handleClosePopover = () => {
    setAnchorEl(null)
  }

  const handleApply = () => {
    switch (filter.type) {
      case 'text':
        onChange(columnId, tempTextValue)
        break
      case 'select':
        onChange(columnId, tempSelectValue)
        break
      case 'date':
        onChange(columnId, tempDateValue ? tempDateValue.format('YYYY-MM-DD') : '')
        break
      case 'dateRange':
        onChange(columnId, {
          start: tempDateStart ? tempDateStart.format('YYYY-MM-DD') : '',
          end: tempDateEnd ? tempDateEnd.format('YYYY-MM-DD') : '',
        })
        break
    }
    handleClosePopover()
  }

  const handleCancel = () => {
    // Reset temp values to current values
    if (filter.type === 'text') {
      setTempTextValue((value as string) || '')
    } else if (filter.type === 'select') {
      setTempSelectValue((value as string) || '')
    } else if (filter.type === 'date') {
      setTempDateValue((value as string) ? dayjs(value as string) : null)
    } else if (filter.type === 'dateRange') {
      setTempDateStart((value as { start?: string })?.start ? dayjs((value as { start?: string }).start) : null)
      setTempDateEnd((value as { end?: string })?.end ? dayjs((value as { end?: string }).end) : null)
    }
    handleClosePopover()
  }

  const handleReset = () => {
    switch (filter.type) {
      case 'text':
        setTempTextValue('')
        break
      case 'select':
        setTempSelectValue('')
        break
      case 'date':
        setTempDateValue(null)
        break
      case 'dateRange':
        setTempDateStart(null)
        setTempDateEnd(null)
        break
    }
  }

  const renderFilterContent = () => {
    switch (filter.type) {
      case 'text':
        return (
          <TextField
            size="small"
            placeholder={filter.placeholder || 'Filter...'}
            value={tempTextValue}
            onChange={(e) => setTempTextValue(e.target.value)}
            fullWidth
            autoFocus
          />
        )

      case 'select':
        return (
          <FormControl size="small" fullWidth>
            <Select
              value={tempSelectValue}
              onChange={(e) => setTempSelectValue(e.target.value)}
              displayEmpty
            >
              <MenuItem value="">
                <em>{filter.placeholder || 'All'}</em>
              </MenuItem>
              {filter.options?.map((option: SelectOption) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )

      case 'date':
        return (
          <DatePicker
            label={filter.placeholder || 'Select date'}
            value={tempDateValue}
            onChange={(newValue) => setTempDateValue(newValue)}
            slotProps={{
              textField: {
                size: 'small',
                fullWidth: true,
              },
            }}
          />
        )

      case 'dateRange':
        return (
          <Stack spacing={2}>
            <DatePicker
              label="Start Date"
              value={tempDateStart}
              onChange={(newValue) => setTempDateStart(newValue)}
              slotProps={{
                textField: {
                  size: 'small',
                  fullWidth: true,
                },
              }}
            />
            <DatePicker
              label="End Date"
              value={tempDateEnd}
              onChange={(newValue) => setTempDateEnd(newValue)}
              slotProps={{
                textField: {
                  size: 'small',
                  fullWidth: true,
                },
              }}
            />
          </Stack>
        )

      default:
        return null
    }
  }

  return (
    <>
      <IconButton
        size="small"
        onClick={handleOpenPopover}
        sx={{
          color: hasValue ? 'primary.main' : 'action.active',
        }}
      >
        <Badge color="primary" variant="dot" invisible={!hasValue}>
          <FilterListOutlined fontSize="small" />
        </Badge>
      </IconButton>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCancel}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack spacing={2} sx={{ p: 2, minWidth: 250 }}>
            {renderFilterContent()}
            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <Button size="small" onClick={handleReset}>
                Reset
              </Button>
              <Button size="small" onClick={handleCancel}>
                Cancel
              </Button>
              <Button size="small" variant="contained" onClick={handleApply}>
                Apply
              </Button>
            </Stack>
          </Stack>
        </LocalizationProvider>
      </Popover>
    </>
  )
}


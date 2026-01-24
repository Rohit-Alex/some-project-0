import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Popover from '@mui/material/Popover'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import SearchOutlined from '@mui/icons-material/SearchOutlined'
import ClearOutlined from '@mui/icons-material/ClearOutlined'
import type { ColumnFilter, SelectOption } from './types'

interface ColumnFilterCellProps {
  columnId: string
  filter: ColumnFilter
  value?: string | string[] | { start?: string; end?: string }
  onChange: (columnId: string, value: string | string[] | { start?: string; end?: string }) => void
}

export default function ColumnFilterCell({ columnId, filter, value, onChange }: ColumnFilterCellProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [dateStart, setDateStart] = useState((value as { start?: string })?.start || '')
  const [dateEnd, setDateEnd] = useState((value as { end?: string })?.end || '')

  const handleTextChange = (newValue: string) => {
    onChange(columnId, newValue)
  }

  const handleSelectChange = (newValue: string) => {
    onChange(columnId, newValue)
  }

  const handleDateClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDateApply = () => {
    onChange(columnId, { start: dateStart, end: dateEnd })
    setAnchorEl(null)
  }

  const handleClear = () => {
    onChange(columnId, '')
    setDateStart('')
    setDateEnd('')
  }

  const hasValue =
    (typeof value === 'string' && value) ||
    (Array.isArray(value) && value.length > 0) ||
    (typeof value === 'object' && value && ((value as { start?: string }).start || (value as { end?: string }).end))

  switch (filter.type) {
    case 'text':
      return (
        <TextField
          size="small"
          placeholder={filter.placeholder || 'Filter...'}
          value={(value as string) || ''}
          onChange={(e) => handleTextChange(e.target.value)}
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined fontSize="small" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
              endAdornment: hasValue ? (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={handleClear}>
                    <ClearOutlined fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null,
            },
          }}
          sx={{ minWidth: 100 }}
        />
      )

    case 'select':
      return (
        <FormControl size="small" fullWidth sx={{ minWidth: 100 }}>
          <Select
            value={(value as string) || ''}
            onChange={(e) => handleSelectChange(e.target.value)}
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
        <TextField
          size="small"
          type="date"
          value={(value as string) || ''}
          onChange={(e) => handleTextChange(e.target.value)}
          fullWidth
          slotProps={{
            inputLabel: { shrink: true },
            input: {
              endAdornment: hasValue ? (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={handleClear}>
                    <ClearOutlined fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null,
            },
          }}
          sx={{ minWidth: 130 }}
        />
      )

    case 'dateRange':
      return (
        <>
          <Button
            size="small"
            variant="outlined"
            onClick={handleDateClick}
            sx={{ textTransform: 'none', minWidth: 120 }}
          >
            {(value as { start?: string })?.start
              ? `${(value as { start?: string }).start} - ${(value as { end?: string }).end || '...'}`
              : filter.placeholder || 'Select dates'}
          </Button>
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          >
            <Stack spacing={2} className="p-3">
              <TextField
                size="small"
                label="Start"
                type="date"
                value={dateStart}
                onChange={(e) => setDateStart(e.target.value)}
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <TextField
                size="small"
                label="End"
                type="date"
                value={dateEnd}
                onChange={(e) => setDateEnd(e.target.value)}
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <Stack direction="row" spacing={1} justifyContent="flex-end">
                <Button size="small" onClick={handleClear}>
                  Clear
                </Button>
                <Button size="small" variant="contained" onClick={handleDateApply}>
                  Apply
                </Button>
              </Stack>
            </Stack>
          </Popover>
        </>
      )

    default:
      return null
  }
}


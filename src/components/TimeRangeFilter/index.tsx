import { useState } from 'react'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Popover from '@mui/material/Popover'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CalendarTodayOutlined from '@mui/icons-material/CalendarTodayOutlined'

export type TimeRange = '24h' | '7d' | '30d' | 'custom'

export interface TimeRangeValue {
  range: TimeRange
  startDate?: string
  endDate?: string
}

export interface TimeRangeFilterProps {
  value: TimeRangeValue
  onChange: (value: TimeRangeValue) => void
  className?: string
}

const TIME_RANGE_OPTIONS: { value: TimeRange; label: string }[] = [
  { value: '24h', label: '24 Hours' },
  { value: '7d', label: '7 Days' },
  { value: '30d', label: '30 Days' },
  { value: 'custom', label: 'Custom' },
]

export default function TimeRangeFilter({ value, onChange, className }: TimeRangeFilterProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [customStart, setCustomStart] = useState(value.startDate || '')
  const [customEnd, setCustomEnd] = useState(value.endDate || '')

  const handleRangeClick = (range: TimeRange, event?: React.MouseEvent<HTMLButtonElement>) => {
    if (range === 'custom') {
      setAnchorEl(event?.currentTarget || null)
    } else {
      onChange({ range })
    }
  }

  const handleCustomApply = () => {
    onChange({
      range: 'custom',
      startDate: customStart,
      endDate: customEnd,
    })
    setAnchorEl(null)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <div className={className}>
      <ButtonGroup variant="outlined" size="small">
        {TIME_RANGE_OPTIONS.map((option) => (
          <Button
            key={option.value}
            variant={value.range === option.value ? 'contained' : 'outlined'}
            onClick={(e) => handleRangeClick(option.value, e)}
            startIcon={option.value === 'custom' ? <CalendarTodayOutlined /> : undefined}
          >
            {option.label}
          </Button>
        ))}
      </ButtonGroup>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Stack spacing={2} className="p-4" sx={{ minWidth: 280 }}>
          <Typography variant="subtitle2">Custom Date Range</Typography>
          <TextField
            label="Start Date"
            type="datetime-local"
            value={customStart}
            onChange={(e) => setCustomStart(e.target.value)}
            size="small"
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <TextField
            label="End Date"
            type="datetime-local"
            value={customEnd}
            onChange={(e) => setCustomEnd(e.target.value)}
            size="small"
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Button size="small" onClick={handleClose}>
              Cancel
            </Button>
            <Button size="small" variant="contained" onClick={handleCustomApply}>
              Apply
            </Button>
          </Stack>
        </Stack>
      </Popover>
    </div>
  )
}


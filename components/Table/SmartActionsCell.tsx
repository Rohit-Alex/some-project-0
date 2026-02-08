import { useState, useRef } from 'react'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import type { SmartAction } from './types'

interface SmartActionsCellProps<T> {
  row: T
  rowIndex: number
  actions: SmartAction<T>[]
}

// ==============================|| SMART ACTIONS CELL ||============================== //

export default function SmartActionsCell<T>({
  row,
  rowIndex,
  actions,
}: SmartActionsCellProps<T>) {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLButtonElement>(null)

  const handleToggle = () => setOpen((prev) => !prev)
  const handleClose = () => setOpen(false)

  const handleAction = (action: SmartAction<T>) => {
    action.onClick(row, rowIndex)
    handleClose()
  }

  const isDisabled = (action: SmartAction<T>): boolean => {
    if (typeof action.disabled === 'function') {
      return action.disabled(row)
    }
    return !!action.disabled
  }

  return (
    <>
      <IconButton
        ref={anchorRef}
        size="small"
        onClick={handleToggle}
        aria-label="row actions"
        aria-controls={open ? 'smart-actions-menu' : undefined}
        aria-haspopup="true"
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>

      <Menu
        id="smart-actions-menu"
        anchorEl={anchorRef.current}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {actions.map((action, index) => [
          action.divider && index > 0 && <Divider key={`divider-${action.id}`} />,
          <MenuItem
            key={action.id}
            onClick={() => handleAction(action)}
            disabled={isDisabled(action)}
            sx={{ color: action.color ? `${action.color}.main` : undefined }}
          >
            {action.icon && <ListItemIcon sx={{ color: 'inherit' }}>{action.icon}</ListItemIcon>}
            <ListItemText primary={action.label} />
          </MenuItem>,
        ])}
      </Menu>
    </>
  )
}


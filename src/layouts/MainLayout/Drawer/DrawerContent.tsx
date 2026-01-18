import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Tooltip from '@mui/material/Tooltip'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '@config/routes'

// Icons
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined'
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'

interface NavItem {
  id: string
  title: string
  path: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    path: ROUTES.DASHBOARD,
    icon: <DashboardOutlinedIcon />,
  },
  {
    id: 'analytics',
    title: 'Analytics',
    path: '/analytics',
    icon: <BarChartOutlinedIcon />,
  },
  {
    id: 'tables',
    title: 'Tables',
    path: '/tables',
    icon: <TableChartOutlinedIcon />,
  },
  {
    id: 'settings',
    title: 'Settings',
    path: '/settings',
    icon: <SettingsOutlinedIcon />,
  },
]

interface DrawerContentProps {
  open: boolean
}

// ==============================|| DRAWER CONTENT ||============================== //

export default function DrawerContent({ open }: DrawerContentProps) {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden py-2">
      <List component="nav">
        {navItems.map((item) => {
          const isSelected = location.pathname === item.path

          const listItemContent = (
            <ListItemButton
              selected={isSelected}
              onClick={() => navigate(item.path)}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                mx: 1,
                borderRadius: 1,
                mb: 0.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.title}
                sx={{
                  opacity: open ? 1 : 0,
                  transition: 'opacity 0.2s',
                }}
              />
            </ListItemButton>
          )

          if (!open) {
            return (
              <Tooltip key={item.id} title={item.title} placement="right" arrow>
                <div>{listItemContent}</div>
              </Tooltip>
            )
          }

          return <div key={item.id}>{listItemContent}</div>
        })}
      </List>
    </div>
  )
}


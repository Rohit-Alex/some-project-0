import { useState, useMemo } from 'react'
import type { ReactNode } from 'react'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import Tooltip from '@mui/material/Tooltip'
import { useLocation, useNavigate } from 'react-router-dom'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import FiberManualRecordOutlined from '@mui/icons-material/FiberManualRecordOutlined'

// Navigation icons
import DashboardOutlined from '@mui/icons-material/DashboardOutlined'
import DevicesOutlined from '@mui/icons-material/DevicesOutlined'
import SwapHorizOutlined from '@mui/icons-material/SwapHorizOutlined'
import AppsOutlined from '@mui/icons-material/AppsOutlined'
import MonitorHeartOutlined from '@mui/icons-material/MonitorHeartOutlined'
import ComputerOutlined from '@mui/icons-material/ComputerOutlined'
import EventNoteOutlined from '@mui/icons-material/EventNoteOutlined'
import UsbOutlined from '@mui/icons-material/UsbOutlined'
import SyncAltOutlined from '@mui/icons-material/SyncAltOutlined'
import CategoryOutlined from '@mui/icons-material/CategoryOutlined'
import PolicyOutlined from '@mui/icons-material/PolicyOutlined'
import SecurityOutlined from '@mui/icons-material/SecurityOutlined'
import TuneOutlined from '@mui/icons-material/TuneOutlined'
import RuleOutlined from '@mui/icons-material/RuleOutlined'
import PlaylistAddCheckOutlined from '@mui/icons-material/PlaylistAddCheckOutlined'
import WidgetsOutlined from '@mui/icons-material/WidgetsOutlined'
import ListAltOutlined from '@mui/icons-material/ListAltOutlined'
import SettingsApplicationsOutlined from '@mui/icons-material/SettingsApplicationsOutlined'
import ClassOutlined from '@mui/icons-material/ClassOutlined'

import {
  NAV_ITEMS,
  type NavItem,
  type IconName,
  buildPath,
  isPathActive,
  getParentPaths,
} from '@config/navigation'

// Icon name to component map
const ICON_MAP: Record<IconName, ReactNode> = {
  dashboard: <DashboardOutlined />,
  devices: <DevicesOutlined />,
  swap: <SwapHorizOutlined />,
  apps: <AppsOutlined />,
  'monitor-heart': <MonitorHeartOutlined />,
  computer: <ComputerOutlined />,
  'event-note': <EventNoteOutlined />,
  usb: <UsbOutlined />,
  sync: <SyncAltOutlined />,
  category: <CategoryOutlined />,
  policy: <PolicyOutlined />,
  security: <SecurityOutlined />,
  tune: <TuneOutlined />,
  rule: <RuleOutlined />,
  'playlist-check': <PlaylistAddCheckOutlined />,
  widgets: <WidgetsOutlined />,
  'list-alt': <ListAltOutlined />,
  'settings-apps': <SettingsApplicationsOutlined />,
  class: <ClassOutlined />,
}

const getIcon = (iconName?: IconName): ReactNode => {
  if (!iconName) return <FiberManualRecordOutlined sx={{ fontSize: 8 }} />
  return ICON_MAP[iconName] || <FiberManualRecordOutlined sx={{ fontSize: 8 }} />
}

interface DrawerContentProps {
  open: boolean
}

interface NavItemRendererProps {
  item: NavItem
  parentPath: string
  depth: number
  drawerOpen: boolean
  expandedPaths: Set<string>
  onToggle: (path: string) => void
  currentPath: string
  onNavigate: (path: string) => void
}

function NavItemRenderer({
  item,
  parentPath,
  depth,
  drawerOpen,
  expandedPaths,
  onToggle,
  currentPath,
  onNavigate,
}: NavItemRendererProps) {
  const itemPath = buildPath(parentPath, item.id)
  const hasChildren = !!item.children?.length
  const isExpanded = expandedPaths.has(itemPath)
  const isActive = isPathActive(itemPath, currentPath)
  const isSelected = currentPath === itemPath

  const handleClick = () => {
    if (hasChildren) {
      onToggle(itemPath)
    } else {
      onNavigate(itemPath)
    }
  }

  const paddingLeft = drawerOpen ? 2 + depth * 2 : 2.5

  const listItemContent = (
    <ListItemButton
      selected={isSelected}
      onClick={handleClick}
      sx={{
        minHeight: 44,
        justifyContent: drawerOpen ? 'initial' : 'center',
        pl: paddingLeft,
        pr: 2,
        mx: 1,
        borderRadius: 1,
        mb: 0.25,
        ...(isActive &&
          !isSelected && {
          bgcolor: 'action.hover',
        }),
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: drawerOpen ? 1.5 : 'auto',
          justifyContent: 'center',
          color: isActive ? 'primary.main' : 'inherit',
        }}
      >
        {getIcon(item.icon)}
      </ListItemIcon>

      <ListItemText
        primary={item.title}
        primaryTypographyProps={{
          fontSize: depth > 0 ? '0.875rem' : '0.9375rem',
          fontWeight: isSelected ? 600 : 400,
          color: isActive ? 'primary.main' : 'text.primary',
          noWrap: true,
        }}
        sx={{
          opacity: drawerOpen ? 1 : 0,
          transition: 'opacity 0.2s',
          overflow: 'hidden',
        }}
      />

      {hasChildren && drawerOpen && (
        <>{isExpanded ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}</>
      )}
    </ListItemButton>
  )

  // Show tooltip when drawer is collapsed OR for nested items (which may be truncated)
  const showTooltip = !drawerOpen || depth > 0

  return (
    <>
      <Tooltip title={item.title} placement="right" arrow disableHoverListener={!showTooltip}>
        <div>{listItemContent}</div>
      </Tooltip>

      {hasChildren && (
        <Collapse in={isExpanded && drawerOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children!.map((child) => (
              <NavItemRenderer
                key={child.id}
                item={child}
                parentPath={itemPath}
                depth={depth + 1}
                drawerOpen={drawerOpen}
                expandedPaths={expandedPaths}
                onToggle={onToggle}
                currentPath={currentPath}
                onNavigate={onNavigate}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  )
}

export default function DrawerContent({ open }: DrawerContentProps) {
  const navigate = useNavigate()
  const location = useLocation()
  // Track manually expanded/collapsed paths: true = expanded, false = collapsed
  const [manualState, setManualState] = useState<Record<string, boolean>>({})

  // Compute auto-expanded paths based on current location
  const autoExpandedPaths = useMemo(() => {
    return new Set(getParentPaths(location.pathname))
  }, [location.pathname])

  // Merge auto-expanded with manual state
  const expandedPaths = useMemo(() => {
    const result = new Set(autoExpandedPaths)
    Object.entries(manualState).forEach(([path, isExpanded]) => {
      if (isExpanded) {
        result.add(path)
      } else {
        result.delete(path)
      }
    })
    return result
  }, [autoExpandedPaths, manualState])

  const handleToggle = (path: string) => {
    const isCurrentlyExpanded = expandedPaths.has(path)
    setManualState((prev) => ({
      ...prev,
      [path]: !isCurrentlyExpanded,
    }))
  }

  const handleNavigate = (path: string) => {
    // Clear manual state when navigating to let auto-expand work
    setManualState({})
    navigate(path)
  }

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden py-2">
      <List component="nav" disablePadding>
        {NAV_ITEMS.map((item) => (
          <NavItemRenderer
            key={item.id}
            item={item}
            parentPath=""
            depth={0}
            drawerOpen={open}
            expandedPaths={expandedPaths}
            onToggle={handleToggle}
            currentPath={location.pathname}
            onNavigate={handleNavigate}
          />
        ))}
      </List>
    </div>
  )
}

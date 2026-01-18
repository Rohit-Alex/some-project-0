import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { useNavigate } from 'react-router-dom'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import HistoryIcon from '@mui/icons-material/History'
import PrivacyTipOutlinedIcon from '@mui/icons-material/PrivacyTipOutlined'
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined'

interface SettingTabProps {
  handleClose: () => void
}

// ==============================|| SETTING TAB ||============================== //

export default function SettingTab({ handleClose }: SettingTabProps) {
  const navigate = useNavigate()

  const handleNavigate = (path: string) => {
    navigate(path)
    handleClose()
  }

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
      <ListItemButton onClick={() => handleNavigate('/support')}>
        <ListItemIcon>
          <SupportAgentOutlinedIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Support" />
      </ListItemButton>
      <ListItemButton onClick={() => handleNavigate('/history')}>
        <ListItemIcon>
          <HistoryIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Account Settings" />
      </ListItemButton>
      <ListItemButton onClick={() => handleNavigate('/privacy')}>
        <ListItemIcon>
          <PrivacyTipOutlinedIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Privacy Center" />
      </ListItemButton>
      <ListItemButton onClick={() => handleNavigate('/help')}>
        <ListItemIcon>
          <HelpOutlineIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Feedback" />
      </ListItemButton>
    </List>
  )
}


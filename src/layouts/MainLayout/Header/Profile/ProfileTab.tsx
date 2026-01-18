import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { useNavigate } from 'react-router-dom'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined'
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'

interface ProfileTabProps {
  handleLogout: () => void
  handleClose: () => void
}

// ==============================|| PROFILE TAB ||============================== //

export default function ProfileTab({ handleLogout, handleClose }: ProfileTabProps) {
  const navigate = useNavigate()

  const handleNavigate = (path: string) => {
    navigate(path)
    handleClose()
  }

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
      <ListItemButton onClick={() => handleNavigate('/profile/edit')}>
        <ListItemIcon>
          <EditOutlinedIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Edit Profile" />
      </ListItemButton>
      <ListItemButton onClick={() => handleNavigate('/profile')}>
        <ListItemIcon>
          <PersonOutlineIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="View Profile" />
      </ListItemButton>
      <ListItemButton onClick={() => handleNavigate('/profile/social')}>
        <ListItemIcon>
          <AccountBoxOutlinedIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Social Profile" />
      </ListItemButton>
      <ListItemButton onClick={() => handleNavigate('/billing')}>
        <ListItemIcon>
          <AccountBalanceWalletOutlinedIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Billing" />
      </ListItemButton>
      <ListItemButton onClick={handleLogout}>
        <ListItemIcon>
          <LogoutOutlinedIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>
  )
}


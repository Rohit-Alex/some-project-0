import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import { useThemeStore } from '@store/useThemeStore'
import { ThemeMode } from '@config/index'

// ==============================|| HEADER - THEME TOGGLE ||============================== //

export default function ThemeToggle() {
  const { mode, toggleTheme } = useThemeStore()
  const isDark = mode === ThemeMode.DARK

  return (
    <Tooltip title={isDark ? 'Light Mode' : 'Dark Mode'}>
      <IconButton
        color="inherit"
        onClick={toggleTheme}
        aria-label="theme toggle"
        sx={{
          '&:hover': {
            bgcolor: 'action.hover',
          },
        }}
      >
        {isDark ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
      </IconButton>
    </Tooltip>
  )
}


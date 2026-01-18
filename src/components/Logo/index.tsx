import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ButtonBase, useTheme } from '@mui/material'
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined'
import { APP_DEFAULT_PATH } from '@config/index'

interface LogoProps {
  to?: string
  showText?: boolean
}

export default function Logo({ to, showText = true }: LogoProps): ReactNode {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  return (
    <ButtonBase
      disableRipple
      component={Link}
      to={to || APP_DEFAULT_PATH}
      aria-label="Secure Policy Logo"
      sx={{ gap: 1 }}
    >
      <SecurityOutlinedIcon
        sx={{
          fontSize: 32,
          color: 'primary.main',
        }}
      />
      {showText && (
        <span
          className="text-lg font-semibold whitespace-nowrap"
          style={{ color: isDark ? '#ffffff' : '#1e293b' }}
        >
          Secure Policy
        </span>
      )}
    </ButtonBase>
  )
}

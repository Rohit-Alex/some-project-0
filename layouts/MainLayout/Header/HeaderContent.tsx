import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import Divider from '@mui/material/Divider'
import Profile from './Profile'
import FullScreen from './FullScreen'
import ThemeToggle from './ThemeToggle'

// ==============================|| HEADER CONTENT ||============================== //

export default function HeaderContent() {
  const theme = useTheme()
  const downLG = useMediaQuery(theme.breakpoints.down('lg'))

  return (
    <>
      {/* Left side - can add search, workspace selector, etc. */}
      <div className="flex-1" />

      {/* Right side - actions */}
      <div className="flex items-center gap-1">
        <ThemeToggle />
        {!downLG && (
          <>
            <Divider orientation="vertical" flexItem sx={{ height: 24, alignSelf: 'center', mx: 0.5 }} />
            <FullScreen />
          </>
        )}
        <Divider orientation="vertical" flexItem sx={{ height: 24, alignSelf: 'center', mx: 0.5 }} />
        <Profile />
      </div>
    </>
  )
}


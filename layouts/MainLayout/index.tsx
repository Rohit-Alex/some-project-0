import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Drawer from './Drawer'
import Header from './Header'
import { useLayoutStore } from '@store/useLayoutStore'
import { DRAWER_WIDTH, MINI_DRAWER_WIDTH } from '@config/index'

// ==============================|| MAIN LAYOUT ||============================== //

export default function MainLayout() {
  const theme = useTheme()
  const { drawerOpen, setDrawerOpen } = useLayoutStore()
  const downLG = useMediaQuery(theme.breakpoints.down('lg'))

  // Close drawer on mobile when screen size changes
  useEffect(() => {
    if (downLG) {
      setDrawerOpen(false)
    }
  }, [downLG, setDrawerOpen])

  const mainContentWidth = drawerOpen ? DRAWER_WIDTH : MINI_DRAWER_WIDTH

  return (
    <div className="flex w-full min-h-screen">
      <Header />
      <Drawer />

      <main
        className="flex-1 flex flex-col min-h-screen"
        style={{
          width: `calc(100% - ${downLG ? 0 : mainContentWidth}px)`,
          marginLeft: downLG ? 0 : undefined,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <Toolbar /> {/* Spacer for fixed AppBar */}
        <div className="flex-1 p-4 md:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}


import useMediaQuery from '@mui/material/useMediaQuery'
import Drawer from '@mui/material/Drawer'
import { useTheme } from '@mui/material/styles'
import DrawerHeader from './DrawerHeader'
import DrawerContent from './DrawerContent'
import MiniDrawerStyled from './MiniDrawerStyled'
import { useLayoutStore } from '@store/useLayoutStore'
import { DRAWER_WIDTH } from '@config/index'

// ==============================|| MAIN DRAWER ||============================== //

export default function MainDrawer() {
  const theme = useTheme()
  const { drawerOpen, toggleDrawer } = useLayoutStore()
  const downLG = useMediaQuery(theme.breakpoints.down('lg'))

  return (
    <nav
      className="shrink-0"
      style={{ zIndex: 1200 }}
      aria-label="main navigation"
    >
      {!downLG ? (
        <MiniDrawerStyled variant="permanent" open={drawerOpen}>
          <DrawerHeader open={drawerOpen} />
          <DrawerContent open={drawerOpen} />
        </MiniDrawerStyled>
      ) : (
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={toggleDrawer}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: drawerOpen ? 'block' : 'none', lg: 'none' },
          }}
          slotProps={{
            paper: {
              sx: {
                boxSizing: 'border-box',
                width: DRAWER_WIDTH,
                borderRight: '1px solid',
                borderRightColor: 'divider',
              },
            },
          }}
        >
          <DrawerHeader open={true} />
          <DrawerContent open={true} />
        </Drawer>
      )}
    </nav>
  )
}


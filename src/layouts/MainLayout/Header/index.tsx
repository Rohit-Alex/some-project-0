import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import AppBarStyled from './AppBarStyled'
import HeaderContent from './HeaderContent'
import { useLayoutStore } from '@store/useLayoutStore'

// ==============================|| MAIN HEADER ||============================== //

export default function Header() {
  const theme = useTheme()
  const { drawerOpen, toggleDrawer } = useLayoutStore()
  const downLG = useMediaQuery(theme.breakpoints.down('lg'))

  const mainHeader = (
    <Toolbar>
      <IconButton
        aria-label="toggle drawer"
        onClick={toggleDrawer}
        edge="start"
        sx={{
          color: 'text.primary',
          bgcolor: drawerOpen ? 'transparent' : 'action.hover',
          mr: 2,
        }}
      >
        {drawerOpen ? <MenuOpenIcon /> : <MenuIcon />}
      </IconButton>
      <HeaderContent />
    </Toolbar>
  )

  return (
    <>
      {!downLG ? (
        <AppBarStyled
          position="fixed"
          color="inherit"
          elevation={0}
          open={drawerOpen}
          sx={{
            borderBottom: '1px solid',
            borderBottomColor: 'divider',
          }}
        >
          {mainHeader}
        </AppBarStyled>
      ) : (
        <AppBar
          position="fixed"
          color="inherit"
          elevation={0}
          sx={{
            borderBottom: '1px solid',
            borderBottomColor: 'divider',
          }}
        >
          {mainHeader}
        </AppBar>
      )}
    </>
  )
}


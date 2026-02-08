import { styled } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import { DRAWER_WIDTH, MINI_DRAWER_WIDTH } from '@config/index'

interface AppBarStyledProps {
  open?: boolean
}

// ==============================|| HEADER - APP BAR STYLED ||============================== //

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarStyledProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(!open && {
    marginLeft: MINI_DRAWER_WIDTH,
    width: `calc(100% - ${MINI_DRAWER_WIDTH}px)`,
  }),
}))

export default AppBarStyled


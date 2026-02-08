import type { Theme, CSSObject } from '@mui/material/styles'
import { styled } from '@mui/material/styles'
import Drawer from '@mui/material/Drawer'
import { DRAWER_WIDTH, MINI_DRAWER_WIDTH } from '@config/index'

const openedMixin = (theme: Theme): CSSObject => ({
  width: DRAWER_WIDTH,
  borderRight: '1px solid',
  borderRightColor: theme.palette.divider,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  boxShadow: 'none',
})

const closedMixin = (theme: Theme): CSSObject => ({
  width: MINI_DRAWER_WIDTH,
  borderRight: 'none',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  boxShadow: theme.shadows[1],
})

// ==============================|| DRAWER - MINI STYLED ||============================== //

interface MiniDrawerStyledProps {
  open?: boolean
}

const MiniDrawerStyled = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})<MiniDrawerStyledProps>(({ theme, open }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

export default MiniDrawerStyled


import { styled } from '@mui/material/styles'
import Logo from '@components/Logo'
import { DRAWER_WIDTH, MINI_DRAWER_WIDTH } from '@config/index'

interface DrawerHeaderProps {
  open: boolean
}

const DrawerHeaderStyled = styled('div', {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: open ? 'flex-start' : 'center',
  padding: theme.spacing(0, 1),
  paddingLeft: open ? theme.spacing(2) : 0,
  minHeight: 64,
  width: open ? DRAWER_WIDTH : MINI_DRAWER_WIDTH,
  transition: theme.transitions.create(['width', 'padding'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
}))

// ==============================|| DRAWER HEADER ||============================== //

export default function DrawerHeader({ open }: DrawerHeaderProps) {
  return (
    <DrawerHeaderStyled open={open}>
      <Logo showText={open} />
    </DrawerHeaderStyled>
  )
}


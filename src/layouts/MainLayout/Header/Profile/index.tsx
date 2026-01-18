import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import ButtonBase from '@mui/material/ButtonBase'
import CardContent from '@mui/material/CardContent'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Fade from '@mui/material/Fade'
import Divider from '@mui/material/Divider'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import ProfileTab from './ProfileTab'
import SettingTab from './SettingTab'
import { useLogout, useAuthUser } from '@modules/auth'
import { ROUTES } from '@config/routes'

// ==============================|| HEADER - PROFILE ||============================== //

export default function Profile() {
  const navigate = useNavigate()
  const user = useAuthUser()
  const logout = useLogout()

  const anchorRef = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)
  const [tabValue, setTabValue] = useState(0)

  const handleToggle = () => setOpen((prev) => !prev)
  const handleClose = () => setOpen(false)

  const handleLogout = () => {
    logout()
    navigate(ROUTES.LOGIN)
    handleClose()
  }

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <div className="shrink-0 ml-auto">
      <Tooltip title="Profile">
        <ButtonBase
          ref={anchorRef}
          onClick={handleToggle}
          aria-label="open profile"
          aria-controls={open ? 'profile-menu' : undefined}
          aria-haspopup="true"
          sx={{
            p: 0.25,
            borderRadius: 1,
            '&:focus-visible': {
              outline: '2px solid',
              outlineColor: 'primary.main',
              outlineOffset: 2,
            },
          }}
        >
          <Avatar
            alt={user?.name ?? 'User'}
            sx={{
              width: 32,
              height: 32,
              bgcolor: 'primary.main',
              '&:hover': {
                outline: '2px solid',
                outlineColor: 'primary.main',
              },
            }}
          >
            {user?.name?.charAt(0).toUpperCase() ?? 'U'}
          </Avatar>
        </ButtonBase>
      </Tooltip>

      <Popper
        id="profile-menu"
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-end"
        transition
        disablePortal
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 9],
            },
          },
        ]}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={200}>
            <Paper
              elevation={8}
              sx={{
                width: 290,
                minWidth: 240,
                maxWidth: { xs: 250, md: 290 },
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <div>
                  <CardContent sx={{ px: 2.5, pt: 3 }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar
                          sx={{ width: 44, height: 44, bgcolor: 'primary.main' }}
                        >
                          {user?.name?.charAt(0).toUpperCase() ?? 'U'}
                        </Avatar>
                        <div>
                          <Typography variant="subtitle1" fontWeight={600}>
                            {user?.name ?? 'JWT User'}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {user?.role ?? 'UI/UX Designer'}
                          </Typography>
                        </div>
                      </div>
                      <Tooltip title="Logout">
                        <IconButton onClick={handleLogout} size="large">
                          <LogoutOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </CardContent>

                  <Divider />

                  <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    variant="fullWidth"
                    aria-label="profile tabs"
                  >
                    <Tab
                      icon={<PersonOutlineIcon />}
                      iconPosition="start"
                      label="Profile"
                      sx={{ textTransform: 'capitalize' }}
                    />
                    <Tab
                      icon={<SettingsOutlinedIcon />}
                      iconPosition="start"
                      label="Setting"
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </Tabs>

                  <div role="tabpanel" hidden={tabValue !== 0}>
                    {tabValue === 0 && (
                      <ProfileTab handleLogout={handleLogout} handleClose={handleClose} />
                    )}
                  </div>
                  <div role="tabpanel" hidden={tabValue !== 1}>
                    {tabValue === 1 && <SettingTab handleClose={handleClose} />}
                  </div>
                </div>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  )
}


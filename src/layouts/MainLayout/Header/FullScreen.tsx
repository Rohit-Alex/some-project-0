import { useEffect, useState } from 'react'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit'
import { toggleFullscreen, onFullscreenChange } from '@utils/fullscreen'

// ==============================|| HEADER - FULLSCREEN ||============================== //

export default function FullScreen() {
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    return onFullscreenChange(setIsFullscreen)
  }, [])

  return (
    <Tooltip title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}>
      <IconButton
        color="inherit"
        onClick={toggleFullscreen}
        aria-label="fullscreen toggle"
        sx={{
          bgcolor: isFullscreen ? 'action.selected' : 'transparent',
          '&:hover': {
            bgcolor: 'action.hover',
          },
        }}
      >
        {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
      </IconButton>
    </Tooltip>
  )
}


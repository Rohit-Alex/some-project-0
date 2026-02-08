// ==============================|| FULLSCREEN UTILITY ||============================== //

/**
 * Check if fullscreen is currently active
 */
export const isFullscreen = (): boolean => {
  return !!document.fullscreenElement
}

/**
 * Toggle fullscreen mode
 */
export const toggleFullscreen = (): void => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      console.error(`Error attempting to enable fullscreen: ${err.message}`)
    })
  } else {
    document.exitFullscreen()
  }
}

/**
 * Subscribe to fullscreen change events
 * @returns cleanup function
 */
export const onFullscreenChange = (callback: (isFullscreen: boolean) => void): (() => void) => {
  const handler = () => callback(!!document.fullscreenElement)
  document.addEventListener('fullscreenchange', handler)
  return () => document.removeEventListener('fullscreenchange', handler)
}


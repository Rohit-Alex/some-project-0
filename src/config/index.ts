// ==============================|| THEME CONSTANTS ||============================== //

// Re-export routes
export { ROUTES } from './routes'

export const APP_DEFAULT_PATH = '/dashboard'
export const DRAWER_WIDTH = 260
export const MINI_DRAWER_WIDTH = 60

export const ThemeMode = {
  LIGHT: 'light',
  DARK: 'dark',
} as const

export type ThemeMode = (typeof ThemeMode)[keyof typeof ThemeMode]

export const ThemeDirection = {
  LTR: 'ltr',
  RTL: 'rtl',
} as const

export type ThemeDirection = (typeof ThemeDirection)[keyof typeof ThemeDirection]

// ==============================|| THEME CONFIG ||============================== //

const config = {
  defaultPath: APP_DEFAULT_PATH,
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  themeDirection: ThemeDirection.LTR,
  presetColor: 'default',
}

export default config

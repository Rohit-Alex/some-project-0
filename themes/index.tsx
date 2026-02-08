import { useMemo } from 'react'
import type { ReactNode } from 'react'
import { createTheme, ThemeProvider as MUIThemeProvider, CssBaseline } from '@mui/material'
import { useThemeStore } from '../store'
import { ThemeMode } from '../config'

interface ThemeProviderProps {
  children: ReactNode
}

export default function ThemeProvider({ children }: ThemeProviderProps): ReactNode {
  const { mode } = useThemeStore()

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode === ThemeMode.DARK ? 'dark' : 'light',
          primary: {
            main: '#1890ff',
            light: '#69c0ff',
            dark: '#096dd9',
            contrastText: '#fff',
          },
          secondary: {
            main: '#8c8c8c',
            light: '#bfbfbf',
            dark: '#595959',
            contrastText: '#fff',
          },
          error: {
            main: '#ff4d4f',
            light: '#ff7875',
            dark: '#cf1322',
          },
          warning: {
            main: '#faad14',
            light: '#ffc53d',
            dark: '#d48806',
          },
          success: {
            main: '#52c41a',
            light: '#95de64',
            dark: '#389e0d',
          },
          background: {
            default: mode === ThemeMode.DARK ? '#121212' : '#fafafa',
            paper: mode === ThemeMode.DARK ? '#1e1e1e' : '#ffffff',
          },
          divider: mode === ThemeMode.DARK ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
        },
        typography: {
          htmlFontSize: 16,
          fontFamily: '"Public Sans", "Roboto", "Helvetica", "Arial", sans-serif',
          fontWeightLight: 300,
          fontWeightRegular: 400,
          fontWeightMedium: 500,
          fontWeightBold: 600,
          h1: {
            fontWeight: 600,
            fontSize: '2.375rem',
            lineHeight: 1.21,
          },
          h2: {
            fontWeight: 600,
            fontSize: '1.875rem',
            lineHeight: 1.27,
          },
          h3: {
            fontWeight: 600,
            fontSize: '1.5rem',
            lineHeight: 1.33,
          },
          h4: {
            fontWeight: 600,
            fontSize: '1.25rem',
            lineHeight: 1.4,
          },
          h5: {
            fontWeight: 600,
            fontSize: '1rem',
            lineHeight: 1.5,
          },
          h6: {
            fontWeight: 400,
            fontSize: '0.875rem',
            lineHeight: 1.57,
          },
          caption: {
            fontWeight: 400,
            fontSize: '0.75rem',
            lineHeight: 1.66,
          },
          body1: {
            fontSize: '0.875rem',
            lineHeight: 1.57,
          },
          body2: {
            fontSize: '0.75rem',
            lineHeight: 1.66,
          },
          subtitle1: {
            fontSize: '0.875rem',
            fontWeight: 600,
            lineHeight: 1.57,
          },
          subtitle2: {
            fontSize: '0.75rem',
            fontWeight: 500,
            lineHeight: 1.66,
          },
          button: {
            textTransform: 'capitalize',
          },
        },
        shape: {
          borderRadius: 8,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                fontWeight: 500,
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
              },
            },
          },
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: mode === ThemeMode.DARK ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
                },
              },
            },
          },
        },
      }),
    [mode]
  )

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  )
}


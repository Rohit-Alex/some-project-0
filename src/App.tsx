import type { ReactNode } from 'react'
import { RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import ThemeProvider from './themes'
import router from './routes'
import { queryClient } from './services'

function App(): ReactNode {
  return (
    <div className="h-full flex flex-col">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  )
}

export default App

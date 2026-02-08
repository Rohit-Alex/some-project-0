import type { ReactNode } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useIsAuthenticated } from '../../modules/auth'
import { ROUTES } from '../../config/routes'

// Layout route version - uses Outlet for nested routes
export default function GuestGuard(): ReactNode {
  const isAuthenticated = useIsAuthenticated()

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />
  }

  return <Outlet />
}

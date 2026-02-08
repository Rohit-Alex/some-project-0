import type { ReactNode } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useIsAuthenticated } from '../../modules/auth'
import { ROUTES } from '../../config/routes'

// Layout route version - uses Outlet for nested routes
export default function AuthGuard(): ReactNode {
  const isAuthenticated = useIsAuthenticated()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  }

  return <Outlet />
}

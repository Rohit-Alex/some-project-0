import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AuthGuard, GuestGuard } from '@components/guards'
import { MainLayout } from '@/layouts'
import { ROUTES } from '@config/routes'

// Pages
import { Login, Signup, ForgotPassword, Dashboard } from '@/pages'

const router = createBrowserRouter([
  // Root redirect
  {
    path: ROUTES.ROOT,
    element: <Navigate to={ROUTES.DASHBOARD} replace />,
  },

  // Guest routes (only accessible when NOT logged in)
  {
    element: <GuestGuard />,
    children: [
      {
        path: ROUTES.LOGIN,
        element: <Login />,
      },
      {
        path: ROUTES.REGISTER,
        element: <Signup />,
      },
      {
        path: ROUTES.FORGOT_PASSWORD,
        element: <ForgotPassword />,
      },
    ],
  },

  // Protected routes (only accessible when logged in)
  {
    element: <AuthGuard />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: ROUTES.DASHBOARD,
            element: <Dashboard />,
          },
          // Add more dashboard routes here:
          // { path: '/analytics', element: <Analytics /> },
          // { path: '/tables', element: <Tables /> },
          // { path: '/settings', element: <Settings /> },
        ],
      },
    ],
  },

  // 404 fallback
  {
    path: ROUTES.NOT_FOUND,
    element: <Navigate to={ROUTES.LOGIN} replace />,
  },
])

export default router

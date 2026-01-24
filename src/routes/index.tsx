import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AuthGuard, GuestGuard } from '@components/guards'
import { MainLayout } from '@/layouts'
import { ROUTES } from '@config/routes'
import { NAVIGABLE_ROUTES } from '@config/navigation'
import LazyPage from '@pages/LazyPage'

// Auth Pages
import { Login, Signup, ForgotPassword, Dashboard } from '@/pages'

// Event Pages
import { ApplicationControl } from '@pages/Events'

const dynamicRoutes = NAVIGABLE_ROUTES.map((route) => ({
  path: route.path,
  element: <LazyPage title={route.title} />,
}))

const router = createBrowserRouter([  
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
          // Events
          {
            path: ROUTES.EVENTS_APPLICATION_CONTROL,
            element: <ApplicationControl />,
          },
          // Other dynamic routes (placeholders)
          ...dynamicRoutes,
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

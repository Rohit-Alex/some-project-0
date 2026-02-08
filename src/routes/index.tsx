import { MainLayout } from '@/layouts';
import LazyPage from '@pages/LazyPage';
import { ROUTES } from '@config/routes';
import { NAVIGABLE_ROUTES } from '@config/navigation';
import { AuthGuard, GuestGuard } from '@components/guards';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// Auth Pages
import { Login, Signup, ForgotPassword, Dashboard, CheckMail } from '@/pages';

// Event Pages
import { ApplicationControl } from '@pages/Events';

// Dashboard Pages
import {
    DeviceControlDashboard,
    DataTransferDashboard,
    ApplicationControlDashboard,
} from '@pages/Dashboard';

// Profile
import TabPersonal from '@/layouts/MainLayout/Header/Profile/TabPersonal';
import TabPassword from '@/layouts/MainLayout/Header/Profile/TabPassword';
import ProfileLayout from '@/layouts/MainLayout/Header/Profile/ProfileLayout';

const dynamicRoutes = NAVIGABLE_ROUTES.map((route) => ({
    path: route.path,
    element: <LazyPage title={route.title} />,
}));

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
        {
            path: ROUTES.CHECK_EMAIL,
            element: <CheckMail />,
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
                    {
                        path: "profile",
                        element: <ProfileLayout />,
                        children: [
                            {
                                index: true,
                                element: <Navigate to="edit" replace />
                            },
                            {
                                path: "edit",
                                element: <TabPersonal />
                            },
                            {
                                path: "password",
                                element: <TabPassword />
                            },
                        ]
                    },
                    // Dashboard Modules
                    {
                        path: ROUTES.DASHBOARD_DEVICE_CONTROL,
                        element: <DeviceControlDashboard />,
                    },
                    {
                        path: ROUTES.DASHBOARD_DATA_TRANSFER,
                        element: <DataTransferDashboard />,
                    },
                    {
                        path: ROUTES.DASHBOARD_APPLICATION_CONTROL,
                        element: <ApplicationControlDashboard />,
                    },
                    // Events
                    {
                        path: ROUTES.EVENTS_APPLICATION_CONTROL,
                        element: <ApplicationControl />,
                    },
                    {
                        path: ROUTES.EVENTS_DATA_CLASSIFICATION,
                        element: <ApplicationControl />,
                    },
                    {
                        path: ROUTES.EVENTS_DATA_TRANSFER,
                        element: <ApplicationControl />,
                    },
                    {
                        path: ROUTES.EVENTS_DEVICE_CONTROL,
                        element: <ApplicationControl />,
                    },
                    {
                        path: ROUTES.DEVICE_HEALTH_ENDPOINTS,
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

export default router;

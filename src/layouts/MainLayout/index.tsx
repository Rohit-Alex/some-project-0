import Drawer from './Drawer';
import Header from './Header';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import { useLayoutStore } from '@store/useLayoutStore';
import useMediaQuery from '@mui/material/useMediaQuery';
import { DRAWER_WIDTH, MINI_DRAWER_WIDTH } from '@config/index';

// ==============================|| MAIN LAYOUT ||============================== //

export default function MainLayout() {
    const theme = useTheme();
    const { drawerOpen, setDrawerOpen } = useLayoutStore();
    const downLG = useMediaQuery(theme.breakpoints.down('lg'));

    // Close drawer on mobile when screen size changes
    useEffect(() => {
        if (downLG) {
            setDrawerOpen(false);
        }
    }, [downLG, setDrawerOpen]);

  const mainContentWidth = drawerOpen ? DRAWER_WIDTH : MINI_DRAWER_WIDTH;

    return (
        <div className="flex w-full min-h-screen">
            <Header />
            <Drawer />

            <main className="flex-1 flex flex-col min-h-screen"
                style={{
                    minWidth: `calc(100% - ${downLG ? 0 : mainContentWidth}px)`,
                    width: '100%', 
                    display: 'table', 
                    marginLeft: downLG ? 0 : undefined,
                    transition: theme.transitions.create(['width', 'margin'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                }}
            >
                <Toolbar />
                
                <div className="flex-1 p-4 md:p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    )
};


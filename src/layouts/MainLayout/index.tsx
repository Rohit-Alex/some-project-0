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
        <div className="flex w-full h-full overflow-hidden">
            <Header />
            <Drawer />

            <main className="flex-1 min-w-0 flex flex-col h-full overflow-hidden"
                style={{
                    width: `calc(100% - ${downLG ? 0 : mainContentWidth}px)`,
                    marginLeft: downLG ? 0 : undefined,
                    transition: theme.transitions.create(['width', 'margin'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                }}
            >
                <Toolbar />
                
                <div className="flex-1 min-w-0 p-4 pb-12 md:p-6 md:pb-14 flex flex-col min-h-0 overflow-y-auto overflow-x-hidden">
                    <Outlet />
                </div>
            </main>
        </div>
    )
};


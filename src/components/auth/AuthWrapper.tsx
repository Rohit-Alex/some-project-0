import Logo from '../Logo';
import AuthCard from './AuthCard';
import { Grid } from '@mui/material';
import type { ReactNode } from 'react';
import AuthBackground from './AuthBackground';

interface AuthWrapperProps {
    children: ReactNode;
};

export default function AuthWrapper({ children }: AuthWrapperProps): ReactNode {
    return (
        <div className="min-h-screen">
            <AuthBackground />

            <div className="min-h-screen flex flex-col justify-end">
                <div className="px-6 mt-6">
                    <Logo to="/" />
                </div>

                <div>
                    <Grid container className="justify-center items-center min-h-[calc(100vh-210px)] sm:min-h-[calc(100vh-134px)] md:min-h-[calc(100vh-132px)]">
                        <Grid>
                            <AuthCard>{children}</AuthCard>
                        </Grid>
                    </Grid>
                </div>

                <div className="p-6"></div>
            </div>
        </div>
    )
};

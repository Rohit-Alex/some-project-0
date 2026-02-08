import type { ReactNode } from 'react';
import MainCard from '../MainCard';

interface AuthCardProps {
    children: ReactNode
};

export default function AuthCard({ children }: AuthCardProps): ReactNode {
    return (
        <MainCard className="max-w-[400px] sm:max-w-[475px] mx-2.5 md:mx-3">
            <div className="p-4 sm:p-6 md:p-8 xl:p-10">{children}</div>
        </MainCard>
    )
};

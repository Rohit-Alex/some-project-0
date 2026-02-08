import type { ReactNode } from 'react';
import { Link, Typography } from '@mui/material';

export default function AuthFooter(): ReactNode {
    return (
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row gap-2 justify-center sm:justify-between text-center sm:text-left">
                <Typography variant="subtitle2" color="text.secondary">          
                    <Link href="https://github.com/Rohit-Alex" target="_blank" underline="hover">
                        SHIELDxGhost
                    </Link>
                </Typography>

                <div className="flex flex-col sm:flex-row gap-1 sm:gap-6 text-center sm:text-left">
                    <Typography variant="subtitle2" color="text.secondary" component={Link} href="#" underline="hover">
                        Terms and Conditions
                    </Typography>

                    <Typography variant="subtitle2" color="text.secondary" component={Link} href="#" underline="hover">
                        Privacy Policy
                    </Typography>
                </div>
            </div>
        </div>
    )
};

import Grid from '@mui/material/Grid';
import type { ReactNode } from 'react';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { ROUTES } from '@config/routes';
import { AuthWrapper } from '@components/auth';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import AuthForgotPasswordForm from '@components/auth/AuthForgotPasswordForm';

export default function ForgotPassword(): ReactNode {
    return (
        <AuthWrapper>
            <Grid container spacing={3}>
                <Grid size={12}>
                    <Stack direction="row" sx={{ alignItems: 'baseline', justifyContent: 'space-between', mb: { xs: -0.5, sm: 0.5 } }}>
                        <Typography variant="h3">Forgot Password</Typography>
                        <Link variant="body1" component={RouterLink} to={ROUTES.LOGIN} color="primary" underline="hover" sx={{ textDecoration: 'none' }}>
                            Back to Login
                        </Link>
                    </Stack>
                </Grid>

                <Grid size={12}>
                    <AuthForgotPasswordForm />
                </Grid>
            </Grid>
        </AuthWrapper>
    )
};

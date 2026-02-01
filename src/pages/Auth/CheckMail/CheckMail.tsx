import type { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Typography, Box } from '@mui/material';

import { ROUTES } from '@config/routes';
import { AuthWrapper } from '@components/auth';

export default function CheckMail(): ReactNode {
    return (
        <AuthWrapper>
            <Grid container spacing={3}>
                <Grid size={12}>
                    <Box sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                        <Typography variant="h3">Hi, Check Your Mail</Typography>
                    </Box>
                </Grid>

                <Grid size={12}>
                    <Typography variant="caption" color="text.secondary">
                        Do not forget to check your SPAM box if you don't see the email within a few minutes.
                    </Typography>
                </Grid>

                <Grid size={12}>
                    <Button component={RouterLink} to={ROUTES.LOGIN} fullWidth size="large" variant="contained" color="primary">
                        Sign In
                    </Button>
                </Grid>
            </Grid>
        </AuthWrapper>
    );
};
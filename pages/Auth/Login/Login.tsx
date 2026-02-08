import Grid from "@mui/material/Grid";
import type { ReactNode } from "react";
import Stack from '@mui/material/Stack';

import { AuthWrapper } from "@components/auth";
import Typography from "@mui/material/Typography";
import AuthLoginForm from "@components/auth/AuthLoginForm";

export default function Login(): ReactNode {
    return (
        <AuthWrapper>
            <Grid container spacing={3}>
                <Grid size={12}>
                    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: { xs: -0.5, sm: 0.5 } }}>
                        <Typography variant="h3">🔒 Secure Login</Typography>
                    </Stack>
                </Grid>

                <Grid size={12}>
                    <AuthLoginForm />
                </Grid>
            </Grid>
        </AuthWrapper>
    )
};

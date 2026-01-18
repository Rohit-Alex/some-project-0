import type { ReactNode } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { AuthWrapper } from '@components/auth'
import AuthForgotPasswordForm from '@components/auth/AuthForgotPasswordForm'
import { ROUTES } from '@config/routes'

export default function ForgotPassword(): ReactNode {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid size={12}>
          <div className="flex flex-row items-baseline justify-between mb-1 sm:mb-2">
            <Typography variant="h3">Forgot Password</Typography>
            <Link
              variant="body1"
              component={RouterLink}
              to={ROUTES.LOGIN}
              color="primary"
              underline="hover"
            >
              Back to Login
            </Link>
          </div>
        </Grid>
        <Grid size={12}>
          <AuthForgotPasswordForm />
        </Grid>
      </Grid>
    </AuthWrapper>
  )
}

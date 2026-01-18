import type { ReactNode } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { AuthWrapper } from '@components/auth'
import AuthRegisterForm from '@components/auth/AuthRegisterForm'
import { ROUTES } from '@config/routes'

export default function Signup(): ReactNode {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid size={12}>
          <div className="flex flex-row items-baseline justify-between mb-1 sm:mb-2">
            <Typography variant="h3">Sign up</Typography>
            <Link
              variant="body1"
              component={RouterLink}
              to={ROUTES.LOGIN}
              color="primary"
              underline="hover"
            >
              Already have an account?
            </Link>
          </div>
        </Grid>
        <Grid size={12}>
          <AuthRegisterForm />
        </Grid>
      </Grid>
    </AuthWrapper>
  )
}

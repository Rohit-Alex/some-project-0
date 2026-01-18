import { useState } from 'react'
import type { ReactNode } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Typography,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

import { useLogin } from '../../modules/auth'
import { ROUTES } from '../../config/routes'

export default function AuthLoginForm(): ReactNode {
  const { mutate: login, isPending, error } = useLogin()

  const [checked, setChecked] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (email && password) {
      login({ email: email.trim(), password })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid size={12}>
          <div className="flex flex-col gap-1">
            <InputLabel htmlFor="email-login">Email Address</InputLabel>
            <OutlinedInput
              id="email-login"
              type="email"
              name="email"
              defaultValue="info@codedthemes.com"
              placeholder="Enter email address"
              fullWidth
            />
          </div>
        </Grid>

        <Grid size={12}>
          <div className="flex flex-col gap-1">
            <InputLabel htmlFor="password-login">Password</InputLabel>
            <OutlinedInput
              fullWidth
              id="password-login"
              type={showPassword ? 'text' : 'password'}
              name="password"
              defaultValue="123456"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                    color="secondary"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              placeholder="Enter password"
            />
          </div>
        </Grid>

        <Grid className="-mt-1" size={12}>
          <div className="flex flex-row gap-2 items-baseline justify-between">
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                  name="checked"
                  color="primary"
                  size="small"
                />
              }
              label={<Typography variant="body2">Keep me sign in</Typography>}
            />
            <Link
              variant="body2"
              component={RouterLink}
              to={ROUTES.FORGOT_PASSWORD}
              color="text.primary"
              underline="hover"
            >
              Forgot Password?
            </Link>
          </div>
        </Grid>

        {error && (
          <Grid size={12}>
            <FormHelperText error>
              {error instanceof Error ? error.message : 'Login failed'}
            </FormHelperText>
          </Grid>
        )}

        <Grid size={12}>
          <Button
            disableElevation
            disabled={isPending}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="primary"
          >
            {isPending ? 'Logging in...' : 'Login'}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

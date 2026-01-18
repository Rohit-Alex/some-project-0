import { useState } from 'react'
import type { ReactNode } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Button,
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

import { useRegister, getPasswordStrength } from '../../modules/auth'

export default function AuthRegisterForm(): ReactNode {
  const { mutate: register, isPending, error } = useRegister()

  const [showPassword, setShowPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState({ label: '', color: '' })

  const handlePasswordChange = (value: string): void => {
    const strength = getPasswordStrength(value)
    setPasswordStrength({ label: strength.label, color: strength.color })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    register({
      firstName: (formData.get('firstName') as string)?.trim(),
      lastName: (formData.get('lastName') as string)?.trim(),
      email: (formData.get('email') as string)?.trim(),
      password: formData.get('password') as string,
      company: (formData.get('company') as string)?.trim(),
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        {/* First Name & Last Name */}
        <Grid size={{ xs: 12, md: 6 }}>
          <div className="flex flex-col gap-1">
            <InputLabel htmlFor="firstName">First Name*</InputLabel>
            <OutlinedInput
              id="firstName"
              name="firstName"
              placeholder="John"
              fullWidth
              required
            />
          </div>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <div className="flex flex-col gap-1">
            <InputLabel htmlFor="lastName">Last Name*</InputLabel>
            <OutlinedInput
              id="lastName"
              name="lastName"
              placeholder="Doe"
              fullWidth
              required
            />
          </div>
        </Grid>

        {/* Company (optional) */}
        <Grid size={12}>
          <div className="flex flex-col gap-1">
            <InputLabel htmlFor="company">Company</InputLabel>
            <OutlinedInput
              id="company"
              name="company"
              placeholder="Demo Inc."
              fullWidth
            />
          </div>
        </Grid>

        {/* Email */}
        <Grid size={12}>
          <div className="flex flex-col gap-1">
            <InputLabel htmlFor="email">Email Address*</InputLabel>
            <OutlinedInput
              id="email"
              name="email"
              type="email"
              placeholder="demo@company.com"
              fullWidth
              required
            />
          </div>
        </Grid>

        {/* Password */}
        <Grid size={12}>
          <div className="flex flex-col gap-1">
            <InputLabel htmlFor="password">Password*</InputLabel>
            <OutlinedInput
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="******"
              fullWidth
              required
              onChange={(e) => handlePasswordChange(e.target.value)}
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
            />
          </div>

          {/* Password strength indicator */}
          {passwordStrength.label && (
            <div className="flex items-center gap-2 mt-2">
              <div
                className="w-20 h-2 rounded"
                style={{ backgroundColor: passwordStrength.color }}
              />
              <Typography variant="caption">{passwordStrength.label}</Typography>
            </div>
          )}
        </Grid>

        {/* Terms */}
        <Grid size={12}>
          <Typography variant="body2">
            By Signing up, you agree to our{' '}
            <Link component={RouterLink} to="#" variant="subtitle2">
              Terms of Service
            </Link>
            {' '}and{' '}
            <Link component={RouterLink} to="#" variant="subtitle2">
              Privacy Policy
            </Link>
          </Typography>
        </Grid>

        {/* Error */}
        {error && (
          <Grid size={12}>
            <FormHelperText error>
              {error instanceof Error ? error.message : 'Registration failed'}
            </FormHelperText>
          </Grid>
        )}

        {/* Submit */}
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
            {isPending ? 'Creating Account...' : 'Create Account'}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

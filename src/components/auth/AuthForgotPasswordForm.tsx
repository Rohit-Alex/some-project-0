import type { ReactNode } from 'react'
import {
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material'

import { useForgotPassword } from '../../modules/auth'

export default function AuthForgotPasswordForm(): ReactNode {
  const { mutate: forgotPassword, isPending, error, isSuccess } = useForgotPassword()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string

    if (email) {
      forgotPassword({ email: email.trim() })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        {/* Email */}
        <Grid size={12}>
          <div className="flex flex-col gap-1">
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <OutlinedInput
              id="email"
              name="email"
              type="email"
              placeholder="Enter email address"
              fullWidth
              required
            />
          </div>
        </Grid>

        {/* Error */}
        {error && (
          <Grid size={12}>
            <FormHelperText error>
              {error instanceof Error ? error.message : 'Failed to send reset email'}
            </FormHelperText>
          </Grid>
        )}

        {/* Success message */}
        {isSuccess && (
          <Grid size={12}>
            <Typography color="success.main" variant="body2">
              Password reset email sent! Check your inbox.
            </Typography>
          </Grid>
        )}

        {/* Note */}
        <Grid size={12} className="-mb-2">
          <Typography variant="caption" color="text.secondary">
            Do not forget to check SPAM box.
          </Typography>
        </Grid>

        {/* Submit */}
        <Grid size={12}>
          <Button
            disableElevation
            disabled={isPending || isSuccess}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="primary"
          >
            {isPending ? 'Sending...' : 'Send Password Reset Email'}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

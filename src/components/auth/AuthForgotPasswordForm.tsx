import { useState, type ReactNode } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useNavigate } from 'react-router-dom';
import { useForgotPassword } from '../../modules/auth';
import { ROUTES } from '@/config/routes';
import { Button, Grid, FormHelperText, InputLabel, OutlinedInput, Typography, Snackbar, Alert } from '@mui/material';

export default function AuthForgotPasswordForm(): ReactNode {
    const { mutate: forgotPassword, isPending, error, isSuccess } = useForgotPassword()

    const siteKey = import.meta.env.VITE_SITE_KEY;

    const navigate = useNavigate();
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const [showError, setShowError] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;

        if (!captchaToken) {
            setShowError(true);
            return;
        }

        if (email && captchaToken) {
            forgotPassword(
                {
                    email: email.trim(),
                    captcha_res_token: captchaToken
                },
                {
                    onSuccess: () => {
                        navigate(ROUTES.CHECK_EMAIL);
                    }
                }
            );
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid size={12}>
                        <div className="flex flex-col gap-1">
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <OutlinedInput id="email" name="email" type="email" placeholder="Enter email address" fullWidth required />
                        </div>
                    </Grid>

                    <Grid size={12}>
                        <ReCAPTCHA sitekey={siteKey} onChange={(token: string | null) => setCaptchaToken(token)} />
                    </Grid>

                    {error && (
                        <Grid size={12}>
                            <FormHelperText error>
                                {error instanceof Error ? error.message : 'Failed to send reset email'}
                            </FormHelperText>
                        </Grid>
                    )}

                    {isSuccess && (
                        <Grid size={12}>
                            <Typography color="success.main" variant="body2">
                                Password reset email sent! Check your inbox.
                            </Typography>
                        </Grid>
                    )}

                    <Grid size={12} className="-mb-2">
                        <Typography variant="caption" color="text.secondary">
                            Do not forget to check SPAM box.
                        </Typography>
                    </Grid>

                    <Grid size={12}>
                        <Button disableElevation disabled={isPending || isSuccess} fullWidth size="large" type="submit" variant="contained" color="primary">
                            {isPending ? 'Sending...' : 'Send Password Reset Email'}
                        </Button>
                    </Grid>
                </Grid>
            </form>

            <Snackbar open={showError} autoHideDuration={3000} onClose={() => setShowError(false)} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert severity="warning" variant="filled" onClose={() => setShowError(false)}>
                    Please complete the ReCAPTCHA
                </Alert>
            </Snackbar>
        </>
    )
};

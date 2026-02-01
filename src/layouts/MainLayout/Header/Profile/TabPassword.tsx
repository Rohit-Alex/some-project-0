import React, { useState } from "react";
import MainCard from "@components/MainCard";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useUpdatePassword, useLogout } from "@/modules/auth/hooks";
import { validateChangePasswordFields, getPasswordStrength } from "@/modules/auth/helpers";
import { Box, Grid, Button, TextField, Divider, Typography, InputAdornment, IconButton, FormHelperText, LinearProgress } from "@mui/material";

export default function TabPassword() {
    const logout = useLogout();
    const { mutate: updatePassword, isPending } = useUpdatePassword();

    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);

    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState<{
        oldPassword?: string;
        newPassword?: string[];
        confirmPassword?: string;
    }>({});

    const strength = getPasswordStrength(formData.newPassword);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof typeof errors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const result = validateChangePasswordFields(formData);
        
        if (!result.isValid) {
            setErrors(result.errors);
            return;
        }

        updatePassword(
            { old_password: formData.oldPassword, new_password: formData.newPassword},
            { onSuccess: () => logout()}
        );
    };

    const isDirty = !!(formData.oldPassword && formData.newPassword && formData.confirmPassword);

    return (
        <MainCard content={false}>
            <Box sx={{ p: 4 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Change Password
                </Typography>
            </Box>
            <Divider />

            <form onSubmit={handleSubmit}>
                <Box sx={{ p: 3 }}>
                    <Grid container spacing={3} sx={{ maxWidth: 600 }}>
                        <Grid size={12}>
                            <Typography variant="subtitle2">Old Password</Typography>
                            <TextField fullWidth name="oldPassword" type={showOld ? "text" : "password"} placeholder="Enter Old Password"
                                value={formData.oldPassword} onChange={handleChange} error={Boolean(errors.oldPassword)} helperText={errors.oldPassword}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowOld(!showOld)} edge="end" size="small">
                                                {showOld ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid size={12}>
                            <Typography variant="subtitle2">New Password</Typography>
                            <TextField fullWidth name="newPassword" type={showNew ? "text" : "password"} placeholder="Enter New Password"
                                value={formData.newPassword} onChange={handleChange} error={Boolean(errors.newPassword)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowNew(!showNew)} edge="end" size="small">
                                                {showNew ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            
                            {formData.newPassword && (
                                <Box sx={{ mt: 0.5 }}>
                                    <LinearProgress variant="determinate" value={(strength.score + 1) * 20} sx={{ height: 6, borderRadius: 5, bgcolor: 'divider', '& .MuiLinearProgress-bar': { bgcolor: strength.color } }} />
                                    <Typography variant="caption" sx={{ color: strength.color, fontWeight: 500 }}>
                                        {strength.label}
                                    </Typography>
                                </Box>
                            )}

                            {errors.newPassword?.map((err, index) => (
                                <FormHelperText key={index} error>{err}</FormHelperText>
                            ))}
                        </Grid>

                        <Grid size={12}>
                            <Typography variant="subtitle2">Confirm Password</Typography>
                            <TextField fullWidth name="confirmPassword" type="password" placeholder="Confirm New Password"
                                value={formData.confirmPassword} onChange={handleChange} error={Boolean(errors.confirmPassword)} helperText={errors.confirmPassword}
                            />
                        </Grid>
                    </Grid>
                </Box>

                <Divider />

                <Box sx={{ p: 2.5, display: "flex", justifyContent: "flex-end", gap: 1.5 }}>
                    <Button variant="outlined" color="secondary" onClick={() => setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' })} disabled={isPending} sx={{ color: "text.primary", borderColor: "divider" }}>
                        Reset
                    </Button>

                    <Button type="submit" variant="contained" disabled={isPending || !isDirty} sx={{ px: 3 }}>
                        {isPending ? "Updating..." : "Update"}
                    </Button>
                </Box>
            </form>
        </MainCard>
    );
};

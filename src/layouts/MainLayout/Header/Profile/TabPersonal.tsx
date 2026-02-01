import React, { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { Box, Grid, Button, TextField, Divider, Typography } from "@mui/material";

import MainCard from "@components/MainCard";
import { useAuthUser, useUpdateUserInfo, validateProfileFields } from "@/modules/auth";


export default function TabPersonal() {
    const navigate = useNavigate();
    const inputRef = useOutletContext<React.RefObject<HTMLInputElement>>();
    const user = useAuthUser();
    const { mutate: updateUserInfo, isPending } = useUpdateUserInfo();

    const [formData, setFormData] = useState({ firstname: '', lastname: '', email: '' });
    const [errors, setErrors] = useState<{ firstname?: string; lastname?: string }>({});

    useEffect(() => {
        if (user) {
            setFormData({
                firstname: user.firstName || '',
                lastname: user.lastName || '',
                email: user.email || ''
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof typeof errors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validateProfileFields(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        
        updateUserInfo(
            { first_name: formData.firstname, last_name: formData.lastname },
            { onSuccess: () => navigate("/dashboard") }
        );
    };

    if (!user) return null;

    const isDirty = formData.firstname !== (user.firstName || '') || formData.lastname !== (user.lastName || '');

    return (
        <MainCard content={false}>
            <Box sx={{ p: 4.4 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Personal Information</Typography>
            </Box>
            <Divider />
            
            <form onSubmit={handleSubmit}>
                <Box sx={{ p: 3 }}>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField label="First Name" name="firstname" fullWidth value={formData.firstname} onChange={handleChange} inputRef={inputRef} error={Boolean(errors.firstname)} helperText={errors.firstname} />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField label="Last Name" name="lastname" fullWidth value={formData.lastname} onChange={handleChange} error={Boolean(errors.lastname)} helperText={errors.lastname} />
                        </Grid>

                        <Grid size={12}>
                            <TextField label="Email Address" fullWidth disabled value={formData.email} sx={{ bgcolor: 'action.hover', borderRadius: 1 }} />
                        </Grid>
                    </Grid>
                </Box>
                
                <Divider />
                
                <Box sx={{ p: 2.5, display: "flex", justifyContent: "flex-end", gap: 1.5 }}>
                    <Button variant="outlined" color="secondary" onClick={() => navigate(-1)} disabled={isPending} sx={{ color: "text.primary", borderColor: "divider" }}>
                        Cancel
                    </Button>

                    <Button type="submit" variant="contained" disabled={isPending || !isDirty} sx={{ px: 3 }}>
                        {isPending ? "Saving..." : "Save"}
                    </Button>
                </Box>
            </form>
        </MainCard>
    );
};

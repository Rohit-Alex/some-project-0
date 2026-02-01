import { useState } from "react";
import type { ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material"

import { ROUTES } from "../../config/routes";
import { useLogin } from "../../modules/auth";
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
    Tabs,
    Tab,
    Box
} from "@mui/material";

type LoginType = "USER_ID" | "DOMAIN" | "AZURE"

export default function AuthLoginForm(): ReactNode {
    const { mutate: login, isPending, error } = useLogin()

    const [loginType, setLoginType] = useState<LoginType>("USER_ID")
    const [checked, setChecked] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleTabChange = (_: React.SyntheticEvent, newValue: LoginType) => {
        setLoginType(newValue)
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        const typeMap: Record<string, string> = {
            USER_ID: "username",
            DOMAIN: "domain",
            AZURE: "azure"
        };

        login({
            username: (formData.get("username") as string).trim(),
            password: formData.get("password") as string,
            login_type: typeMap[loginType]
        });
    };

    const getUsernameLabel = () => {
        switch (loginType) {
            case "DOMAIN": return "Domain/User ID"
            case "AZURE": return "Azure UPN"
            default: return "User ID"
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs value={loginType} onChange={handleTabChange} centered sx={{ mb: 1.5, borderBottom: 1, borderColor: 'divider' }}>
                <Tab label="User ID" value="USER_ID" />
                <Tab label="Domain/User ID" value="DOMAIN" />
                <Tab label="Azure UPN" value="AZURE" />
            </Tabs>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <div className="flex flex-col gap-1">
                            <InputLabel htmlFor="username">{getUsernameLabel()}</InputLabel>
                            <OutlinedInput id="username" type="text" name="username" placeholder={`Enter ${getUsernameLabel()}`} fullWidth />
                        </div>
                    </Grid>

                    <Grid size={12}>
                        <div className="flex flex-col gap-1">
                            <InputLabel htmlFor="password-login">Password</InputLabel>
                            <OutlinedInput fullWidth  placeholder="Enter password" id="password-login" type={showPassword ? 'text' : 'password'} name="password"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </div>
                    </Grid>

                    <Grid className="-mt-1" size={12}>
                        <div className="flex flex-row gap-2 items-center justify-between">
                            <FormControlLabel
                                control={<Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} size="small" />}
                                label={<Typography variant="body2">Keep me sign in</Typography>}
                            />

                            <Link variant="body2" component={RouterLink} to={ROUTES.FORGOT_PASSWORD} color="primary" underline="hover">Forgot Password?</Link>
                        </div>
                    </Grid>

                    {error && (
                        <Grid size={12}>
                            <FormHelperText error>
                                {error instanceof Error ? error.message : "Login failed"}
                            </FormHelperText>
                        </Grid>
                    )}

                    <Grid size={12}>
                        <Button disableElevation disabled={isPending} fullWidth size="large" type="submit" variant="contained">
                            {isPending ? "Logging in..." : "Login"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

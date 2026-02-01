import { Outlet } from "react-router-dom";
import ProfileSidebar from "./ProfileSidebar";
import { Container, Grid } from "@mui/material";

export default function ProfileLayout() {
    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 4, lg: 3 }}>
                    <ProfileSidebar />
                </Grid>

                <Grid size={{ xs: 12, md: 8, lg: 9 }}>
                    <Outlet />
                </Grid>
            </Grid>
        </Container>
    );
};

import { useMemo, useState } from "react";
import MainCard from "@components/MainCard";
import { alpha } from "@mui/material/styles";
import { useAuthUser } from "@/modules/auth";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useNavigate, useLocation } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import avatar1 from "/assets/avatar.png";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { Box, Stack, FormLabel, Typography, List, ListItemButton, ListItemIcon, ListItemText, Avatar } from "@mui/material";

export default function ProfileSidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useAuthUser();
    
    const [selectedImage, setSelectedImage] = useState<File | undefined>(undefined);

    // Use useMemo instead of useEffect + setState to avoid cascading renders
    const avatarPreview = useMemo(() => {
        if (!selectedImage) return avatar1;
        return URL.createObjectURL(selectedImage);
    }, [selectedImage]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Revoke previous object URL to prevent memory leaks
            if (selectedImage) {
                URL.revokeObjectURL(avatarPreview);
            }
            setSelectedImage(file);
        }
    };

    return (
        <MainCard content={false}>
            <Box sx={{ p: 3 }}>
                <Stack spacing={2.5} alignItems="center">
                    <FormLabel
                        htmlFor="change-avatar"
                        sx={{ position: "relative", borderRadius: "50%", overflow: "hidden", "&:hover .overlay-box": { opacity: 1 }, cursor: "pointer" }}>
                        <input type="file" id="change-avatar" hidden accept="image/*" onChange={handleImageChange} />

                        <Avatar alt="User Avatar" src={avatarPreview} sx={{ width: 124, height: 124, border: "1px dashed", borderColor: "divider" }} />

                        <Box className="overlay-box"
                            sx={(theme) => ({ position: "absolute", top: 0, left: 0, bgcolor: alpha(theme.palette.secondary.dark, 0.75), width: "100%", height: "100%",
                                opacity: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "secondary.lighter", transition: "opacity 0.3s ease"
                            })}
                        >
                            <Stack spacing={0.5} alignItems="center">
                                <CameraAltOutlinedIcon sx={{ fontSize: "2rem" }} />
                                <Typography variant="caption">Upload</Typography>
                            </Stack>
                        </Box>
                    </FormLabel>

                    <Stack spacing={0.5} alignItems="center">
                        <Typography variant="h5">{user?.firstName || "User"}</Typography>
                        <Typography variant="body2" color="textSecondary">{user?.email}</Typography>
                    </Stack>
                </Stack>
            </Box>

            <List component="nav" sx={{ p: 1, "& .MuiListItemIcon-root": { minWidth: 32 } }}>
                <ListItemButton selected={location.pathname === "/profile/edit"} onClick={() => navigate("/profile/edit")} sx={{ borderRadius: 1.5, mb: 0.5 }}>
                    <ListItemIcon><PersonOutlineIcon fontSize="small" /></ListItemIcon>
                    <ListItemText primary="Personal Information" />
                </ListItemButton>
                
                <ListItemButton selected={location.pathname === "/profile/password"} onClick={() => navigate("/profile/password")} sx={{ borderRadius: 1.5 }}>
                    <ListItemIcon><LockOpenIcon fontSize="small" /></ListItemIcon>
                    <ListItemText primary="Change Password" />
                </ListItemButton>
            </List>
        </MainCard>
    );
};

import List from "@mui/material/List";
import { useNavigate } from "react-router-dom";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

interface ProfileTabProps {
    handleLogout: () => void;
    handleClose: () => void;
};

export default function ProfileTab({ handleLogout, handleClose }: ProfileTabProps) {
    const navigate = useNavigate();

    const handleNavigate = (path: string) => {
        navigate(path);
        handleClose();
    };

    return (
        <List component="nav" sx={{ p: 0, "& .MuiListItemIcon-root": { minWidth: 32 } }}>
            <ListItemButton onClick={() => handleNavigate("/profile/edit")}>
                <ListItemIcon>
                    <EditOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Edit Profile" />
            </ListItemButton>

            <ListItemButton onClick={() => handleNavigate("/profile/view")}>
                <ListItemIcon>
                    <PersonOutlineIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="View Profile" />
            </ListItemButton>

            <ListItemButton onClick={() => { handleLogout(); handleClose(); }}>
                <ListItemIcon>
                    <LogoutOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Logout" />
            </ListItemButton>
        </List>
    );
};

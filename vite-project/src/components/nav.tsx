import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NavBar() {

    const navigate = useNavigate()

    const handleLogout = () => {
        navigate("/")
    }

    const handleProfile = () => {
        navigate("/profile")
    }

    const handleVault = () => {
        navigate("/vault")
    }

    return (
        <>
            <AppBar>
                <Toolbar>
                    <Typography sx={{ flexGrow: 1 }}>Password Manager</Typography>
                    <Button color="inherit" onClick={handleVault}>Vault</Button>
                    <Button color="inherit" onClick={handleProfile}>Profile</Button>
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </>
        
    )
}
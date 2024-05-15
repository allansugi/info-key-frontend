import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {

    const navigate = useNavigate();
    
    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h6">Welcome to Password Manager</Typography>
            <Stack direction="row" spacing={2} justifyContent="center">
                <Button variant="contained" onClick={() => navigate("/login")}>Login</Button>
                <Button variant="contained" onClick={() => navigate("/register")}>Register</Button>
            </Stack>
        </Box>
    )
}
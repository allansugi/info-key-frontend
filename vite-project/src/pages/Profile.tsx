import { Box, Stack, TextField, Typography } from "@mui/material";
import NavBar from "../components/nav";

export default function Profile() {
    return (
        <>
            <NavBar />
            <Typography variant="h4">Profile</Typography>
            <Box>
                <Stack direction="column" spacing={2}>
                    <Typography variant="h6">Information</Typography>
                    <TextField disabled label="username" defaultValue="root"/>
                    <TextField disabled label="email" defaultValue="root@email.com"/>
                </Stack>
            </Box>
            <Box>
                <Stack direction="column" spacing={2}>
                <Typography variant="h6">Change password</Typography>
                    <TextField required type="password" label="enter new password"/>
                    <TextField required type="password" label="confirm password"/>
                </Stack>
            </Box>
        </>
        
    )
}
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RequestBody } from "../helper/requestBody";
import { ChangeEvent, useState } from "react";

interface LoginForm {
    username: string;
    password: string;
}

interface LoginResponse {
    success: boolean;
    response: string;
}

export default function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleLogin = async() => {
        const request = new RequestBody<LoginForm, LoginResponse>('PUT', "http://localhost:8080/api/user/login", {
            username: username,
            password: password
        })

        const responseBody = await request.makeRequestWithBody();

        if (responseBody.success) {
            navigate('/vault')
        } else {
            console.error("wrong login credentials")
        }
        
    }

    return (
        <>
            <Stack direction="column" spacing={2} alignItems="center">
                <Typography variant="h3">Welcome Back</Typography>
                <TextField label="Email or Username" variant="outlined" onChange={handleUsername}/>
                <TextField type="password" label="Password" variant="outlined" onChange={handlePassword}/>
                <Button variant="contained" onClick={handleLogin}>Login</Button>
            </Stack>
        </>
    )
}
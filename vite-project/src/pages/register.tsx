import { Stack, Typography, TextField, Button } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RequestBody } from "../helper/requestBody";

interface RegisterResponse {
    success: boolean;
    response: string;
}

interface RegisterForm {
    username: string;
    email: string;
    password: string;
}

export default function Register() {

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState(false)

    const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === password) {
            setConfirmPassword(true)
        }
    }

    const handleRegister = async() => {
        if (!confirmPassword) return

        const request = new RequestBody<RegisterForm, RegisterResponse>('POST', "http://localhost:8080/api/user/register",  {
            username: username,
            email: email,
            password: password
        })

        const responseBody = await request.makeRequestWithBody();
        if (responseBody.success) {
            navigate("/")
        } else {
            console.error(responseBody.response);
        }
    }

    return (
        <Stack direction="column" spacing={2} alignItems="center">
            <Typography variant="h3">Sign Up</Typography>
            <TextField required label="Username" variant="outlined" onChange={handleUsername}/>
            <TextField required label="Email" variant="outlined" onChange={handleEmail}/>
            <TextField required type="password" label="Password" variant="outlined" onChange={handlePassword}/>
            <TextField required type="password" label="Confirm password" variant="outlined" onChange={handleConfirmPassword}/>
            <Button variant="contained" onClick={handleRegister}>Register Account</Button>
        </Stack>
    )
}
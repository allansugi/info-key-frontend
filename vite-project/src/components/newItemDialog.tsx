import { DialogProps, Dialog, DialogTitle, Box, DialogContent, Stack, TextField, DialogActions, Button } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { RequestBody } from "../helper/requestBody";

interface NewAccountDialogProps {
    open: boolean;
    onClose: () => void; // closing dialog
    onChange: () => void; // if new account created
}

interface NewAccount {
    accountName: string;
    accountUsername: string;
    accountPassword: string;
}

interface NewAccountResponse {
    success: boolean;
    response: string;
}

export default function NewItemDialog(props: NewAccountDialogProps) {

    const { open, onClose, onChange } = props

    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState<DialogProps['maxWidth']>('sm');

    const handleName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }

    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async() => {

        const requestBody = {
            accountName: name,
            accountUsername: username,
            accountPassword: password
        }

        const url = "http://localhost:8080/api/user/account/add";
        const request = new RequestBody<NewAccount, NewAccountResponse>("POST", url, requestBody)
        const response = await request.makeRequestWithBody();

        if (response.success) {
            console.log(response.response);
        }

        onChange()
        handleClose()
    }

    const handleClose = () => {
        onClose();
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose} fullWidth={fullWidth} maxWidth={maxWidth}>
                <DialogTitle>New Item</DialogTitle>
                <Box>
                    {/* weird bug where Dialog Title overlaps the Dialog Content */}
                </Box>
                <DialogContent>
                    <Stack direction="column" spacing={2}>
                        <TextField required label="name" onChange={handleName}/>
                        <TextField required label="username" onChange={handleUsername}/>
                        <TextField required label="password" type="password" onChange={handlePassword}/>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit}>Create</Button>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
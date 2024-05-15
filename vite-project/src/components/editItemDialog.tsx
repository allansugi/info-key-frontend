import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogProps, DialogTitle, Stack, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { RequestBody } from "../helper/requestBody";

export interface EditAccountDialogProps {
    id: string;
    open: boolean;
    defaultAccount: string;
    defaultUsername: string;
    defaultPassword: string;
    onClose: () => void;
    onChange: () => void;
}

interface UpdateAccountResponse {
    success: boolean;
    response: string;
}

interface UpdateAccountRequest {
    accountName: string,
    accountUsername: string,
    accountPassword: string
}

export default function EditItemDialog(props: EditAccountDialogProps) {

    const { id, open, defaultAccount, defaultUsername, defaultPassword, onClose, onChange } = props

    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState<DialogProps['maxWidth']>('sm');

    const[newName, setNewName] = useState(defaultAccount);
    const[newUsername, setNewUsername] = useState(defaultUsername);
    const[newPassword, setNewPassword] = useState(defaultPassword);

    const handleClose = () => {
        onClose();
    };

    const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setNewName(e.target.value);
    }
    
    const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
        setNewUsername(e.target.value);
    }
    
    const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value);
    }

    const handleUpdate = async() => {
        const url = "http://localhost:8080/api/user/account/update/" + id
        const request = new RequestBody<UpdateAccountRequest,UpdateAccountResponse>('PUT', url, {
            accountName: newName,
            accountUsername: newUsername,
            accountPassword: newPassword
        })

        const responseBody = await request.makeRequestWithBody();
        if (responseBody.success) {
            onChange();
        }
        handleClose();
    }

    return (
        <>
            <Dialog open={open} onClose={handleClose} fullWidth={fullWidth} maxWidth={maxWidth}>
                <DialogTitle>Edit Item</DialogTitle>
                <Box>
                    {/* weird bug where Dialog Title overlaps the Dialog Content */}
                </Box>
                <DialogContent>
                    <Stack direction="column" spacing={2}>
                        <TextField required label="name" defaultValue={defaultAccount} onChange={handleChangeName}/>
                        <TextField required label="username" defaultValue={defaultUsername} onChange={handleChangeUsername}/>
                        <TextField required label="password" type="password" defaultValue={defaultPassword} onChange={handleChangePassword}/>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUpdate}>Update</Button>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )

    
}
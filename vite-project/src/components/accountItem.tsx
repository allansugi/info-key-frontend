import { ListItem, ListItemIcon, ListItemText, Tooltip, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import PasswordIcon from '@mui/icons-material/Password';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import KeyIcon from '@mui/icons-material/Key';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import EditItemDialog from "./editItemDialog";
import { Request } from "../helper/request";

interface ItemDetailProps {
    id: string; // UUID format
    name: string;
    username: string;
    password: string;
    onChange: () => void;
}

interface DeleteAccountResponse {
    success: boolean;
    response: string;
}

export default function AccountItem(props: ItemDetailProps) {

    const { id, name, username, password, onChange } = props
    
    const [open, setOpen] = useState(false);
    
    const handleOpen = () => {
        setOpen(true)
    }

    const handleDelete = async() => {
        const request = new Request<DeleteAccountResponse>('DELETE', "http://localhost:8080/api/user/account/delete/" + id);
        const responseBody = await request.makeRequest();
        if (responseBody.success) {
            onChange()
        }
    }

    const handleCopyUsername = async() => {
        navigator.clipboard.writeText(username)
    }

    const handleCopyPassword = async() => {
        navigator.clipboard.writeText(password)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <ListItem>
                <ListItemIcon>
                    <KeyIcon />
                </ListItemIcon>
                <ListItemText primary={name} secondary={username}/>

                <Tooltip title="edit item">
                    <IconButton onClick={handleOpen}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="copy username">
                    <IconButton onClick={handleCopyUsername}>
                        <ContentCopyIcon />
                    </IconButton>
                </Tooltip>
                
                <Tooltip title="copy password">
                    <IconButton onClick={handleCopyPassword}>
                        <PasswordIcon />
                    </IconButton>
                </Tooltip>
                
                <Tooltip title="delete item">
                    <IconButton onClick={handleDelete}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </ListItem>

            <EditItemDialog open={open} id={id} defaultAccount={name} defaultUsername={username} defaultPassword={password} onClose={handleClose} onChange={onChange} />
        </>
    )
}
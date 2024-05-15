import { Box, Button, List, Stack, TextField } from "@mui/material";
import AccountItem from "../components/accountItem";
import NavBar from "../components/nav";
import { useEffect, useState } from "react";
import NewItemDialog from "../components/newItemDialog";
import { Request } from "../helper/request";

interface Account {
    id: string;
    userId: string;
    account_name: string;
    account_username: string;
    account_password: string;
}

interface AccountsResponse {
    success: boolean;
    response: Account[];
}

export default function vault() {

    const [open, setOpen] = useState(false)
    // for change in account vault (add, update, delete)
    // the value doesn't matter as it is only for rerendering condition
    const [change, setChange] = useState(false)
    const [accounts, setAccounts] = useState<Account[]>([])

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleChange = () => {
        setChange(!change)
    }

    useEffect(() => {
        let ignore = false;
        setAccounts([]);
        const request = new Request<AccountsResponse>("GET", "http://localhost:8080/api/user/account/find/accounts")
        request.makeRequest().then(result => {
            if (!ignore && result.success) {
                setAccounts(result.response)
            }
        });

        return () => {
            ignore = true
        }
    }, [change])
    
    return (
        <>
            <NavBar />
            <Box>
                <Stack direction="row" spacing={2}>
                    <TextField variant="outlined" label="search account"/>
                    <Button variant="contained" onClick={handleOpen}>New Item</Button>
                </Stack>
                
                <List>
                    {accounts.map(account =>
                            <AccountItem 
                                id={account.id} 
                                name={account.account_name} 
                                username={account.account_username} 
                                password={account.account_password}
                                onChange={handleChange}
                            />
                        )    
                    }
                </List>
            </Box>
            <NewItemDialog open={open} onClose={handleClose} onChange={handleChange}/>
        </>
    )
}
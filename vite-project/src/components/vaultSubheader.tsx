import { ListSubheader, TextField } from "@mui/material";

export default function VaultSubheader() {
    return (
        <ListSubheader component="div" id="nested-list-subheader">
            <TextField variant="outlined" label="search account"/>
        </ListSubheader>
    )
}
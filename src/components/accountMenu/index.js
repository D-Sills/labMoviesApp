import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import React from "react";

const AccountMenu = (props) => {
    const context = props.context;
    
    return (
    <Paper sx={{ width: 220, maxWidth: '100%' }}>
        <MenuList>
        <MenuItem>
            <ListItemText>
            {context.name}
            <br/>
            View Profile
            </ListItemText>
        </MenuItem>
        
        <Divider />
        <MenuItem onClick = {context.logOut}>
            <ListItemText>LogOut</ListItemText>
        </MenuItem>
        </MenuList>
    </Paper>
    );
};

export default AccountMenu;
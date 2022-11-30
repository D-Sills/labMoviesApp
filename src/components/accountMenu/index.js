import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import React from "react";
import { useNavigate } from "react-router-dom";

const AccountMenu = (props) => {
    const context = props.context;
    const navigate = useNavigate();
    
    const handleMenuSelect = () => {
        navigate(`/user/${context.user.uid}`, { replace: true });
        props.anchor(null);
    };
    
    const handleLogout = () => {
        context.logOut();
        props.anchor(null);
    };
    
    return (
    <Paper sx={{ width: 220, maxWidth: '100%'}}>
        <MenuList>
        <Typography>{context.name}</Typography>
        <MenuItem>
            <ListItemText onClick = {() => handleMenuSelect()}>
            View Profile
            </ListItemText>
        </MenuItem>
        
        <Divider />
        <MenuItem onClick = {() => handleLogout()}>
            <ListItemText>LogOut</ListItemText>
        </MenuItem>
        </MenuList>
    </Paper>
    );
};

export default AccountMenu;
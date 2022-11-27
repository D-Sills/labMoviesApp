import Cloud from '@mui/icons-material/Cloud';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentCut from '@mui/icons-material/ContentCut';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import React from "react";

const ContextMenu = (props) => {
    const context = props.context;
    
    const handleAddToFavourites = (e) => {
        e.preventDefault();
        context.addToFavourites(props.content);
    };

    return (
    <Paper sx={{ width: 220, maxWidth: '100%' }}>
        <MenuList>
        <MenuItem onClick={handleAddToFavourites}>
            <ListItemIcon>
            <ContentCut fontSize="small" />
            </ListItemIcon>
            <ListItemText>Add to Favourites</ListItemText>
        </MenuItem>
        
        <MenuItem>
            <ListItemIcon>
            <ContentCopy fontSize="small" />
            </ListItemIcon>
            <ListItemText>Add to Playlist</ListItemText>
        </MenuItem>
        
        <Divider />
        <MenuItem>
            <ListItemIcon>
            <Cloud fontSize="small" />
            </ListItemIcon>
            <ListItemText>Web Clipboard</ListItemText>
        </MenuItem>
        </MenuList>
    </Paper>
    );
};

export default ContextMenu;
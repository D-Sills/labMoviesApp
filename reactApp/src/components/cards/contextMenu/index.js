import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import React from "react";

const ContextMenu = (props) => {
    const context = props.userContext;
    const type = props.type;
    
    const handleAddToFavourites = (e) => {
        e.preventDefault();
        if (context.checkIfFav(props.content,type)) {
            props.setAnchor(null);
            context.removeFromFavourites(props.content,type)
        } else {
            props.setAnchor(null);
            context.addToFavourites(props.content,type);
        }
    };

    return (
    <Paper sx={{ width: 280, maxWidth: '100%' }}>
        {
        context.user ? (
            <MenuList>
            {
                context.checkIfFav(props.content,type) ? (
                
                <MenuItem onClick={handleAddToFavourites}>
                    <ListItemIcon>
                    <FavoriteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Remove from Favourites</ListItemText>
                </MenuItem>
                ) :
        
                <MenuItem onClick={handleAddToFavourites}>
                    <ListItemIcon>
                    <FavoriteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Add to Favourites</ListItemText>
                </MenuItem>
            }
            <Divider />
            
            <MenuItem>
                <ListItemIcon>
                <FormatListBulletedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Add to List(Doesn't do anything)</ListItemText>
            </MenuItem>
            </MenuList>
        ) : 
        <MenuList>
        <Typography sx ={{
            paddingLeft: '10px',
            }}>
            <b>Want to add this item to a list?</b>
        </Typography>
        <MenuItem onClick={() => context.setModalIndex(1)}>
            <ListItemText>Login</ListItemText>
            <ListItemIcon sx ={{
            paddingRight: '160px',
            }}>
            <ArrowForwardIosIcon fontSize="small" />
            </ListItemIcon>
        </MenuItem>
        
        <Divider />
        <Typography sx ={{
            paddingLeft: '10px',
            }}>
            <b>Not a member?</b>
        </Typography>
        <MenuItem  onClick={() => context.setModalIndex(2)}>
            <ListItemText>Register</ListItemText>
            <ListItemIcon sx ={{
            paddingRight: '138px',
            }}>
            <ArrowForwardIosIcon fontSize="small" />
            </ListItemIcon>
        </MenuItem>
        </MenuList>
    }
    </Paper>
    );
};

export default ContextMenu;
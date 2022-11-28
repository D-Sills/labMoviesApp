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
import SearchCard from '../cards/searchCards/searchCard';

const SearchResults = (props) => {
    const content = props.searchResults;
    
    let contentCards = content.map((m) => (
        <div>
        <SearchCard key={m.id} content={m} />
        <Divider />
        </div>
    ));
    return (
        <Paper sx={{maxWidth: '100%' }}>
        {contentCards}
        </Paper>
    );
};

export default SearchResults;
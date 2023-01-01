import Divider from '@mui/material/Divider';
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
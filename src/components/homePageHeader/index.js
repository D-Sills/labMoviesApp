import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState, useContext } from "react";
import { useQuery } from 'react-query';
import { searchDB } from "../../api/tmdb-api";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { alpha, styled } from '@mui/material/styles';
import Grid from "@mui/material/grid";
import SearchResults from "../searchResults";
import OutsideClickHandler from 'react-outside-click-handler';

const HomePageHeader = (props) => {
    const [searchType, setSearchType] = useState("multi");
    const [searchQuery, setSearchQuery] = useState("hi");

    const { data, error, isLoading, isError }  = useQuery({
        queryKey: ["searching", searchType, searchQuery],
        queryFn: () => searchDB(searchType, searchQuery),
        keepPreviousData : true
    });
    
    if (isLoading) {
        return
    }
    
    if (isError) {
        return <h1>{error.message}</h1>
    }  
    

    let    searchResults = data.results;
    
    return (
        <Box sx={{margin: -3.5, flexGrow: 1}}>
        <Grid container spacing={2} sx={{
            position: 'absolute',
            top: '100px',}}>
        <Grid item xs={12} sx={{margin: '40px',}}>
        <Typography variant="h3">
            Welcome.
        </Typography>
        <Typography variant="h4">
        Millions of movies, TV shows and people to discover. Explore now.
        </Typography>
        </Grid>
        

        <Grid item xs={12} sx={{marginLeft: '40px', marginRight: '40px'}}>
        <OutsideClickHandler
            onOutsideClick={() => {
            setSearchQuery("hi");
            }}
        >
        <TextField InputProps={{ disableUnderline: true }}
        style={{
            border: '1px solid #e2e2e1',
            overflow: 'hidden',
            borderRadius: 18,
            backgroundColor: '#fcfcfb',
            color: 'black',
        }}
        onChange={(e)=>{setSearchQuery(e.target.value)}}
        variant="filled"
        label="Search for a movie, tv show, person..."
        fullWidth
        />

        <Grid item xs={12} sx={{zIndex: 10, boxShadow: 2,position: 'relative', }} >
        {   
            searchQuery.length > 3 ? (
                <div style={{maxHeight: "660px", overflow: "scroll"}}>
                <SearchResults sx ={{}} searchResults = {searchResults}/>
                </div>
            ) 
            : null
        }
        </Grid>
        </OutsideClickHandler>
        </Grid>

        
        </Grid>
        
        <Box component="img" sx={{
            height: 350,
            boxShadow: 2,
            minWidth: '100%',
            maxWidth: '100%', 
            zIndex: -1,}}
        alt="Movie Banner."
        src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"/>
        
        </Box>
    );
};

export default HomePageHeader;
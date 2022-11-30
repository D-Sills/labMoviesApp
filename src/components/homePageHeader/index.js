import { Box } from "@mui/material";
import Grid from "@mui/material/grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import OutsideClickHandler from 'react-outside-click-handler';
import { useQuery } from 'react-query';
import { searchDB } from "../../api/tmdb-api";
import SearchResults from "../searchResults";

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
    
    let searchResults = data.results;
    
    return (
        <Box style={{margin: '-20px', backgroundColor: 'rgba(0,0,0,0.5)', boxShadow: 2,}} sx={{flexGrow: 1, display: 'flex',
        justifyContent: 'center'}}>
        <Grid container spacing={2} sx={{
            position: 'absolute',
            maxWidth: '1360px',
            top: '100px',
            zIndex: 4,}}>
        <Grid item xs={12} sx={{margin: '40px',}}>
        <Typography variant="h3" style={{color: 'white',textShadow: '1px 1px #032541'}} >
            Welcome.
        </Typography>
        <Typography variant="h4" style={{color: 'white',textShadow: '1px 1px #032541'}}>
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
            opacity: 0.5,
            filter: 'brightness(20%)',
            zIndex: -1,}}
        style={{filter: 'blur(0px)'}}
        alt="Movie Banner."
        src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"/>
        
        </Box>
    );
};

export default HomePageHeader;
import React, { useState, useContext } from "react";
import HomePageHeader from '../components/homePageHeader';
import HomePageContent from '../components/homePageContent';
import { getTrending } from "../api/tmdb-api";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/grid";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Stack from '@mui/material/Stack';

const HomePage = (props) => {
    const [type, setType] = useState("all");
    const [time, setTime] = useState("week");
    const { data, error, isLoading, isError, isFetching, isPreviousData, }  = useQuery({
        queryKey: ["trending", type, time],
        queryFn: () => getTrending(type, time),
        keepPreviousData : true
    });

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }  
    window.scrollTo(0, 0);
    let trending = data.results;

    const handleTimeToggle = (event, newTime) => {
        if (newTime !== null) {
            setTime(newTime);
        }
    };

    return (
    <div>
    <HomePageHeader/>
    <Box sx={{ 'paddingRight': '20px',
    'paddingLeft': '20px',
    'paddingTop': '60px',
    'paddingBottom': '10px', }} >
    
    <Stack direction="row" spacing={2}>
    <Typography variant="h4">
    Trending
    </Typography>  
    
    <ToggleButtonGroup
        value={type}
        exclusive
        onChange={handleTimeToggle}
        aria-label="text alignment"
    >
    <ToggleButton value="day" aria-label="left aligned">
        day
    </ToggleButton>
    <ToggleButton value="week" aria-label="centered">
        week
    </ToggleButton>
    </ToggleButtonGroup>
    </Stack>
    
    <HomePageContent content={trending}/>

    </Box>
    
    
    </div>
    );
};

export default HomePage;
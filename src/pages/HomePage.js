import { Box, Typography } from "@mui/material";
import Stack from '@mui/material/Stack';
import { styled } from "@mui/material/styles";
import MuiToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import React, { useState } from "react";
import { useQuery } from 'react-query';
import { getTrending } from "../api/tmdb-api";
import HomePageContent from '../components/homePageContent';
import HomePageHeader from '../components/homePageHeader';
import Spinner from '../components/spinner';

const ToggleButton = styled(MuiToggleButton) ({
    '&.Mui-selected, &.Mui-selected:hover': {
        color: '#ffff',
        backgroundColor: '#032541',
    },
});

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
    <HomePageHeader />
    <Box sx={{ 'paddingRight': '20px',
    'paddingLeft': '20px',
    'paddingTop': '60px',
    'paddingBottom': '10px', maxWidth: '1360px' ,marginLeft: 'auto',
    marginRight: 'auto'}} >
    
    <Stack direction="row" spacing={2}>
    <Typography variant="h4">
    Trending
    </Typography>  
    
    <ToggleButtonGroup
        value={time}
        exclusive={true}
        onChange={handleTimeToggle}
    >
    <ToggleButton value="day">
        day
    </ToggleButton>
    <ToggleButton value="week">
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
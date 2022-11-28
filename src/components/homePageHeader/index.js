import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";

const HomePageHeader = (props) => {
    return (
        <Box 
        sx={{
            margin: -3.5,
        }}
        >
        <Box component="div" sx={{
            position: 'absolute',
            top: '100px',
            padding: '40px',
        }}>
        <Typography variant="h3">
            Welcome.
        </Typography>
        <Typography variant="h4">
        Millions of movies, TV shows and people to discover. Explore now.
        </Typography>
        </Box>
        
        <Box
        component="img"
        sx={{
            height: 350,
            minWidth: '100%',
            maxWidth: '100%',
        }}
        alt="Movie Banner."
        src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
        />
        </Box>
    );
};

export default HomePageHeader;
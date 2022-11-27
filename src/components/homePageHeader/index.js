import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";

const HomePageHeader = (props) => {

    
    return (
        <Paper 
            component="div" 
            sx={{
                display: "flex",
                justifyContent: "space-around",
                flexWrap: "wrap",
                padding: 1.5,
                margin: 0,
            }}
        >
            <Typography variant="h1" component="h1">
                Welcome. <br />
                Millions of movies, TV shows and people to discover. Explore now.
            </Typography>
        </Paper>
    );
};

export default HomePageHeader;
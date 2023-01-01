import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import React from "react";

const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
};
const chip = { margin: 0.5 };

const TVDetails = (props) => { 
    const tv = props.content;
    
    return (
    <Box>
    <Paper component="ul" sx={root}>

    </Paper>
    </Box>
    );
};

export default TVDetails;
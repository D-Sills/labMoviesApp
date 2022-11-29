import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
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

const MovieDetails = (props) => { 
    const movie = props.content;
    
    return (
    <Box>
    <Paper component="ul" sx={root}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
            icon={<MonetizationIcon />}
            label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
            icon={<StarRate />}
            label={`${movie.vote_average} (${movie.vote_count}`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
        </Paper>
        <Paper 
        component="ul" 
        sx={root}
        >
        <li>
            <Chip label="Production Countries" sx={chip} color="primary" />
        </li>
        {movie.production_countries.map((c) => (
            <li key={c.name}>
            <Chip label={c.name} sx={chip} />
            </li>
        ))}
    </Paper>
    </Box>
    );
};

export default MovieDetails;
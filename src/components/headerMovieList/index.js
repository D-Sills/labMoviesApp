import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";
import { useNavigate } from "react-router-dom";
import FilterCard from "../filterMoviesCard";

const Header = (props) => {
  const title = props.title
  const navigate = useNavigate();

  return (
    <Paper 
      component="div" 
      sx={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        marginBottom: 1.5,
      }}
      >
      <Typography variant="h4" component="h3">
        {title}
      </Typography>
      <FilterCard
        onUserInput={props.context.handleChange}
        titleFilter={props.context.nameFilter}
        genreFilter={props.context.genreFilter}
        setState={props.setState}
      />

     {/*  <IconButton aria-label="go back" onClick={() => navigate(-1)}>
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton> */}

      

      {/* <IconButton aria-label="go forward" onClick={() => navigate(+1)}>
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton> */}
    </Paper>
  );
};

export default Header;
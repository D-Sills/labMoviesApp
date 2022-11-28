import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";
import FilterMovies from "../filterMovies";
import FilterTV from "../filterTV";
import FilterPeople from "../filterPeople";

const Header = (props) => {
  const title = props.title
  const contentType = props.contentType

  return (
    <Paper 
      sx={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        marginTop: -1.4,
        marginBottom: 0,
      }}
      >
      <Typography sx={{display: 'flex',alignItems: 'center',}} variant="h4" component="h4">
        {title}
      </Typography>
      {
      contentType === 'movie' ? (
      <FilterMovies
        onUserInput={props.context.handleChange}
        titleFilter={props.context.nameFilter}
        genreFilter={props.context.genreFilter}
        setState={props.setState}
        />
      ) : contentType === 'tv' ? ( 
      <FilterTV
        onUserInput={props.context.handleChange}
        titleFilter={props.context.nameFilter}
        genreFilter={props.context.genreFilter}
        setState={props.setState}
        />
      ) : 
      <FilterPeople
        onUserInput={props.context.handleChange}
        titleFilter={props.context.nameFilter}
        typeFilter={props.context.personType}
        setState={props.setState}
        />
      }
    </Paper>
  );
};

export default Header;
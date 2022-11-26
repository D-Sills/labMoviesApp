import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";
import FilterMoviesCard from "../filterMoviesCard";
import FilterTVCard from "../filterTVCard";

const Header = (props) => {
  const title = props.title
  const contentType = props.contentType

  const renderFilters = () => {
    if (contentType === 'movie') {
      return <FilterMoviesCard
      onUserInput={props.context.handleChange}
      titleFilter={props.context.nameFilter}
      genreFilter={props.context.genreFilter}
      setState={props.setState}
      />
    } else {
      return <FilterTVCard
      onUserInput={props.context.handleChange}
      titleFilter={props.context.nameFilter}
      genreFilter={props.context.genreFilter}
      setState={props.setState}
      />
    }
  }

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
      {
        renderFilters()
      }
    </Paper>
  );
};

export default Header;
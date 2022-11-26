import React from "react";
import MovieCard from "../cards/movieCard";
import TVCard from "../cards/tvCard";
import PersonCard from "../cards/personCard";
import Grid from "@mui/material/Grid";

const ContentList = ( {content, action, contentType }) => {
  if (contentType === 'tv') {
    let contentCards = content.map((m) => (
      <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
        <TVCard key={m.id} content={m} action={action} />
      </Grid>
    ));
    return contentCards;
  }
  else if (contentType === 'movie') {
    let contentCards = content.map((m) => (
      <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
        <MovieCard key={m.id} content={m} action={action} />
      </Grid>
    ));
    return contentCards;
  }
  else if (contentType === 'person') {
    let contentCards = content.map((m) => (
      <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
        <PersonCard key={m.id} content={m} action={action} />
      </Grid>
    ));
    return contentCards;
  }
};

export default ContentList;
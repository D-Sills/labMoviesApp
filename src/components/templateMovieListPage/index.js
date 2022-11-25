import Grid from "@mui/material/Grid";
import React, { useContext } from "react";
import Header from "../headerMovieList";
import MovieList from "../movieList";
import PaginationFooter from '../pagination';
import { ContentFilterContext } from "../../contexts/filteringContext";

function MovieListPageTemplate({ movies, title, setState, action}) {
  const context = useContext(ContentFilterContext);

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(context.nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return context.genreId > 0 ? m.genre_ids.includes(context.genreId) : true;
    });

  return (
    <div>
    <Grid container sx={{ padding: '20px' }}>
      <Grid item xs={12}>
        <Header 
        title={title}
        context = {context}
        />
      </Grid>
      <Grid item container spacing={5}>
        <MovieList action={action} movies={displayedMovies}></MovieList>
      </Grid>
    </Grid>
    <PaginationFooter setState = {setState}/>
    </div>
  );
}
export default MovieListPageTemplate;
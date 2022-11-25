import Grid from "@mui/material/Grid";
import React, { useContext } from "react";
import Header from "../headerMovieList";
import MovieList from "../movieList";
import PaginationFooter from '../pagination';

function MovieListPageTemplate({ totalPages, page,  movies, title, setState, action, context}) {
  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(context.nameFilter.toLowerCase()) !== -1;
    })

  return (
    <div>
    <Grid container sx={{ padding: '20px' }}>
      <Grid item xs={12}>
        <Header 
        title={title}
        context = {context}
        setState = {setState}
        />
      </Grid>
      <Grid item container spacing={5}>
        <MovieList action={action} movies={displayedMovies}></MovieList>
      </Grid>
    </Grid>
    <PaginationFooter 
    setState = {setState}
    totalPages = {totalPages}
    page = {page}
    />
    </div>
  );
}
export default MovieListPageTemplate;
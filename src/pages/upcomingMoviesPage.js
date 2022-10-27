import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import { useQuery } from 'react-query';
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

const UpcomingMoviesPage = (props) => {
  const {  data, error, isLoading, isError }  = useQuery('discover', getUpcomingMovies)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favourites = movies.filter(m => m.favourite)
  localStorage.setItem('favourites', JSON.stringify(favourites))
  const addToFavourites = (movieId) => true 

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <PlaylistAddIcon />
          </>
        );
      }}
    />
  );
};
  
export default UpcomingMoviesPage;
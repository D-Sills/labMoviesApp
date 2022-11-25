
import React, { useState } from "react";
import { getMovie, getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites';

const HomePage = (props) => {
  const [page, setPage] = useState(1);
  const {  data, error, isLoading, isError, isFetching, isPreviousData, }  = useQuery({
    queryKey: ['discover', page],
    queryFn: () => getMovies(page),
    keepPreviousData : true
  });

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  let movies = data.results;
  
  // Redundant, but necessary to avoid app crashing.
  const favourites = movies.filter(m => m.favourite)
  localStorage.setItem('favourites', JSON.stringify(favourites))
  const addToFavourites = (movieId) => true 

  const handlePageChange = (val) => { 
    if (page === val) return;
    else
      setPage(val);

    console.log("poop")
  };

  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      setState={handlePageChange}
      action={(movie) => {
        return <AddToFavouritesIcon movie={movie} />
      }}
    />
  );
};

export default HomePage;
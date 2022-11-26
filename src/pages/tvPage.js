
import React, { useState, useContext } from "react";
import { getTVShows, getTVShow } from "../api/tmdb-api";
import PageTemplate from '../components/templateContentListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites';
import { ContentFilterContext } from "../contexts/filteringContext";

const TVPage = (props) => {
  const context = useContext(ContentFilterContext);
  const [page, setPage] = useState(1);
  const {  data, error, isLoading, isError, isFetching, isPreviousData, }  = useQuery({
    queryKey: ["tv", context.categoryFilter, page, context.genreId],
    queryFn: () => getTVShows(page, context.categoryFilter, context.genreId),
    keepPreviousData : true
  });

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  window.scrollTo(0, 0);
  let tvShows = data.results;
  let pages = data.total_pages;
  if (pages > 500) pages = 500; //api call breaks above page 500

  // Redundant, but necessary to avoid app crashing.
  const favourites = tvShows.filter(m => m.favourite)
  localStorage.setItem('favourites', JSON.stringify(favourites))
  const addToFavourites = (movieId) => true 

  const handlePageChange = (val) => { 
    if (page === val) return;
    else
      setPage(val);
  };

  return (
    <PageTemplate
      totalPages={pages}
      title="Discover TV"
      content={tvShows}
      page={page}
      setState={handlePageChange}
      context={context}
      contentType = "tv"
      action={(tvShow) => {
        return <AddToFavouritesIcon movie={tvShow} />
      }}
    />
  );
};

export default TVPage;
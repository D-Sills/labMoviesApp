
import React, { useState, useContext } from "react";
import { getMovies, getMovie } from "../api/tmdb-api";
import PageTemplate from '../components/contentListPageTemplate';
import { useQuery,useQueries } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavouritesIcon from '../components/cards/cardIcons/addToFavourites';
import { ContentFilterContext } from "../contexts/filteringContext";
import { UserLists } from "../contexts/userListsContext";

const MoviesPage = (props) => {
  const context = useContext(ContentFilterContext);
  const userLists = useContext(UserLists);
  const [page, setPage] = useState(1);

  const {  data, error, isLoading, isError, isFetching, isPreviousData, }  = useQuery({
    queryKey: ["movies", context.categoryFilter, page, context.genreId],
    queryFn: () => getMovies(page, context.categoryFilter, context.genreId),
    keepPreviousData : true
  });
  
  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  window.scrollTo(0, 0);
  let movies = data.results;
  let pages = data.total_pages;
  if (pages > 500) pages = 500; //api call breaks above page 500

  const handlePageChange = (val) => {
    //cache current page maybe
    if (page === val) return;
    else
      setPage(val);
  };

  return (
    <PageTemplate 
      totalPages={pages}
      title="Discover Movies"
      content={movies}
      page={page}
      setState={handlePageChange}
      context={context}
      contentType = "movie"
    />
  );
};

export default MoviesPage;
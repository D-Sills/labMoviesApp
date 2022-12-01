
import React, { useContext, useState } from "react";
import { useQuery } from 'react-query';
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/contentListPageTemplate';
import Spinner from '../components/spinner';
import { ContentFilterContext } from "../contexts/filteringContext";
import { UserContext } from "../contexts/userContext";

const MoviesPage = (props) => {
  const context = useContext(ContentFilterContext);
  const userContext = useContext(UserContext);
  const [page, setPage] = useState(1);

  const {  data, error, isLoading, isError }  = useQuery({
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
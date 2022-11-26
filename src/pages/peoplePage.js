
import React, { useState, useContext } from "react";
import { getPeople, getTVShow } from "../api/tmdb-api";
import PageTemplate from '../components/templateContentListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavouritesIcon from '../components/cards/cardIcons/addToFavourites';
import { ContentFilterContext } from "../contexts/filteringContext";

const TVPage = (props) => {
  const context = useContext(ContentFilterContext);
  const [page, setPage] = useState(1);
  const {  data, error, isLoading, isError, isFetching, isPreviousData, }  = useQuery({
    queryKey: ["people", "popular", page],
    queryFn: () => getPeople(page),
    keepPreviousData : true
  });

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  window.scrollTo(0, 0);
  let people = data.results;
  let pages = data.total_pages;
  if (pages > 500) pages = 500; //api call breaks above page 500

  // Redundant, but necessary to avoid app crashing.
  const favourites = people.filter(m => m.favourite)
  localStorage.setItem('favourites', JSON.stringify(favourites))
  const addToFavourites = (personId) => true 

  const handlePageChange = (val) => { 
    if (page === val) return;
    else
      setPage(val);
  };

  return (
    <PageTemplate
      totalPages={pages}
      title="Discover People"
      content={people}
      page={page}
      setState={handlePageChange}
      context={context}
      contentType = "person"
      action={(person) => {
        return <AddToFavouritesIcon movie={person} />
      }}
    />
  );
};

export default TVPage;
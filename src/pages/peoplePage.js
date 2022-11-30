
import React, { useContext, useState } from "react";
import { useQuery } from 'react-query';
import { getPeople } from "../api/tmdb-api";
import PageTemplate from '../components/contentListPageTemplate';
import Spinner from '../components/spinner';
import { ContentFilterContext } from "../contexts/filteringContext";

const TVPage = () => {
  const context = useContext(ContentFilterContext);
  const [page, setPage] = useState(1);
  const {  data, error, isLoading, isError}  = useQuery({
    queryKey: ["people", "popular", context.personType, page],
    queryFn: () => getPeople(page, context.personType),
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
    />
  );
};

export default TVPage;
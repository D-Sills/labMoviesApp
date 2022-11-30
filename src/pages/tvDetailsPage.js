import Box from "@mui/material/Box";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { useParams } from 'react-router-dom';
import { getTVShow } from '../api/tmdb-api';
import ContentDetails from "../components/contentDetails";
import ContentHeader from "../components/contentHeader";
import Spinner from '../components/spinner';
import { AuthenticationContext } from "../contexts/authenticationContext";
import { UserLists } from "../contexts/userListsContext";

const TVDetailsPage = () => {
  const { id } = useParams();
  const userContext = useContext(UserLists)
  const authContext = useContext(AuthenticationContext);

  const { data: tvShow, error, isLoading, isError } = useQuery(
    ["tvShow", { id: id }],
    getTVShow
  );
  
  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  let contentType= 'tv';

  return (
  <Box>
    <ContentHeader authContext = {authContext} userContext ={userContext} contentType = {contentType} content={tvShow} />
    <Box sx={{maxWidth: '1360px' ,marginLeft: 'auto',
    marginRight: 'auto'}}> 
      <ContentDetails authContext = {authContext} userContext ={userContext} contentType = {contentType} content={tvShow}/>
    </Box>
  </Box> 
  );
};

export default TVDetailsPage;
import Box from "@mui/material/Box";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { useParams } from 'react-router-dom';
import { getMovie } from '../api/tmdb-api';
import ContentDetails from "../components/contentDetails";
import ContentHeader from "../components/contentHeader";
import Spinner from '../components/spinner';
import { AuthenticationContext } from "../contexts/authenticationContext";
import { UserLists } from "../contexts/userListsContext";

const MovieDetailsPage = (props) => {
  const { id } = useParams();
  const userContext = useContext(UserLists)
  const authContext = useContext(AuthenticationContext);

  const { data: movie, error, isLoading, isError } = useQuery(
    ["movie", { id: id }],
    getMovie
  );
  
  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  let contentType= 'movie';

  return (
  <Box>
    <ContentHeader authContext = {authContext} userContext ={userContext} contentType = {contentType} content={movie} />
    <Box sx={{maxWidth: '1360px' ,marginLeft: 'auto',
    marginRight: 'auto'}}> 
      <ContentDetails authContext = {authContext} userContext ={userContext} contentType = {contentType} content={movie}/>
    </Box>
  </Box> 
  );
};

export default MovieDetailsPage;
import React, { useContext } from "react";
import { useParams } from 'react-router-dom';
import { getPerson } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'
import { AuthenticationContext } from "../contexts/authenticationContext";
import { UserLists } from "../contexts/userListsContext";
import Box from "@mui/material/Box";
import PersonDetails from "../components/personDetails";

const PersonDetailsPage = () => {
  const { id } = useParams();
  const userContext = useContext(UserLists)
  const authContext = useContext(AuthenticationContext);
  
  const { data: person, error, isLoading, isError } = useQuery(
    ["person", { id: id }],
    getPerson
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <Box sx={{maxWidth: '1360px' ,marginLeft: 'auto',
    marginRight: 'auto'}}> 
        <PersonDetails authContext = {authContext} userContext ={userContext} content={person}/>
    </Box>
  );
};

export default PersonDetailsPage;
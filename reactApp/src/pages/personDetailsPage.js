import React, { useContext } from "react";
import { useParams } from 'react-router-dom';
import { getPerson } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'
import { UserContext } from "../contexts/userContext";
import Box from "@mui/material/Box";
import PersonDetails from "../components/personDetails";

const PersonDetailsPage = () => {
  const { id } = useParams();
  const userContext = useContext(UserContext)
  
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
  
  window.scrollTo(0, 0);
  
  return (
    <Box sx={{maxWidth: '1360px' ,marginLeft: 'auto',
    marginRight: 'auto'}}> 
        <PersonDetails userContext ={userContext} content={person}/>
    </Box>
  );
};

export default PersonDetailsPage;
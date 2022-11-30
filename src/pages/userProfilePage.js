
import React, { useContext, useState, useEffect } from "react";
import { UserLists } from "../contexts/userListsContext";
import { AuthenticationContext } from "../contexts/authenticationContext";
import { useNavigate } from "react-router-dom";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner'
import UserProfileHeader from '../components/userProfileHeader';
import UserProfileDetails from '../components/userProfileDetails';
import Box from '@mui/material/Box'

const UserProfilePage = () => {
  const userLists = useContext(UserLists);
  const authContext = useContext(AuthenticationContext);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!authContext.user) {navigate("/", { replace: true })};
  }, [authContext.user, navigate]);

  const { data, error, isLoading, isError } = useQuery(
    ["userData"],
    authContext.fetchUserData
  );
  
  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  
  window.scrollTo(0, 0);
  let userData = data;

  return (
    <Box>
      <UserProfileHeader userData = {userData}/>
      <Box sx={{marginTop: '30px', maxWidth: '1360px' ,marginLeft: 'auto', marginRight: 'auto'}}> 
        <UserProfileDetails />
      </Box>
    </Box>
  );
};

export default UserProfilePage;
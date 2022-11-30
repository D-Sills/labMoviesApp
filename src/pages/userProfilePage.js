
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

  window.scrollTo(0, 0);

  return (
    <Box>
      <UserProfileHeader authContext={authContext} />
      <Box sx={{marginTop: '10px', maxWidth: '1360px' ,marginLeft: 'auto', marginRight: 'auto'}}> 
        <UserProfileDetails userContext = {userLists}/>
      </Box>
    </Box>
  );
};

export default UserProfilePage;
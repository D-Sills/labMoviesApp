
import Box from '@mui/material/Box';
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserProfileDetails from '../components/userProfileDetails';
import UserProfileHeader from '../components/userProfileHeader';
import { UserContext } from "../contexts/userContext";

const UserProfilePage = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!userContext.user) {navigate("/", { replace: true })};
  }, [userContext.user, navigate]);

  return (
    <Box>
      <UserProfileHeader userContext={userContext} />
      <Box sx={{marginTop: '10px', maxWidth: '1360px' ,marginLeft: 'auto', marginRight: 'auto'}}> 
        <UserProfileDetails userContext = {userContext}/>
      </Box>
    </Box>
  );
};

export default UserProfilePage;
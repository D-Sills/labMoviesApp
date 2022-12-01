import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";

const UserProfileHeader = (props) => {
  const userContext = props.userContext;
  
  return (
  <div sx={{maxHeight: '250px', minHeight: '250'}} style={{margin: '-20px', backgroundColor: 'rgba(0,0,0,0.5)', boxShadow: 2,}}> 
    <Box sx={{flexGrow: 1}}>
        <Grid container spacing={2} sx={{ 
            zIndex: 6,
            paddingLeft: '50px',
            paddingTop: '50px',
            paddingBottom: '-40px',
            position: 'absolute',
            maxWidth: '1360px',
        }}>
        
        <Grid item xs = {2}>
        <Avatar sx={{width: '160px', height: '160px',}}/>
        </Grid>  
        
        <Grid item xs sx={{marginTop: '50px'}}>
          <Stack direction="row" spacing={2}>
          <Typography variant="h4" style={{color: 'white'}} >
          {userContext.data.name}
          </Typography>
          <Typography sx={{paddingTop: '14px'}}variant="body1" style={{color: 'GrayText'}} >
          Member since
          </Typography>
          </Stack>
          <Typography sx={{paddingTop: '8px',paddingBottom: '24px'}} variant="body1" style={{color: 'white'}}>
          Favourited things • Logged in via {userContext.data.authProvider}• Email is {userContext.data.email} 
          </Typography>
        </Grid>
        </Grid>
        
        <Box component="img" sx={{
              minWidth: '100%',
              maxWidth: '100%', 
              maxHeight: '240px',
              opacity: 0.6,
              filter: 'brightness(80%)',
              zIndex: 5,
              objectFit: 'cover'}}
          alt="User Banner."
          src={"https://img.freepik.com/free-vector/open-clapper-board-with-film-strip-background-design_1017-26102.jpg?w=2000"}/>
        </Box>
    </div>
  );
};

export default UserProfileHeader;
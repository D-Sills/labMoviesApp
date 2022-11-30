import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { format } from 'date-fns';
import React from "react";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";

const UserProfileHeader = (props) => {
  const data = props.userData;
  const navigate = useNavigate();
  
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
        
        <Grid item xs sx={{paddingTop: '50px'}}>
          <Stack direction="row" spacing={2}>
          <Typography variant="h4" style={{color: 'white'}} >
          {data.name}
          </Typography>
          <Typography sx={{paddingTop: '14px'}}variant="body1" style={{color: 'GrayText'}} >
          Member since whenever
          </Typography>
          </Stack>
          <Typography sx={{paddingTop: '8px',paddingBottom: '24px'}} variant="body1" style={{color: 'white'}}>
          Favourited 3 • Logged in via • Email is 
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
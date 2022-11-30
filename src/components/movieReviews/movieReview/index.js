import React from "react";
import Box from "@mui/material/Box"
import Dialog from '@mui/material/Dialog';
import Avatar from '@mui/material/Avatar';
import { autocompleteClasses, Typography } from '@mui/material';
import Grid from "@mui/material/grid";

const MovieReview =  (props) => {
  if (props.review === undefined) return;
  const getAuthorPFP = () => {
    if (props.review.author_details.avatar_path === null) {
      return false;
    } else {
    return true;
    }
  }
  
  function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }
  
  
  
  return (
    <Box>
    <Dialog sx = {{maxHeight: "600px", marginTop: 'auto', marginBottom: 'auto'}} open={props.open} onClose={() => props.close()}>
    <Grid sx={{padding: '30px',}} container spacing={2}>
    
    <Grid container>
      <Grid item xs={2}>
      {
      getAuthorPFP ? 
      <Avatar sx={{ width: 76, height: 76 }}
        src={`https://image.tmdb.org/t/p/w200${props.review.author_details.avatar_path}`}
        alt="Account pfp"
        />
      :
      <Avatar sx={{ width: 76, height: 76 }}
      {...stringAvatar(props.review.author)} />
      }
      </Grid>
      
      <Grid item>
        <Typography variant="h5">
        A Review by {props.review.author}
        </Typography>
        <Typography variant="body1">
        Written by {props.review.author} on {props.review.created_at}
        </Typography>
      </Grid>
    </Grid>
    
    <Grid item xs={12} sm container>
      <Typography variant="body1" > 
      {props.review.content}
      </Typography>
    </Grid>
    
    </Grid>
    </Dialog>
    </Box>
  );
};
export default MovieReview
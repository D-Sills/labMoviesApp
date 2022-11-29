import NavigationIcon from "@mui/icons-material/Navigation";
import Box from "@mui/material/Box";
import Divider from '@mui/material/Divider';
import Drawer from "@mui/material/Drawer";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/grid";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { getCast } from "../../api/tmdb-api";
import ContentCast from "../contentCast";
import MovieReviews from "../movieReviews";
import Spinner from "../spinner";
import MovieDetails from "./movieDetails";
import TVDetails from "./tvDetails";

const ContentDetails = (props) => { 
  const content = props.content;
  const type = props.contentType;
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data, error, isLoading, isError}  = useQuery({
    queryKey: ["credits", type, content.id],
    queryFn: () => getCast(type, content.id),
    keepPreviousData : true
  });
  
  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
      return <h1>{error.message}</h1>
  }  

  let cast = data.cast;
  let crew = data.crew;
  
  return (
  <Box sx={{flexGrow: 1, }}>
    <Grid container spacing={2}>
    
    <Grid item xs={8} >
    <Box className="wrapper">
      <Typography sx={{paddingTop: '25px',paddingLeft: '10px'}} variant="h5">
        Top Billed Cast
      </Typography>
      <ContentCast content={cast}/>
      <Divider />
      <Typography sx={{paddingTop: '25px',paddingLeft: '10px', paddingBottom: '25px'}} variant="h5">
        Reviews
      </Typography>
      <MovieReviews type={type}content={content} />
    </Box>
    </Grid>

    <Grid item xs={4}>
    {type === 'movie' ? <MovieDetails content ={content} /> :  <TVDetails content ={content} />}
    </Grid>

      <Fab
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '1em'
        }}
      >
        <NavigationIcon />
        Add Review
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews type = {type} content={content} />
      </Drawer>
      </Grid>
    </Box>
  );
};

export default ContentDetails ;
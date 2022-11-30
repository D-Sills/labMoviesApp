import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { getCredits } from "../../api/tmdb-api";
import Spinner from "../../components/spinner";
import ImageCarousel from '../imageCarousel';
import PersonKnownFor from "./personKnownFor";

const PersonDetails = (props) => {
  const content = props.content;
  const navigate = useNavigate();
  
  const { data, error, isLoading, isError}  = useQuery({
    queryKey: ["appeared in", content.id],
    queryFn: () => getCredits(content.id),
    keepPreviousData : true
  });
  
  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
      return <h1>{error.message}</h1>
  }  

  let knownForCast = data.cast;
  let knownForCrew = data.crew;
  
  let date= () => {
    date = Date.parse(content.release_date);
    return date;
  }
  
  const handleFavourite = (e) => {
    e.preventDefault()
    if (props.userContext.checkIfFav(content)) {
      props.userContext.removeFromFavourites(content)
    } else {
      props.userContext.addToFavourites(content);
    }
  };
  
  return (
  <Box sx={{flexGrow: 1}}>
    <Grid container spacing={2} sx={{ 
        padding: '30px',
        position: 'absolute',
        maxWidth: '1360px',
    }}>

    <Grid  style={{}} item xs = {4} >
    <ImageCarousel  type = 'person' content={content}/>
    <Typography sx={{paddingTop: '10px'}} variant="body1"  >
      <b>Birthday: </b>{content.birthday}
    </Typography>
    <Typography sx={{paddingTop: '10px'}} variant="body1"  >
      <b>Place of Birth: </b>{content.place_of_birth}
    </Typography>
    </Grid>  
    
    <Grid item xs = {8}>
      <Stack direction="row" spacing={2}>
      <IconButton aria-label="go back" onClick={() => navigate(-1)} >
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>
      <Typography sx={{paddingTop: '20px', paddingBottom: '24px'}} variant="h4"  >
      {content.name}
      </Typography>
      </Stack>
      <Typography sx={{paddingTop: '8px',paddingBottom: '8px'}} variant="h5" >
      Biography
      </Typography>
      <Typography sx={{paddingTop: '8px',paddingBottom: '24px'}} variant="body1" >
      {content.biography}
      </Typography>
      <Typography sx={{paddingTop: '8px',paddingBottom: '8px'}} variant="h5" >
      Known For
      </Typography>
      <PersonKnownFor content={knownForCast}/>
    </Grid>
    
    </Grid>
  </Box>
  );
};

export default PersonDetails;
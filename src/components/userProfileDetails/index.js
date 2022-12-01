import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from "@mui/material/Box";
import Grid from "@mui/material/grid";
import Typography from "@mui/material/Typography";
import React from "react";
import DreamMovieContainer from './dreamMovieContainer';
import FavouritedContent from "./favouritedContent";

const UserProfileDetails = (props) => { 
  const context = props.userContext;
  
  const isNoFavourites = (type) => {
    let i =0;
    context.favourites.forEach((doc) => {
      if (doc.mediaType === type) {
        i++;
      }
    });
    if (i > 0) return false;
    else return true;
  };
  
  return (
    <Box sx={{flexGrow: 1, }}>
    <Grid container spacing={2}>
    
    <Grid item xs={12} >
    <Box sx={{marginTop: '10px'}}>
      <Typography sx={{paddingBottom: '25px'}} variant="h5">
        Dream Movie
      </Typography>
      <DreamMovieContainer userContext ={context}/>
      
      <Typography sx={{paddingTop: '15px', paddingBottom: '15px'}} variant="h5">
        Favourites
      </Typography>
      { isNoFavourites('movie') ? 
      <Accordion disabled disableGutters>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Favourite Movies</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FavouritedContent content = {context.favourites} type={'movie'}/>
        </AccordionDetails>
      </Accordion>
      :
      <Accordion disableGutters>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Favourite Movies</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FavouritedContent content = {context.favourites} type={'movie'}/>
      </AccordionDetails>
    </Accordion>
      }
      
      { isNoFavourites('tv') ? 
      <Accordion disabled disableGutters> 
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Favourite TV Shows</Typography>
        </AccordionSummary> 
        <AccordionDetails>
          <FavouritedContent content = {context.favourites} type={'tv'}/>
        </AccordionDetails>
      </Accordion>
      :
      <Accordion disableGutters>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
      >
        <Typography>Favourite TV Shows</Typography>
      </AccordionSummary> 
      <AccordionDetails>
        <FavouritedContent content = {context.favourites} type={'tv'}/>
      </AccordionDetails>
    </Accordion>
      }
      
      { isNoFavourites('person') ? 
      <Accordion disabled disableGutters>  
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Favourite People</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FavouritedContent content = {context.favourites} type={'person'}/>
        </AccordionDetails>
      </Accordion>
      :
      <Accordion disableGutters>  
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Favourite People</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FavouritedContent content = {context.favourites} type={'person'}/>
        </AccordionDetails>
      </Accordion>
      }
      
    </Box>
    </Grid>

    </Grid>
    </Box>
  );
};

export default UserProfileDetails ;
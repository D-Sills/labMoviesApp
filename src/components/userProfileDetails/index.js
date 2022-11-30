import NavigationIcon from "@mui/icons-material/Navigation";
import Box from "@mui/material/Box";
import Divider from '@mui/material/Divider';
import Drawer from "@mui/material/Drawer";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/grid";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Spinner from "../spinner";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavouritedContent from "./favouritedContent";
import DreamMovieContainer from './dreamMovieContainer';

const UserProfileDetails = (props) => { 
  const context = props.userContext;
  const [openDream, setOpenDream] = useState(false);
  
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
      <Accordion>
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
      
      <Accordion>
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
      
      <Accordion disabled>
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
      
    </Box>
    </Grid>

    </Grid>
    </Box>
  );
};

export default UserProfileDetails ;
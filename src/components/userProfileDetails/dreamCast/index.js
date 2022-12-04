import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import React from "react";
import ScrollContainer from 'react-indiana-drag-scroll';
import DreamCastCard from "../../cards/dreamCastCard";
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

const DreamCast = (props) => {
    let context = props.context;
    
    let contentCards = context.dreamMovieCast.map((m) =>  (
        <ImageListItem key={m.id}>
            <DreamCastCard  key={m.id} context={context} content={m} type ={'person'}/>
        </ImageListItem>
    ));
    
    return (
    <Box sx={{maxWidth: "800px"}}>
        {
        context.dreamMovieCast.length === 0 ? 
        <Accordion disabled disableGutters>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
        >
        <Typography>Movie Cast</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Typography variant="body">
            Add some cast members from the 'People' page to get started!
            </Typography> 
        </AccordionDetails>
        </Accordion>
        :
        <Accordion disableGutters>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
        >
        <Typography>Movie Cast</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography variant="body">
            <ScrollContainer vertical={false} horizontal={true}>
            <ImageList sx={{gridAutoFlow: "column",
            gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr)) !important",
            gridAutoColumns: "minmax(230px, 1fr)"}}>
            {contentCards}
            </ImageList>
            </ScrollContainer>
        </Typography>
        </AccordionDetails>
        </Accordion>
        }
    </Box>
    );
};

export default DreamCast;
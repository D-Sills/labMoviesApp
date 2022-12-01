import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, {useState} from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { getCredits } from "../../api/tmdb-api";
import Spinner from "../../components/spinner";
import ImageCarousel from '../imageCarousel';
import PersonKnownFor from "./personKnownFor";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddToCast from "../addToCast";

const PersonDetails = (props) => {
  const context = props.userContext;
  const content = props.content;
  const navigate = useNavigate();
  const [openMore, setOpenMore] = useState(false);
  
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
  
  const handleFavourite = (e) => {
    e.preventDefault()
    if (context.checkIfFav(content, 'person')) {
      context.removeFromFavourites(content, 'person')
    } else {
      context.addToFavourites(content, 'person');
    }
  };
  
  const checkIfInDream = () => {
    return true;
  }
  
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
      
      {
        context.checkIfFav(content, 'person') ? (
          <IconButton
          onClick={handleFavourite}
          >
          <Avatar sx={{ backgroundColor: '#081C22' }}>
            <FavoriteIcon style={{ color: 'red' }}/>
          </Avatar>
          </IconButton>
        ) : <IconButton
        onClick={handleFavourite}
        >
          <Avatar sx={{ backgroundColor: '#081C22' }}>
            <FavoriteIcon style={{ color: 'white' }}/>
        </Avatar>
        </IconButton>
      }
      
      { checkIfInDream() ?
      <Button sx={{margin:-3,padding: '10px'}}onClick={() => setOpenMore(true)} variant="outlined" startIcon={<PersonAddIcon />} size = "small">
      Add to Dream Movie!
      </Button>
      :
      <Button sx={{margin:-3,padding: '10px'}}onClick={() => setOpenMore(true)} variant="outlined" startIcon={<PersonAddIcon />} size = "small">
      Remove from Dream Movie!
      </Button>
      }
      
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
    
    
    <AddToCast actor={content} open={openMore} setOpen={setOpenMore} context={context}/>
    </Grid>
  </Box>
  );
};

export default PersonDetails;
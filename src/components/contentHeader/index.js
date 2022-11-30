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
import ImageCarousel from '../imageCarousel';
import FavoriteIcon from "@mui/icons-material/Favorite";

const ContentHeader = (props) => {
  const content = props.content;
  const type = props.contentType;
  const navigate = useNavigate();

  const getGenres = () => {
    let genres = [];

    content.genres.forEach(element => {
      genres.push(element.name);
    });
    let list = "No genre data available";
    if (genres.length === 1) { list = (genres[0]);}
    if (genres.length === 2) { list = (genres[0] + ", " + genres[1]);}
    if (genres.length === 3) { list = (genres[0] + ", " + genres[1] + ", " + genres[2]);}
    return list;
  }
  
  let date= () => {
    type === 'movie' ? date = Date.parse(content.release_date) : date = Date.parse(content.first_air_date);
    return date;
  }
  let rating = (content.vote_average).toString();
  rating = rating.replaceAll(".", "");
  rating = rating.slice(0,2)
  const getColorFromRating = () => {
    let color = 'FireBrick'
    if (rating >= 80) color = 'DarkSlateGray';
    else if (rating >= 60 && rating < 80) color = 'GreenYellow';
    else if (rating >= 40 && rating < 60) color = 'Orange';
    return color;
  }
  
  const getRuntime = () => {
    if (type === 'movie') {
      let time = content.runtime/60
      let hour = String(time)[0]
      let minute = String(time)[2] + String(time)[3]
      let goat = hour + 'h ' + minute + "m"
      return goat;
    }  else {
      let goat = content.episode_run_time;
      goat = goat.slice(0,2) + 'm';
      return goat;
    }
  }
  
  const getBackdrop = () => {
    let backDropPath = `https://image.tmdb.org/t/p/w500/${content.backdrop_path}`
    if (content.backdrop_path) 
      return backDropPath;
    else
      return "https://i.kym-cdn.com/entries/icons/facebook/000/025/999/Screen_Shot_2018-04-24_at_1.33.44_PM.jpg";
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
  <div sx={{maxHeight: '650px', minHeight: '650'}} style={{margin: '-20px', backgroundColor: 'rgba(0,0,0,0.5)', boxShadow: 2,}}> 
    <Box sx={{flexGrow: 1, display: 'flex',
  justifyContent: 'center'}}>
        <Grid container spacing={2} sx={{ 
            zIndex: 6,
            padding: '30px',
            position: 'absolute',
            maxWidth: '1360px',
        }}>
        <Grid  style={{marginTop: '30px'}} item xs = {4} >
        <ImageCarousel  type = {type} content={content}/>
        </Grid>  
        
        <Grid item xs={12} sm container>
        <Grid item xs container direction="column" spacing={8}>
          <Grid item xs>
            <Stack direction="row" spacing={2}>
            <IconButton aria-label="go back" onClick={() => navigate(-1)} >
              <ArrowBackIcon color="primary" fontSize="large" />
            </IconButton>
            <Typography sx={{paddingTop: '4px'}} variant="h4" style={{color: 'white'}} >
            {type === 'movie' ? content.title : content.name}.
            </Typography>
            </Stack>
            <Typography sx={{paddingTop: '8px',paddingBottom: '24px'}} variant="body1" style={{color: 'white'}}>
            {`${format(date(), 'MMM d, yyyy')}`} • {getGenres()} • {getRuntime()}
            </Typography>
            
            <Stack sx={{paddingBottom: '24px'}} direction="row" spacing={2}>
              <Avatar sx={{ 
              backgroundColor: '#081C22',
              height: '80px',
              outline: `solid 5px ${getColorFromRating()}`,
              outlineOffset: '-4px',
              width: '80px', 
              color: 'white'
              }}>
              <span><b>{rating}</b><span 
              style={{fontSize: '60%', verticalAlign: 'top', color: 'white'}}>
              %</span></span>
              </Avatar>
              
              {
                props.userContext.checkIfFav(content) ? (
                  <IconButton
                  onClick={handleFavourite}
                  >
                  <Avatar sx={{ backgroundColor: 'red' }}>
                    <FavoriteIcon color = 'red'/>
                  </Avatar>
                  </IconButton>
                ) : <IconButton
                onClick={handleFavourite}
                >
                <Avatar sx={{ backgroundColor: 'red' }}>
                  <FavoriteIcon color = 'white'/>
                </Avatar>
                </IconButton>
              }
            </Stack>
            
            <Typography sx={{paddingBottom: '8px'}} variant="body2" style={{color: '#B2BAC2'}}>
            <i>{content.tagline}</i>
            </Typography>
            <Typography sx={{paddingBottom: '8px'}} variant="h4" style={{color: 'white'}}>
            Overview
            </Typography>
            <Typography sx={{paddingBottom: '8px'}} variant="body1" style={{color: 'white'}}>
            {content.overview}
            </Typography>
          </Grid>
          
          
        </Grid>
        </Grid>
        </Grid>
        <Box component="img" sx={{
              minWidth: '100%',
              maxWidth: '100%', 
              maxHeight: '750px',
              opacity: 0.5,
              filter: 'brightness(20%)',
              zIndex: 5,
              objectFit: 'cover'}}
          alt="Movie Banner."
          src={getBackdrop()}/>
        </Box>
    </div>
  );
};

export default ContentHeader;
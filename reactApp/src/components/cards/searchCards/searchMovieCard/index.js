import FavoriteIcon from "@mui/icons-material/Favorite";
import MovieTwoToneIcon from '@mui/icons-material/MovieTwoTone';
import Avatar from '@mui/material/Avatar';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import img from '../../../../images/film-poster-placeholder.png';

export default function SearchMovieCard({ content, userContext }) {

  let rating = (content.vote_average).toString();
  rating = rating.replaceAll(".", "");
  const getColorFromRating = () => {
    let color = 'FireBrick'
    if (rating >= 80) color = 'DarkSlateGray';
    else if (rating >= 60 && rating < 80) color = 'GreenYellow';
    else if (rating >= 40 && rating < 60) color = 'Orange';
    return color;
  }
  
  return (
    <Link style={{textDecoration: "none",}} to={"/movies/"+ content.id}>
    <div style={{ position: "relative" }}>
    <Card sx={{ 
    minHeight: 120,
    maxHeight: 120,
    }} align="left" 
    >
    <Grid container>
    <Grid item xs={4} >
    <CardMedia 
      sx={{ 
      minHeight: 120,
      maxHeight: 120,
      }}
      component="img"
      image={
        content.poster_path
          ? `https://image.tmdb.org/t/p/w500/${content.poster_path}`
          : img
      }
    />
    </Grid>
    
    <Grid item xs={5} sx={{ 
      display: 'flex',alignItems: 'center', 
      minHeight: 120,
      maxHeight: 120,}}>
      <CardContent>
        <Typography variant="h5" component="p">
        <b>{content.title}</b>
        </Typography>
      </CardContent>
    </Grid>
    
    </Grid> 
    <div style={{position: "absolute", top: 10, left: 10,}}>
    {
      content.favourite ? (
        <IconButton
        onClick={userContext.addToFavourites(content)}
        >
        <Avatar sx={{ backgroundColor: 'red' }}>
          <FavoriteIcon />
        </Avatar>
        </IconButton>
      ) : null
    }
    </div>
    
    <div style={{position: "absolute", bottom: 10, left: 10,}}>
          <MovieTwoToneIcon />
    </div>
    
    <div style={{position: "absolute", top: 35, right: 60,}}>
        <Avatar sx={{ 
        backgroundColor: '#081C22',
        height: '50px',
        outline: `solid 2px ${getColorFromRating()}`,
        outlineOffset: '-1px',
        width: '50px'
        }}>
        <span style={{color: 'white'}}><b>{rating}</b><span 
        style={{color: 'white', fontSize: '60%', verticalAlign: 'top'}}>
        %</span></span>
        </Avatar>
    </div>

    </Card>
    </div>

    </Link>
    
    
  );
}
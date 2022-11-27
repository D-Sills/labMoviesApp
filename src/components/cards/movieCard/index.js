import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Avatar from '@mui/material/Avatar';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { format } from 'date-fns';
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MoviesContext } from "../../../contexts/moviesContext";
import img from '../../../images/film-poster-placeholder.png';

export default function MovieCard({ content }) {
  const { favourites, addToFavourites } = useContext(MoviesContext);

  if (favourites.find((id) => id === content.id)) {
    content.favourite = true;
  } else {
    content.favourite = false
  }

  const handleAddToFavourite = (e) => {
    e.preventDefault();
    addToFavourites(content);
  };
  
  const date = Date.parse(content.release_date);
  let menuOpen = false;
  
  return (
    <Card sx={{ 
    mainWidth: 350, 
    maxWidth: 350, 
    minHeight: 450,
    maxHeight: 450,
    boxShadow: 3,
    }} align="left" 
    >
    
    <div style={{ position: "relative" }}>
    <div style={{position: "absolute", top: 10, left: 10,}}>
    {
      content.favourite ? (
        <Avatar sx={{ backgroundColor: 'red' }}>
          <FavoriteIcon />
        </Avatar>
      ) : <Avatar sx={{ backgroundColor: 'red' }}>
      <FavoriteIcon />
    </Avatar>
    }
    </div>
    
    <div style={{position: "absolute", top: 10, right: 10,}}>
    {
      menuOpen ? (
        null
      ):<Avatar sx={{ 
        backgroundColor: 'rgba(255,255,255,0.5)' ,
        color: 'rgba(0,0,0,0.5)',
        height: '30px',
        width: '30px'
        }}>
          <MoreHorizIcon />
        </Avatar>
    }
    </div>
    
    <div style={{position: "absolute", bottom: 10, left: 10,}}>
    {
      content.favourite ? (
        <Avatar sx={{ backgroundColor: 'red' }}>
          <FavoriteIcon />
        </Avatar>
      ) : <Avatar sx={{ backgroundColor: 'red' }}>
      <FavoriteIcon />
    </Avatar>
    }
    </div>
    
    <Link to={"/movies/"+ content.id}>
    <CardMedia 
      sx={{ 
      minHeight: 320,
      maxHeight: 320,
      objectFit: "fill" }}
      component="img"
      image={
        content.poster_path
          ? `https://image.tmdb.org/t/p/w500/${content.poster_path}`
          : img
      }
    />
    </Link>
    </div>
    
    <CardContent>
      <Grid container>
        <Grid item xs={12} >
          <Typography variant="h5" component="p">
          <b>{content.title}</b>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h7" component="p">
            {`${format(date, 'MMM d, yyyy')}`}
          </Typography>
        </Grid>
      </Grid> 
      </CardContent>
      
    </Card>
  );
}
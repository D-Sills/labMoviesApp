import FavoriteIcon from "@mui/icons-material/Favorite";
import TheaterComedyTwoToneIcon from '@mui/icons-material/TheaterComedyTwoTone';
import Avatar from '@mui/material/Avatar';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserLists } from "../../../../contexts/userListsContext";
import img from '../../../../images/film-poster-placeholder.png';

export default function SearchPersonCard({ content }) {
  const userContext = useContext(UserLists)
  
  return (
    <Link style={{textDecoration: "none",}} to={"/people/"+ content.id}>
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
        content.profile_path
          ? `https://image.tmdb.org/t/p/w500/${content.profile_path}`
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
        <b>{content.name}</b>
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
    <TheaterComedyTwoToneIcon />
    </div>

    </Card>
    </div>

    </Link>
    
    
  );
}
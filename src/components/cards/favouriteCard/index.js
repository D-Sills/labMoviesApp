import CancelIcon from '@mui/icons-material/Cancel';
import Avatar from '@mui/material/Avatar';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../contexts/userContext";
import img from '../../../images/film-poster-placeholder.png';

export default function FavouriteCard(props ) {
  const content = props.content;
  const type = props.type;
  const userContext = useContext(UserContext)
  
  const handleFavourite = () => {
    userContext.removeFromFavourites(content, type)
  };
  
  const getLinkFromType = () => {
    if (type === 'movie') return 'movies';
    else if (type === 'person') return 'people';
    else return 'tv';
  }
  
  return (
    <Card sx={{
    boxShadow: 'none',
    border: 0,
    }} align="left" 
    >
    
    <div style={{ position: "relative" }}>
    <div style={{position: "absolute", top: -5, left: -5,}}>
        <IconButton
        onClick={handleFavourite}
        >
        <Avatar sx={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <CancelIcon />
        </Avatar>
        </IconButton>
    </div>
    
    <Link to={"/" + getLinkFromType() + "/" + content.id}>
    <CardMedia 
      sx={{ 
      minHeight: 290,
      maxHeight: 290,
      borderRadius:  2,
      objectFit: "fill" }}
      component="img"
      image={
        content.imagePath
          ? `https://image.tmdb.org/t/p/w500/${content.imagePath}`
          : img
      }
    />
    </Link>
    </div>
    
    <CardContent align="center" sx={{ paddingTop: '10px', align: 'center'}}>
      <Grid container>
        <Grid item xs={12} >
          <Typography  variant="body1">
          <b>{content.name}</b>
          </Typography>
        </Grid>
      </Grid> 
      </CardContent>
      
    </Card>
  );
}
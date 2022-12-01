import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from "@mui/icons-material/Favorite";
import TheaterComedyTwoToneIcon from '@mui/icons-material/TheaterComedyTwoTone';
import TheatersIcon from '@mui/icons-material/Theaters';
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

export default function CastCard(props ) {
  const content = props.content;
  const userContext = useContext(UserContext)
  
  const getDeptIcon = () => {
    if (content.known_for_department === "Acting")
      return <TheaterComedyTwoToneIcon />;
    if (content.known_for_department === "Directing")
      return <TheatersIcon />;
    if (content.known_for_department === "Writing")
      return <EditIcon />;
  }
  
  const handleFavourite = (e) => {
    e.preventDefault()
    if (userContext.checkIfFav(content, 'movie')) {
      userContext.removeFromFavourites(content, 'movie')
    } else {
      userContext.addToFavourites(content, 'movie');
    }
  };
  
  return (
    <Card sx={{
    marginLeft: '10px',
    marginBottom: '10px',
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
      userContext.checkIfFav(content,'person') ? (
        <IconButton
        onClick={handleFavourite}
        >
        <Avatar sx={{ backgroundColor: 'red' }}>
          <FavoriteIcon />
        </Avatar>
        </IconButton>
      ) : null
    }
    </div>
    
    <div style={{position: "absolute", bottom: 5, right: 10,}}>
      {getDeptIcon()}
    </div>
    
    <Link to={"/people/"+ content.id}>
    <CardMedia 
      sx={{ 
      minHeight: 320,
      maxHeight: 320,
      objectFit: "fill" }}
      component="img"
      image={
        content.profile_path
          ? `https://image.tmdb.org/t/p/w500/${content.profile_path}`
          : img
      }
    />
    </Link>
    </div>
    
    <CardContent sx={{ paddingTop: '35px'}}>
      <Grid container>
        <Grid item xs={12} >
          <Typography variant="h5" component="p">
          <b>{content.name}</b>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h7" component="p">
          {content.character}
          </Typography>
        </Grid>
      </Grid> 
      </CardContent>
      
    </Card>
  );
}
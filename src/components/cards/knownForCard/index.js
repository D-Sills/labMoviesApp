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
import { AuthenticationContext } from "../../../contexts/authenticationContext";
import { UserLists } from "../../../contexts/userListsContext";
import img from '../../../images/film-poster-placeholder.png';

export default function CastCard(props ) {
  const content = props.content;
  const userContext = useContext(UserLists)
  const authContext = useContext(AuthenticationContext);
  
  const getDeptIcon = () => {
    if (content.known_for_department === "Acting")
      return <TheaterComedyTwoToneIcon />;
    if (content.known_for_department === "Directing")
      return <TheatersIcon />;
    if (content.known_for_department === "Writing")
      return <EditIcon />;
  }
  
  return (
    <Card sx={{
    marginBottom: '5px',
    boxShadow: 'none',
    border: 0,
    }} align="left" 
    >
    
    <div style={{ position: "relative" }}>
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
    
    <div style={{position: "absolute", bottom: 5, right: 10,}}>
      {getDeptIcon()}
    </div>
    
    <Link to={"/" + (content.media_type === "movie" ? "movies" : "tv") + "/" + content.id}>
    <CardMedia 
      sx={{ 
      minHeight: 320,
      maxHeight: 320,
      borderRadius:  2,
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
    
    <CardContent align="center" sx={{ paddingTop: '10px', align: 'center'}}>
      <Grid container>
        <Grid item xs={12} >
          <Typography  variant="body1">
          <b>{content.character}</b>
          </Typography>
        </Grid>
      </Grid> 
      </CardContent>
      
    </Card>
  );
}
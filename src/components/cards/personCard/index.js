import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Avatar from '@mui/material/Avatar';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import EditIcon from '@mui/icons-material/Edit';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TheatersIcon from '@mui/icons-material/Theaters';
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../contexts/userContext";
import img from '../../../images/film-poster-placeholder.png';
import ContextMenu from "../contextMenu";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import TheaterComedyTwoToneIcon from '@mui/icons-material/TheaterComedyTwoTone';

export default function PersonCard({ content }) {
  const context = useContext(UserContext)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  let menuOpen = false;
  
  const getKnownContentNames = () => {
    let knownFor = [];

    content.known_for.forEach(element => {
      if (element.media_type === "movie")
        knownFor.push(element.title);
      else
        knownFor.push(element.name);
    });
    let list = (knownFor[0] + ", " + knownFor[1] + ", " + knownFor[2]);
    return list;
  }
  
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
    if (context.checkIfFav(content, 'person')) {
      context.removeFromFavourites(content, 'person')
    } else {
      context.addToFavourites(content, 'person');
    }
  };
  
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
      context.checkIfFav(content,'person') ? (
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
        <IconButton
          aria-label="menu"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
          >
            <MoreHorizIcon />
          </IconButton>
        </Avatar>
    }
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={open}
      onClose={() => setAnchorEl(null)}
    >
    <ContextMenu
      userContext = {context}
      content = {content}
      setAnchor = {setAnchorEl}
      type = 'person'
    />
    </Menu>
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
          {getKnownContentNames()}
          </Typography>
        </Grid>
      </Grid> 
      </CardContent>
      
    </Card>
  );
}
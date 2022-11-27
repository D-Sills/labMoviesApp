import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Avatar from '@mui/material/Avatar';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { format } from 'date-fns';
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserLists } from "../../../contexts/userListsContext";
import img from '../../../images/film-poster-placeholder.png';
import ContextMenu from "../contextMenu";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";

export default function MovieCard({ content }) {
  const context = useContext(UserLists);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const date = Date.parse(content.release_date);
  let menuOpen = false;
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
        <IconButton
        onClick={context.addToFavourites(content)}
        >
        <Avatar sx={{ backgroundColor: 'red' }}>
          <FavoriteIcon />
        </Avatar>
        </IconButton>
      ) : null
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
      context = {context}
      content = {content}
    />
    </Menu>
    </div>
    
    <div style={{position: "absolute", bottom: -25, left: 10,}}>
        <Avatar sx={{ 
        backgroundColor: '#081C22',
        height: '50px',
        outline: `solid 2px ${getColorFromRating()}`,
        outlineOffset: '-1px',
        width: '50px'
        }}>
        <span><b>{rating}</b><span 
        style={{fontSize: '60%', verticalAlign: 'top'}}>
        %</span></span>
        </Avatar>
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
    
    <CardContent sx={{ paddingTop: '35px'}}>
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
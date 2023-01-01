import CancelIcon from '@mui/icons-material/Cancel';
import Avatar from '@mui/material/Avatar';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link } from "react-router-dom";
import img from '../../../images/film-poster-placeholder.png';

export default function DreamCastCard(props ) {
  const content = props.content;
  const userContext = props.context;
  const handleCast = () => {
    userContext.removeFromCast(content.id, content.name);
  };
  
  return (
    <Card sx={{
    boxShadow: 'none',
    border: 0,
    }} align="left" 
    >
    
    <div style={{ position: "relative" }}>
    <div style={{position: "absolute", top: -5, left: -5,}}>
        <IconButton
        onClick={handleCast}
        >
        <Avatar sx={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <CancelIcon />
        </Avatar>
        </IconButton>
    </div>
    
    <Link to={"/people/" + content.id}>
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
          <Typography  variant="body1">
          {content.character}
          </Typography>
        </Grid>
      </Grid> 
      </CardContent>
      
    </Card>
  );
}
import React, { useContext  } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import img from '../../../images/film-poster-placeholder.png'
import Avatar from '@mui/material/Avatar';
import { Link } from "react-router-dom";
import { UserLists } from "../../../contexts/userListsContext";

export default function MovieCard({ content, action }) {
  const { favourites, addToFavourites } = useContext(UserLists);
 
   if (favourites.find((id) => id === content.id)) {
    content.favourite = true;
   } else {
    content.favourite = false
   }
 
   const handleAddToFavourite = (e) => {
     e.preventDefault();
     addToFavourites(content);
   };
 

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          content.favourite ? (
            <Avatar sx={{ backgroundColor: 'red' }}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p">
            {content.name}{" "}
          </Typography>
        }
      />
      <CardMedia
        sx={{ height: 500 }}
        image={
          content.poster_path
            ? `https://image.tmdb.org/t/p/w500/${content.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {content.first_air_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {content.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
        {action(content)}
        <Link to={`/tv/${content.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
    </Card>
  );
}
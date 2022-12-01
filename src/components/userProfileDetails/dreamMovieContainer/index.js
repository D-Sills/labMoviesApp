import EditIcon from '@mui/icons-material/Edit';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from "@mui/material/grid";
import Paper from '@mui/material/Paper';
import { format } from 'date-fns';
import React, { useState } from "react";
import EditDreamMovie from './editDreamMovie';
import { useQuery } from "react-query";
import {GetGenres} from "../../../api/tmdb-api"

function DreamMovieContainer(props) {
    const context = props.userContext;
    const [openMore, setOpenMore] = useState(false);
    
    const { data, error, isLoading, isError } = useQuery({
        queryKey: ["movie genres"],
        queryFn: () => GetGenres("movie"),
    });
    
    if (isLoading) {
        return;
    }
    
    if (isError) {
        return <h1>{error.message}</h1>;
    }
    
    const genres = data.genres;
    if (genres[0].name !== "All"){
        genres.unshift({ id: "0", name: "All" });
    }
    
    const getGenres = () => {
        let genres = [];
    
        context.dreamMovieGenres.forEach(element => {
        genres.push(element.name);
        });
        let list = "No genre data available";
        if (genres.length === 1) { list = (genres[0]);}
        if (genres.length === 2) { list = (genres[0] + ", " + genres[1]);}
        if (genres.length === 3) { list = (genres[0] + ", " + genres[1] + ", " + genres[2]);}
        return list;
    }

    let date = () => {
        date = Date.parse(context.dreamMovieReleaseDate);
        date = format(date, 'MMM d, yyyy');
        return date;
    }
    
    return (
    <Paper
    sx={{
        flexGrow: 1,
    }}>
    <Grid container spacing={2}>
        <Grid item>
            <Box component="img" sx = {{height: '500px', width: '500px'}}alt="moviePoster" src={context.dreamMovieImagePath} />
        </Grid>
        <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
                <Typography  variant="h5">
                    {context.dreamMovieName}
                </Typography>
                <Typography variant="body1" >
                     • {getGenres()} • {context.dreamMovieCompany}
                </Typography>
                <Typography variant="body2">
                    {context.dreamMovieOverview}
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="h6">
                    Cast
                </Typography>
            {
                context.dreamMovieCast.length === 0 ? 
                <Typography variant="body">
                Add some cast members from the 'People' page to get started!
                </Typography> :
                
                <Typography variant="body">
                poop
                </Typography>
            }
            </Grid>

            
            </Grid>
            <Grid sx={{paddingRight: '20px'}}item>
                <Button variant="outlined" startIcon={<EditIcon />} size = "small" onClick={() => setOpenMore(true)}>
                    Edit Movie
                </Button>
            </Grid>
            </Grid>
        </Grid>
        <EditDreamMovie 
        context={context} genres={genres}
        open ={openMore} setOpen={setOpenMore}         
        />
    </Paper>
    );
}
export default DreamMovieContainer;
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
import DreamCast from '../dreamCast';

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
    genres[0].name = "N/a"

    const getGenres = () => {
        let genres2 = [];
    
        context.dreamMovieGenres.forEach(element => {
            genres.forEach(element2 => {
                if (element2.id === element) {
                    if (element.id === 0) {}
                    else genres2.push(element2.name);
                }
            });
        });
        let list = "No genre data available";
        if (genres2.length === 1) { list = (genres2[0]);}
        if (genres2.length === 2) { list = (genres2[0] + ", " + genres2[1]);}
        if (genres2.length === 3) { list = (genres2[0] + ", " + genres2[1] + ", " + genres2[2]);}
        return list;
    }
    
    return (
    <Paper
    sx={{
        flexGrow: 1,
        padding: '10px',
    }}>
    <Grid container spacing={2}>
        <Grid item xs={2}>
            <Box component="img" alt="moviePoster" src={context.dreamMovieImagePath} />
        </Grid>
        <Grid item xs={8} sm container>
            <Grid item container direction="column" spacing={2}>
            <Grid item>
                <Typography  variant="h5">
                    {context.dreamMovieName==="" ? "Movie Title" : context.dreamMovieName}
                </Typography>
                <Typography variant="body1" >
                    {context.dreamMovieReleaseDate}  • {getGenres()} • {context.dreamMovieCompany==="" ? "Movie Company" : context.dreamMovieCompany}
                </Typography>
                <Typography variant="body2">
                    {context.dreamMovieOverview==="" ? "Movie Overview" : context.dreamMovieOverview}
                </Typography>
                <DreamCast context= {context}/>
            </Grid> 
            </Grid>
        </Grid>
        <Grid xs={2} sx={{paddingRight: '20px'}}item>
            <Button variant="outlined" startIcon={<EditIcon />} size = "small" onClick={() => setOpenMore(true)}>
                Edit Movie
            </Button>
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
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useState } from "react";
import DialogActions from '@mui/material/DialogActions';
import { format } from 'date-fns';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
    style: {
        maxHeight: ITEM_HEIGHT * 3.8 + ITEM_PADDING_TOP,
        width: 220,
    },
    },
};
const dateFormat = 'dd/MM/yyyy';
const today = format( new Date(), dateFormat );

function EditDreamMovie(props) {
    const context = props.context;
    const [dreamMovieName, setDreamMovieName] = useState('');
    const [dreamMovieCompany, setDreamMovieCompany] = useState('');
    const [dreamMovieImagePath, setDreamMovieImagePath] = useState('');
    const [dreamMovieOverview, setDreamMovieOverview] = useState('');
    const [dreamMovieReleaseDate, setDreamMovieReleaseDate] = useState(today);
    const [dreamMovieGenres, setDreamMovieGenres] = useState(['0','0','0']);
    const genreData = props.genres;

    function onChangeDate( dateObject ) {
        // date format is case sensitive!
        let formattedDateString = format( dateObject, dateFormat );
        setDreamMovieReleaseDate( formattedDateString );
    }
    
    function onChangeGenre(index, name) {
        let genres = [...dreamMovieGenres];
        genres[index] = name;
        setDreamMovieGenres(genres);
    }
    
    return (
    <div>
    <Grid sx = {{position: 'flex', align: 'center'}} container spacing={2}>
    <Dialog open={props.open} onClose={() => props.setOpen(false)}>
        <Grid item xs={12}>
        <DialogTitle>
        <Typography variant="h4" component="h2">
        {context.dreamMovieName}
        </Typography>
        </DialogTitle>
        </Grid>
        
        <DialogContent>
        <Grid item xs={12}>
        <TextField sx = {{width: '100%',}}
            label="Movie Title"
            value={dreamMovieName}
            onChange={(e) => setDreamMovieName(e.target.value)}
            type='text'
        />
        </Grid>
        
        <Grid item xs={12}>
        <Stack direction ="row">
        <FormControl size="small" sx={{margin: 1, minWidth: 120}}>
        <InputLabel id="genre-label1">Genre</InputLabel>
        <Select
            defaultValue=""
            value={dreamMovieGenres[0]}
            onChange={(e) => onChangeGenre(0,e.target.value)}
            MenuProps={MenuProps}
            >
            {genreData.map((genre) => {
            return (
                <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
                </MenuItem>
            );
            })}
        </Select>
        </FormControl>
        
        <FormControl size="small" sx={{margin: 1, minWidth: 120}}>
        <InputLabel id="genre-label2">Genre</InputLabel>
        <Select
            defaultValue=""
            value={dreamMovieGenres[1]}
            onChange={(e) => onChangeGenre(1,e.target.value)}
            MenuProps={MenuProps}
            >
            {genreData.map((genre) => {
            return (
                <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
                </MenuItem>
            );
            })}
        </Select>
        </FormControl>
        
        <FormControl size="small" sx={{margin: 1, minWidth: 120}}>
        <InputLabel id="genre-label3">Genre</InputLabel>
        <Select 
            defaultValue=""
            onChange={(e) => onChangeGenre(2,e.target.value)}
            value={dreamMovieGenres[2]}
            MenuProps={MenuProps}
            >
            {genreData.map((genre) => {
            return (
                <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
                </MenuItem>
            );
            })}
        </Select>
        </FormControl>
        </Stack>
        </Grid>
        
        <Grid item xs={12}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker disableMaskedInput={true}
                value={dreamMovieReleaseDate}
                onChange={onChangeDate}
                views={ [ 'year', 'month', 'day' ] }
                    allowSameDateSelection={ true }
                label="Release Date"
                inputFormat="MMM d, yyyy"
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
        </Grid>

        
        <Grid item xs={12}>
        <TextField sx = {{width: '100%',}}
            value={dreamMovieCompany}
            onChange={(e) => setDreamMovieCompany(e.target.value)}
            label="Production Company"
            type='text'
        />
        </Grid>
        
        <Grid item xs={12}>
        <TextField sx = {{width: '100%',}}
            multiline
            maxRows={4}
            label="Overview"
            value={dreamMovieOverview}
            onChange={(e) => setDreamMovieOverview(e.target.value)}
            type='text'
        />
        </Grid>
        
        <Grid item xs={12}>
        <label htmlFor="upload-photo">
        <input
            style={{ display: "none" }}
            id="upload-photo"
            name="upload-photo"
            type="file"
        />
        <Button color="secondary" variant="contained" component="span">
            Upload Movie Poster
        </Button>{" "}
        </label>
        </Grid>
        </DialogContent>
        
        <DialogActions>
            <Button onClick={() => props.setOpen(false)}>Cancel</Button>
            <Button onClick={() => {
            context.setDreamMovieValues(
            dreamMovieName, dreamMovieReleaseDate, dreamMovieImagePath, dreamMovieOverview,
            dreamMovieCompany, dreamMovieGenres
            );
            props.setOpen(false);
            }}>
            Update Details
            </Button>
        </DialogActions>
        
    </Dialog>
    </Grid>
    </div>
    );
}
export default EditDreamMovie;
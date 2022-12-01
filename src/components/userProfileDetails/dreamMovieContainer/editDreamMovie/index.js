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
import { useQuery } from "react-query";
import { getGenres } from "../../../../api/tmdb-api";

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

function EditDreamMovie(props) {
    const context = props.context;
    const genreData = props.genres;

    return (
    <div>
    <Grid sx = {{position: 'flex', align: 'center'}} container spacing={2}>
    <Dialog open={props.open} onClose={() => props.setOpen(false)}>
        <Grid item xs={12}>
        <DialogTitle>
        <Typography variant="h4">
        {props.values.name}
        </Typography>
        </DialogTitle>
        </Grid>
        
        <DialogContent>
        <Grid item xs={12}>
        <TextField sx = {{width: '100%',}}
            value={props.values.name}
            onChange={props.setValues('name')}
        />
        </Grid>
        
        <Grid item xs={12}>
        <Stack direction ="row">
        <FormControl size="small" sx={{margin: 1, minWidth: 120}}>
        <InputLabel id="genre-label1">Genre</InputLabel>
        <Select
            defaultValue=""
            value={props.genreId[0]}
            onChange={props.setValues('genres[0]')}
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
            value={props.genreId[1]}
            onChange={props.setValues('genres[1]')}
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
            value={props.genreId[2]}
            onChange={props.setValues('genres[2]')}
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
                value={props.values.releaseDate}
                label="Release Date"
                inputFormat="MMM d, yyyy"
                onChange={props.setValues('releaseDate')}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
        </Grid>

        
        <Grid item xs={12}>
        <TextField sx = {{width: '100%',}}
            placeholder={props.values.company}
            onChange={props.setValues('company')}
            label="Production Company"
            type='text'
            value={props.values.company}
        />
        </Grid>
        
        <Grid item xs={12}>
        <TextField sx = {{width: '100%',}}
            placeholder={props.values.overview}
            multiline
            maxRows={4}
            onChange={props.setValues('overview')}
            label="Overview"
            value={props.values.overview}
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
        
    </Dialog>
    </Grid>
    </div>
    );
}
export default EditDreamMovie;
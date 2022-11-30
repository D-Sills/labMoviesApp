import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import React, {useEffect, useState} from "react";
import { logInWithEmailAndPassword, signInWithGoogle } from "../../../../firebase";
import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';
import { Typography } from '@mui/material';
import Grid from "@mui/material/grid";
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import GoogleIcon from '@mui/icons-material/Google';
import { getGenres } from "../../../api/tmdb-api";
import { useQuery } from "react-query";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

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
    const [showPassword, setVisibility] = useState(false);
    
    const { data, error, isLoading, isError } = useQuery({
        queryKey: ["movie genres"],
        queryFn: () => getGenres("movie"),
    });
    
    if (isLoading) {
        return;
    }
    
    if (isError) {
        return <h1>{error.message}</h1>;
    }
    const genres = data.genres;
    if (genres[0].name === "All"){
        genres.unshift({ id: "0", name: "N/a" });
    }
    
    const handleClickShowPassword = () => {
        setVisibility(!showPassword);
    };
    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    

    return (
    <div>
    <Grid sx = {{position: 'flex', align: 'center'}} container spacing={2}>
    <Dialog open={props.open} onClose={() => props.setOpen(false)}>
        <Grid item xs={12}>
        <DialogTitle>
        <Typography variant="h4">
        {props.value.name}
        </Typography>
        </DialogTitle>
        </Grid>
        
        <DialogContent>
        <Grid item xs={12}>
        <TextField sx = {{width: '100%',}}
            value={props.values.name}
            onChange={(e) => props.setValues.name(e.target.value)}
            label="Movie Title"
            type='text'
        />
        </Grid>
        
        <Grid item xs={12}>
        <TextField sx = {{width: '100%',}}
            value={props.values.name}
            onChange={(e) => props.setValues.name(e.target.value)}
            label="Movie Title"
            type='text'
        />
        </Grid>
        
        <Grid item xs={12}>
        <Stack direction ="row">
        <FormControl size="small" sx={{margin: 1, minWidth: 220}}>
        <InputLabel id="genre-label1">Genre</InputLabel>
        <Select
            defaultValue="N/a"
            value={props.values.genres[0]}
            onChange={(e) => props.setValues.genres[0](e.target.value) }
            MenuProps={MenuProps}
            >
            {genres.map((genre) => {
            return (
                <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
                </MenuItem>
            );
            })}
        </Select>
        </FormControl>
        
        <FormControl size="small" sx={{margin: 1, minWidth: 220}}>
        <InputLabel id="genre-label2">Genre</InputLabel>
        <Select
            defaultValue="N/a"
            value={props.values.genres[1]}
            onChange={(e) => props.setValues.genres[1](e.target.value) }
            MenuProps={MenuProps}
            >
            {genres.map((genre) => {
            return (
                <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
                </MenuItem>
            );
            })}
        </Select>
        </FormControl>
        
        <FormControl size="small" sx={{margin: 1, minWidth: 220}}>
        <InputLabel id="genre-label3">Genre</InputLabel>
        <Select
            defaultValue="N/a"
            value={props.values.genres[2]}
            onChange={(e) => props.setValues.genres[2](e.target.value) }
            MenuProps={MenuProps}
            >
            {genres.map((genre) => {
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
                label="Date desktop"
                inputFormat="MM/DD/YYYY"
                value={props.values.releaseDate}
                onChange={(e) => props.setValues.releaseDate(e.target.value)}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
        </Grid>

        
        <Grid item xs={12}>
        <TextField sx = {{width: '100%',}}
            value={props.values.company}
            onChange={(e) => props.setValues.company(e.target.value)}
            label="Production Company"
            type='text'
        />
        </Grid>
        
        <Grid item xs={12}>
        <TextField sx = {{width: '100%',}}
            value={props.values.overview}
            multiline
            maxRows={4}
            onChange={(e) => props.setValues.overview(e.target.value)}
            label="Overview"
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
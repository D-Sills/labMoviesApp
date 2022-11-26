import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react"; // useState/useEffect redundant 
import { useQuery } from "react-query";
import { getGenres } from "../../api/tmdb-api";
import Spinner from '../spinner';

const formControl = 
  {
    margin: 1,
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)"
  };

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

  export default function FilterMoviesCard(props) {
    const { data, error, isLoading, isError } = useQuery("genres", getGenres);
  
    if (isLoading) {
      return <Spinner />;
    }
  
    if (isError) {
      return <h1>{error.message}</h1>;
    }
    const genres = data.genres;
    if (genres[0].name !== "All"){
      genres.unshift({ id: "0", name: "All" });
    }
  
    let categories = [
      {label: "Top Rated", value: "top_rated"},
      {label: "Upcoming Releases", value: "upcoming"},
      {label: "New Releases", value: "now_playing"}
    ];

    const handleChange = (e, type, value) => {
      e.preventDefault();
      props.onUserInput(type, value);
      props.setState(1);
    };
  
    const handleTextChange = (e, props) => {
      handleChange(e, "name", e.target.value);
    };
  
    const handleGenreChange = (e) => {
      handleChange(e, "genre", e.target.value);
    };

    const handleCategoryChange = (e) => {
      handleChange(e, "category", e.target.value);
    };

  return (
    <Typography>
      <FormControl sx={formControl}>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          id="category-select"
          defaultValue="top_rated"
          value={props.categoryFilter}
          onChange={handleCategoryChange}
        >
          {categories.map((category) => {
            return (
              <MenuItem key={category.label} value={category.value}>
                {category.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl sx={formControl}>
        <InputLabel id="genre-label">Genre</InputLabel>
        <Select
          labelId="genre-label"
          id="genre-select"
          defaultValue=""
          value={props.genreFilter}
          onChange={handleGenreChange}
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
      <TextField
        sx={formControl}
        id="filled-search"
        label="Search field"
        type="search"
        variant="filled"
        value={props.titleFilter}
        onChange={handleTextChange}
      />
      </Typography>
    );
}
import React from "react"; // useState/useEffect redundant 
import ImageListItem from "@mui/material/ImageListItem";
import { getMovieImages } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner';
import Carousel from 'react-material-ui-carousel';

function ImageCarousel(props) {
    const movie = props.movie;
    const { data , error, isLoading, isError } = useQuery(
        ["images", { id: movie.id }],
        getMovieImages
    );

    if (isLoading) {
    return <Spinner />;
    }

    if (isError) {
    return <h1>{error.message}</h1>;
    }
    const images = data.posters 


    return (
        <Carousel
            fullHeightHover={true} 
            navButtonsProps={{          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
                style: {
                    backgroundColor: 'cornflowerblue',
                    borderRadius: 0
                }
            }} 
            indicators = {false}
            navButtonsAlwaysVisible = {true}
            cols={1}>
            {images.map((image) => (
                <ImageListItem key={image.file_path} cols={1}>
                <img
                    src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                    alt={image.poster_path}
                />
                </ImageListItem>
            ))}
        </Carousel>
    );
}

export default ImageCarousel;
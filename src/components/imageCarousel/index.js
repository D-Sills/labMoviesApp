import React from "react"; // useState/useEffect redundant 
import ImageListItem from "@mui/material/ImageListItem";
import { getImages } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner';
import Carousel from 'react-material-ui-carousel';

function ImageCarousel(props) {
    const content = props.content;
    const type = props.type;
    
    const { data, error, isLoading, isError}  = useQuery({
        queryKey: ["images", type, content.id],
        queryFn: () => getImages(type, content.id),
        keepPreviousData : true
    });

    if (isLoading) {
    return <Spinner />;
    }

    if (isError) {
    return <h1>{error.message}</h1>;
    }
    const images = data.posters 

    return (
        <Carousel sx={{boxShadow: '10', borderRadius: '20px',}}
            fullHeightHover={true} 
            navButtonsProps={{          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
                style: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    borderRadius: '2px'
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
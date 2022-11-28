import React from "react";
import TrendingCard from "../cards/trendingCard";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const HomePageContent = ({content}) => {
    let contentCards = content.map((m) => (
        <ImageListItem>
        <TrendingCard key={m.id} content={m} />
        </ImageListItem>
    ));
    return (
        <ImageList sx={{gridAutoFlow: "column",
        gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr)) !important",
        gridAutoColumns: "minmax(300px, 1fr)"}}>
        {contentCards}
        </ImageList>
    );
};

export default HomePageContent;
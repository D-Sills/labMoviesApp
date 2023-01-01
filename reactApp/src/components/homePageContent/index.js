import React from "react";
import TrendingCard from "../cards/trendingCard";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ScrollContainer from 'react-indiana-drag-scroll'

const HomePageContent = ({content}) => {
    let contentCards = content.map((m) => (
        <ImageListItem key={m.id}>
        <TrendingCard key={m.id} content={m} />
        </ImageListItem>
    ));
    return (
        <ScrollContainer vertical={false} horizontal={true}>
        <ImageList sx={{gridAutoFlow: "column",
        gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr)) !important",
        gridAutoColumns: "minmax(300px, 1fr)"}}>
        {contentCards}
        </ImageList>
        </ScrollContainer>
    );
};

export default HomePageContent;
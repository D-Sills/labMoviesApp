import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import React from "react";
import ScrollContainer from 'react-indiana-drag-scroll';
import CastCard from "../../cards/castCard";

const FavouritedContent = (props) => {
    let content = props.content;
    let type = props.type;
    
    let contentCards = content.map((m) =>  (
        (m.mediaType === type) ?
            <ImageListItem key={m.id} style = {{pointerEvents: 'all'}}sx = {{position: 'relative', }}>
            <CastCard  key={m.id} content={m} />
            </ImageListItem>
        : console.log("not of type")
    ));
    
    return (
        <ScrollContainer vertical={false} horizontal={true}>
        <ImageList sx={{gridAutoFlow: "column",
        gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr)) !important",
        gridAutoColumns: "minmax(230px, 1fr)"}}>
        {contentCards}
        </ImageList>
        </ScrollContainer>
    );
};

export default FavouritedContent;
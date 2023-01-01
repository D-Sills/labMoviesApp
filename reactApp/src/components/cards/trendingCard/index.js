import React, { useContext, useState } from "react";
import MovieCard from "../movieCard";
import TVCard from "../tvCard";
import PersonCard from "../personCard";


export default function TrendingCard( {content} ) {
    const media_type = content.media_type;
    
    if (media_type === 'movie') {
        return <MovieCard content={content}/>
    }
    else if (media_type === 'tv') {
        return <TVCard content={content}/>
    }
    else if (media_type === 'person') {
        return <PersonCard content={content}/>
    }

}
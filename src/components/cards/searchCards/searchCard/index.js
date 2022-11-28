import React from "react";
import SearchMovieCard from "../searchMovieCard";
import SearchTVCard from "../searchTVCard";
import SearchPersonCard from "../searchPersonCard";


export default function SearchCard( {content} ) {
    const media_type = content.media_type;
    
    if (media_type === 'movie') {
        return <SearchMovieCard content={content}/>
    }
    else if (media_type === 'tv') {
        return <SearchTVCard content={content}/>
    }
    else if (media_type === 'person') {
        return <SearchPersonCard content={content}/>
    }

}
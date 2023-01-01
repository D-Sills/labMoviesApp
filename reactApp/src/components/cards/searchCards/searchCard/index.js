import React, { useContext } from "react";
import SearchMovieCard from "../searchMovieCard";
import SearchTVCard from "../searchTVCard";
import SearchPersonCard from "../searchPersonCard";
import { UserContext } from "../../../../contexts/userContext";

export default function SearchCard( {content} ) {
    const context = useContext(UserContext);
    const media_type = content.media_type;
    
    if (media_type === 'movie') {
        return <SearchMovieCard userContext={context} content={content}/>
    }
    else if (media_type === 'tv') {
        return <SearchTVCard userContext={context} content={content}/>
    }
    else if (media_type === 'person') {
        return <SearchPersonCard userContext={context} content={content}/>
    }

}
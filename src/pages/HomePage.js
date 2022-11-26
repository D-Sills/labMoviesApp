import React, { useState, useContext } from "react";
import HomePageHeader from '../components/homePageHeader';
import { getTrending } from "../api/tmdb-api";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';

const HomePage = (props) => {
    const [type, setType] = useState("all");
    const [time, setTime] = useState("week");
    const { data, error, isLoading, isError, isFetching, isPreviousData, }  = useQuery({
        queryKey: ["trending", type, time],
        queryFn: () => getTrending(type, time),
        keepPreviousData : true
    });

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }  
    window.scrollTo(0, 0);
    let trending = data.results;

    return (
        <HomePageHeader/>
    );
};

export default HomePage;
import React from "react";
import { useLocation } from "react-router-dom";

import MovieReview from "../components/movieReview";

const MovieReviewPage = (props) => {
  let location = useLocation();
  const {movie, review} = location.state;

  return (
  <div>poop</div>
  );
};

export default MovieReviewPage;
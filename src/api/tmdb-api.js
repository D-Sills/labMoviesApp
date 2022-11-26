  /*--------------------------------------------------------------------
  |  Main
  *-------------------------------------------------------------------*/
  export const getMovies = (page, category = "top_rated",  genre = 0) => {
    let ge = `https://api.themoviedb.org/3/movie/${category}?api_key=${process.env.REACT_APP_TMDB_KEY}&page=${page}`
    if (genre > 0) ge = `https://api.themoviedb.org/3/movie/${category}?api_key=${process.env.REACT_APP_TMDB_KEY}&with_genres=${genre}&page=${page}`
    return fetch(
      ge
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
    });
    };
  
  export const getMovie = (args) => {
    // console.log(args)
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
    });
  };

  export const getTVShows = (page, category = "top_rated",  genre = 0) => {
    let ge = `https://api.themoviedb.org/3/tv/${category}?api_key=${process.env.REACT_APP_TMDB_KEY}&page=${page}`
    if (genre > 0) ge = `https://api.themoviedb.org/3/tv/${category}?api_key=${process.env.REACT_APP_TMDB_KEY}&with_genres=${genre}&page=${page}`
    return fetch(
      ge
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
    });
    };

  export const getTVShow = (args) => {
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
    });
  };

  export const getGenres = async (type) => {
    return fetch(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
    ).then( (response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
    });
  };
  
  /*--------------------------------------------------------------------
  |  Movie Details
  *-------------------------------------------------------------------*/
  export const getMovieImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then( (response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
  
    })
    .catch((error) => {
      throw error
    });
  };

  export const getMovieReviews = (id) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((json) => {
        // console.log(json.results);
        return json.results;
      });
  };

  /*--------------------------------------------------------------------
  |  Miscellaneous
  *-------------------------------------------------------------------*/
  export const getPeople = (page) => {
    return fetch(
      `https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&page=${page}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
    });
  };

  export const getTrending = (media_type = "all", time = "week") => {
    return fetch(
      `https://api.themoviedb.org/3/trending/${media_type}/${time}?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
    });
  };

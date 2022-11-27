import React, { useState } from "react";

export const UserLists = React.createContext(null);

const UserListProvider = (props) => {
  const [myReviews, setMyReviews] = useState( {} ) 
  const [favourites, setFavourites] = useState( [] )
  const [mustWatch, setMustWatch] = useState( [] )

  const addToFavourites = (content) => {
    let newFavourites = [...favourites];
    if (!favourites.includes(content.id)) {
      newFavourites.push(content.id);
      content.favourite = true;
    } else {
      removeFromFavourites(content)
      return;
    }
    
    setFavourites(newFavourites);
    console.log(favourites);
  };

  // We will use this function in a later section
  const removeFromFavourites = (content) => {
    content.favourite = false;
    setFavourites( favourites.filter(
      (mId) => mId !== content.id
    ) )
    console.log(favourites);
  };
  
  const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };

  const addToMustWatch = (movie) => {
    let newMustWatch = [...mustWatch];
    if (!mustWatch.includes(movie.id)) {
      newMustWatch.push(movie.id);
    }
    setMustWatch(newMustWatch);
    console.log(mustWatch);
  };


  return (
    <UserLists.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
        addReview,
        mustWatch,
        addToMustWatch,
      }}
    >
      {props.children}
    </UserLists.Provider>
  );
};

export default UserListProvider;
import React, { useState, useContext } from "react";
import { AuthenticationContext } from "../contexts/authenticationContext";
import { doc, deleteDoc, addDoc, setDoc, query, collection, getDocs, where } from "firebase/firestore";
import { db} from "./../firebase";
import { DataSaverOff } from "@mui/icons-material";

export const UserLists = React.createContext(null);

const UserListProvider = (props) => {
  const authContext = useContext(AuthenticationContext);
  const [myReviews, setMyReviews] = useState( {} ) 
  const [favourites, setFavourites] = useState( [] )
  const [mustWatch, setMustWatch] = useState( [] )

  const addToFavourites = async (content, type="movie") => {
  try {
    let nameOf = "";
    let path = "";
    let docName = (content.id + "_" + type);
    type === 'movie' ? nameOf = content.title : nameOf = content.name;
    type === 'person' ? path = content.profile_path : path = content.poster_path;
    const docRef = doc(db, "users", authContext.user.uid,);
    const colRef = collection(docRef, "favourites");
    await setDoc(collection(colRef,docName), {
      id: content.id,
      mediaType: type,
      name: nameOf,
      imagePath: path,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
  };
  
  const removeFromFavourites = async (content, type) => {
    let docName = (content.id + "_" + type);
    if (checkIfFav2(content, type)) {
      try {
        const docRef = doc(db, "users", authContext.user.uid,);
        const colRef = collection(docRef, "favourites");
        await deleteDoc(doc(colRef, docName));
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    } else
    console.log("no favourites")
  };
  
    // We will use this function in a later section
    const checkIfFav = (content, type) => {
      if (favourites.includes(content.id)) {
        return true;
      } else return false;
    };
  
  const checkIfFav2 = (content, type) => {
    let docName = (content.id + "_" + type);
    if (authContext.data.favourites.includes(docName)) {
      return true;
    } else return false;
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
        checkIfFav,
      }}
    >
      {props.children}
    </UserLists.Provider>
  );
};

export default UserListProvider;
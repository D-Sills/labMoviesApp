import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { query, deleteDoc, doc, setDoc, collection, getDocs, where } from "firebase/firestore";
import { login, signup } from "../api/movie-api";
import { format } from 'date-fns';

export const UserContext = React.createContext();
const dateFormat = 'dd/MM/yyyy';
const today = format( new Date(), dateFormat );

const UserContextProvider = (props) => {
    const existingToken = localStorage.getItem("token");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authToken, setAuthToken] = useState(existingToken);
    const [userName, setUserName] = useState("");

    //Function to put JWT token in local storage.
    const setToken = (data) => {
        localStorage.setItem("token", data);
        setAuthToken(data);
    }

    const authenticate = async (username, password) => {
        const result = await login(username, password);
        if (result.token) {
        setToken(result.token)
        setIsAuthenticated(true);
        setUserName(username);
        }
    };
    
    const register = async (username, password) => {
        const result = await signup(username, password);
        console.log(result.code);
        return (result.code == 201) ? true : false;
    };
    
    const signout = () => {
        setTimeout(() => setIsAuthenticated(false), 100);
    }
    
    const [user, loading, error] = useAuthState(auth);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [modalIndex, setModalIndex] = useState(0);
    const [data, setData] = useState([]);
    const [favourites, setFavourites] = useState( [] )
    const [dreamMovieName, setDreamMovieName] = useState('');
    const [dreamMovieCompany, setDreamMovieCompany] = useState('');
    const [dreamMovieImagePath, setDreamMovieImagePath] = useState('');
    const [dreamMovieOverview, setDreamMovieOverview] = useState('');
    const [dreamMovieReleaseDate, setDreamMovieReleaseDate] = useState(today);
    const [dreamMovieGenres, setDreamMovieGenres] = useState(['0','0','0']);
    const [dreamMovieCast, setDreamMovieCast] = useState([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
            console.log("logged out");
            return;
        }
        const fetchUserData = async () => {
            try {
                //userData
                await new Promise(r => setTimeout(r, 1000));
                const q = query(collection(db, "users"), where("uid", "==", user?.uid));
                const doc2 = await getDocs(q);
                const data2 = doc2.docs[0].data();
                setData(data2);
                console.log(data2);
                
                //favourites
                const docRef = doc(db, "users", user.uid,);
                const colRef = collection(docRef, "favourites");
                const favs = await getDocs(colRef);
                if (favs.docs.length > 0) {
                    let tmp = [];
                    favs.forEach((doc) => {
                        tmp.push(doc.data()); // "doc1", "doc2" and "doc3"
                    });
                    console.log(tmp) 
                    setFavourites(tmp);
                }
                //dreamMovie
                const setDreamMovieValues = async () => {
                    const docRef2 = doc(db, "users", user.uid,);
                    const colRef2 = collection(docRef2, "dreamMovies");
                    const dream = await getDocs(colRef2);
                    if (dream.docs.length > 0) {
                    const dreamData = dream.docs[0].data();
                    setDreamMovieName(dreamData.name);
                    setDreamMovieReleaseDate(dreamData.releaseDate);
                    setDreamMovieImagePath(dreamData.imagePath);
                    setDreamMovieOverview(dreamData.overview);
                    setDreamMovieCompany(dreamData.company);
                    setDreamMovieGenres(dreamData.genres);
                    setDreamMovieCast(dreamData.cast); //not efficient lol
                    console.log(dreamData)
                    };
                }
                setDreamMovieValues();
            } catch (err) {
                console.error(err);
            }
        };
        fetchUserData();
        });
        return () => unsubscribe();
    }, [])
    
    const logOut = () => {
        logout();
    };
    
    /*--------------------------------------------------------------------
    |  Favourites
    *-------------------------------------------------------------------*/
    const addToFavourites = async (content, type="movie") => {
    try {
        let nameOf = "";
        let path = "";
        let docName = (content.id + "_" + type);
        type === 'movie' ? nameOf = content.title : nameOf = content.name;
        type === 'person' ? path = content.profile_path : path = content.poster_path;
        const docRef = doc(db, "users", user.uid,);
        const colRef = collection(docRef, "favourites");
        await setDoc(doc(colRef,docName), {
            id: content.id,
            mediaType: type,
            name: nameOf,
            imagePath: path,
        });
        /* const favs = await getDocs(colRef);
        let tmp = [];
        favs.forEach((doc) => {
            tmp.push(doc.data()); // "doc1", "doc2" and "doc3"
        });
        setFavourites(tmp); */
        const tmp = {
            id: content.id,
            mediaType: type,
            name: nameOf,
            imagePath: path,
        };
        let newFavourites = [...favourites];
        newFavourites.push(tmp);
        setFavourites(newFavourites);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
    };
    
    const removeFromFavourites = async (content, type) => {
    let docName = (content.id + "_" + type);
    console.log('removing: ' + docName);
    try {
        const docRef = doc(db, "users", user.uid,);
        const colRef = collection(docRef, "favourites");
        const docDel = doc(colRef, docName);
        deleteDoc(docDel);
        
        /* const favs = await getDocs(colRef);
        let tmp = [];
        favs.forEach((doc) => {
            tmp.push(doc.data()); // "doc1", "doc2" and "doc3"
        });
        setFavourites(tmp); */
        setFavourites( favourites.filter(
            (obj) => (obj.id + "_" + type) !== docName
        ))
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
    };
    
    const checkIfFav = (content, type) => {
    if (!user) {
        return;
    }
    let i = 0;
    favourites.forEach((doc) => {
        if (doc.mediaType === type && doc.id === content.id) {
            i++;
        }
    });
    if (i > 0) {
        return true; //wouldn't work in the foreach for some reason
    } else return false;
    };
    
    /*--------------------------------------------------------------------
    |  Dream Movie
    *-------------------------------------------------------------------*/
    const setDreamMovieValues = async (name_ = dreamMovieName, releaseDate_ = dreamMovieReleaseDate, imagePath_ = setDreamMovieImagePath,
                                overview_ = dreamMovieOverview, company_ = dreamMovieCompany, genres_ = dreamMovieGenres, cast_ = dreamMovieCast) => {
        const data = {
            cast: cast_,
            company: company_,
            genres: genres_,
            imagePath: imagePath_,
            name: name_,
            overview: overview_,
            releaseDate: releaseDate_,
        }
        const docRef = doc(db, "users", user.uid,);
        const colRef = collection(docRef, "dreamMovies");
        await setDoc(doc(colRef,"DreamMoviePog"), data);
        
        setDreamMovieName(data.name);
        setDreamMovieReleaseDate(data.releaseDate);
        setDreamMovieImagePath(data.imagePath);
        setDreamMovieOverview(data.overview);
        setDreamMovieCompany(data.company);
        setDreamMovieGenres(data.genres);
        setDreamMovieCast(data.cast);
    };
    
    const addToCast = async (actor) => {
        if (dreamMovieCast.includes(actor)) {
            alert("Already added this actor");
            return;
        }
        let newCast = [...dreamMovieCast];
        newCast.push(actor);
        setDreamMovieValues(dreamMovieName, dreamMovieReleaseDate,
            dreamMovieImagePath, dreamMovieOverview, dreamMovieCompany,
            dreamMovieGenres, newCast);
    };
    
    const removeFromCast = (id , name) => {
        let newCast = dreamMovieCast.filter(
            (obj) => (obj.id) !== id
        );
        console.log(newCast);
        alert(`Removing ${name}`)
        setDreamMovieValues(dreamMovieName, dreamMovieReleaseDate,
        dreamMovieImagePath, dreamMovieOverview, dreamMovieCompany,
        dreamMovieGenres, newCast);
    };
    
    const checkIfInCast = (content) => {
        let i = 0;
        dreamMovieCast.forEach(element => {
            if (element.id === content.id) {
            i++;
            }
        });
        if (i === 0) return false;
        else return true;
    }
    
    return (
    <UserContext.Provider
        value={{
        user,
        loading,
        error,
        email,
        setEmail,
        password,
        setPassword,
        name,
        setName,
        modalIndex,
        setModalIndex,
        data,
        logOut,
        favourites,
        addToFavourites,
        removeFromFavourites,
        setFavourites,
        checkIfFav,
        addToCast,
        removeFromCast,
        checkIfInCast,
        dreamMovieName,
        dreamMovieReleaseDate,
        dreamMovieImagePath,
        dreamMovieOverview,
        dreamMovieCompany,
        dreamMovieGenres,
        dreamMovieCast,
        setDreamMovieValues,
        isAuthenticated,
        authenticate,
        register,
        signout,
        userName
        }}
    >
    {props.children}
    </UserContext.Provider>
    );
};

export default UserContextProvider;
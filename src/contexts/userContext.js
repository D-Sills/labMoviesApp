import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { query, deleteDoc, doc, setDoc, collection, getDocs, where } from "firebase/firestore";

export const UserContext = React.createContext();

const UserContextProvider = (props) => {
    const [user, loading, error] = useAuthState(auth);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [modalIndex, setModalIndex] = useState(0);
    const [data, setData] = useState([]);
    const [favourites, setFavourites] = useState( [] )
    const [dreamMovie, setdreamMovie] = useState( [] )
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
            console.log("logged out");
            return;
        }
        const fetchUserData = async () => {
            try {
                //userData
                const q = query(collection(db, "users"), where("uid", "==", user?.uid));
                const doc2 = await getDocs(q);
                const data2 = doc2.docs[0].data();
                setData(data2);
                console.log(data2);
                
                //favourites
                const docRef = doc(db, "users", user.uid,);
                const colRef = collection(docRef, "favourites");
                const favs = await getDocs(colRef);
                let tmp = [];
                favs.forEach((doc) => {
                    tmp.push(doc.data()); // "doc1", "doc2" and "doc3"
                });
                console.log(tmp) 
                setFavourites(tmp);
                
            } catch (err) {
                console.error(err);
                alert("An error occured while fetching user data");
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
        const favs = await getDocs(colRef);
        let tmp = [];
        favs.forEach((doc) => {
            tmp.push(doc.data()); // "doc1", "doc2" and "doc3"
        });
        setFavourites(tmp);
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
        
        const favs = await getDocs(colRef);
        let tmp = [];
        favs.forEach((doc) => {
            tmp.push(doc.data()); // "doc1", "doc2" and "doc3"
        });
        setFavourites(tmp);
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
        return true;
    } else return false;
    };
    
    
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
        }}
    >
    {props.children}
    </UserContext.Provider>
    );
};

export default UserContextProvider;
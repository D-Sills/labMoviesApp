import React, { useState, useEffect, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { UserLists } from "../contexts/userListsContext";
import { auth, db, logout } from "./../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { query, collection, getDocs, where } from "firebase/firestore";

export const AuthenticationContext = React.createContext();

const AuthenticationContextProvider = (props) => {
    const userLists = useContext(UserLists);
    const [user, loading, error] = useAuthState(auth);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [modalIndex, setModalIndex] = useState(0);
    const [data, setData] = useState([]);
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
            console.log("logged out");
            return;
        }
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = getDocs(q);
            const data = doc.docs[0].data();
            setData(data);
            return data;
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
        });
        return () => unsubscribe();
    }, [])
    
    const logOut = () => {
        logout();
    };

    return (
    <AuthenticationContext.Provider
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
        logOut
        }}
    >
    {props.children}
    </AuthenticationContext.Provider>
    );
};

export default AuthenticationContextProvider;
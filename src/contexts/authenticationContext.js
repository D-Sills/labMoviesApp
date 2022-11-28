import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "./../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

export const AuthenticationContext = React.createContext();

const AuthenticationContextProvider = (props) => {
    const [user, loading, error] = useAuthState(auth);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [modalIndex, setModalIndex] = useState(0);
    
    const fetchUserName = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setName(data.name);
            return name;
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };
    
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
        fetchUserName,
        logOut
        }}
    >
        {props.children}
    </AuthenticationContext.Provider>
    );
};

export default AuthenticationContextProvider;
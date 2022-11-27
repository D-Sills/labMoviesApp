import React, { useState } from "react";
import {lightTheme, darkTheme} from "./../styles/themes";

export const ThemeContext = React.createContext();

const ThemeContextProvider = (props) => {
    const [theme, setTheme] = useState(lightTheme);
    const changeTheme = () => {
        theme === lightTheme ? setTheme(darkTheme) : setTheme(lightTheme);
    };
    
    return (
    <ThemeContext.Provider
        value={{
        theme,
        changeTheme
        }}
    >
        {props.children}
    </ThemeContext.Provider>
    );
};

export default ThemeContextProvider;
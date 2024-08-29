import { createContext, useState } from "react";

const DarkModeContext = createContext();


const DarkModeProvider = (props) => {
    const [ isDarkMode, setDarkMode ] = useState(false);
    
    const toggleDarkMode = () => {
        setDarkMode(!isDarkMode);
    };

    return (
        <>
        <DarkModeContext.Provider value={ {isDarkMode, toggleDarkMode }}>
            {props.children}
        </DarkModeContext.Provider>
        </>
    )
};


export {DarkModeContext, DarkModeProvider };
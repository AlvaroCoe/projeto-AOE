import { createContext, useState, useEffect } from "react";

console.log("CARREGOU THEME CONTEXT")

export const ThemeContext = createContext();


export function ThemeProvider({ children }) {


    const [dark, setDark] = useState(false);



    function toggleTheme(){

        setDark(!dark);

    }



    useEffect(() => {

        if(dark){

            document.body.classList.add("dark-mode");

        }else{

            document.body.classList.remove("dark-mode");

        }


    }, [dark]);




    return (

        <ThemeContext.Provider
            value={{
                dark,
                toggleTheme
            }}
        >

            {children}

        </ThemeContext.Provider>

    )

}
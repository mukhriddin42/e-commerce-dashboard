import React, { createContext, useEffect, useState } from 'react'

export const ThemeContext = createContext()

const ContextThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('')
    // useEffect orqali localStorage'dan theme holatini olish
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) {
            setTheme(storedTheme);
        }
    }, []);

    // theme o‘zgarganda localStorage'ga yozish
    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ContextThemeProvider
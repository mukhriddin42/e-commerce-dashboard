import React, { createContext, useState } from 'react'

export const ThemeContext = createContext()

const ContextThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('black')
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ContextThemeProvider
import React, { createContext, useState } from 'react'

 export const ThemeContext = createContext()

const ContextThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light')
    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ContextThemeProvider
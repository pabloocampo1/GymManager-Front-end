import React, { createContext, useState, useMemo } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { createTheme } from '@mui/material/styles';


export const ThemeContext = createContext();

export function ThemeContextProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    const mode = localStorage.getItem("dark"); 
    return mode === "true"
  });

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      localStorage.setItem("dark", !prev);
       return !prev;
    });
    
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: { main: "#FFDB00" },
          background: {
            default: darkMode ? "#121212" : "#f5f5f5", 
            paper: darkMode ? "#1e1e1e" : "#FFFFFF"
          },
          text: {
            primary: darkMode ? "#FFFFFF" : "#121212",
            secondary: darkMode ? "#6FCFBC" : "#6FCFBC",
          }
        }
      }),
    [darkMode]
  );

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

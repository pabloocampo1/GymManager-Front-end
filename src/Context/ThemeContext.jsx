import React, { createContext, useState, useMemo, useEffect, useContext } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

// Creamos el contexto
const ThemeContext = createContext();
export const useThemeCtx = () => useContext(ThemeContext);

export function ThemeContextProvider({ children }) {
  // 1️⃣ Preferencia inicial (localStorage > sistema)
  const prefersDark = (() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  })();

  const [darkMode, setDarkMode] = useState(prefersDark);

  // 2️⃣ Sincroniza MUI + body.classList + localStorage
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // 3️⃣ MUI theme (tu diseño personalizado)
  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode: darkMode ? "dark" : "light",
        primary: { main: "#FFDB00" },
        background: {
          default: darkMode ? "#121212" : "#f5f5f5",
          paper: darkMode ? "#1e1e1e" : "#FFFFFF",
        },
        text: {
          primary: darkMode ? "#FFFFFF" : "#121212",
          secondary: "#6FCFBC",
        },
      }
    }), [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

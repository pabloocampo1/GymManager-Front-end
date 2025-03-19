import { Palette } from "@mui/icons-material";
import { createTheme } from "@mui/material";


// tema clarooo
export const lightTheme = createTheme({
    Palette: {
        mode: "light",
        primary: { main: "#FFDB00" },
        secondary: {main: "#000000"},
        background: { default: "#ffffff", paper: "#f5f5f5" },
        text: { primary: "#000000", secondary: "#9b9b9b" },
    } 
});

export const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#bb86fc" },
      secondary: { main: "#03dac6" },
      background: { default: "#000000", paper: "#1e1e1e" },
      text: { primary: "#ffffff", secondary: "#aaa" },
    },
   
  });
  
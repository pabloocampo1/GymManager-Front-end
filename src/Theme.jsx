import { createTheme } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    primary: {
      main: "#3BB09D",
      dark: "#2A8A7A",
      light: "#6FCFBC",
      contrastText: "#FFFFFF", 
    },
    secondary: {
      main: "#A9E6DB", 
      dark: "#1E6B5E",
      light: "#D1F3ED",
    },
    background: {
      default: "#F9F9F9", 
      paper: "#FFFFFF", 
    },
    text: {
      mainTxt:"#FFFFFF",
      primary: "#1E6B5E", 
      secondary: "#2A8A7A", 
    }
  },
});

export default theme;

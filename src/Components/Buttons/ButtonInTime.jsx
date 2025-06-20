import { Button } from "@mui/material";

function ButtonInTime({ text, isDarkMode = false }) {
  return (
    <Button 
      variant="contained" 
      size="small" 
      sx={{
        borderRadius: 4,
        width: 90,
        height: 22,
        fontSize: 12,
        backgroundColor: isDarkMode ? "#1a8f1a" : "green",
        color: isDarkMode ? "#e4e4e4" : "white",
        pointerEvents: "none",
        "&:hover": { 
          backgroundColor: isDarkMode ? "#e5c100" : "#D3D837" 
        },
        boxShadow: "none",
        transition: "all 0.3s ease"
      }}
    >
      {text}
    </Button>
  );
}

export default ButtonInTime;

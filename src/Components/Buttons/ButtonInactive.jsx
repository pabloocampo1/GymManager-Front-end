import { Button } from "@mui/material";

function ButtonInactive({ text, isDarkMode = false }) {
  return (
    <Button 
      variant="contained" 
      size="small" 
      sx={{
        borderRadius: 4,
        width: 105,
        height: 22,
        fontSize: 12,
        backgroundColor: isDarkMode ? "#8f1a1a" : "#FF0F0F",
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

export default ButtonInactive;

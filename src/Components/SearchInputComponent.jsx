import React, { useState } from "react";
import { Box, IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchInput({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (onSearch) onSearch(value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        maxWidth: 400,
        height: 36,
        px: 1,
        borderRadius: "5px",
        backgroundColor:  "background.default", // fondo fijo

      }}
    >
      <InputBase
        placeholder="Buscar..."
        id="jajajaj"
        value={searchTerm}
        onChange={handleChange}
        sx={{
            width:"300px",
          flex: 1,
          fontSize: "14px",
          color: "text.primary",
          backgroundColor: "transparent",
          "& input": {
            backgroundColor: "transparent !important", // FORZAR fondo
          
          }
        }}
        inputProps={{
          "aria-label": "search",
        }}
      />
      <IconButton size="small" >
        <SearchIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}

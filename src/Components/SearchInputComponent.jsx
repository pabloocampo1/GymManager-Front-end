import React, { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchInput({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    if (onSearch) {
      onSearch(event.target.value); 
    }
  };

  return (
    <TextField
      variant="outlined"
      size="small" 
      fullWidth
      placeholder="Buscar..."
      value={searchTerm}
      onChange={handleChange}
      sx={{
        maxWidth: 400,
        backgroundColor: "background.paper",
        borderRadius: "5px",
        "& .MuiOutlinedInput-root": {
          height: "36px", 
          fontSize: "14px", 
        },
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton size="small">
              <SearchIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

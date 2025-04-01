import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import SearchInput from '../Components/SearchInputComponent';
import ModalVisitRegular from '../Components/Modals/ModalVisitRegular';

function ControlAcces() {
    const [open, setOpen] = useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);

   const [searchTerm, setSearchTerm] = useState("");

   const handleInputSearch = (value) => {
        setSearchTerm(value)
   }
    return (
        <Box sx={{ width: "100%", minHeight: "100vh", p: "20px 100px", bgcolor: "var(--backgroundWhiteMiddle)", display: "flex", alignItems: "center", flexDirection: "column" }}>
            {open && <ModalVisitRegular open={open} handleClose={handleClose} />}
            <Box sx={{ width: "100%", display: "flex", justifyContent: "start", pb: "30px" }}>
                <Typography variant='h3'>Control de acceso</Typography>
            </Box>
            <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", pb:"20px" }}>
                <Typography variant='p'sx={{opacity:"0.50"}}>Registrar entrada de miembros</Typography> 
                <Button onClick={handleOpen} variant='contained' sx={{bgcolor:"var(--primary-color)", color:"black"}}>Visita Regular</Button>
            </Box>
            <Box sx={{ bgcolor: "white", width: "100%", height: "60vh" }}>
                <Box sx={{width:"100%", height:"auto",display: "flex", justifyContent: "center", pt:"20px"}}>
                    <SearchInput  onSearch={(value) => handleInputSearch(value)}/>
                </Box>
                <Box sx={{}}>
                    {searchTerm}
                    
                </Box>
            </Box>
        </Box>
    );
}

export default ControlAcces;
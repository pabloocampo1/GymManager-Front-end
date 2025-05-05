import React from 'react';
import imageDone from "../../assets/images/undraw_complete-design_pzh6 (1).svg"
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PasswordChangeSucces = () => {

    const navigate = useNavigate();
    return (
        <Box sx={{
            width:"100%",
            display:"flex",
            justifyContent:"center",
            flexDirection:"column",
            alignItems:"center",
        }}>
            <img width={200} src={imageDone} alt="image done" />
            <Typography sx={{mt:"40px"}}>Contraseña actualizada correctamente, ahora puedes iniciar sesion.</Typography>
            <Button onClick={() => navigate("/login")} variant="contained" sx={{ color: "black", bgcolor: "#FFDB00", mt:"40px" }}>Ir al inicio de sesion.</Button>
        </Box>
    );
};

export default PasswordChangeSucces;
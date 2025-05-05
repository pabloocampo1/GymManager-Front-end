import { Box, Button, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';

const ExpiredTokenResetPassword = () => {
    const navigate = useNavigate();
    return (
        <Box 
        sx={{
            width:"100vw",
            height:"100vh",
            bgcolor:"black",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            flexDirection:"column"
        }}>
            <Typography component="h2" sx={{color:"white", mb:"40px"}}>Token no valido o expirado</Typography>
            <Button onClick={() => navigate("/login")} variant='outlined' sx={{color:"#FFDB00", border:"1px solid #FFDB00"}}>Ir al login</Button>
        </Box>
    );
};

export default ExpiredTokenResetPassword;
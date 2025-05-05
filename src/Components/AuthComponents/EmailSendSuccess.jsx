
import { Box, Typography } from '@mui/material';
import React from 'react';
import securedImage from "../../assets/images/undraw_security-on_btwg.svg"

const EmailSendSuccess = ({ email }) => {
    return (
        <Box sx={{
            width: "50%",
            height: "100%" ,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            position: "relative"
        }}>
            <Typography variant="h2" sx={{ fontSize: "30px", color: "#FFDB00", mb: "40px", fontWeight: "bold" }}>Validacion exitosa</Typography>
            <Typography sx={{ mb: "40px", opacity: "0.50", textAlign: "center" }}>Se envio correctamente a el email {email} el token para recuperar tu contraseña, asegurate de no compartir el link que se envio.</Typography>
            <img width={150} src={securedImage} alt="image security" />
            <Typography variant="p" sx={{ opacity: "0.50", fontSize: "14px", color: "black", position: "absolute", bottom: "30px" }}>
                Importante: una vez enviado el correo, solo tendras 5 minutos para recuperar tu cuenta
            </Typography>
        </Box>
    );
};

export default EmailSendSuccess;
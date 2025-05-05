
import { ArrowBack, JoinLeft } from "@mui/icons-material";
import imageLogo from "../../../assets/images/logoprincipal.png";
import imageForgotPassword from "../../../assets/images/reallypass.svg";
import { Box, Button, TextField, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { tokenResetPassword } from "../../../Service/Auth"
import SimpleBackdrop from "../../../Components/SimpleBackdrop";
import EmailSendSuccess from "../../../Components/AuthComponents/EmailSendSuccess";


function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [isSend, setIsSend] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [isLoanding , setIsLoanding] = useState(false);


    const handleForm = async (event) => {
        setIsLoanding(true)
        event.preventDefault();

        try{
            
            const success = await tokenResetPassword(email)
            if (success) {
                setIsSend(true)
                setErrorMessage(false)
                setIsLoanding(false)
                
            }else{
                setIsSend(false)
                setErrorMessage(true)
                setIsLoanding(false)
            }
            
        }catch(error){
            setIsSend(false)
            console.error(error);
            
        }
        setEmail("")

    }

    const handleInputEmail = (event) => {
        setEmail(event.target.value)
        console.log(email);

    }

    useEffect(() => {

    }, [isSend])

    return (
        <Box sx={{ width: "100vw", height: "100vh", backgroundColor: "black", display: "flex" }}>
            {isLoanding && <SimpleBackdrop open={isLoanding}/>}
            <Box sx={{ position: "relative", width: "60%", height: "100%", bgcolor: "white", borderRadius: "0px 25px 25px 0px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                {isSend ? (<EmailSendSuccess email={email} />) : (
                    <Box sx={{ width: "70%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <Typography variant="h2" sx={{ fontSize: "30px", color: "#FFDB00", mb: "40px", fontWeight: "bold" }}>Recuperar Contraseña</Typography>
                        <Typography variant="p" sx={{ fontSize: "16px", color: "black", opacity: "0.50", textAlign: "center", mb: "40px" }}>Ingresa el correo electronico para verificar tu cuenta, recuerda que debes ingresar el email con el cual creaste tu cuenta</Typography>
                        <Box component="form" onSubmit={handleForm} sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                            <TextField
                                variant="outlined"
                                type="email"
                                required
                                id="outlined-basic"
                                label="Email"
                                value={email}
                                onChange={handleInputEmail}
                                sx={{
                                    width: "300px",

                                }}
                            />

                            <Button type="submit" color="white" sx={{ bgcolor: "#FFDB00", color: "black", border: "none", mt: "30px" }} variant="outlined">Enviar codigo</Button>
                        </Box>
                        {errorMessage && (<Typography variant="p" sx={{ opacity: "0.50", fontSize: "14px", color: "red", pt:"20px"}}>
                           Error, email no valido.
                        </Typography>)}
                        <Typography variant="p" sx={{ opacity: "0.50", fontSize: "14px", color: "black", position: "absolute", bottom: "30px" }}>
                            Importante: una vez enviado el correo, solo tendras 5 minutos para recuperar tu cuenta
                        </Typography>
                    </Box>
                )} 

                <Box onClick={() => navigate("/login")} sx={{ display: "flex", position: "absolute", top: "3%", left: "5%" }}>
                    <ArrowBack />
                    <Typography component="p" sx={{ fontWeight: "bold", pl: "5px" }}>Volver</Typography>
                </Box>
            </Box>
            <Box sx={{ width: "40%", height: "100%", bgcolor: "black", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly" }}>
                <img width={300} src={imageLogo} alt="imageGym" />
                <Typography variant="h4" sx={{ color: "#FFDB00" }}>Bienvenido de nuevo!</Typography>
                <img width={"80%"} src={imageForgotPassword} alt="imagen" />
            </Box>

        </Box>
    );
}

export default ForgotPassword;
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";

import imageLogo from "../../../assets/images/logoprincipal.png";
import imageSecurityCode from "../../../assets/images/reallypass2.svg";
import { resetPassword } from "../../../Service/Auth";
import { api } from "../../../Service/api";

import PasswordChangeSuccess from "../../../Components/AuthComponents/PasswordChangeSucces";
import ExpiredTokenResetPassword from "../../../Components/AuthComponents/ExpiredTokenResetPassword";

function SecurityCode() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [passwordMismatchError, setPasswordMismatchError] = useState(false);
    const [resetError, setResetError] = useState(false);
    const [isTokenValid, setIsTokenValid] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setPasswordMismatchError(true);
            return;
        }

        try {
            const success = await resetPassword(password, token);
            if (success) {
                setFormSubmitted(true);
                setResetError(false);
            } else {
                setResetError(true);
            }
        } catch (error) {
            console.error(error);
            setResetError(true);
        }
    };

    useEffect(() => {
        const validateToken = async () => {
            try {
                const response = await api.get(`/api/auth/isValidTokenResetPassword/${token}`);
                setIsTokenValid(response.status === 200);
            } catch (error) {
                console.error("Token invalid or expired", error);
                setIsTokenValid(false);
            }
        };

        validateToken();
    }, [token]);

    

    if (!isTokenValid) return <ExpiredTokenResetPassword />;

    return (
        <Box sx={{ width: "100vw", height: "100vh", backgroundColor: "background.paper", display: "flex" }}>
            <Box
                sx={{
                    position: "relative",
                    width: "60%",
                    height: "100%",
                    bgcolor: "background.paper",
                    borderRadius: "0px 25px 25px 0px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {formSubmitted ? (
                    <PasswordChangeSuccess />
                ) : (
                    <Box
                        sx={{
                            width: "70%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Typography variant="h4" sx={{ color: "#FFDB00", mb: 4, fontWeight: "bold" }}>
                            Recuperar Contraseña
                        </Typography>

                        <Typography sx={{ fontSize: "16px", color: "black", opacity: 0.5, textAlign: "center", mb: 4 }}>
                            Ingresa tu nueva contraseña
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <TextField
                                label="Tu nueva contraseña"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                sx={{ width: "300px" }}
                            />

                            <TextField
                                label="Confirma tu contraseña"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                sx={{ width: "300px", mt: 4 }}
                            />

                            <Button type="submit" sx={{ bgcolor: "#FFDB00", color: "black", mt: 3 }}>
                                Enviar código
                            </Button>
                        </Box>

                        {passwordMismatchError && (
                            <Typography sx={{ color: "red", fontSize: "14px", pt: 2 }}>
                                Error: las contraseñas no coinciden.
                            </Typography>
                        )}

                        {resetError && (
                            <Typography sx={{ color: "red", fontSize: "14px", pt: 2 }}>
                                Ocurrió un error al cambiar la contraseña. Intenta de nuevo.
                            </Typography>
                        )}

                        <Typography sx={{ fontSize: "14px", opacity: 0.5, position: "absolute", bottom: 30 }}>
                            Importante: una vez recibido el correo, solo tendrás 5 minutos para recuperar tu cuenta
                        </Typography>
                    </Box>
                )}
            </Box>

            <Box
                sx={{
                    width: "40%",
                    height: "100%",
                    bgcolor: "black",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                }}
            >
                <img src={imageLogo} width={300} alt="logo" />
                <Typography variant="h4" sx={{ color: "#FFDB00" }}>
                    ¡Bienvenido de nuevo!
                </Typography>
                <img src={imageSecurityCode} width="50%" alt="imagen" />
            </Box>
        </Box>
    );
}

export default SecurityCode;

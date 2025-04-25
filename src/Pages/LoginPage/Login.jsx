import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import imageLogo from "../../assets/images/logoprincipal.png";
import imageLogin from "../../assets/images/logo_login_yellow.png";
import iconArrowLeft from "../../assets/icons/left-arrow.png";
import style from "./Login.module.css";
import { Box, Checkbox, FormControlLabel, FormGroup, Typography } from "@mui/material";
import { Password } from "@mui/icons-material";
import { AuthContext } from "../../Context/AuthContext";
import SimpleBackdrop from "../../Components/SimpleBackdrop";

function Login() {

    const navigate = useNavigate();
    const { state, singIn } = useContext(AuthContext);
    const [dataCredentials, setDataCredentials] = useState({
        username: "",
        password: ""
    });
    const [isLoanding, setIsLoanding] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [rememberPassword, setRememberPassword] = useState(false);

    const navigateTo = (path) => {
        navigate(path);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoanding(true)
    
        await singIn(dataCredentials,rememberPassword );
        setDataCredentials({
            username: "",
            password: ""
        })
        if (state.isAuthenticated) {
            setIsAuthenticated(true)
            
        } else {
            setIsAuthenticated(false)
        }

        setTimeout(() => {
            setIsLoanding(false)
       }, 1000)

        console.log(state.isAuthenticated);
        


        
    };

    const handleCkeck = (event) => {
        const isChecked = event.target.checked;
        setRememberPassword(isChecked);
    };

    const handleInput = (event) => {
        setDataCredentials({
            ...dataCredentials,
            [event.target.name]: event.target.value,
        });
    };




    return (
        <div className={style.container_login}>
            {isLoanding && (<SimpleBackdrop open={isLoanding} />)}
            <div className={style.container_image}>
                <div>
                    <img src={imageLogo} alt="logo del negocio" />
                </div>
                <div className={style.container_image_contain}>
                    <h2>
                        <span>Bien</span>venido
                    </h2>
                    <img src={imageLogin} alt="logo del login" />
                </div>
            </div>
            <div className={style.container_credentials}>
                <div onClick={() => navigateTo("/")} className={style.backText}>
                    <img src={iconArrowLeft} alt="icono de volver" />
                    <p>Volver</p>
                </div>
                <div className={style.container_form}>
                    <div className={style.form}>
                        <h2 className={style.h2_title_login}>Login</h2>
                        <p>
                            Bienvenido, por favor ingresa tus credenciales para acceder a tu
                            cuenta
                        </p>

                        <form onSubmit={handleSubmit}>
                            <label htmlFor="username">Nombre De Usuario</label>
                            <input
                                type="text"
                                id="username"
                                placeholder="Nombre De Usuario"
                                name="username"
                                value={dataCredentials.username}
                                onChange={handleInput}
                                required
                            />

                            <label htmlFor="password">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Contraseña"
                                name="password"
                                value={dataCredentials.password}
                                onChange={handleInput}
                                required
                            />

                            <Box sx={{ width: "100%", textAlign: "center" }}>
                                {isAuthenticated ? "" : (<Typography component="span" sx={{ color: "red", textAlign: "center" }} >Credenciales no validas</Typography>)}
                            </Box>

                            <div className={style.forgetPasswoedSection}>
                                <FormGroup>
                                    <FormControlLabel
                                        sx={{ color: "#504F4F", fontSize: 20 }}
                                        control={
                                            <Checkbox
                                                sx={{
                                                    color: "#FFDB00",
                                                    "&.Mui-checked": {
                                                        color: "#FFDB00",
                                                    },
                                                }}
                                                checked={rememberPassword}
                                                onChange={handleCkeck}
                                            />
                                        }
                                        label="Guardar contraseña"
                                    />
                                </FormGroup>
                                <Link to="/ForgetPass">Olvidaste tu contraseña?</Link>
                            </div>
                            <button type="submit" >
                                Ingresar
                            </button>
                        </form>

                    </div>
                </div>
            </div>


        </div>
    );
}

export default Login;
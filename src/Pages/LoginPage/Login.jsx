import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import imageLogo from "../../assets/images/logoprincipal.png";
import imageLogin from "../../assets/images/logo_login_yellow.png";
import iconArrowLeft from "../../assets/icons/left-arrow.png";
import style from "./Login.module.css";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState("line"); // Etapas: line, vertical, horizontal, open

  const goToDashboard = () => {
    setIsLoading(true);
  
    // Secuencia de animación mejorada
    setTimeout(() => {
      setLoadingStage("vertical"); // Expansión vertical
    }, 500);
  
    setTimeout(() => {
      setLoadingStage("horizontal"); // Expansión horizontal
    }, 1200);
  
    // Navegar al dashboard justo al completar la expansión
    setTimeout(() => {
      navigate("/dashboard");
    }, 1700);
  };

  function backToHome() {
    navigate("/");
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  // Variantes para las animaciones
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  // Variantes para la línea de carga
  const lineVariants = {
    line: { 
      height: "2px", 
      width: "0%", 
      left: "50%", 
      top: "50%", 
      x: "-50%", 
      y: "-50%",
      transition: { duration: 0.5, ease: "easeInOut" }
    },
    vertical: { 
      height: "100vh", 
      width: "4px", 
      left: "50%", 
      top: "0%", 
      x: "-50%", 
      y: "0%",
      transition: { duration: 0.7, ease: "easeInOut" }
    },
    horizontal: { 
      height: "100vh", 
      width: "100vw", 
      left: "0%", 
      top: "0%", 
      x: "0%", 
      y: "0%",
      transition: { duration: 0.5, ease: "easeInOut" }
    }
  };

  return (
    <div className={style.container_login}>
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
        <div onClick={backToHome} className={style.backText}>
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
              />

              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                placeholder="Contraseña"
                name="password"
              />

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
                        defaultChecked
                      />
                    }
                    label="Guardar contraseña"
                  />
                </FormGroup>
                <Link to="/">Olvidaste tu contraseña?</Link>
              </div>
              <button type="button" onClick={goToDashboard}>
                Ingresar
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Loading Overlay con animación */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className={style.loadingOverlay}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Fondo negro siempre presente */}
            <div className={style.blackBackground}></div>
            
            {/* Línea amarilla que crece */}
            <motion.div
              className={style.loadingLine}
              variants={lineVariants}
              initial="line"
              animate={loadingStage}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Login;
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Button,
  Grid,
} from "@mui/material";
import imageLogo from "../../../assets/images/logoprincipal.png";
import imageLogin from "../../../assets/images/logo_login_yellow.png";

import SimpleBackdrop from "../../../Components/SimpleBackdrop";
import { AuthContext } from "../../../Context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import { ArrowBack, BackHand } from "@mui/icons-material";

function Login() {
  const navigate = useNavigate();
  const { state, singIn, singInWithGoogle } = useContext(AuthContext);

  const [dataCredentials, setDataCredentials] = useState({ username: "", password: "" });
  const [isLoanding, setIsLoanding] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [rememberPassword, setRememberPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoanding(true);
    await singIn(dataCredentials, rememberPassword);
    setDataCredentials({ username: "", password: "" });
    setIsAuthenticated(state.isAuthenticated);
    setIsLoanding(false);
  };

  return (
    <Grid container sx={{ width: "100%", height: "100vh" }}>
      {isLoanding && <SimpleBackdrop open={isLoanding} />}

      {/* --- Imagen / Lado Izquierdo --- */}
      <Grid
        item
        xs={12}
        md={5}
        sx={{
          bgcolor: "black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          p: 4,
        }}
      >
        <Box component="img" src={imageLogo} alt="logo del negocio" sx={{ width: 300, height: 100 }} />

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h3" sx={{ color: "white", mb: 6 }}>
            <Box component="span" sx={{ color: "#FFDB00" }}>
              Bien
            </Box>
            venid@
          </Typography>
          <Box component="img" src={imageLogin} alt="logo login" sx={{ width: { xs: 120, md: 320 }, height: { xs: 120, md: 320 } }} />
        </Box>
      </Grid>

      {/* --- Credenciales / Lado Derecho --- */}
      <Grid
        item
        xs={12}
        md={7}
        sx={{
          bgcolor: "background.paper",
          borderTopLeftRadius: { md: 30 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          px: { xs: 4, md: 15 },
        }}
      >
        {/* Botón Volver */}
        <Button
          onClick={() => navigate("/")}
  
          sx={{
            position: "absolute",
            top: 24,
            left: 24,
            color: "text.primary",
            fontWeight: 700,
            textTransform: "none",
            p: 0,
            minWidth: 0,
          }}
        >
          <ArrowBack />
          Volver
        </Button>

        {/* Formulario */}
        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%", maxWidth: 480 }}>
          <Typography variant="h4" sx={{ color: "#FFDB00", fontWeight: 500, mb: 3 }}>
            Login
          </Typography>
          <Typography sx={{ color: "var(--textSecond-color)", mb: 6 }}>
            Bienvenido, por favor ingresa tus credenciales para acceder a tu cuenta
          </Typography>

          <TextField
            fullWidth
            label="Nombre De Usuario"
            name="username"
            value={dataCredentials.username}
            onChange={(e) => setDataCredentials({ ...dataCredentials, username: e.target.value })}
            sx={{ mb: 3,  }}
            required
          />

          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            name="password"
            value={dataCredentials.password}
            onChange={(e) => setDataCredentials({ ...dataCredentials, password: e.target.value })}
            sx={{ mb: 1, }}
            required
          />

          {!isAuthenticated && (
            <Typography color="error" sx={{ textAlign: "center", mb: 1 }}>
              Credenciales no válidas
            </Typography>
          )}

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberPassword}
                  onChange={(e) => setRememberPassword(e.target.checked)}
                  sx={{ color: "#FFDB00", "&.Mui-checked": { color: "#FFDB00" } }}
                />
              }
              label={<Typography sx={{ color: "#504F4F" }}>Guardar contraseña</Typography>}
            />
            <Link to="/ForgetPass" style={{ color: "var(--textSecond-color)", fontSize: "0.875rem" }}>
              Olvidaste tu contraseña?
            </Link>
          </Box>

          <Box sx={{ mb: 3 }}>
            <GoogleLogin
              onSuccess={(credentialResponse) => singInWithGoogle(credentialResponse.credential)}
              onError={() => console.log("Login Failed")}
            />
          </Box>

          <Button
            type="submit"
            fullWidth
            sx={{
              bgcolor: "#FFDB00",
              color: "black",
              fontWeight: 700,
              height: 40,
              borderRadius: 2,
              ":hover": { bgcolor: "#c4c92f" },
            }}
          >
            Iniciar sesión
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;
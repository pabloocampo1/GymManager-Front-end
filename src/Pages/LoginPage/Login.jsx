import { Link, useNavigate } from 'react-router-dom';
import imageLogo from '../../assets/images/logoprincipal.png'
import imageLogin from '../../assets/images/logo_login_yellow.png'
import iconArrowLeft from '../../assets/icons/left-arrow.png'
import style from './Login.module.css'
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';


function Login() {
    const navigate = useNavigate()
   
    const goToDashboard = () => {
        navigate("/dashboard")
    }

    function backToHome() {
        navigate("/")
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }
    
    return (
        <div className={style.container_login}>
            <div className={style.container_image}>
                <div>
                    <img src={imageLogo} alt="logo del negocio" />
                </div>
                <div className={style.container_image_contain}>
                    <h2><span>Bien</span>venido</h2>
                    <img src={imageLogin} alt="logo del login" />
                </div>
                
            </div>
            <div className={style.container_credentials}>
                <div onClick={() => backToHome()} className={style.backText}>
                    <img src={iconArrowLeft} alt="icono de volver" />
                    <p>Volver</p>
                </div>
                <div className={style.container_form}>
                    <div className={style.form}>
                        <h2 className={style.h2_title_login}>Login</h2>
                        <p>Bienvenido, por favor incresa tus credenciales para acceder a tu cuenta</p>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <label htmlFor="username">Nombre De Usuario</label>
                            <input type="text" id="username" placeholder='Nombre De Usuario' name="username" />
                                                            
                            <label htmlFor="password">Contraseña</label>
                            <input type="password" id="password" placeholder='Contraseña' name="password" /> 
                            
                            <div className={style.forgetPasswoedSection}> 
                                <FormGroup >
                                        <FormControlLabel  sx={{color:"#504F4F", fontSize:20}} control={<Checkbox sx={{color: '#FFDB00', '&.Mui-checked': {color: '#FFDB00',},}}  defaultChecked />} label="Guardar contraseña" />
                                </FormGroup>
                                <Link to="/">Olvidaste tu contraseña?</Link>
                                
                            </div>
                            <button type='button' onClick={() => goToDashboard()} >Ingresar</button>   
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;


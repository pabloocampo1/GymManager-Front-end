import { useNavigate } from "react-router-dom";
import { useState } from "react";
import imageLogo from "../../assets/images/logoprincipal.png";
import imageForgotPassword from "../../assets/images/pasword2.png";
import iconArrowLeft from "../../assets/icons/left-arrow.png";
import style from "./ValidationPassword.module.css";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  function backToLogin() {
    navigate("/login");
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí iría la lógica para verificar el correo
    console.log("Verificando correo:", email);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <div className={style.recover_container}>
      <div className={style.recover_image_section}>
        <div>
          <img src={imageLogo} alt="logo del negocio" />
        </div>
        <div className={style.recover_image_content}>
          <h2>
            <span>Bien</span>venido
          </h2>
          <img src={imageForgotPassword} alt="imagen de recuperación" className={style.imagen}/>
        </div>
      </div>
      <div className={style.recover_form_section}>
        <div onClick={backToLogin} className={style.back_button}>
          <img src={iconArrowLeft} alt="icono de volver" />
          <p>Volver</p>
        </div>
        <div className={style.recover_form_wrapper}>
          <div className={style.recover_form}>
            <h2 className={style.recover_title}>Actualizar Password</h2>
            <p>
              Por favor, introduce tu correo electrónico para verificar tu cuenta
            </p>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                placeholder="Introduce tu correo electrónico"
                name="email"
                value={email}
                onChange={handleEmailChange}
                required
              />

              <button type="submit">
                Verificar Correo
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
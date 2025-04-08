import { useNavigate } from "react-router-dom";
import { useState } from "react";
import imageLogo from "../../assets/images/logoprincipal.png";
import imageSecurityCode from "../../assets/images/pasword.png";
import iconArrowLeft from "../../assets/icons/left-arrow.png";
import style from "../ValidationPasswordForget/ValidationPassword.module.css";

function SecurityCode() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");

  function backToLogin() {
    navigate("/login");
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Código ingresado:", code);
  };

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  return (
    <div className={style.recover_container}>
      {/* Formulario a la izquierda */}
      <div className={style.recover_image_section}>
        <div>
          <img src={imageLogo} alt="logo del negocio" />
        </div>
        <div className={style.recover_image_content}>
          <h2>
            <span>Bien</span>venido
          </h2>
          <img src={imageSecurityCode} alt="imagen de seguridad" className={style.imagen} />
        </div>
      </div>
      <div className={style.recover_form_section}>
        <div onClick={backToLogin} className={style.back_button}>
          <img src={iconArrowLeft} alt="icono de volver" />
          <p>Volver</p>
        </div>
        <div className={style.recover_form_wrapper}>
          <div className={style.recover_form}>
            <h2 className={style.recover_title}>Verifica tu código</h2>
            <p>
              Ingresa el código de seguridad que fue enviado a tu correo electrónico
            </p>
            <form onSubmit={handleSubmit}>
              <label htmlFor="code">Código de Verificación</label>
              <input
                type="text"
                id="code"
                placeholder="Introduce tu código"
                name="code"
                value={code}
                onChange={handleCodeChange}
                required
              />
              <button type="submit">
                Verificar Código
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Imagen a la derecha */}
      
    </div>
  );
}

export default SecurityCode;

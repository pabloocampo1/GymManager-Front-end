import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import styles from "./ModalDataPrivate.module.css";
import Swal from 'sweetalert2';

const PrivateDataModal = ({
  correo,
  onClose,
  onCorreoChange,
  onPasswordChange,
}) => {
  const [email, setEmail] = useState(correo);
  const [codigo, setCodigo] = useState("");
  const [nuevaPass, setNuevaPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [codigoEnviado, setCodigoEnviado] = useState(false);
  const [verificado, setVerificado] = useState(false);
  const [showCorreo, setShowCorreo] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleEnviarCodigo = () => {
    setCodigoEnviado(true);
    Swal.fire({
       icon: 'success',
      title: 'Correo enviado',
      text: 'Revisar el correo',
      confirmButtonText: 'Entendido'
    })
  
  };

  const handleVerificarCodigo = () => {
    if (codigo === "abcd123") {
      setVerificado(true);
      alert("Codigo correcto");
    } else {
      alert("Código incorrecto");
    }
  };

 const handleGuardar = () => {
  if (!verificado) {
    Swal.fire({
      icon: 'success',
      title: 'Verificación requerida',
      text: 'Debes insertar el código antes de guardar los cambios.',
      confirmButtonText: 'Entendido'
    });
    return;
  }

  if (nuevaPass !== confirmPass) {
    setPasswordsMatch(false);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Las contraseñas no coinciden.',
      confirmButtonText: 'Corregir'
    });
    return;
  }

  onCorreoChange(email);
  onPasswordChange(nuevaPass);
  Swal.fire({
    icon: 'success',
    title: 'Cambios guardados',
    text: 'Tus datos han sido actualizados correctamente.',
    confirmButtonText: 'Aceptar'
  });
  onClose();
};

  return (
    <motion.div
      className={styles.overlay}
      onClick={(e) =>
        e.target.classList.contains(styles.overlay) && onClose()
      }
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={styles.modal}
        initial={{ y: "-40px", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "-40px", opacity: 0 }}
      >
        <h2 className={styles.title}>Datos Privados</h2>
        
        <div className={styles.modalContent}>
          <div className={styles.leftSide}>
            <div className={styles.infoRow}>
              <label className={styles.label}>Correo vinculado</label>
              <div className={styles.privateField}>
                <span>{showCorreo ? email : "•••••••••••••••"}</span>
                <button
                  onClick={() => setShowCorreo(!showCorreo)}
                  className={styles.eyeBtn}
                  title={showCorreo ? "Ocultar" : "Mostrar"}
                >
                  {showCorreo ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className={styles.infoRow}>
              <label className={styles.label}>Contraseña</label>
              <div className={styles.privateField}>
                <span>
                  {showPass ? nuevaPass || "••••••••" : "••••••••"}
                </span>
                <div className={styles.actionsInline}>
                  <button
                    onClick={() => setShowPass(!showPass)}
                    className={styles.eyeBtn}
                    title={showPass ? "Ocultar" : "Mostrar"}
                  >
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <button className={styles.button} onClick={handleEnviarCodigo}>
              Enviar codigo via correo
            </button>
          </div>
          
          {codigoEnviado && <div className={styles.separator}></div>}
          
          {codigoEnviado && (
            <div className={styles.rightSide}>
              <label className={styles.label}>Código de seguridad</label>
              <input
                className={styles.input}
                type="text"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                placeholder="Ej: 123456"
              />
              <button
                className={styles.buttonv}
                onClick={handleVerificarCodigo}
              >
                Verificar código
              </button>
              
              {verificado && (
                <div className={styles.passwordFieldsContainer}>
                  <div>
                    <label className={styles.label}>Nueva contraseña</label>
                    <input
                      className={styles.input}
                      type="password"
                      value={nuevaPass}
                      onChange={(e) => {
                        setNuevaPass(e.target.value);
                        setPasswordsMatch(e.target.value === confirmPass);
                      }}
                      placeholder="Nueva contraseña"
                    />
                  </div>
                  
                  <div>
                    <label className={styles.label}>Confirmar contraseña</label>
                    <input
                      className={styles.input}
                      type="password"
                      value={confirmPass}
                      onChange={(e) => {
                        setConfirmPass(e.target.value);
                        setPasswordsMatch(nuevaPass === e.target.value);
                      }}
                      placeholder="Confirmar contraseña"
                    />
                  </div>
                  
                  {!passwordsMatch && (
                    <p className={styles.errorText}>Las contraseñas no coinciden</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Botones de acción */}
        <div className={styles.actions}>
          <button className={styles.saveBtn} onClick={handleGuardar}>
            Guardar cambios
          </button>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancelar
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PrivateDataModal;
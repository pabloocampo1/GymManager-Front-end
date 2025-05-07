import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Pencil } from "lucide-react";
import styles from "./ModalDataPrivate.module.css";

const PrivateDataModal = ({ correo, nombreActual, clientesActuales, nombreGimnasioActual, onClose, onCorreoChange, onPasswordChange }) => {
  const [email, setEmail] = useState(correo);
  const [codigo, setCodigo] = useState("");
  const [nuevaPass, setNuevaPass] = useState("");
  const [codigoEnviado, setCodigoEnviado] = useState(false);
  const [verificado, setVerificado] = useState(false);
  const [showCorreo, setShowCorreo] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [editPass, setEditPass] = useState(false);

  const handleEnviarCodigo = () => {
    setCodigoEnviado(true);
    alert("Código enviado a tu correo (simulado)");
  };

  const handleVerificarCodigo = () => {
    if (codigo === "123456") {
      setVerificado(true);
      alert("Código verificado");
    } else {
      alert("Código incorrecto");
    }
  };

  const handleGuardar = () => {
    if (verificado) {
      onCorreoChange(email);
      onPasswordChange(nuevaPass);
      alert("Cambios guardados");
      onClose();
    } else {
      alert("Verifica el código antes de guardar.");
    }
  };

  return (
    <motion.div
      className={styles.overlay}
      onClick={(e) => e.target.classList.contains(styles.overlay) && onClose()}
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

        <div className={styles.infoRow}>
          <label className={styles.label}>Correo vinculado</label>
          <div className={styles.privateField}>
            <span>{showCorreo ? email : "•••••••••••••••"}</span>
            <button onClick={() => setShowCorreo(!showCorreo)} className={styles.eyeBtn}>
              {showCorreo ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className={styles.infoRow}>
          <label className={styles.label}>Contraseña</label>
          <div className={styles.privateField}>
            <span>{showPass ? nuevaPass || "••••••••" : "••••••••"}</span>
            <div className={styles.actionsInline}>
              <button onClick={() => setShowPass(!showPass)} className={styles.eyeBtn}>
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              <button onClick={() => setEditPass(true)} className={styles.editBtn}>
                <Pencil size={16} /> Cambiar
              </button>
            </div>
          </div>
        </div>

        {editPass && (
          <>
            <label className={styles.label}>Nueva contraseña</label>
            <input
              className={styles.input}
              type="password"
              value={nuevaPass}
              onChange={(e) => setNuevaPass(e.target.value)}
              placeholder="Nueva contraseña"
            />
          </>
        )}

        <button className={styles.button} onClick={handleEnviarCodigo}>
          Enviar código al correo
        </button>

        {codigoEnviado && (
          <>
            <label className={styles.label}>Código recibido</label>
            <input
              className={styles.input}
              type="text"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              placeholder="Ej: 123456"
            />
            <button className={styles.button} onClick={handleVerificarCodigo}>
              Verificar código
            </button>
          </>
        )}

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
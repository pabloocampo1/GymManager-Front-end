import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import styles from "./ModalDataPrivate.module.css";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Context/AuthContext";
import { api } from "../../../Service/api";

const PrivateDataModal = ({ onClose, onCorreoChange, onPasswordChange }) => {
    const { state, logout } = useContext(AuthContext);
    const [nuevaPass, setNuevaPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [mostrarCamposPass, setMostrarCamposPass] = useState(false);
    const [showCorreo, setShowCorreo] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [errorFetch, setErrorFetch] = useState(false);

    const safeUsername = state?.username || "";
    const safeEmail = state?.email || "";

    const handleGuardar = async () => {
        if (nuevaPass !== confirmPass) {
            setPasswordsMatch(false);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Las contraseñas no coinciden.",
                confirmButtonText: "Corregir",
            });


            return;
        }


        const fetchData = {
            username: state.username,
            jwt: state.token,
            password: nuevaPass,
        };
        onCorreoChange(safeEmail);
        onPasswordChange(nuevaPass);
        try {
            const response = await api.post("/api/auth/resetPassword/profile", fetchData);
           
            
            if (response.status == 200) {
                Swal.fire({
                    icon: "success",
                    title: "Cambios guardados",
                    text: "Tus datos han sido actualizados correctamente.",
                    confirmButtonText: "Aceptar",
                });
                setErrorFetch(false)

                onClose();
                logout();
            }else{
                setErrorFetch(true)
            }
        } catch (error) {
            console.log(error);
            setErrorFetch(true)
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
                <h2 className={styles.title}>Datos Privados de la cuenta</h2>

                <div className={styles.modalContent}>
                    <div className={styles.leftSide}>
                        <div className={styles.infoRow}>
                            <label className={styles.label}>Usuario</label>
                            <div className={styles.privateField}>
                                <span>{showPass ? safeUsername : "•".repeat(safeUsername.length)}</span>
                                <div className={styles.actionsInline}>
                                    <button
                                        onClick={() => setShowPass(!showPass)}
                                        className={styles.eyeBtn}
                                        title={showPass ? "Ocultar" : "Mostrar"}
                                    >
                                        {showPass ? <Eye size={18} /> : <EyeOff size={18} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className={styles.infoRow}>
                            <label className={styles.label}>Correo vinculado</label>
                            <div className={styles.privateField}>
                                <span>{showCorreo ? safeEmail : "•".repeat(safeEmail.length)}</span>
                                <button
                                    onClick={() => setShowCorreo(!showCorreo)}
                                    className={styles.eyeBtn}
                                    title={showCorreo ? "Ocultar" : "Mostrar"}
                                >
                                    {showCorreo ? <Eye size={18} /> : <EyeOff size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            className={styles.button}
                            onClick={() => setMostrarCamposPass(true)}
                        >
                            Cambiar Contraseña
                        </button>
                    </div>

                    {mostrarCamposPass && <div className={styles.separator}></div>}

                    {mostrarCamposPass && (
                        <div className={styles.rightSide}>
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

                                    {errorFetch && (<p style={{paddingTop:"10px",paddingLeft:"10px", color:"red", fontSize:"15px"}}>Ah ocurrido un error con el cambio de contraseña, verifica tu contraseña o intenatalo de nuevo.</p>)}
                                </div>

                                {!passwordsMatch && (
                                    <p className={styles.errorText}>Las contraseñas no coinciden</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>

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

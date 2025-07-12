import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import styles from "./ProfileGym.module.css";
import PrivateDataModal from "../../../Components/Modals/ModalProfile/ModalDataPrivate";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import SecurityIcon from "@mui/icons-material/Security";
import ProfileService from "../../../Service/profileService";
import { AuthContext } from "../../../Context/AuthContext";


const ProfileGym = () => {
    const { state } = useContext(AuthContext);


    const [formData, setFormData] = useState({
        nombre: "",
        telefono: "",
        nombreGimnasio: "",
        ubicacion: "",
        correo: state?.email || ""
    });

    const [editMode, setEditMode] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        loadProfileData();
    }, []);

    useEffect(() => {
        const savedImage = localStorage.getItem("profileImage");
        if (savedImage) {
            setPreviewImage(savedImage);
        }
    }, []);

    const loadProfileData = async () => {
        try {
            setLoading(true);
            const profileData = await ProfileService.getProfileData();

            setFormData({
                nombre: profileData.nameADMIN || "",
                telefono: profileData.number || "",
                nombreGimnasio: profileData.nameGym || "",
                ubicacion: profileData.ubication || "",
                correo: state?.email || ""
            });
        } catch (error) {
            setFormData({
                nombre: "Administrador",
                telefono: "3001234567",
                nombreGimnasio: "Mi Gimnasio",
                ubicacion: "Medellín",
                correo: state?.email || ""
            });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const updatedData = { ...formData, [e.target.name]: e.target.value };
        setFormData(updatedData);
        setHasChanges(true);
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setProfileImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
            setHasChanges(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!hasChanges) return;

        try {
            setLoading(true);
            const dataToSend = {
                id: 1,
                nameGym: formData.nombreGimnasio,
                nameADMIN: formData.nombre,
                number: formData.telefono,
                ubication: formData.ubicacion
            };

            await ProfileService.updateProfileData(dataToSend);

            if (profileImage) {
                await ProfileService.updateProfileImage(profileImage);
                localStorage.setItem("profileImage", previewImage);
                const event = new CustomEvent("profileUpdated", {
                    detail: { profileImage: previewImage }
                });
                window.dispatchEvent(event);
            }

            localStorage.setItem("nombreUsuario", formData.nombre);

            Swal.fire({
                icon: "success",
                title: "Datos actualizados",
                text: "Tus datos han sido actualizados correctamente",
                confirmButtonText: "Entendido"
            });

            setEditMode(false);
            setHasChanges(false);
            setProfileImage(null);
        } catch (error) {
            console.error("Error al actualizar perfil:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        loadProfileData();
        setEditMode(false);
        setHasChanges(false);
        setProfileImage(null);
        setPreviewImage(localStorage.getItem("profileImage"));
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={styles.profileContainer}
        >
            <div className={styles.HeaderContainer}>
                <h2 className={styles.title}>Perfil del Gimnasio</h2>
                <button
                    className={styles.openModalBtn}
                    onClick={() => setShowModal(true)}
                >
                    <SecurityIcon /> Datos Privados
                </button>
            </div>

            <div className={styles.contentLayout}>
                <div className={styles.imageColumn}>
                    <motion.div
                        className={styles.profileImagePreview}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {previewImage ? (
                            <img src={previewImage} alt="Vista previa de perfil" className={styles.previewImage} />
                        ) : (
                            <div className={styles.noImagePlaceholder}>
                                <span>Imagen de Perfil</span>
                            </div>
                        )}
                    </motion.div>
                    <div className={styles.uploadButtonContainer}>
                        <label htmlFor="profileImage" className={styles.customFileUpload}>
                            Actualizar Imagen
                        </label>
                        <input
                            type="file"
                            id="profileImage"
                            accept="image/*"
                            onChange={handleImageChange}
                            className={styles.fileInput}
                        />
                        <button onClick={() => navigate("TyC")} className={styles.termsButton}>
                            Términos y Condiciones
                        </button>
                    </div>
                </div>

                <div className={styles.formColumn}>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formGroup}>
                            <label>Nombre del Gimnasio</label>
                            <input
                                type="text"
                                name="nombreGimnasio"
                                value={formData.nombreGimnasio}
                                onChange={handleChange}
                                disabled={!editMode}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Nombre del Administrador</label>
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                disabled={!editMode}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Correo Electrónico</label>
                            <input
                                type="email"
                                name="correo"
                                value={formData.correo}
                                disabled
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Teléfono</label>
                            <input
                                type="tel"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                                disabled={!editMode}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Ubicación</label>
                            <input
                                type="text"
                                name="ubicacion"
                                value={formData.ubicacion}
                                onChange={handleChange}
                                disabled={!editMode}
                            />
                        </div>

                        {!editMode ? (
                            <button
                                type="button"
                                className={styles.updateButton}
                                onClick={() => setEditMode(true)}
                                disabled={loading}
                            >
                                {loading ? "Cargando..." : "Actualizar Perfil"}
                            </button>
                        ) : (
                            <div className={styles.buttonGroup}>
                                <button
                                    type="submit"
                                    className={styles.updateButton}
                                    disabled={!hasChanges || loading}
                                >
                                    {loading ? "Guardando..." : "Actualizar Cambios"}
                                </button>
                                <button
                                    type="button"
                                    className={styles.cancelButton}
                                    onClick={handleCancel}
                                    disabled={loading}
                                >
                                    Cancelar
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>

            {showModal && (
                <PrivateDataModal
                    onClose={() => setShowModal(false)}
                    onCorreoChange={(newCorreo) =>
                        setFormData({ ...formData, correo: newCorreo })
                    }
                    onPasswordChange={(newPass) =>
                        setFormData({ ...formData, contraseña: newPass })
                    }
                />
            )}
        </motion.div>
    );
};

export default ProfileGym;

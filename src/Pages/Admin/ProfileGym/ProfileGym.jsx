import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./ProfileGym.module.css";
import PrivateDataModal from "../../../Components/Modals/ModalProfile/ModalDataPrivate"
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import SecurityIcon from '@mui/icons-material/Security';

const ProfileGym = () => {
  const [formData, setFormData] = useState({
    nombre: "Juan Pérez",
    Telefono: "31023231312",
    lastentry: "pepito",
    clientes: "150",
    nombreGimnasio: "FitLife Gym",
  });
  
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      setPreviewImage(savedImage);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (previewImage) {
      localStorage.setItem("profileImage", previewImage);
      const event = new CustomEvent("profileUpdated", { detail: { profileImage: previewImage } });
      window.dispatchEvent(event);
    }
    localStorage.setItem("nombreUsuario", formData.nombre);
    Swal.fire({
      icon: 'success',
      title: 'Datos actualizados',
      text: 'Tus datos han sido actualizados correctamente',
      confirmButtonText: 'Entendido'
    });
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
        <button className={styles.openModalBtn} onClick={() => setShowModal(true)}>
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
            <button 
              onClick={() => navigate('TyC')} 
              className={styles.termsButton}
            >
              Términos y Condiciones
            </button>
          </div>
        </div>

        <div className={styles.formColumn}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Nombre</label>
              <input 
                type="text" 
                name="nombre" 
                value={formData.nombre} 
                onChange={handleChange} 
                placeholder="Nombre completo"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Correo Electrónico</label>
              <input 
                type="email" 
                name="email" 
                placeholder="correo@ejemplo.com"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Teléfono</label>
              <input 
                type="tel" 
                name="telefono" 
                placeholder="Número telefónico"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Fecha de Ingreso</label>
              <input 
                type="date" 
                name="fechaingre" 
              />
            </div>
            <div className={styles.formGroup}>
              <label>Rol</label>
              <input 
                type="text" 
                name="nombreGimnasio" 
                onChange={handleChange} 
                placeholder="Rol en el gimnasio"
              />
            </div>
            <button type="submit" className={styles.updateButton}>
              Actualizar Perfil
            </button>
          </form>
        </div>
      </div>
      
      {showModal && (
        <PrivateDataModal
          correo={formData.correo}
          onClose={() => setShowModal(false)}
          onCorreoChange={(newCorreo) => setFormData({ ...formData, correo: newCorreo })}
          onPasswordChange={(newPass) => setFormData({ ...formData, contraseña: newPass })}
        />
      )}
    </motion.div>
  );
};

export default ProfileGym;

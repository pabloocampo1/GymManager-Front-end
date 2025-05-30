import React, { useState, useEffect, use } from "react";
import { motion } from "framer-motion"; // Importamos framer-motion
import styles from "./ProfileGym.module.css";
import PrivateDataModal from "../../../Components/Modals/ModalProfile/ModalDataPrivate"
import Swal from 'sweetalert2';
import { Outlet, useNavigate } from "react-router-dom";
import SecurityIcon from '@mui/icons-material/Security';
import { AuthContext } from "../../../Context/AuthContext";

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
  const navigete =  useNavigate();
  
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
        })
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      
      <div className={styles.profileContainer}>
      <div className={styles.HeaderContainer}>
        <h2 className={styles.title}>Datos Personales</h2>
    <div className={styles.openModalBtn}>
      <SecurityIcon></SecurityIcon>
      <button type="button" className={styles.openModalBtn} onClick={() => setShowModal(true)}>
      Datos Privados
      </button>
    </div>  
    
      </div>
      
        <div className={styles.contentLayout}>
          <div className={styles.imageColumn}>
            <motion.div className={styles.profileImagePreview} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              {previewImage ? (
                <img src={previewImage} alt="Vista previa de perfil" className={styles.previewImage} />
              ) : (
                <div className={styles.noImagePlaceholder}>
                  <span>Sin imagen</span>
                </div>
              )}
            </motion.div>
            <div className={styles.uploadButtonContainer}>
              <label htmlFor="profileImage" className={styles.customFileUpload}>
                Cambiar imagen
              </label>
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                onChange={handleImageChange}
                className={styles.fileInput}
              />
            </div>
            
              <button className={styles.ingresoPerfiles} type="button" onClick={() => navigete("profiles")}>ingresar a perfiles</button>
            
          </div>

          <div className={styles.formColumn}>
            <form onSubmit={handleSubmit} className={styles.form}>
              
              <div className={styles.formGroup}>
                <label>Nombre :</label>
                <input type="text" name="nombre" value={formData.nombr} onChange={handleChange} />
              </div>
              <div className={styles.formGroup}>
                <label>Correo Electronico :</label>
                <input type="email" name="email"  />
              </div>
              <div className={styles.formGroup}>
                <label>Numero telefonico: </label>
                <input type="number" name="telefono" />
              </div>
              
              
              <div className={styles.formGroup}>
                <label>Ultima fecha de ingreso: </label>
                <input type="date" name="fechaingre" />
              </div>
              <div className={styles.formGroup}>
                <label>Rol :</label>
                <input type="text" name="nombreGimnasio"  onChange={handleChange} />
              </div>
              <button type="submit" className={styles.updateButton}>Cambiar datos</button>
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
      </div>
      
    </motion.div>
    
  );
};

export default ProfileGym;

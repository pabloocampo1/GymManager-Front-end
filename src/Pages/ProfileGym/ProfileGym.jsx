import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Importamos framer-motion
import styles from "./ProfileGym.module.css";

const ProfileGym = () => {
  const [formData, setFormData] = useState({
    nombre: "Juan Pérez",
    correo: "juanperez@example.com",
    contraseña: "",
    clientes: "150",
    nombreGimnasio: "FitLife Gym",
  });
  
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  
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
    alert("Datos actualizados correctamente");
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      
      <div className={styles.profileContainer}>
      <h2 className={styles.title}>Datos Personales</h2>
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
          </div>

          <div className={styles.formColumn}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Nombre:</label>
                <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
              </div>
              <div className={styles.formGroup}>
                <label>Contraseña:</label>
                <input type="password" name="contraseña" value={formData.contraseña} onChange={handleChange} placeholder="********" />
              </div>
              <div className={styles.formGroup}>
                <label>Clientes Activos:</label>
                <input type="number" name="clientes" value={formData.clientes} onChange={handleChange} />
              </div>
              <div className={styles.formGroup}>
                <label>Nombre del Gimnasio:</label>
                <input type="text" name="nombreGimnasio" value={formData.nombreGimnasio} onChange={handleChange} />
              </div>
              <button type="submit" className={styles.updateButton}>Actualizar Datos</button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileGym;

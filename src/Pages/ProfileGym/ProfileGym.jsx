import React, { useState, useEffect } from "react";
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
  
  // Check if there's a saved profile image in localStorage on component mount
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
      
      // Create a preview of the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save the image to localStorage when submitting the form
    if (previewImage) {
      localStorage.setItem('profileImage', previewImage);
      
      // Dispatch a custom event to notify other components about the profile update
      const event = new CustomEvent('profileUpdated', { 
        detail: { profileImage: previewImage } 
      });
      window.dispatchEvent(event);
    }
    
    console.log("Datos actualizados:", formData);
    console.log("Imagen actualizada:", profileImage);
    
    // Show success message
    alert("Datos actualizados correctamente");
  };

  return (
    <>
      <h2 className={styles.title}>Datos Personales</h2>
      <div className={styles.profileContainer}>
        <div className={styles.contentLayout}>
          {/* Columna izquierda con la imagen */}
          <div className={styles.imageColumn}>
            <div className={styles.profileImagePreview}>
              {previewImage ? (
                <img 
                  src={previewImage} 
                  alt="Vista previa de perfil" 
                  className={styles.previewImage}
                />
              ) : (
                <div className={styles.noImagePlaceholder}>
                  <span>Sin imagen</span>
                </div>
              )}
            </div>
            
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
          
          {/* Columna derecha con el formulario */}
          <div className={styles.formColumn}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Nombre:</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label>Correo:</label>
                <input
                  type="email"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label>Contraseña:</label>
                <input
                  type="password"
                  name="contraseña"
                  value={formData.contraseña}
                  onChange={handleChange}
                  placeholder="********"
                />
              </div>
              
              <div className={styles.formGroup}>
                <label>Clientes Activos:</label>
                <input
                  type="number"
                  name="clientes"
                  value={formData.clientes}
                  onChange={handleChange}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label>Nombre del Gimnasio:</label>
                <input
                  type="text"
                  name="nombreGimnasio"
                  value={formData.nombreGimnasio}
                  onChange={handleChange}
                />
              </div>
              
              <button type="submit" className={styles.updateButton}>
                Actualizar Datos
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileGym;
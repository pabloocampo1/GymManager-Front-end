import React, { useState } from "react";
import styles from "./EventModal.module.css";

const EventModal = ({ isOpen, onClose }) => {
  const [preview, setPreview] = useState(null);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains(styles.modalOverlay)) {
      handleClose();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleClose = () => {
    setPreview(null); // Limpiar la previsualización
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={handleClose}>Volver</button>
        <h2>Añadir Evento</h2>
        <form>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Nombre del Evento</label>
              <input type="text" required placeholder="Evento" />
            </div>

            <div className={styles.formGroup}>
              <label>Categoría</label>
              <select required>
                <option value="crossfit">CrossFit</option>
                <option value="natacion">Natación</option>
                <option value="atletismo">Atletismo</option>
                <option value="powerlifting">Powerlifting</option>
              </select>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Fecha del evento</label>
              <input type="date" required />
            </div>

            <div className={styles.formGroup}>
              <label>Encargado</label>
              <input type="text" required placeholder="Encargado" />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Lugar</label>
              <input type="text" required placeholder="Ubicación" />
            </div>

            {/* Sección de imagen con botón y previsualización */}
            <div className={styles.formGroup}>
              
              <div className={styles.imageUpload}>
                <input type="file" id="fileInput" onChange={handleImageChange} />
                <label htmlFor="fileInput" className={styles.uploadBtn}>Subir Imagen</label>
              </div>
              {preview && <img src={preview} alt="Preview" className={styles.imagePreview} />}
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <button type="button" className={styles.cancelBtn} onClick={handleClose}>Cancelar</button>  
            <button type="submit" className={styles.addBtn}>Agregar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;

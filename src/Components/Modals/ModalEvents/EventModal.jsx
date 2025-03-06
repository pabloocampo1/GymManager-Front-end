import React from "react";
import styles from "./EventModal.module.css";

const EventModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; 

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains(styles.modalOverlay)) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={onClose}>Volver</button>
        <h2>Añadir Evento</h2>
        <form>
          <label>Nombre del Evento</label>
          <input type="text" required placeholder="Evento"/>

          <label>Categoría</label>
          <select required>
            <option value="crossfit">CrossFit</option>
            <option value="natacion">Natación</option>
            <option value="atletismo">Atletismo</option>
            <option value="powerlifting">Powerlifting</option>
          </select>

          <label>Fecha del evento</label>
          <input type="date" required />

          <label>Encargado</label>
          <input type="text" required placeholder="Encargado" />

          <label>Lugar</label>
          <input type="text" required placeholder="Ubicación" />

          <label>Imagen</label>
          <div className={styles.imageUpload}>
            <span>Añadir imagen</span>
          </div>

          <div className={styles.buttonContainer}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancelar</button>  
            <button type="submit" className={styles.addBtn}>Agregar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;


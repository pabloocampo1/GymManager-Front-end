import React from "react";
import styles from "./MembresiasModal.module.css";
import ClearIcon from '@mui/icons-material/Clear';

const MembresiaModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains(styles.modalOverlay)) {
      onClose();
    }
  };
  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContainer}>
        <div className={styles.modalCloseContainer}>
          <ClearIcon onClick={onClose}></ClearIcon>
        </div>
        <h2>Agregar Membresia</h2>
        <form>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="nombre" className={styles.label}>
                Nombre Membresia
              </label>
              <input
                type="text"
                id="nombre"
                required
                className={styles.input}
                placeholder="Nombre Membresia"
              />

              <div className={styles.formGroup}>
                <label htmlFor="tipo" className={styles.label}>
                  Tipo de membresia
                </label>
                <select id="tipo" className={styles.select}>
                  <option>Tipo</option>
                  <option>Oro</option>
                  <option>Plata</option>
                  <option>Bronce</option>
                </select>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="duracion" className={styles.label}>
                Duracion En Dias
              </label>
              <input
                type="number"
                id="duracion"
                className={styles.input}
                placeholder="Duracion"
              />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="precio" required className={styles.label}>
                Precio
              </label>
              <input
                type="number"
                id="precio"
                className={styles.input}
                placeholder="Precio"
              />
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
            >
              Cancelar
            </button>
            <button type="submit" className={styles.addButton}>
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MembresiaModal;

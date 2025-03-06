import React from "react";
import styles from "./InventoryModal.module.css";

const InventoryModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains(styles.modalOverlay)) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <h2>Añadir Objeto</h2>
        <form>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="nombre" className={styles.label}>Nombre del objeto</label>
              <input type="text" id="nombre" required className={styles.input} placeholder="Máquina Smith" />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="categoria" className={styles.label}>Categoría</label>
              <select id="categoria" className={styles.select}>
                <option>Inferior</option>
                <option>Superior</option>
                <option>Cardio</option>
                <option>Complemento</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="fecha" className={styles.label}>Fecha de compra</label>
              <input type="date" id="fecha" required className={styles.input} />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="proveedor" className={styles.label}>Proveedor</label>
              <input type="text" id="proveedor" required className={styles.input} placeholder="Empresa" />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="estado" className={styles.label}>Estado</label>
              <input type="text" id="estado" required className={styles.input} placeholder="Estado Máquina" />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="marca" className={styles.label}>Marca</label>
              <input type="text" id="marca" required className={styles.input} placeholder="Marca" />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="modelo" className={styles.label}>Modelo</label>
              <input type="text" id="modelo" required className={styles.input} placeholder="Modelo de la máquina" />
            </div>
          </div>

          <div className={styles.imageUpload}>
            <label htmlFor="imagen" className={styles.label}>Imagen</label>
            <input type="file" id="imagen" />
            <div className={styles.imageBox}>Añadir imagen</div>
          </div>

          <div className={styles.buttonContainer}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className={styles.addBtn}>Agregar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryModal;

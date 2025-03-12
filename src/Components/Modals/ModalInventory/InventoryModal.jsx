import React, { useState, useEffect } from "react";
import styles from "./InventoryModal.module.css";

const InventoryModal = ({ isOpen, onClose }) => {
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      setImagePreview(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains(styles.modalOverlay)) {
      handleClose();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClose = () => {
    setImagePreview(null);
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <h2>Añadir Objeto</h2>
        <form>
          {/* 🏋️ Primera Fila */}
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

          {/* 🏋️ Segunda Fila */}
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="proveedor" className={styles.label}>Proveedor</label>
              <input type="text" id="proveedor" required className={styles.input} placeholder="Empresa" />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="estado" className={styles.label}>Estado</label>
              <select id="estado" required className={styles.select}>
                <option>Deplorable</option>
                <option>Superior</option>
                <option>Mela</option>
                <option>Pro</option>
              </select>
            </div>
          </div>

          {/* 🏋️ Tercera Fila */}
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

          {/* 📸 Sección para subir imagen con preview */}
          <div className={styles.imageUpload}>
            <label htmlFor="imagen" className={styles.uploadBtn}>
              Subir Imagen
            </label>
            <input type="file" id="imagen" onChange={handleImageChange} accept="image/png" />
            {imagePreview && <img src={imagePreview} alt="Preview" className={styles.imagePreview} />}
          </div>

          {/* 🏁 Botones */}
          <div className={styles.buttonContainer}>
            <button type="button" className={styles.cancelBtn} onClick={handleClose}>
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
import React, { useState, useEffect } from "react";
import styles from "./InventoryModal.module.css";
import ClearIcon from '@mui/icons-material/Clear';

const InventoryModal = ({ 
  isOpen, 
  onClose, 
  onAddItem, 
  initialItemData = null  // New prop for edit functionality
}) => {
  /*formData almacena  valores ingresados en el formulario. Se inicializa con valores predeterminados.*/ 
  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "Inferior",
    fecha: "",
    proveedor: "",
    estado: "Deplorable",
    marca: "",
    modelo: "",
    image: null,
    id: null  // Add ID to support editing
  });

  /*Cuando el modal se cierra osea isOpen = false, este useEffect restablece los valores del formulario.*/ 
  useEffect(() => {
    if (initialItemData) {
      // Si hay datos iniciales (modo edición), los carga en el formulario
      setFormData(initialItemData);
    } else {
      // Si no hay datos iniciales (modo agregar), restablece el formulario
      setFormData({
        nombre: "",
        categoria: "Inferior",
        fecha: "",
        proveedor: "",
        estado: "Deplorable",
        marca: "",
        modelo: "",
        image: null,
        id: null
      });
    }
  }, [initialItemData, isOpen]);

  if (!isOpen) return null;

  /*Cuando la persona escriba en el campo, actualiza el estado formData con el nuevo valor.*/ 
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  /* proceso mas largo :Obtiene el archivo (imagen que sube la persona).
      Verifica que tipo es la imagen
      Usa FileReader para convertir la imagen en base64 y almacenarla en formData.image.  */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  /*Evita que la página se recargue con el e.preventdefault.
    Llama a onAddItem pasándo los datos del formulario*/ 
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(formData);
  };

  /*estructura omg*/ 
  return (
    <div 
      className={styles.modalOverlay} 
      onClick={(e) => e.target.classList.contains(styles.modalOverlay) && onClose()}
    >
      <div className={styles.modal}>
        <div className={styles.modalClosebtn}>
          <ClearIcon onClick={onClose}></ClearIcon>
        </div>
        <div className={styles.title}>
          <h2>{initialItemData ? "Editar Objeto" : "Añadir Objeto"}</h2>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="nombre">Nombre del Objeto:</label>
              <input 
                type="text" 
                id="nombre" 
                placeholder="Nombre del objeto" 
                required 
                value={formData.nombre} 
                onChange={handleInputChange} 
                className={styles.input} 
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="categoria">Categoría:</label>
              <select 
                id="categoria" 
                value={formData.categoria} 
                onChange={handleInputChange} 
                className={styles.select}
              >
                <option>Inferior</option>
                <option>Superior</option>
                <option>Cardio</option>
                <option>Complemento</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="fecha">Fecha de Compra:</label>
              <input 
                type="date" 
                id="fecha" 
                
                required 
                value={formData.fecha} 
                onChange={handleInputChange} 
                className={styles.input} 
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="proveedor">Proveedor:</label>
              <input 
                type="text" 
                id="proveedor" 
                placeholder="Nombre del proveedor" 
                required 
                value={formData.proveedor} 
                onChange={handleInputChange} 
                className={styles.input} 
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="estado">Estado:</label>
              <select 
                id="estado" 
                value={formData.estado} 
                onChange={handleInputChange} 
                className={styles.select}
              >
                <option>Aceptable</option>
                <option>Deplorable</option>
              </select>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="marca">Marca:</label>
              <input 
                type="text" 
                id="marca" 
                placeholder="Marca del objeto" 
                required 
                value={formData.marca} 
                onChange={handleInputChange} 
                className={styles.input} 
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="modelo">Modelo:</label>
              <input 
                type="text" 
                id="modelo" 
                placeholder="Modelo del objeto" 
                required 
                value={formData.modelo} 
                onChange={handleInputChange} 
                className={styles.input} 
              />
            </div>

            <div className={styles.imageUpload}>
              <label htmlFor="imagen">Imagen:</label>
              <input 
                type="file" 
                id="imagen" 
                onChange={handleImageChange} 
                accept="image/png, image/jpeg" 
              />
              {formData.image && (
                <img 
                  src={formData.image} 
                  alt="Previsualización" 
                  className={styles.imagePreview} 
                />
              )}
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <button 
              type="button" 
              className={styles.cancelBtn} 
              onClick={onClose}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className={styles.addBtn}
            >
              {initialItemData ? "Actualizar" : "Agregar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryModal;
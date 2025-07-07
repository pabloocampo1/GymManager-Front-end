import React, { useState, useEffect, useCallback, useRef } from "react";
import styles from "./InventoryModal.module.css";
import ClearIcon from '@mui/icons-material/Clear';
import { motion, AnimatePresence } from "framer-motion";
import DocumentViewer from "../../../DocumentViewer";

const InventoryModal = ({
  isOpen,
  onClose,
  onAddItem,
  initialItemData = null
}) => {
  const [formData, setFormData] = useState({
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const closeTimeoutRef = useRef(null);

  const resetForm = useCallback(() => {
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
    setIsSubmitting(false);
  }, []);

  const handleClose = useCallback(() => {
    if (!isSubmitting) {
      onClose();
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
      closeTimeoutRef.current = setTimeout(() => {
        resetForm();
      }, 100);
    }
  }, [isSubmitting, onClose, resetForm]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (initialItemData && isOpen) {
      const imageData = initialItemData.image || initialItemData.imagen || null;
      setFormData({
        ...initialItemData,
        nombre: initialItemData.nombre || "",
        categoria: initialItemData.categoria || "Inferior",
        fecha: initialItemData.fecha || initialItemData.fechaCompra || "",
        proveedor: initialItemData.proveedor || "",
        estado: initialItemData.estado || "Deplorable",
        marca: initialItemData.marca || "",
        modelo: initialItemData.modelo || "",
        image: imageData,
        id: initialItemData.id || null
      });

      if (initialItemData.fechaCompra && typeof initialItemData.fechaCompra === 'string' && !initialItemData.fechaCompra.match(/^\d{4}-\d{2}-\d{2}$/)) {
        try {
          const date = new Date(initialItemData.fechaCompra);
          setFormData(prev => ({
            ...prev,
            fecha: date.toISOString().split('T')[0]
          }));
        } catch (e) {
          console.error("Error formatting date:", e);
        }
      }
    } else if (!initialItemData && isOpen) {
      resetForm();
    }
  }, [initialItemData, isOpen, resetForm]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fecha.match(/^\d{4}-\d{2}-\d{2}$/)) {
      alert("La fecha debe estar en formato YYYY-MM-DD");
      return;
    }

    setIsSubmitting(true);

    try {
      onClose();
      await onAddItem(formData);
      resetForm();
    } catch (error) {
      console.error("Error al guardar el item:", error);
      alert("Error al guardar. Por favor intente de nuevo.");
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={(e) => e.target.classList.contains(styles.modalOverlay) && !isSubmitting && handleClose()}
        >
          <motion.div
            className={styles.modal}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className={styles.modalClosebtn}>
              <ClearIcon onClick={handleClose} style={{ cursor: isSubmitting ? 'wait' : 'pointer' }} />
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
                    disabled={isSubmitting}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="categoria">Categoría:</label>
                  <select
                    id="categoria"
                    value={formData.categoria}
                    onChange={handleInputChange}
                    className={styles.select}
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="estado">Estado:</label>
                  <select
                    id="estado"
                    value={formData.estado}
                    onChange={handleInputChange}
                    className={styles.select}
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
                  />
                </div>

                <div className={styles.imageUploadContainer}>
                  <label htmlFor="imagen">Imagen:</label>
                  <input
                    type="file"
                    id="imagen"
                    onChange={handleImageChange}
                    accept="image/png, image/jpeg"
                    disabled={isSubmitting}
                  />
                  
                  <DocumentViewer 
                    imageUrl={formData.image}
                    alt="Previsualización"
                    className={styles.imagePreviewContainer}
                    style={{ width: '150px', height: '150px' }}
                  />
                </div>
              </div>

              <div className={styles.buttonContainer}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={handleClose}
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className={styles.addBtn}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Procesando..." : (initialItemData ? "Actualizar" : "Agregar")}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InventoryModal;

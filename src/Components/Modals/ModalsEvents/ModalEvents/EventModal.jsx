import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./EventModal.module.css";
import ClearIcon from '@mui/icons-material/Clear';
import DocumentViewer from "../../../DocumentViewer";

function EventModal({
  isOpen,
  onClose,
  onAddEvent,
  initialEventData = null
}) {
  const [eventData, setEventData] = useState({
    nombre: "",
    categoria: "crossfit",
    encargado: "",
    fecha: "",
    lugar: "",
    image: null,
    id: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const closeTimeoutRef = useRef(null);

  // Función para resetear el estado del formulario
  const resetForm = useCallback(() => {
    setEventData({
      nombre: "",
      categoria: "crossfit",
      encargado: "",
      fecha: "",
      lugar: "",
      image: null,
      id: null
    });
    setIsSubmitting(false);
  }, []);

  const handleClose = useCallback(() => {
    if (!isSubmitting) {
      // Llamamos a onClose de inmediato para mejorar la experiencia del usuario
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
    if (initialEventData && isOpen) {
      const imageData = initialEventData.image || initialEventData.imagen || null;

      setEventData({
        ...initialEventData,
        nombre: initialEventData.nombre || "",
        categoria: initialEventData.categoria || "crossfit",
        encargado: initialEventData.encargado || "",
        fecha: initialEventData.fecha || "",
        lugar: initialEventData.lugar || "",
        image: imageData,
        id: initialEventData.id || null
      });
    } else if (!initialEventData && isOpen) {
      resetForm();
    }
  }, [initialEventData, isOpen, resetForm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setEventData((prev) => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      onClose();
      await onAddEvent(eventData);
      resetForm();
    } catch (error) {
      console.error("Error al guardar el evento:", error);
      alert("Error al guardar. Por favor intente de nuevo.");
      setIsSubmitting(false);
    }
  };

  const modalVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.15 } },
    exit: { scale: 0.8, opacity: 0, transition: { duration: 0.1 } }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.15 } },
    exit: { opacity: 0, transition: { duration: 0.1 } }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className={styles.modalOverlay}
          onClick={(e) => e.target.classList.contains(styles.modalOverlay) && !isSubmitting && handleClose()}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className={styles.modalContent}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className={styles.modalClosebtn}>
              <ClearIcon
                onClick={handleClose}
                style={{ cursor: isSubmitting ? "wait" : "pointer" }}
              />
            </div>
            <h2>{initialEventData ? "Editar Evento" : "Agregar Nuevo Evento"}</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Nombre del Evento</label>
                  <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre del evento"
                    value={eventData.nombre}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Categoría</label>
                  <select
                    name="categoria"
                    value={eventData.categoria}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    required
                  >
                    <option value="crossfit">CrossFit</option>
                    <option value="natacion">Natación</option>
                    <option value="atletismo">Atletismo</option>
                    <option value="powerlifting">Powerlifting</option>
                  </select>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Encargado</label>
                  <input
                    type="text"
                    name="encargado"
                    placeholder="Encargado"
                    value={eventData.encargado}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Fecha del Evento</label>
                  <input
                    type="date"
                    name="fecha"
                    min={new Date().toISOString().split("T")[0]}
                    value={eventData.fecha}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    required
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Lugar</label>
                  <input
                    type="text"
                    name="lugar"
                    placeholder="Ubicación"
                    value={eventData.lugar}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <div className={styles.imageUpload}>
                    <label htmlFor="imagen">Imagen:</label>
                    <input
                      type="file"
                      id="imagen"
                      onChange={handleImageChange}
                      accept="image/png, image/jpeg"
                      disabled={isSubmitting}
                    />
                    <DocumentViewer 
                    imageUrl={eventData.image}
                    alt="Previsualización"
                    className={styles.imagePreviewContainer}
                    style={{ width: '150px', height: '150px' }}
                  />
                  </div>
                </div>
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className={styles.cancelBtn}
                >
                  Cancelar
                </button>
                <button type="submit" disabled={isSubmitting} className={styles.addBtn}>
                  {isSubmitting ? "Guardando..." : (initialEventData ? "Actualizar Evento" : "Agregar Evento")}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default EventModal;
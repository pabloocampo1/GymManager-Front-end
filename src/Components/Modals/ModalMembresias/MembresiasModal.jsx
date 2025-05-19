import React, { useState, useEffect } from "react";
import styles from "./MembresiasModal.module.css";
import ClearIcon from "@mui/icons-material/Clear";
import { motion, AnimatePresence } from "framer-motion";
import SimpleBackdrop from "../../SimpleBackdrop";

const MembresiaModal = ({ isOpen, onClose, onAdd, membresiaEditando}) => {
  const [name, setName] = useState();
  const [type, setType] = useState("Oro");
  const [duration, setDuration] = useState();
  const [price, setPrice] = useState();
  const [isLoanding, setisLoanding]= useState(false);
  const [id, setId]= useState();

  // 📌 Efecto para cargar datos cuando se edita una membresía
  useEffect(() => {
    if (membresiaEditando) {
      setName(membresiaEditando.name);
      setType(membresiaEditando.type);
      setDuration(membresiaEditando.duration);
      setPrice(membresiaEditando.price);
      setId(membresiaEditando.id)
      
    } else {
      setName("");
      setType("Oro");
      setDuration("");
      setPrice("");
      setId("")
    }
  }, [membresiaEditando]);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains(styles.modalOverlay)) {
      onClose();
    }
  };

  const handleDuracionChange = (e) => {
    let rawValue = e.target.value.replace(/[^0-9]/g, "");
    if (rawValue === "") {
      setDuration("");
    } else {
      let numericValue = parseInt(rawValue, 10);
      if (numericValue > 366) {
        alert("Por favor, agrega un número menor o igual a 365.");
        return;
      }
      setDuration(numericValue.toString());
    }
  };

  /*const handlePrecioChange = (e) => {
    let rawValue = e.target.value.replace(/[^0-9]/g, "");
    let numericValue = Number(rawValue);
    let formattedValue = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(numericValue);
    setPrice(formattedValue);
  };*/

  const handleSubmit = async (e) => {
    setisLoanding(true)
    e.preventDefault();
  
    // Validación básica
    if (!name || !duration || !price || !type) {
      setisLoanding(false)
      alert("Por favor, completa todos los campos.");
      return;
    }
  
    // Construir el objeto membresía como espera el backend
    const membresiaData = {
      id: id,
      name: name,
      duration: parseInt(duration), // ⚠️ Asumimos que el backend espera un número
      price: parseInt(price),   // ⚠️ Asegúrate que el precio es tipo `number`
      type: type
    };
  
    try {
      await onAdd(membresiaData); // Este método llama al `create` o `update` según corresponda
       setisLoanding(false)
      onClose(); // Cierra el modal después de éxito
    } catch (error) {
       setisLoanding(false)
      console.error("Error al enviar la membresía:", error);
      alert("Ocurrió un error al guardar la membresía.");
    }
    setisLoanding(false)

    
  };
  

  return (
    <AnimatePresence>
      <SimpleBackdrop open={isLoanding} />
      {isOpen && (
        <motion.div
          className={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleOverlayClick}
        >
          <motion.div
            className={styles.modalContainer}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
           <div className={styles.modalCloseContainer}>
            <ClearIcon className={styles.closeButton} onClick={onClose} />
          </div>
            <h2>
              {membresiaEditando ? "Editar Membresía" : "Agregar Membresía"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>
                    Nombre Membresía
                  </label>
                  <input
                    type="text"
                    id="name"
                    className={styles.input}
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="type" className={styles.label}>
                    Tipo
                  </label>
                  <select
                    id="type"
                    className={styles.select}
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="Oro">Oro</option>
                    <option value="Plata">Plata</option>
                    <option value="Bronce">Bronce</option>
                  </select>
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="duration" className={styles.label}>
                    Duración en Días
                  </label>
                  <input
                    type="text"
                    id="duration"
                    className={styles.input}
                    placeholder="Duración"
                    value={duration}
                    onChange={handleDuracionChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="price" className={styles.label}>
                    Precio
                  </label>
                  <input
                    type="number"
                    id="price"
                    className={styles.input}
                    placeholder="Precio"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
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
                  {membresiaEditando ? "Guardar Cambios" : "Agregar"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MembresiaModal;

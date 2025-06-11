import React, { useState, useEffect } from "react";
import styles from "./MembresiasModal.module.css";
import ClearIcon from "@mui/icons-material/Clear";
import { motion, AnimatePresence } from "framer-motion";
import SimpleBackdrop from "../../SimpleBackdrop";
import Swal from 'sweetalert2';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const MembresiaModal = ({ isOpen, onClose, onAdd, membresiaEditando}) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("Oro");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [isLoanding, setisLoanding]= useState(false);
  const [id, setId]= useState("");
  const [benefits, setBenefits] = useState([""]);

  useEffect(() => {
    if (membresiaEditando) {
      setName(membresiaEditando.title);
      setType(membresiaEditando.type);
      setDuration(membresiaEditando.duration);
      setPrice(membresiaEditando.price);
      setId(membresiaEditando.id);
      setBenefits(membresiaEditando.benefits || [""]);
    } else {
      setName("");
      setType("Oro");
      setDuration("");
      setPrice("");
      setId("");
      setBenefits([""]);
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
        Swal.fire({
              icon: 'warning',
              title: 'Maximo de días',
              text: 'Los dias de la membresia no pueden ser superiores a un año',
              confirmButtonText: 'Entendido'
        });
        return;
      }
      if (numericValue < 1) {
        Swal.fire({
          icon: 'warning',
          title: 'Mínimo de días',
          text: 'Los días de la membresía no pueden ser menores a 1',
          confirmButtonText: 'Entendido'
        });
        return;
      }
      setDuration(numericValue.toString());
    }
  };

  const handleBenefitChange = (index, value) => {
    const newBenefits = [...benefits];
    newBenefits[index] = value;
    setBenefits(newBenefits);
  };

  const addBenefit = () => {
    setBenefits([...benefits, ""]);
  };

  const removeBenefit = (index) => {
    if (benefits.length > 1) {
      const newBenefits = benefits.filter((_, i) => i !== index);
      setBenefits(newBenefits);
    }
  };

  const handleSubmit = async (e) => {
    setisLoanding(true)
    e.preventDefault();
  
    if (!name || !duration || !price || !type) {
      setisLoanding(false)
      Swal.fire({
            icon: 'warning',
            title: 'Campos incompletos',
            text: 'Por favor completa todos los campos',
            confirmButtonText: 'Entendido'
          })
      return;
    }

    // Filtrar beneficios vacíos
    const filteredBenefits = benefits.filter(benefit => benefit.trim() !== "");
  
    const membresiaData = {
      id: id,
      title: name,
      duration: parseInt(duration), 
      price: parseFloat(price),  
      type: type,
      benefits: filteredBenefits
    };
  
    try {
      await onAdd(membresiaData); 
      setisLoanding(false)
      onClose(); 
    } catch (error) {
      setisLoanding(false)
      console.error("Error al enviar la membresía:", error);
      Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al crear la membresia',
            confirmButtonText: 'Entendido'
          })
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

              <div className={styles.benefitsSection}>
                <label className={styles.label}>Beneficios</label>
                {benefits.map((benefit, index) => (
                  <div key={index} className={styles.benefitRow}>
                    <input
                      type="text"
                      className={styles.benefitInput}
                      placeholder="Agregar beneficio"
                      value={benefit}
                      onChange={(e) => handleBenefitChange(index, e.target.value)}
                    />
                    <button
                      type="button"
                      className={styles.removeBenefitButton}
                      onClick={() => removeBenefit(index)}
                      disabled={benefits.length === 1}
                    >
                      <DeleteOutlineIcon />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className={styles.addBenefitButton}
                  onClick={addBenefit}
                >
                  <AddIcon /> Agregar Beneficio
                </button>
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

import React, { useState, useEffect } from "react";
import styles from "./MembresiasModal.module.css";
import ClearIcon from "@mui/icons-material/Clear";

const MembresiaModal = ({ isOpen, onClose, onAdd, membresiaEditando }) => {
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("Oro");
  const [duracion, setDuracion] = useState("");
  const [precio, setPrecio] = useState("");

  // 📌 Efecto para cargar datos cuando se edita una membresía
  useEffect(() => {
    if (membresiaEditando) {
      setNombre(membresiaEditando.name);
      setTipo(membresiaEditando.type);
      setDuracion(membresiaEditando.duracion.replace(" Días", ""));
      setPrecio(membresiaEditando.precio);
    } else {
      setNombre("");
      setTipo("Oro");
      setDuracion("");
      setPrecio("");
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
      setDuracion("");
    } else {
      let numericValue = parseInt(rawValue, 10);
      if (numericValue > 366) {
        alert("Por favor, agrega un número menor o igual a 365.");
        return;
      }
      setDuracion(numericValue.toString());
    }
  };

  const handlePrecioChange = (e) => {
    let rawValue = e.target.value.replace(/[^0-9]/g, "");
    setPrecio(rawValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !duracion || !precio || !tipo) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    onAdd({
      id: membresiaEditando ? membresiaEditando.id : Date.now(),
      name: nombre,
      duracion: `${duracion} Días`,
      precio,
      type: tipo,
    });

    onClose();
  };

  return (
    isOpen && (
      <div className={styles.modalOverlay} onClick={handleOverlayClick}>
        <div className={styles.modalContainer}>
          <div className={styles.modalCloseContainer}>
            <ClearIcon className={styles.closeButton} onClick={onClose} />
          </div>
          <h2>{membresiaEditando ? "Editar Membresía" : "Agregar Membresía"}</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="nombre" className={styles.label}>Nombre Membresía</label>
                <input
                  type="text"
                  id="nombre"
                  className={styles.input}
                  placeholder="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="tipo" className={styles.label}>Tipo</label>
                <select
                  id="tipo"
                  className={styles.select}
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                >
                  <option value="Oro">Oro</option>
                  <option value="Plata">Plata</option>
                  <option value="Bronce">Bronce</option>
                </select>
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="duracion" className={styles.label}>Duración en Días</label>
                <input
                  type="text"
                  id="duracion"
                  className={styles.input}
                  placeholder="Duración"
                  value={duracion}
                  onChange={handleDuracionChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="precio" className={styles.label}>Precio</label>
                <input
                  type="text"
                  id="precio"
                  className={styles.input}
                  placeholder="Precio"
                  value={precio}
                  onChange={handlePrecioChange}
                  required
                />
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <button type="button" className={styles.cancelButton} onClick={onClose}>Cancelar</button>
              <button type="submit" className={styles.addButton}>
                {membresiaEditando ? "Guardar Cambios" : "Agregar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default MembresiaModal;

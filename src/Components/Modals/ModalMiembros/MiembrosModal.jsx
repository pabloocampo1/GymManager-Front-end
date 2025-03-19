import React from "react";
import styles from "./MiembrosModal.module.css";
import ClearIcon from "@mui/icons-material/Clear";

const MiembrosModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains(styles.modalOverlayMiembros)) {
      onClose();
    }
  };
  return (
    <div className={styles.modalOverlayMiembros} onClick={handleOverlayClick}>
      <div className={styles.modalContainer}>
        <div className={styles.modalCloseContainer}>
          <ClearIcon className= {styles.closeButton} onClick={onClose} />
        </div>
        <h2>Agregar Un Nuevo Miembro</h2>
        <div className={styles.Subtitulos}>
                <p>Datos Personales</p>
            </div>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="nombre" className={styles.label}>
              Nombre Completo
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className={styles.input}
              placeholder="Nombre Completo"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="identificacion" className={styles.label}>
              Número de Identificación
            </label>
            <input
              type="number"
              id="identificacion"
              name="identificacion"
              className={styles.input}
              placeholder="Número de Identificación"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="fechaNacimiento" className={styles.label}>
              Fecha de Nacimiento
            </label>
            <input
              type="date"
              id="fechaNacimiento"
              name="fechaNacimiento"
              className={styles.input}
              required
            />
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="telefono" className={styles.label}>
              Teléfono
            </label>
            <input
              type="number"
              id="telefono"
              name="telefono"
              className={styles.input}
              placeholder="Teléfono"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.input}
              placeholder="Correo Electrónico"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="genero" className={styles.label}>
              Género
            </label>
            <select
              id="genero"
              name="genero"
              className={styles.select}
              required
            >
              <option value="">Seleccionar</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
        </div>
        <div className={styles.Subtitulos}>
                <p>Datos Membresia</p>
            </div>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="membresia" className={styles.label}>
              Tipo de Membresía
            </label>
            <select
              id="membresia"
              name="membresia"
              className={styles.select}
              required
            >
              <option value="">Seleccionar</option>
              <option value="Mensual">Oro</option>
              <option value="Plata">Plata</option>
              <option value="Bronce">Bronce</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="fechaInscripcion" className={styles.label}>
              Fecha de Inscripción
            </label>
            <input
              type="date"
              id="fechaInscripcion"
              name="fechaInscripcion"
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="telefonoEmergencia" className={styles.label}>
              Teléfono de Emergencia
            </label>
            <input
              type="number"
              id="telefonoEmergencia"
              name="telefonoEmergencia"
              className={styles.input}
              placeholder="Teléfono de Emergencia"
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
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default MiembrosModal;

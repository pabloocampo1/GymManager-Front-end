import { useEffect, useState } from "react";
import styles from "./MiembrosModal.module.css";
import ClearIcon from "@mui/icons-material/Clear";

const MiembrosModal = ({
  isOpen,
  onClose,
  onAdd,
  miembros,
  miembroSeleccionado,
}) => {
  const [formData, setFormData] = useState({
    nombre: "",
    identificacion: "",
    fechaNacimiento: "",
    telefono: "",
    email: "",
    genero: "",
    membresia: "",
    fechaInscripcion: "",
    telefonoEmergencia: "",
  });

  // 🔍 Verifica cuando cambia `miembroSeleccionado`
  useEffect(() => {
    if (miembroSeleccionado) {
      // Clonar el objeto para evitar modificaciones directas
      setFormData({...miembroSeleccionado}); 
    } else {
      // Resetear todos los campos
      setFormData({
        nombre: "",
        identificacion: "",
        fechaNacimiento: "",
        telefono: "",
        email: "",
        genero: "",
        membresia: "",
        fechaInscripcion: "",
        telefonoEmergencia: "",
      });
    }
  }, [miembroSeleccionado]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains(styles.modalOverlayMiembros)) {
      onClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validaciones específicas para los campos numéricos
    if (["telefono", "telefonoEmergencia", "identificacion"].includes(name)) {
      const numericValue = value.replace(/[^0-9]/g, ""); // Solo números
      
      // Si está en modo edición, no permitir cambiar la identificación
      if (name === "identificacion" && miembroSeleccionado) {
        return;
      }
      
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const {
      nombre,
      identificacion,
      fechaNacimiento,
      telefono,
      email,
      genero,
      membresia,
      fechaInscripcion,
      telefonoEmergencia,
    } = formData;
  
    // Validación de campos obligatorios
    const camposObligatorios = [
      nombre, identificacion, fechaNacimiento, telefono, 
      email, genero, membresia, fechaInscripcion, telefonoEmergencia
    ];
  
    if (camposObligatorios.some(campo => !campo)) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    // Validación de fecha de nacimiento
    const fechaActual = new Date();
    const fechaNacimientoDate = new Date(fechaNacimiento);

    if (fechaNacimientoDate >= fechaActual) {
      alert("La fecha de nacimiento debe ser anterior a la fecha actual.");
      return;
    }

    // Validación de identificación en modo edición
    if (miembroSeleccionado && miembroSeleccionado.identificacion !== identificacion) {
      alert("No se puede modificar el número de identificación.");
      return;
    }
  
    if (miembroSeleccionado) {
      // Editar un miembro existente
      onAdd({
        tipo: 'editar',
        miembro: formData
      });
    } else {
      // Agregar un nuevo miembro
      const existe = miembros.some((m) => m.identificacion === identificacion);
      if (existe) {
        alert("Error: La identificación ya está registrada.");
        return;
      }
  
      onAdd({
        tipo: 'agregar',
        miembro: formData
      });
    }
  
    // Reiniciar formulario y cerrar modal
    setFormData({
      nombre: "",
      identificacion: "",
      fechaNacimiento: "",
      telefono: "",
      email: "",
      genero: "",
      membresia: "",
      fechaInscripcion: "",
      telefonoEmergencia: "",
    });
  
    onClose();
  };

  return (
    <div className={styles.modalOverlayMiembros} onClick={handleOverlayClick}>
      <div className={styles.modalContainer}>
        <div className={styles.modalCloseContainer}>
          <ClearIcon className={styles.closeButton} onClick={onClose} />
        </div>
        <h2>{miembroSeleccionado ? 'Editar Miembro' : 'Agregar Un Nuevo Miembro'}</h2>

        <form onSubmit={handleSubmit}>
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
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="identificacion" className={styles.label}>
                Número de Identificación
              </label>
              <input
                type="text"
                id="identificacion"
                name="identificacion"
                className={styles.input}
                placeholder="Número de Identificación"
                value={formData.identificacion}
                onChange={handleChange}
                readOnly={!!miembroSeleccionado}
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
                value={formData.fechaNacimiento}
                onChange={handleChange}
                max={new Date().toISOString().split('T')[0]}
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
                type="text"
                id="telefono"
                name="telefono"
                className={styles.input}
                placeholder="Teléfono"
                value={formData.telefono}
                onChange={handleChange}
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
                value={formData.email}
                onChange={handleChange}
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
                value={formData.genero}
                onChange={handleChange}
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
            <p>Datos Membresía</p>
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
                value={formData.membresia}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar</option>
                <option value="Oro">Oro</option>
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
                value={formData.fechaInscripcion}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="telefonoEmergencia" className={styles.label}>
                Teléfono de Emergencia
              </label>
              <input
                type="text"
                id="telefonoEmergencia"
                name="telefonoEmergencia"
                className={styles.input}
                placeholder="Teléfono de Emergencia"
                value={formData.telefonoEmergencia}
                onChange={handleChange}
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
            <button 
              type="submit" 
              className={styles.addButton}
            >
              {miembroSeleccionado ? 'Guardar Cambios' : 'Agregar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MiembrosModal;
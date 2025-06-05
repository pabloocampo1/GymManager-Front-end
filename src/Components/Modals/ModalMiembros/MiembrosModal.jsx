import { useEffect, useState } from "react";
import styles from "./MiembrosModal.module.css";
import ClearIcon from "@mui/icons-material/Clear";
import { motion, AnimatePresence } from "framer-motion";
import MiembrosService from "../../../Service/MiembrosService.jsx";
import MembresiaService from "../../../Service/MembresiaService.jsx";

const MiembrosModal = ({ isOpen, onClose, onAdd, miembroSeleccionado }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    identificationNumber: "",
    birthDate: "",
    phone: "",
    email: "",
    gender: "",
    membershipId: "",
    emergencyPhone: "",
  });
  const [membresias, setMembresias] = useState([]);

  useEffect(() => {
    const cargarMembresias = async () => {
      try {
        console.log('Cargando membresías...');
        const data = await MembresiaService.getAllMembresia();
        console.log('Membresías cargadas:', data);
        setMembresias(data);
      } catch (error) {
        console.error("Error al cargar las membresías:", error);
      }
    };

    cargarMembresias();
  }, []);

  useEffect(() => {
    if (miembroSeleccionado) {
      setFormData({ ...miembroSeleccionado });
    } else {
      setFormData({
        fullName: "",
        identificationNumber: "",
        birthDate: "",
        phone: "",
        email: "",
        gender: "",
        membershipId: "",
        emergencyPhone: "",
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
    console.log('Campo cambiado:', name, 'Valor:', value);

    if (["phone", "emergencyPhone", "identificationNumber"].includes(name)) {
      const numericValue = value.replace(/[^0-9]/g, "");
      setFormData(prev => ({ ...prev, [name]: numericValue }));
    } else if (name === "membershipId") {
      console.log('Seleccionando membresía:', value);
      setFormData(prev => ({ ...prev, [name]: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fechaActual = new Date();
    const fechaNacimientoDate = new Date(formData.birthDate);

    if (fechaNacimientoDate >= fechaActual) {
      alert("La fecha de nacimiento debe ser anterior a la fecha actual.");
      return;
    }

    if (
      miembroSeleccionado &&
      miembroSeleccionado.identificationNumber !== formData.identificationNumber
    ) {
      alert("No se puede modificar el número de identificación.");
      return;
    }

    if (miembroSeleccionado) {
      const actualizado = await MiembrosService.updateMiembro(
        miembroSeleccionado.id,
        formData
      );

      onAdd({
        tipo: "editar",
        miembro: actualizado,
      });
      onClose();
    } else {
      try {
        // Validar que todos los campos requeridos estén presentes
        if (!formData.identificationNumber || !formData.fullName || !formData.birthDate || 
            !formData.phone || !formData.email || !formData.gender || !formData.membershipId || 
            !formData.emergencyPhone) {
          alert("Por favor, complete todos los campos requeridos");
          return;
        }

        // Formatear los datos
        const memberData = {
          gymMemberDto: {
            identificationNumber: formData.identificationNumber.trim(),
            fullName: formData.fullName.trim(),
            birthDate: formData.birthDate,
            phone: formData.phone.trim(),
            email: formData.email.trim(),
            gender: formData.gender,
            emergencyPhone: formData.emergencyPhone.trim()
          },
          saleDto: {
            membershipId: parseInt(formData.membershipId),
            purchaseMethod: "Efectivo",
            receptionistName: "Sistema"
          }
        };

        console.log('Datos del formulario:', formData);
        console.log('Datos formateados para enviar:', memberData);
        
        const nuevoMiembro = await MiembrosService.createMiembro(memberData);
        console.log('Respuesta del servidor:', nuevoMiembro);
        
        onAdd({
          tipo: "agregar",
          miembro: nuevoMiembro
        });

        // Reiniciar formulario y cerrar modal
        setFormData({
          fullName: "",
          identificationNumber: "",
          birthDate: "",
          phone: "",
          email: "",
          gender: "",
          membershipId: "",
          emergencyPhone: "",
        });
        onClose();
      } catch (error) {
        console.error("Error al procesar la solicitud:", error);
        alert("Hubo un error al guardar el miembro. Por favor, verifica los datos e intenta nuevamente.");
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.modalOverlayMiembros}
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
              {miembroSeleccionado
                ? "Editar Miembro"
                : "Agregar Un Nuevo Miembro"}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className={styles.Subtitulos}>
                <p>Datos Personales</p>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="fullName" className={styles.label}>
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    className={styles.input}
                    placeholder="Nombre Completo"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label
                    htmlFor="identificationNumber"
                    className={styles.label}
                  >
                    Número de Identificación
                  </label>
                  <input
                    type="text"
                    id="identificationNumber"
                    name="identificationNumber"
                    className={styles.input}
                    placeholder="Número de Identificación"
                    value={formData.identificationNumber}
                    onChange={handleChange}
                    readOnly={!!miembroSeleccionado}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="birthDate" className={styles.label}>
                    Fecha de Nacimiento
                  </label>
                  <input
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    className={styles.input}
                    value={formData.birthDate}
                    onChange={handleChange}
                    max={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.label}>
                    Teléfono
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    className={styles.input}
                    placeholder="Telefono"
                    value={formData.phone}
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
                  <label htmlFor="gender" className={styles.label}>
                    Género
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    className={styles.select}
                    value={formData.gender}
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
                  <label htmlFor="membershipId" className={styles.label}>
                    Tipo de Membresía
                  </label>
                  <select
                    id="membershipId"
                    name="membershipId"
                    className={styles.select}
                    value={formData.membershipId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccionar</option>
                    {membresias.map((membresia) => (
                      <option key={membresia.id} value={membresia.id}>
                        {membresia.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="emergencyPhone" className={styles.label}>
                    Teléfono de Emergencia
                  </label>
                  <input
                    type="text"
                    id="emergencyPhone"
                    name="emergencyPhone"
                    className={styles.input}
                    placeholder="Teléfono de Emergencia"
                    value={formData.emergencyPhone}
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
                <button type="submit" className={styles.addButton}>
                  {miembroSeleccionado ? "Guardar Cambios" : "Agregar"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MiembrosModal;
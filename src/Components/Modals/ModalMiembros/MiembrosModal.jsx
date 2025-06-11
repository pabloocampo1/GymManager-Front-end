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
  const [currentMembershipName, setCurrentMembershipName] = useState("");

  // Cargar las membresías disponibles
  useEffect(() => {
    const cargarMembresias = async () => {
      try {
        const data = await MembresiaService.getAllMembresia();
        setMembresias(data);
      } catch (error) {
        console.error("Error al cargar las membresías:", error);
      }
    };
    cargarMembresias();
  }, []);

  // Cargar datos del miembro seleccionado
  useEffect(() => {
    const cargarDatosMiembro = async () => {
      if (miembroSeleccionado?.id) {
        try {
          // Obtener los datos completos del miembro incluyendo su membresía
          const membershipData = await MiembrosService.getMembershipData(miembroSeleccionado.id);
          setCurrentMembershipName(membershipData.nameMembership || "");
          setFormData({
            fullName: miembroSeleccionado.fullName || "",
            identificationNumber: miembroSeleccionado.identificationNumber || "",
            birthDate: miembroSeleccionado.birthDate || "",
            phone: miembroSeleccionado.phone || "",
            email: miembroSeleccionado.email || "",
            gender: miembroSeleccionado.gender || "",
            membershipId: membershipData.membershipId ? membershipData.membershipId.toString() : "",
            emergencyPhone: miembroSeleccionado.emergencyPhone || ""
          });
        } catch (error) {
          console.error('Error al cargar datos del miembro:', error);
          console.error('Detalles del error:', error.response?.data);
        }
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
        setCurrentMembershipName("");
      }
    };
    cargarDatosMiembro();
  }, [miembroSeleccionado]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains(styles.modalOverlayMiembros)) {
      onClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["phone", "emergencyPhone", "identificationNumber"].includes(name)) {
      const numericValue = value.replace(/[^0-9]/g, "");
      setFormData(prev => ({ ...prev, [name]: numericValue }));
    } else if (name === "membershipId") {
      setFormData(prev => ({ ...prev, [name]: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleMembershipUpdate = async (memberId, newMembershipId) => {
    try {
      const memberData = {
        membershipId: newMembershipId
      };

      await MiembrosService.updateMembership(memberId, memberData);
      
      // Obtener los datos actualizados de la membresía
      const nuevosDataMembresia = await MiembrosService.getMembershipData(memberId);
      return nuevosDataMembresia;
    } catch (error) {
      console.error('Error al actualizar la membresía:', error);
      throw error;
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

    if (miembroSeleccionado) {
      try {
        // Validar campos requeridos para edición
        if (!formData.identificationNumber || !formData.fullName || !formData.birthDate || 
            !formData.phone || !formData.email || !formData.gender || !formData.emergencyPhone) {
          alert("Por favor, complete todos los campos requeridos");
          return;
        }

        const memberData = {
          id: miembroSeleccionado.id,
          identificationNumber: formData.identificationNumber,
          fullName: formData.fullName,
          birthDate: formData.birthDate,
          phone: formData.phone,
          email: formData.email,
          gender: formData.gender,
          emergencyPhone: formData.emergencyPhone
        };

        // Primero actualizamos los datos básicos del miembro
        const actualizado = await MiembrosService.updateMiembro(
          miembroSeleccionado.id,
          memberData
        );

        let nuevosDataMembresia;
        // Solo actualizamos la membresía si se seleccionó una nueva
        if (formData.membershipId && formData.membershipId !== "") {
          nuevosDataMembresia = await handleMembershipUpdate(
            miembroSeleccionado.id,
            formData.membershipId
          );
        } else {
          // Si no se seleccionó una nueva membresía, mantenemos los datos actuales
          nuevosDataMembresia = await MiembrosService.getMembershipData(miembroSeleccionado.id);
        }
        
        onAdd({
          tipo: "editar",
          miembro: { ...actualizado, membershipData: nuevosDataMembresia }
        });
        
        onClose();
      } catch (error) {
        console.error('Error al actualizar:', error);
        alert('Error al actualizar el miembro. Por favor, verifica los datos e intenta nuevamente.');
      }
    } else {
      try {
        // Validar campos requeridos
        if (!formData.identificationNumber || !formData.fullName || !formData.birthDate || 
            !formData.phone || !formData.email || !formData.gender || !formData.membershipId || 
            !formData.emergencyPhone) {
          alert("Por favor, complete todos los campos requeridos");
          return;
        }

        const memberData = {
          gymMemberDto: {
            identificationNumber: formData.identificationNumber,
            fullName: formData.fullName,
            birthDate: formData.birthDate,
            phone: formData.phone,
            email: formData.email,
            gender: formData.gender,
            emergencyPhone: formData.emergencyPhone
          },
          saleDto: {
            membershipId: parseInt(formData.membershipId),
            purchaseMethod: "Efectivo",
            receptionistName: "Sistema"
          }
        };
        
        const nuevoMiembro = await MiembrosService.createMiembro(memberData);
        
        // Obtener los datos completos de la membresía para el nuevo miembro
        const datosMembresia = await MiembrosService.getMembershipData(nuevoMiembro.id);
        
        onAdd({
          tipo: "agregar",
          miembro: { ...nuevoMiembro, membershipData: datosMembresia }
        });

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
        console.error("Error al crear el miembro:", error);
        alert("Error al crear el miembro. Por favor, verifica los datos e intenta nuevamente.");
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
                  >
                    <option value="">{currentMembershipName || "Seleccionar"}</option>
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

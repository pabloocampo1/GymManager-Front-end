import { FaSearch, FaFilter, FaPen, FaPlus } from "react-icons/fa";
import { Menu, MenuItem } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState, useMemo, useCallback, useContext } from "react";
import styles from "./Miembros.module.css";
import MiembrosModal from "../../../Components/Modals/ModalMiembros/MiembrosModal.jsx";
import ConfirmatioModalMiembros from "../../../Components/Modals/ModalMiembros/ConfirmationModalMiembros/MiembrosConfirmation.jsx";
import ActiveButton from "../../../Components/Buttons/ButtonActive.jsx"
import InactiveButton from "../../../Components/Buttons/ButtonInactive.jsx"
import MiembrosService from "../../../Service/MiembrosService.jsx";
import { useEffect } from "react";
import { ThemeContext } from "../../../Context/ThemeContext";

const MiembrosModalComponent = () => {
  const { darkMode } = useContext(ThemeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("Todos");
  const [miembros, setMiembros] = useState([]);
  const [miembroEditado, setMiembroEditado] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [miembrosToDelete, setMiembrosToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [miembroToDeleteName, setMiembroToDeleteName] = useState("");
  const [membershipData, setMembershipData] = useState({});

  useEffect(() => {
    const fetchMiembros = async () => {
      try {
        const data = await MiembrosService.getAllMiembros();
        setMiembros(data);
        
        // Obtener datos de membresía para cada miembro
        data.forEach(async (miembro) => {
          try {
            const membershipInfo = await MiembrosService.getMembershipData(miembro.id);
            setMembershipData(prev => ({
              ...prev,
              [miembro.id]: membershipInfo
            }));
          } catch (error) {
            console.error(`Error al obtener membresía para miembro ${miembro.id}:`, error);
          }
        });
      } catch (error) {
        console.error("No se pudieron cargar los miembros:", error);
      }
    };
  
    fetchMiembros();
  }, []);

  // Función para agregar un nuevo miembro
  const handleAgregarOEditarMiembro = async (datos) => {
    try {
      if (datos.tipo === 'agregar') {
        const nuevoMiembro = datos.miembro;
        setMiembros(prevMiembros => [...prevMiembros, nuevoMiembro]);
        setMembershipData(prev => ({
          ...prev,
          [nuevoMiembro.id]: datos.miembro.membershipData
        }));
      } else if (datos.tipo === 'editar') {
        const miembroActualizado = datos.miembro;
        setMiembros(prevMiembros => 
          prevMiembros.map(m => m.id === miembroActualizado.id ? miembroActualizado : m)
        );
        setMembershipData(prev => ({
          ...prev,
          [miembroActualizado.id]: datos.miembro.membershipData
        }));
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al agregar/editar miembro:", error);
    }
  };

  const onDeleteMiembro = (id, fullName) => {
    setMiembrosToDelete(id);
    setMiembroToDeleteName(fullName);
    setIsDeleteModalOpen(true);
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (option) => {
    if (option) {
      setSelectedFilter(option);
    }
    setAnchorEl(null);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const isMembresiaActiva = useCallback((miembro) => {
    const memberData = membershipData[miembro.id];
    if (!memberData) return false;
    return memberData.stateOfMembership;
  }, [membershipData]);

  const formatearFecha = (fecha) => {
    if (!fecha) return '-';
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const calcularDiasRestantes = (fechaFin) => {
    if (!fechaFin) return 0;
    const hoy = new Date();
    const finFecha = new Date(fechaFin);
    const diferencia = finFecha.getTime() - hoy.getTime();
    const diasRestantes = Math.ceil(diferencia / (1000 * 60 * 60 * 24));
    return diasRestantes > 0 ? diasRestantes : 0;
  };

  const filteredMiembros = useMemo(() => {
    let result = [...miembros];
  
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      result = result.filter((miembro) => 
        miembro.identificationNumber.toString().includes(searchTermLower) || 
        miembro.fullName.toLowerCase().includes(searchTermLower) ||
        miembro.phone.toString().includes(searchTermLower)
      );
    }
  
    if (selectedFilter !== "Todos") {
      result = result.filter((miembro) => 
        (selectedFilter === "Activo" && isMembresiaActiva(miembro)) || 
        (selectedFilter === "Inactivo" && !isMembresiaActiva(miembro))
      );
    }
    
    return result;
  }, [miembros, selectedFilter, searchTerm, isMembresiaActiva]);

  const titleToShow = searchTerm 
    ? `Búsqueda: ${searchTerm}` 
    : `Filtrado por: ${selectedFilter}`; 

  const renderEstadoCell = (miembro) => {
    const esActivo = isMembresiaActiva(miembro);
    const estadoTexto = esActivo ? <ActiveButton text={"Activo"}/> : <InactiveButton text={"Inactivo"}/>;
    
    return (
      <TableCell className={estadoTexto}>
        {estadoTexto}
      </TableCell>
    );
  };

  return (
    <div className={styles.miembros_container} data-theme={darkMode ? "dark" : "light"}>
      <div className={styles.miembros_header} data-theme={darkMode ? "dark" : "light"}>
        <h2 className={styles.miembros_title} data-theme={darkMode ? "dark" : "light"}>Miembros</h2>

        <div className={styles.search_container} data-theme={darkMode ? "dark" : "light"}>
          <FaSearch className={styles.search_icon} data-theme={darkMode ? "dark" : "light"} />
          <input
            type="text"
            placeholder="Buscar miembros"
            className={styles.search_input}
            data-theme={darkMode ? "dark" : "light"}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <button className={styles.filter_boton} data-theme={darkMode ? "dark" : "light"} onClick={handleOpenMenu}>
          <FaFilter className={styles.filter_icon} /> Filtrar
        </button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => handleCloseMenu()}
        >
          <MenuItem onClick={() => handleCloseMenu("Activo")}>Activo</MenuItem>
          <MenuItem onClick={() => handleCloseMenu("Inactivo")}>Inactivo</MenuItem>
          <MenuItem onClick={() => handleCloseMenu("Todos")}>Todos</MenuItem>
        </Menu>

        <button
          className={styles.add_boton}
          onClick={() => {
            setMiembroEditado(null);
            setIsModalOpen(true);
          }}
        >
          <FaPlus className={styles.add_icon} /> Agregar Nuevo Miembro
        </button>
      </div>

      <h2 className={styles.filtered_title} data-theme={darkMode ? "dark" : "light"}>
        {titleToShow}
      </h2>

      <TableContainer className={styles.miembros_table} style={{ 
        backgroundColor: darkMode ? '#1e1e1e' : '#F9F9F9', 
        border: `4px solid ${darkMode ? '#1e1e1e' : '#F9F9F9'}`, 
        borderRadius: '30px' 
      }}>
        <Table sx={{ 
          borderCollapse: 'separate',
          borderSpacing: '0 5px',
          '& td, & th': { 
            border: 'none',
            color: darkMode ? '#ffffff' : '#333333'
          },
          '& tbody tr': {
            backgroundColor: darkMode ? '#2d2d2d' : 'white',
            transition: 'background-color 0.3s ease'
          },
          '& tbody tr:hover': {
            backgroundColor: darkMode ? '#3d3d3d' : '#f3f3f3',
            transition: 'background-color 0.3s ease'
          },
          '& tbody tr td': {
            padding: '10px 16px',
          },
          '& tbody tr td:first-of-type': {
            borderRadius: '35px 0 0 35px',
          },
          '& tbody tr td:last-child': {
            borderRadius: '0 35px 35px 0',
          },
          '& tbody': {
            backgroundColor: darkMode ? '#1e1e1e' : '#F9F9F9',
          },
          '& thead': {
            backgroundColor: darkMode ? '#2d2d2d' : '#f8f9fa',
          },
          '& th': {
            backgroundColor: darkMode ? '#2d2d2d' : '#f8f9fa',
            color: darkMode ? '#ffffff' : '#333333',
            fontWeight: 'bold'
          }
        }}>
          <TableHead>
            <TableRow>
              <TableCell>Documento</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Estado Membresía</TableCell>
              <TableCell>Nombre Membresía</TableCell>
              <TableCell>Inicio Membresía</TableCell>
              <TableCell>Fin Membresía</TableCell>
              <TableCell>Días Restantes</TableCell>
              <TableCell>Opciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMiembros.length > 0 ? (
              filteredMiembros.map((miembro) => {
                const memberData = membershipData[miembro.id] || {};
                return (
                  <TableRow key={miembro.identificationNumber} data-theme={darkMode ? "dark" : "light"}>
                    <TableCell data-theme={darkMode ? "dark" : "light"}>{miembro.identificationNumber}</TableCell>
                    <TableCell data-theme={darkMode ? "dark" : "light"}>{miembro.fullName}</TableCell>
                    <TableCell data-theme={darkMode ? "dark" : "light"}>{miembro.phone}</TableCell>
                    {renderEstadoCell(miembro)}
                    <TableCell data-theme={darkMode ? "dark" : "light"}>{memberData.nameMembership || '-'}</TableCell>
                    <TableCell data-theme={darkMode ? "dark" : "light"}>{formatearFecha(memberData.dateStart)}</TableCell>
                    <TableCell data-theme={darkMode ? "dark" : "light"}>{formatearFecha(memberData.dateFinished)}</TableCell>
                    <TableCell data-theme={darkMode ? "dark" : "light"}>{calcularDiasRestantes(memberData.dateFinished)}</TableCell>
                    <TableCell>
                      <FaPen className={styles.edit_icon} data-theme={darkMode ? "dark" : "light"} onClick={() => { setMiembroEditado(miembro); setIsModalOpen(true); }} />
                      <DeleteIcon className={styles.delete_icon} data-theme={darkMode ? "dark" : "light"} onClick={() => onDeleteMiembro(miembro.id, miembro.fullName)} />
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={9} style={{ textAlign: 'center' }} data-theme={darkMode ? "dark" : "light"}>
                  No se encontraron miembros con los criterios de búsqueda.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {isModalOpen && (
        <MiembrosModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAgregarOEditarMiembro}
          onEdit={handleAgregarOEditarMiembro}
          miembroSeleccionado={miembroEditado}
          miembros={miembros}
        />
      )}
      {isDeleteModalOpen && (
        <ConfirmatioModalMiembros
          onClose={() => {
            setIsDeleteModalOpen(false);
            setMiembroToDeleteName("");
          }}
          onConfirm={() => {
            MiembrosService.deleteMiembro(miembrosToDelete)
              .then(() => {
                setMiembros((prevMiembros) =>
                  prevMiembros.filter((m) => m.id !== miembrosToDelete)
                );
                setIsDeleteModalOpen(false);
                setMiembrosToDelete(null);
                setMiembroToDeleteName("");
              })
              .catch((error) => {
                console.error("Error al eliminar miembro:", error);
                setError("Error al eliminar el miembro. Por favor, intenta de nuevo.");
              });
          }}
          memberName={miembroToDeleteName}
        />
      )}
    </div>
  );
};

export default MiembrosModalComponent;
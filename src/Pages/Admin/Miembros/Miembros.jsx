import { FaSearch, FaFilter, FaPen, FaPlus } from "react-icons/fa";
import { Menu, MenuItem } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState, useMemo, useCallback } from "react";
import styles from "./Miembros.module.css";
import MiembrosModal from "../../../Components/Modals/ModalMiembros/MiembrosModal.jsx";
import ConfirmatioModalMiembros from "../../../Components/Modals/ModalMiembros/ConfirmationModalMiembros/MiembrosConfirmation.jsx";
import ActiveButton from "../../../Components/Buttons/ButtonActive.jsx"
import InactiveButton from "../../../Components/Buttons/ButtonInactive.jsx"
import MiembrosService from "../../../Service/MiembrosService.jsx";
import { useEffect } from "react";

const MiembrosModalComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("Todos");
  const [miembros, setMiembros] = useState([]);
  const [miembroEditado, setMiembroEditado] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [miembrosToDelete, setMiembrosToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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

  const onDeleteMiembro = (id) => {
    setMiembrosToDelete(id);
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
    <div className={styles.miembros_container}>
      <div className={styles.miembros_header}>
        <h2 className={styles.miembros_title}>Miembros</h2>

        <div className={styles.search_container}>
          <FaSearch className={styles.search_icon} />
          <input
            type="text"
            placeholder="Buscar miembros"
            className={styles.search_input}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <button className={styles.filter_boton} onClick={handleOpenMenu}>
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

      <h2 className={styles.filtered_title}>
        {titleToShow}
      </h2>

      <TableContainer className={styles.miembros_table} >
        <Table sx={{ 
          borderCollapse: 'separate',
          borderSpacing: '0 5px',
          '& td, & th': {
            border: 'none',
            color: 'var(--text-color)',
          },
          '& thead': {
            backgroundColor: 'var(--input-bg)',
          },
          '& tbody tr': {
            backgroundColor: 'var(--card-bg)',
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
            backgroundColor: 'var(--bg-color)',
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
                  <TableRow key={miembro.identificationNumber}>
                    <TableCell>{miembro.identificationNumber}</TableCell>
                    <TableCell>{miembro.fullName}</TableCell>
                    <TableCell>{miembro.phone}</TableCell>
                    {renderEstadoCell(miembro)}
                    <TableCell>{memberData.nameMembership || '-'}</TableCell>
                    <TableCell>{formatearFecha(memberData.dateStart)}</TableCell>
                    <TableCell>{formatearFecha(memberData.dateFinished)}</TableCell>
                    <TableCell>{calcularDiasRestantes(memberData.dateFinished)}</TableCell>
                    <TableCell>
                      <FaPen className={styles.edit_icon} onClick={() => { setMiembroEditado(miembro); setIsModalOpen(true); }} />
                      <DeleteIcon className={styles.delete_icon} onClick={() => onDeleteMiembro(miembro.id)} />
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={9} style={{ textAlign: 'center' }}>
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
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => {
            MiembrosService.deleteMiembro(miembrosToDelete)
              .then(() => {
                setMiembros((prevMiembros) =>
                  prevMiembros.filter((m) => m.id !== miembrosToDelete)
                );
                setIsDeleteModalOpen(false);
                setMiembrosToDelete(null);
              })
              .catch((error) => {
                console.error("Error al eliminar miembro:", error);
                setError("Error al eliminar el miembro. Por favor, intenta de nuevo.");
              });
          }}
        />
      )}
    </div>
  );
};

export default MiembrosModalComponent;
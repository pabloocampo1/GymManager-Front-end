import { FaSearch, FaFilter, FaPen, FaPlus } from "react-icons/fa";
import { Menu, MenuItem } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState, useMemo } from "react";
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

  useEffect(() => {
    const fetchMiembros = async () => {
      try {
        const data = await MiembrosService.getAllMiembros();
        setMiembros(data);
      } catch (error) {
        console.error("No se pudieron cargar los miembros:", error);
      }
    };
  
    fetchMiembros();
  }, []);
  
  const handleMiembroAdd = (data) => {
    if (data.tipo === "agregar") {
      setMiembros([...miembros, data.miembro]);
    } else if (data.tipo === "editar") {
      const updatedMembers = miembros.map((miembro) =>
        miembro.identificacion === data.miembro.identificacion ? data.miembro : miembro
      );
      setMiembros(updatedMembers);
    }
  };
  

  // Función para agregar un nuevo miembro
  const handleAgregarOEditarMiembro = async (datos) => {
    try {
      if (datos.tipo === 'agregar') {
        const nuevoMiembro = await MiembrosService.createMiembro(datos.miembro);
        console.log(nuevoMiembro); // Verifica lo que se recibe del backend
        setMiembros([...miembros, nuevoMiembro]);
      } else if (datos.tipo === 'editar') {
        const miembroActualizado = await MiembrosService.updateMiembro(
          datos.miembro.identificacion,
          datos.miembro
        );
        const miembrosActualizados = miembros.map(m =>
          m.identificacion === miembroActualizado.identificacion ? miembroActualizado : m
        );
        setMiembros(miembrosActualizados);
      }
    } catch (error) {
      console.error("Error al agregar/editar miembro:", error);
    }
  };
  

  const onDeleteMiembro = (id) => {
    // Guarda el ID de la membresía a eliminar
    setMiembrosToDelete(id);
    // Abre el modal de confirmación
    setIsDeleteModalOpen(true);
  };

  // Manejo de menú de filtros
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (option) => {
    if (option) {
      setSelectedFilter(option);
    }
    setAnchorEl(null);
  };


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Función para determinar si una membresía está activa
  const isMembresiaActiva = (miembro) => {
    // Verificamos si el miembro tiene el estado explícitamente como "Activo"
    if (miembro.estado === "Activo") return true;
    
    // Si no tiene estado explícito, verificamos fechas
    if (miembro.fechaInscripcion) {
      const fechaFin = new Date(miembro.fechaInscripcion);
      const hoy = new Date();
      return fechaFin >= hoy;
    }
    
    return false; // Si no hay fecha de fin, consideramos inactivo por defecto
  };


  const filteredMiembros = useMemo(() => {
    let result = miembros;

    // Si hay un término de búsqueda, aplicar solo la búsqueda
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      result = miembros.filter((miembro) => 
        miembro.identificacion.toLowerCase().includes(searchTermLower) ||
        miembro.nombre.toLowerCase().includes(searchTermLower) ||
        miembro.telefono.toLowerCase().includes(searchTermLower)
      );
    } 
    // Si no hay búsqueda, aplicar solo el filtro
    else if (selectedFilter !== "Todos") {
      result = result.filter((miembro) => 
        (selectedFilter === "Activo" && isMembresiaActiva(miembro)) || 
        (selectedFilter === "Inactivo" && !isMembresiaActiva(miembro))
      );
    }

    return result;
  }, [miembros, selectedFilter, searchTerm]);

  // Determinar qué criterio mostrar (búsqueda tiene prioridad)
  const titleToShow = searchTerm 
    ? `Búsqueda: ${searchTerm}` 
    : `Filtrado por: ${selectedFilter}`;
    
  // Función para renderizar la celda de estado con el estilo adecuado
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
      {/* Header */}
      <div className={styles.miembros_header}>
        <h2 className={styles.miembros_title}>Miembros</h2>

        {/* Barra de búsqueda */}
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

        {/* Botón de filtro */}
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

        {/* Botón para agregar nuevo miembro */}
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

      {/* Muestra solo un criterio a la vez (búsqueda tiene prioridad) */}
      <h2 className={styles.filtered_title}>
        {titleToShow}
      </h2>

      {/* Tabla de miembros */}
      <TableContainer className={styles.miembros_table} style={{ backgroundColor: '#F9F9F9', border:'4px solid #F9F9F9', borderRadius :'30px' }}>
        <Table sx={{ 
          borderCollapse: 'separate',
          borderSpacing: '0 5px',
          '& td, & th': { 
            border: 'none' 
          },
          '& tbody tr': {
            backgroundColor: 'white',
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
            backgroundColor: '#F9F9F9',
          }
        }}>
          <TableHead>
            <TableRow>
              <TableCell>Documento</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Estado Membresía</TableCell>
              <TableCell>Tipo de Membresía</TableCell>
              <TableCell>Inicio Membresía</TableCell>
              <TableCell>Fin Membresía</TableCell>
              <TableCell>Opciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMiembros.length > 0 ? (
              filteredMiembros.map((miembro) => (
                <TableRow key={miembro.identificacion || `temp-${Date.now()}`}>
                  <TableCell>{miembro.identificacion}</TableCell>
                  <TableCell>{miembro.nombre}</TableCell>
                  <TableCell>{miembro.telefono}</TableCell>
                  {renderEstadoCell(miembro)}
                  <TableCell>{miembro.membresia}</TableCell>
                  <TableCell>{miembro.fechaInscripcion}</TableCell>
                  <TableCell>{miembro.finMembresia}</TableCell>
                  <TableCell>
                    <FaPen className={styles.edit_icon} onClick={() => { setMiembroEditado(miembro); setIsModalOpen(true); }} />
                    <DeleteIcon className={styles.delete_icon} onClick={() => onDeleteMiembro(miembro.identificacion)} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} style={{ textAlign: 'center' }}>
                  No se encontraron miembros con los criterios de búsqueda.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal de agregar miembros */}
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
                  prevMiembros.filter((m) => m.identificacion !== miembrosToDelete)
                );
                setIsDeleteModalOpen(false);
                setMiembrosToDelete(null);
              })
              .catch((error) => {
                console.error("Error al eliminar miembro:", error);
              });
          }}
          
        />
      )}
    </div>
  );
};

export default MiembrosModalComponent;
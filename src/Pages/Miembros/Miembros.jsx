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
import MiembrosModal from "../../Components/Modals/ModalMiembros/MiembrosModal.jsx";

const MiembrosModalComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("Todos");
  const [miembros, setMiembros] = useState([]);
  const [miembroEditado, setMiembroEditado] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term

  // Función para agregar un nuevo miembro
  const handleAgregarOEditarMiembro = (datos) => {
    if (datos.tipo === 'agregar') {
      // Lógica para agregar un nuevo miembro
      setMiembros([...miembros, datos.miembro]);
    } else if (datos.tipo === 'editar') {
      // Lógica para editar un miembro existente
      const miembrosActualizados = miembros.map(m => 
        m.identificacion === datos.miembro.identificacion ? datos.miembro : m
      );
      setMiembros(miembrosActualizados);
    }
  };

  const onDeleteMiembro = (identificacion) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este miembro?"
    );
    if (confirmDelete) {
      setMiembros((prevMiembros) =>
        prevMiembros.filter((m) => m.identificacion !== identificacion)
      );
    }
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

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Memoized filtering of members
  const filteredMiembros = useMemo(() => {
    let result = miembros;

    // Filter by status
    if (selectedFilter !== "Todos") {
      result = result.filter((miembro) => miembro.estado === selectedFilter);
    }

    // Filter by search term
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      result = result.filter((miembro) => 
        miembro.identificacion.toLowerCase().includes(searchTermLower) ||
        miembro.nombre.toLowerCase().includes(searchTermLower) ||
        miembro.telefono.toLowerCase().includes(searchTermLower)
      );
    }

    return result;
  }, [miembros, selectedFilter, searchTerm]);

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
          <MenuItem onClick={() => handleCloseMenu("Inactivo")}>
            Inactivo
          </MenuItem>
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

      {/* Estado del filtro y búsqueda */}
      <h2 className={styles.filtered_title}>
        Filtrado por estado: {selectedFilter} 
      </h2>

      {/* Tabla de miembros */}
      <TableContainer className={styles.miembros_table}>
        <Table>
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
            {filteredMiembros.map((miembro) => (
              <TableRow key={miembro.identificacion || `temp-${Date.now()}`}>
                <TableCell>{miembro.identificacion}</TableCell>
                <TableCell>{miembro.nombre}</TableCell>
                <TableCell>{miembro.telefono}</TableCell>
                <TableCell
                  className={
                    miembro.estado === "Activo"
                      ? styles.estado_activo
                      : styles.estado_inactivo
                  }
                >
                  {miembro.estado}
                </TableCell>
                <TableCell>{miembro.membresia}</TableCell>
                <TableCell>{miembro.fechaInscripcion}</TableCell>
                <TableCell>{miembro.finMembresia}</TableCell>
                <TableCell>
                  <FaPen
                    className={styles.edit_icon}
                    onClick={() => {
                      setMiembroEditado(miembro);
                      setIsModalOpen(true);
                    }}
                  />

                  <DeleteIcon
                    className={styles.delete_icon}
                    onClick={() => onDeleteMiembro(miembro.identificacion)}
                  />
                </TableCell>
              </TableRow>
            ))}
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
    </div>
  );
};

export default MiembrosModalComponent;
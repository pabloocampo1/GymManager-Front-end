import { FaSearch, FaFilter, FaPen } from "react-icons/fa";
import { Menu, MenuItem } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import styles from "./Miembros.module.css";
import MiembrosModal from "../../Components/Modals/ModalMiembros/MiembrosModal.jsx";

const MiembrosModalComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("Todos");

  const miembros = [
    {
      id: 1,
      name: "Mateo Arias Carbon",
      telefono: "3232323763",
      estado: "Activo",
      tipo: "Mensual",
      inicio: "12 - 05 - 2024",
      fin: "12 - 06 - 2024",
    },
    {
      id: 2,
      name: "Mateo Arias Carbon",
      telefono: "3232323763",
      estado: "Activo",
      tipo: "Mensual",
      inicio: "12 - 05 - 2024",
      fin: "12 - 06 - 2024",
    },
    {
      id: 3,
      name: "Mateo Arias Carbon",
      telefono: "3232323763",
      estado: "Activo",
      tipo: "Mensual",
      inicio: "12 - 05 - 2024",
      fin: "12 - 06 - 2024",
    },
  ];

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (option) => {
    if (option) {
      setSelectedFilter(option);
    }
    setAnchorEl(null);
  };

  const filteredMiembros =
    selectedFilter === "Todos"
      ? miembros
      : miembros.filter((miembro) => miembro.estado === selectedFilter);

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
          <MenuItem onClick={() => handleCloseMenu("Inactivo")}>
            Inactivo
          </MenuItem>
          <MenuItem onClick={() => handleCloseMenu("Todos")}>Todos</MenuItem>
        </Menu>

        <button
          className={styles.add_boton}
          onClick={() => setIsModalOpen(true)}
        >
          <FaSearch className={styles.add_icon} /> Agregar Nuevo Miembro
        </button>
      </div>

      <h2 className={styles.filtered_title}>
        Filtrado por estado: {selectedFilter}
      </h2>
      <TableContainer className={styles.miembros_table} />
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
            <TableRow key={miembro.id} className={styles.miembros_row}>
              <TableCell>{miembro.id}</TableCell>
              <TableCell>{miembro.name}</TableCell>
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
              <TableCell>{miembro.tipo}</TableCell>
              <TableCell>{miembro.inicio}</TableCell>
              <TableCell>{miembro.fin}</TableCell>
              <TableCell>
                <FaPen
                  className={styles.edit_icon}
                  onClick={() => setIsModalOpen(true)}
                />
                <DeleteIcon className={styles.delete_icon} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {isModalOpen && (
        <MiembrosModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default MiembrosModalComponent;

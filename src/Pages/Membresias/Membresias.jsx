import { FaSearch, FaFilter, FaPen, FaPlus } from "react-icons/fa";
import { Menu, MenuItem, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import styles from "./Membresias.module.css";
import MembresiasModal from "../../Components/Modals/ModalMembresias/MembresiasModal.jsx";
import ConfirmatioModalMembresia from "../../Components/Modals/ModalMembresias/ConfirmationModalMembresias/MembresiasConfirmation.jsx";

const MembresiaModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("Todos");
  const [membresias, setMembresias] = useState([]);
  const [membresiaEditando, setMembresiaEditando] = useState(null); // 📌 Estado para la membresía a editar
  const [membresiaToDelete, setMembresiaToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = (option) => {
    if (option) setSelectedFilter(option);
    setAnchorEl(null);
  };

  const filteredMembresias =
    selectedFilter === "Todos"
      ? membresias
      : membresias.filter((m) => m.type === selectedFilter);

  const handleAddMembresia = (newMembresia) => {
    if (membresiaEditando) {
      // 📌 Editar membresía existente
      setMembresias((prevMembresias) =>
        prevMembresias.map((m) =>
          m.id === membresiaEditando.id ? newMembresia : m
        )
      );
      setMembresiaEditando(null);
    } else {
      // 📌 Agregar nueva membresía
      setMembresias([
        ...membresias,
        { id: membresias.length + 1, ...newMembresia },
      ]);
    }

    setIsModalOpen(false);
  };

  const handleEditMembresia = (membresia) => {
    setMembresiaEditando(membresia);
    setIsModalOpen(true);
  };

  const handleDeleteMembresia = (id) => {
    // Guarda el ID de la membresía a eliminar
    setMembresiaToDelete(id);
    // Abre el modal de confirmación
    setIsDeleteModalOpen(true);
  };

  return (
    <div className={styles.membresia_container}>
      <div className={styles.membresias_header}>
        <h2 className={styles.membresias_title}>Membresías</h2>

        <div className={styles.search_container}>
          <FaSearch className={styles.search_icon} />
          <input
            type="text"
            placeholder="Buscar membresías"
            className={styles.search_input}
          />
        </div>

        <Button className={styles.filter_boton} onClick={handleOpenMenu}>
          <FaFilter className={styles.filter_icon} /> Filtrar
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => handleCloseMenu()}
        >
          <MenuItem onClick={() => handleCloseMenu("Oro")}>Oro</MenuItem>
          <MenuItem onClick={() => handleCloseMenu("Plata")}>Plata</MenuItem>
          <MenuItem onClick={() => handleCloseMenu("Bronce")}>Bronce</MenuItem>
          <MenuItem onClick={() => handleCloseMenu("Todos")}>Todos</MenuItem>
        </Menu>

        <Button
          className={styles.add_boton}
          onClick={() => {
            setMembresiaEditando(null);
            setIsModalOpen(true);
          }}
        >
          <FaPlus className={styles.add_icon} /> Agregar Nueva Membresía
        </Button>
      </div>

      <h2 className={styles.filtered_title}>Filtrado por: {selectedFilter}</h2>

      <TableContainer className={styles.membresia_table}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Duración</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Opciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMembresias.map((membresia) => (
              <TableRow key={membresia.id} className={styles.membresia_row}>
                <TableCell>{membresia.name}</TableCell>
                <TableCell>{membresia.duracion}</TableCell>
                <TableCell>{membresia.precio}</TableCell>
                <TableCell>{membresia.type}</TableCell>
                <TableCell>
                  <FaPen
                    className={styles.edit_icon}
                    onClick={() => handleEditMembresia(membresia)}
                  />
                  <DeleteIcon
                    className={styles.delete_icon}
                    onClick={() => handleDeleteMembresia(membresia.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 📌 Modal para agregar/editar membresías */}
      {isModalOpen && (
        <MembresiasModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddMembresia}
          membresiaEditando={membresiaEditando} // 📌 Pasamos los datos de edición al modal
        />
      )}
      {isDeleteModalOpen && (
        <ConfirmatioModalMembresia
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => {
            // Elimina la membresía cuando se confirma
            setMembresias((prevMembresias) =>
              prevMembresias.filter((m) => m.id !== membresiaToDelete)
            );
            setIsDeleteModalOpen(false);
            setMembresiaToDelete(null); // Limpia el estado después de eliminar
          }}
        />
      )}
    </div>
  );
};

export default MembresiaModal;

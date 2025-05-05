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
import MembresiasModal from "../../../Components/Modals/ModalMembresias/MembresiasModal.jsx";
import ConfirmatioModalMembresia from "../../../Components/Modals/ModalMembresias/ConfirmationModalMembresias/MembresiasConfirmation.jsx";

const MembresiaModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("Todos");
  const [membresias, setMembresias] = useState([]);
  const [membresiaEditando, setMembresiaEditando] = useState(null);
  const [membresiaToDelete, setMembresiaToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilterType, setActiveFilterType] = useState("filter"); // "filter" o "search"

  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = (option) => {
    if (option) {
      setSelectedFilter(option);
      setActiveFilterType("filter");

      setSearchTerm("");
    }
    setAnchorEl(null);
  };


  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value) {
      setActiveFilterType("search");
    } else if (!value && activeFilterType === "search") {
      setActiveFilterType("filter");
    }
  };


  const filteredMembresias = membresias.filter((m) => {
    if (activeFilterType === "search" && searchTerm) {

      return m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.precio.toString().includes(searchTerm.toLowerCase()) ||
        m.duracion.toLowerCase().includes(searchTerm.toLowerCase());
    } else {

      return selectedFilter === "Todos" || m.type === selectedFilter;
    }
  });

  const handleAddMembresia = (newMembresia) => {
    if (membresiaEditando) {
      setMembresias((prevMembresias) =>
        prevMembresias.map((m) =>
          m.id === membresiaEditando.id ? newMembresia : m
        )
      );
      setMembresiaEditando(null);
    } else {
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
    setMembresiaToDelete(id);
    setIsDeleteModalOpen(true);
  };


  const getFilterTitle = () => {
    if (activeFilterType === "search" && searchTerm) {
      return `Búsqueda: ${searchTerm}`;
    } else {
      return `Filtrado por: ${selectedFilter}`;
    }
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
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <Button 
          className={styles.filter_boton} 
          onClick={handleOpenMenu}
          disabled={activeFilterType === "search" && searchTerm}
        >
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

      <h2 className={styles.filtered_title}>
        {getFilterTitle()}
      </h2>

      <TableContainer className={styles.membresia_table} style={{ backgroundColor: '#F9F9F9', border:'4px solid #F9F9F9', borderRadius:'30px' }}>
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
              <TableCell>Nombre</TableCell>
              <TableCell>Duración</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Opciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMembresias.length > 0 ? (
              filteredMembresias.map((membresia) => (
                <TableRow key={membresia.id}>
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} style={{ textAlign: 'center' }}>
                  No se encontraron membresías con los criterios de búsqueda.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {isModalOpen && (
        <MembresiasModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddMembresia}
          membresiaEditando={membresiaEditando}
        />
      )}
      {isDeleteModalOpen && (
        <ConfirmatioModalMembresia
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => {
            setMembresias((prevMembresias) =>
              prevMembresias.filter((m) => m.id !== membresiaToDelete)
            );
            setIsDeleteModalOpen(false);
            setMembresiaToDelete(null);
          }}
        />
      )}
    </div>
  );
};

export default MembresiaModal;
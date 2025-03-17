import { FaSearch, FaFilter, FaPen } from "react-icons/fa";
import { Menu, MenuItem } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useState } from "react";
import styles from "./Membresias.module.css";
import MembresiasModal from "../../Components/Modals/ModalMembresias/MembresiasModal.jsx";

const MembresiaModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("Todos");

  const membresias = [
    { id: 1, name: "Membresía Oro", duracion: "30 Días", precio: "$70,000", type: "Oro" },
    { id: 2, name: "Membresía Plata", duracion: "30 Días", precio: "$50,000", type: "Plata" },
    { id: 3, name: "Membresía Bronce", duracion: "15 Días", precio: "$30,000", type: "Bronce" },
    { id: 4, name: "Membresía Oro Plus", duracion: "45 Días", precio: "$90,000", type: "Oro" },
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

  const filteredMembresias =
    selectedFilter === "Todos"
      ? membresias
      : membresias.filter((membresia) => membresia.type === selectedFilter);

  return (
    <div className={styles.membresia_container}>
      <div className={styles.membresias_header}>
        <h2 className={styles.membresias_title}>Membresías</h2>
        <div className={styles.search_container}>
          <FaSearch className={styles.search_icon} />
          <input type="text" placeholder="Buscar membresías" className={styles.search_input} />
        </div>
        
        <button className={styles.filter_boton} onClick={handleOpenMenu}>
          <FaFilter className={styles.filter_icon} /> Filtrar
        </button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleCloseMenu()}>
          <MenuItem onClick={() => handleCloseMenu("Oro")}>Oro</MenuItem>
          <MenuItem onClick={() => handleCloseMenu("Plata")} >Plata</MenuItem>
          <MenuItem onClick={() => handleCloseMenu("Bronce")} >Bronce</MenuItem>
          <MenuItem onClick={() => handleCloseMenu("Todos")} >Todos</MenuItem>
        </Menu>
        
        <button className={styles.add_boton} onClick={() => setIsModalOpen(true)}>
          <FaSearch className={styles.add_icon} /> Agregar Nueva Membresía
        </button>
      </div>
      
      <h2 className={styles.filtered_title}>Filtrado por la membresia: {selectedFilter}</h2>
      <TableContainer className={styles.membresia_table}/>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
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
                <TableCell>{membresia.id}</TableCell>
                <TableCell>{membresia.name}</TableCell>
                <TableCell>{membresia.duracion}</TableCell>
                <TableCell>{membresia.precio}</TableCell>
                <TableCell>{membresia.type}</TableCell>
                <TableCell>
                  <FaPen
                    className={styles.edit_icon}
                    onClick={() => setIsModalOpen(true)}
                  />
                  <FaSearch className={styles.delete_icon} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
      </Table>
      
      {isModalOpen && (
        <MembresiasModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default MembresiaModal;

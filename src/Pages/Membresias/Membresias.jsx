import { FaSearch, FaFilter, FaPlus } from "react-icons/fa";
import { Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import styles from "./Membresias.module.css";
import MembresiasModal from "../../Components/Modals/ModalMembresias/MembresiasModal.jsx";

const MembresiaModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (option) => {
    if (option) console.log("Evento seleccionado:", option);
    setAnchorEl(null);
  };

  return (
    <div className={styles["membresia_container"]}>
      <div className={styles["membresias-header"]}>
        <h1 className={styles["membresias-title"]}>Membresias</h1>
        <div className={styles["search-container"]}>
          <FaSearch className={styles["search-icon"]} />
          <input
            type="text"
            placeholder="Buscar membresias"
            className={styles["search-input"]}
          />
        </div>
        <button className={styles["filter-boton"]} onClick={handleOpenMenu}>
          <FaFilter className={styles["filter-icon"]} />
          Filter
        </button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => handleCloseMenu()}
        >
          <MenuItem onClick={() => handleCloseMenu("Oro")}>
            Oro
          </MenuItem>
          <MenuItem onClick={() => handleCloseMenu("Plata")}>
            Plata
          </MenuItem>
          <MenuItem onClick={() => handleCloseMenu("Bronce")}>
            Bronce
          </MenuItem>
        </Menu>
        <button
          className={styles["add-boton"]}
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus className={styles["add-icon"]} />
          Agregar Nueva Membresia
        </button>
        {isModalOpen ? (
          <MembresiasModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        ) : null}
      </div>
    </div>
  );
};

export default MembresiaModal;

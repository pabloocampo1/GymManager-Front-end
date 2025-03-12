import { FaSearch, FaFilter, FaPlus } from "react-icons/fa";
import React, { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import styles from "./Inventory.module.css";
import InventoryModal from "../../Components/Modals/ModalInventory/InventoryModal";

const Inventory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (option) => {
    if (option) console.log("Opción seleccionada:", option);
    setAnchorEl(null);
  };

  return (
    <div className={styles.inventory_container}>
      <div className={styles.inventory_header}>
        <h2 className={styles.inventory_title}>Inventario</h2>

        <div className={styles.search_container}>
          <FaSearch className={styles.search_icon} />
          <input type="text" placeholder="Buscar maquinarias" className={styles.search_input} />
        </div>

        <button className={styles.filter_btn} onClick={handleOpenMenu}>
          <FaFilter className={styles.filter_icon} />
          Filter
        </button>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleCloseMenu()}>
          <MenuItem onClick={() => handleCloseMenu("Inferior")}>
            Inferior
          </MenuItem>
          <MenuItem onClick={() => handleCloseMenu("Superior")}>
            Superior
          </MenuItem>
          <MenuItem onClick={() => handleCloseMenu("Cardio")}>
            Cardio
          </MenuItem>
          <MenuItem onClick={() => handleCloseMenu("Complemento")}>
            Complemento
          </MenuItem>
        </Menu>

        <button className={styles.add_btn} onClick={() => setIsModalOpen(true)}>
          <FaPlus className={styles.add_icon} />
          Agregar Nuevo Objeto
        </button>

        <InventoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  );
};

export default Inventory;
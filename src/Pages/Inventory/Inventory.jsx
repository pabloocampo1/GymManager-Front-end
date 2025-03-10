import { FaSearch, FaFilter, FaPlus } from "react-icons/fa";
import React, { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import "./Inventory.css";
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
    <div className="inventory-header">
      <h2 className="inventory-title">Inventario</h2>

      <div className="search-container">
        <FaSearch className="search-icon" />
        <input type="text" placeholder="Buscar maquinarias" className="search-input" />
      </div>

      {/* Botón de filtro que abre el menú */}
      <button className="filter-btn" onClick={handleOpenMenu}>
        <FaFilter className="filter-icon" />
        Filter
      </button>

      {/* Menú desplegable */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleCloseMenu()}>
        <MenuItem onClick={() => handleCloseMenu("Inferior")}>Inferior</MenuItem>
        <MenuItem onClick={() => handleCloseMenu("Superior")}>Superior</MenuItem>
        <MenuItem onClick={() => handleCloseMenu("Cardio")}>Cardio</MenuItem>
        <MenuItem onClick={() => handleCloseMenu("Complemento")}>Complemento</MenuItem>
      </Menu>

      <button className="add-btn" onClick={() => setIsModalOpen(true)}>
        <FaPlus className="add-icon" />
        Agregar Nuevo Objeto
      </button>

      <InventoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Inventory;

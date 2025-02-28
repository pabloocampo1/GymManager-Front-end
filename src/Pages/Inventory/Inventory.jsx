import { FaSearch, FaFilter, FaPlus } from "react-icons/fa";
import React, { useState } from "react";
import "./Inventory.css";
import InventoryModal from "../../Components/Modals/ModalInventory/InventoryModal";

const Inventory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="inventory-header">
      <h2 className="inventory-title">Inventario</h2>
      <div className="search-container">
        <FaSearch className="search-icon" />
        <input type="text" placeholder="Buscar maquinarias" className="search-input" />
      </div>
      <button className="filter-btn">
        <FaFilter className="filter-icon" />
        Filter
      </button>
      <button className="add-btn" onClick={() => setIsModalOpen(true)}>
        <FaPlus className="add-icon" />
        Agregar Nuevo Objeto
      </button>
      <InventoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Inventory;
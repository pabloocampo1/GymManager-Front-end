import { FaSearch, FaPlus } from "react-icons/fa";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import styles from "./Inventory.module.css";
import InventoryModal from "../../Components/Modals/ModalsInventory/ModalInventory/InventoryModal";
import TargetInventory from "../../Components/Targets/TargetInventory/TargetInventory";
import FilterMaxInventory from "../../Components/Modals/ModalsInventory/FilterMaxInventory/FilterMaxInventory";
import SyncIcon from '@mui/icons-material/Sync';

const Inventory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);//const para el modal de filtermax
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingItem, setEditingItem] = useState(null);

  const handleToggleFilterModal = () => setIsFilterModalOpen((prev) => !prev);
  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const handleAddItem = (newItem) => {
    // Si es un item existente (edición)
    if (newItem.id) {
      const updatedItems = items.map(item => 
        item.id === newItem.id ? newItem : item
      );
      setItems(updatedItems);
    } else {
      // Si es un nuevo item
      const uniqueId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      setItems([...items, { 
        ...newItem, 
        id: uniqueId,
        estado: newItem.estado || "Aceptable" 
      }]);
    }
    
    // Resetear estados
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleRemoveItem = (item) => {
    const updatedItems = items.filter(i => i.id !== item.id);
    setItems(updatedItems);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleUpdateItemsFromFilterMax = (updatedItems) => {
    
    setItems(updatedItems);
    setIsFilterModalOpen(false);
  };

  const handleFilterSelect = (category) => {
    setSelectedCategory(category);
    handleCloseMenu();
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredItems = items.filter(item => 
    (selectedCategory === "Todos" || item.categoria === selectedCategory) &&
    (item.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleModalOverlayClick = (e) => {
    if (e.target.classList.contains(styles.modalOverlay)) {
      setIsModalOpen(false);
      setEditingItem(null);
    }
  };

  return (
    <div className={styles.inventory_container}>
      <div className={styles.inventory_header}>
        <h2 className={styles.inventory_title}>Inventario</h2>
        
        <div className={styles.search_container}>
          <FaSearch className={styles.search_icon} />
          <input 
            type="text" 
            placeholder="Buscar maquinarias" 
            className={styles.search_input} 
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        
        <button className={styles.filter_btn} onClick={handleOpenMenu}>
          <FilterAltIcon className={styles.filter_icon} /> Filtrar
        </button>
        
        < SyncIcon
          className={styles.FilterMax} 
          onClick={handleToggleFilterModal}
        >
          FilterMax
        </SyncIcon>
        
        <Menu 
          anchorEl={anchorEl} 
          open={Boolean(anchorEl)} 
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={() => handleFilterSelect("Todos")}>Todos</MenuItem>
          <MenuItem onClick={() => handleFilterSelect("Inferior")}>Inferior</MenuItem>
          <MenuItem onClick={() => handleFilterSelect("Superior")}>Superior</MenuItem>
          <MenuItem onClick={() => handleFilterSelect("Cardio")}>Cardio</MenuItem>
          <MenuItem onClick={() => handleFilterSelect("Complemento")}>Complemento</MenuItem>
        </Menu>
        
        <button 
          className={styles.add_btn} 
          onClick={() => {
            setEditingItem(null);
            setIsModalOpen(true);
          }}
        >
          <FaPlus className={styles.add_icon} /> Agregar Nuevo Objeto
        </button>
      </div>
      
      <h2 className={styles.TitleFiltrado}>
        Filtrado por la categoría: {selectedCategory}
      </h2>
      
      <div className={styles.inventoryList}>
        {filteredItems.map((inventory) => (
          <TargetInventory 
            key={inventory.id} 
            inventory={inventory} 
            onDelete={() => handleRemoveItem(inventory)}
            onEdit={() => handleEditItem(inventory)}
          />
        ))}
      </div>
      
      {isModalOpen && (
        <div 
          className={styles.modalOverlay} 
          onClick={handleModalOverlayClick}
        >
          <InventoryModal 
            isOpen={isModalOpen} 
            onClose={() => {
              setIsModalOpen(false);
              setEditingItem(null);
            }} 
            onAddItem={handleAddItem} 
            initialItemData={editingItem}
          />
        </div>
      )}
      
      {isFilterModalOpen && (
        <div 
          className={styles.modalOverlay} 
          onClick={handleToggleFilterModal}
        >
          <FilterMaxInventory 
            items={items}
            onClose={handleToggleFilterModal}
            onUpdateItems={handleUpdateItemsFromFilterMax}
          />
        </div>
      )}
    </div>
  );
};

export default Inventory;
import { FaSearch, FaPlus } from "react-icons/fa";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Menu, MenuItem } from "@mui/material";
import React, { useState, useEffect } from "react";
import SyncIcon from '@mui/icons-material/Sync';
import styles from "./Inventory.module.css";
import InventoryModal from "../../../Components/Modals/ModalsInventory/ModalInventory/InventoryModal";
import TargetInventory from "../../../Components/Targets/TargetInventory/TargetInventory";
import FilterMaxInventory from "../../../Components/Modals/ModalsInventory/FilterMaxInventory/FilterMaxInventory";
import InventoryService from "../../../Service/InventoryService"; // Make sure to adjust the path as needed
import { useTheme } from 'next-themes';
const Inventory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  
  useEffect(() => {
    fetchInventoryItems();
  }, []);

  const fetchInventoryItems = async () => {
    setLoading(true);
    try {
      const data = await InventoryService.getAllItems();
      setItems(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching inventory items:", err);
      setError("Error al cargar el inventario. Por favor intente de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFilterModal = () => setIsFilterModalOpen((prev) => !prev);
  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const handleAddItem = async (newItem) => {
    setLoading(true);
    try {
      if (newItem.id) {
        
        const updatedItem = await InventoryService.updateItem(newItem.id, newItem);
        
       
        setItems(items.map(item => 
          item.id === updatedItem.id ? updatedItem : item
        ));
      } else {
        
        const addedItem = await InventoryService.createItem(newItem);
        
        
        setItems([...items, addedItem]);
      }
      
      setError(null);
    } catch (err) {
      console.error("Error saving inventory item:", err);
      setError("Error al guardar el objeto. Por favor intente de nuevo.");
    } finally {
      setLoading(false);
      setIsModalOpen(false);
      setEditingItem(null);
    }
  };

  const handleRemoveItem = async (itemId) => {
    setLoading(true);
    try {
      await InventoryService.deleteItem(itemId);
      
      
      setItems(items.filter(item => item.id !== itemId));
      setError(null);
    } catch (err) {
      console.error("Error deleting inventory item:", err);
      setError("Error al eliminar el objeto. Por favor intente de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleUpdateItemsFromFilterMax = async (updatedItems) => {
    setLoading(true);
    try {
      
      await InventoryService.bulkUpdateItems(updatedItems);
      
      
      await fetchInventoryItems();
      
      setError(null);
    } catch (err) {
      console.error("Error updating inventory items:", err);
      setError("Error al actualizar los objetos. Por favor intente de nuevo.");
    } finally {
      setLoading(false);
      setIsFilterModalOpen(false);
    }
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
        
        <span title="Actualizar lista">
          <SyncIcon
            className={styles.FilterMax} 
            onClick={handleToggleFilterModal}
          />
        </span>
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
     
      {error && <p className={styles.errorMessage}>{error}</p>}
      
      <div className={styles.inventoryList}>
        {filteredItems.map((inventory) => (
          <TargetInventory 
            key={inventory.id} 
            inventory={inventory} 
            onDelete={handleRemoveItem}
            onEdit={handleEditItem}
          />
        ))}
        
        {!loading && filteredItems.length === 0 && (
          <p className={styles.emptyMessage}>No hay objetos que mostrar en este modulo</p>
        )}
      </div>
      
      <InventoryModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }} 
        onAddItem={handleAddItem} 
        initialItemData={editingItem}
      />
      
      {isFilterModalOpen && (
        <FilterMaxInventory 
          items={items}
          onClose={handleToggleFilterModal}
          onUpdateItems={handleUpdateItemsFromFilterMax}
        />
      )}
    </div>
  );
};

export default Inventory;
import { FaSearch, FaFilter, FaPlus } from "react-icons/fa";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import styles from "./Inventory.module.css";
import InventoryModal from "../../Components/Modals/ModalInventory/InventoryModal";

const Inventory = () => {

//isModalOpen: para opene y cereicho el modal.
//anchorEl: almacena el botón al que está anclado el menú de filtros.
//items: lista de objetos en el inventario.
//selectedCategory: categoría seleccionada para filtrar (por defecto "Todos").

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos"); // este estado siempre esta establecido

  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  //handleOpenMenu(event): abre el menú para filtrar
  //handleCloseMenu(): cierra el menu pa filtrar

  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
    setIsModalOpen(false);
  };

  //Recibe newItem y lo agrega al estado items y luego Luego cierra el modal.  

  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };
  //Filtra los elementos y elimina mediante el index.

  const handleFilterSelect = (category) => {
    setSelectedCategory(category);
    handleCloseMenu();
  };

  //Cambia selectedCategory al valor seleccionado y Cierra el menú después de elegir una opción.

  // Si la categoría seleccionada es "Todos" muestra dos
  //Si se selecciona otra categoría, filtra los elementos  con esa categoría.
  const filteredItems =
    selectedCategory === "Todos"
      ? items
      : items.filter((item) => item.categoria === selectedCategory);

  return (
    <div className={styles.inventory_container}>
      
      <div className={styles.inventory_header}>
        <h2 className={styles.inventory_title}>Inventario</h2>

        <div className={styles.search_container}>
          <FaSearch className={styles.search_icon} />
          <input type="text" placeholder="Buscar maquinarias" className={styles.search_input} />
        </div>

        <button className={styles.filter_btn} onClick={handleOpenMenu}>
          <FaFilter className={styles.filter_icon} /> Filtrar ({selectedCategory})
        </button>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
          <MenuItem onClick={() => handleFilterSelect("Todos")}>Todos</MenuItem>
          <MenuItem onClick={() => handleFilterSelect("Inferior")}>Inferior</MenuItem>
          <MenuItem onClick={() => handleFilterSelect("Superior")}>Superior</MenuItem>
          <MenuItem onClick={() => handleFilterSelect("Cardio")}>Cardio</MenuItem>
          <MenuItem onClick={() => handleFilterSelect("Complemento")}>Complemento</MenuItem>
        </Menu>

        <button className={styles.add_btn} onClick={() => setIsModalOpen(true)}>
          <FaPlus className={styles.add_icon} /> Agregar Nuevo Objeto
        </button>

        <InventoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddItem={handleAddItem} />
      </div>

      
      <div className={styles.inventory_list}>
        {filteredItems.map((item, index) => (
          <div key={index} className={styles.inventory_card}>
            
            {item.image && <img src={item.image} alt="Objeto" className={styles.item_image} />}

            
            <div className={styles.item_info}>
              <h3>{item.nombre}</h3>
              <p><strong>Categoría:</strong> {item.categoria}</p>
              <p><strong>Proveedor:</strong> {item.proveedor}</p>
            </div>

            
            <div className={`${styles.card_actions} ${isModalOpen ? styles.hidden : ""}`}>
              <IconButton className={styles.edit_btn} onClick={() => console.log("Editar:", item.nombre)}>
                <EditIcon />
              </IconButton>

              <IconButton className={styles.delete_btn} onClick={() => handleRemoveItem(index)}>
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;

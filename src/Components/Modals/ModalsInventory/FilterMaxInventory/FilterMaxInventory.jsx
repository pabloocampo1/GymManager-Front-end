import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./FilterMaxInventory.module.css";

const FilterMaxInventory = ({ items, onClose, onUpdateItems }) => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const [displayItems, setDisplayItems] = useState([]);

  useEffect(() => {
    let filteredItems = [];
    if (selectedFilter === "aceptable-deplorable") {
      filteredItems = items.filter((item) => item.estado === "Aceptable");
    } else if (selectedFilter === "deplorable-aceptable") {
      filteredItems = items.filter((item) => item.estado === "Deplorable");
    }
    setDisplayItems(filteredItems);
    setSelectedItemIds([]);
  }, [selectedFilter, items]);

  const handleContainerClick = (e) => {
    e.stopPropagation();
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
    setSelectedItemIds([]);
  };

  const handleItemSelect = (itemId) => {
    setSelectedItemIds((prevSelectedItemIds) =>
      prevSelectedItemIds.includes(itemId)
        ? prevSelectedItemIds.filter((id) => id !== itemId)
        : [...prevSelectedItemIds, itemId]
    );
  };

  const handleAccept = () => {
    if (!selectedFilter || selectedItemIds.length === 0) {
      alert("Debe seleccionar un filtro y al menos un elemento");
      return;
    }
    const newState =
      selectedFilter === "deplorable-aceptable" ? "Aceptable" : "Deplorable";
    const updatedItems = items.map((item) =>
      selectedItemIds.includes(item.id) ? { ...item, estado: newState } : item
    );
    onUpdateItems(updatedItems);
    onClose();
  };

  return (
    <motion.div 
      className={styles.ConteinerFilterMax}
      onClick={handleContainerClick}
      initial={{ opacity: 0, y: -100, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 100, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
    >
      <div className={styles.HeaderFilterMax}>
        <h2>Filtrado Máximo de Inventario</h2>
        <select
          value={selectedFilter}
          onChange={handleFilterChange}
          className={styles.selectFilter}
        >
          <option value="">Selecciona el filtrado:</option>
          <option value="aceptable-deplorable">Aceptable a Deplorable</option>
          <option value="deplorable-aceptable">Deplorable a Aceptable</option>
        </select>
      </div>

      <div className={styles.listFilterMax}>
        {displayItems.length > 0 ? (
          <div className={styles.itemsGrid}>
            {displayItems.map((item) => (
              <div key={item.id} className={styles.filterItem}>
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.nombre}
                    className={styles.smallImage}
                  />
                )}
                <span className={styles.itemName}>{item.nombre}</span>
                <input
                  type="checkbox"
                  checked={selectedItemIds.includes(item.id)}
                  onChange={() => handleItemSelect(item.id)}
                  className={styles.itemCheckbox}
                />
              </div>
            ))}
          </div>
        ) : (
          <p>{selectedFilter ? "No hay Objetos por el filtro seleccionado" : "Selecciona una opción de filtrado"}</p>
        )}
      </div>

      <div className={styles.modalActions}>
        <button
          onClick={handleAccept}
          disabled={selectedItemIds.length === 0 || !selectedFilter}
          className={styles.acceptButton}
        >
          Aceptar Cambios
        </button>
        <button onClick={onClose} className={styles.cancelButton}>
          Cancelar
        </button>
      </div>
    </motion.div>
  );
};

export default FilterMaxInventory;
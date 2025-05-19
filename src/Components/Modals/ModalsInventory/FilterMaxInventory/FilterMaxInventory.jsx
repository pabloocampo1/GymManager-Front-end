import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./FilterMaxInventory.module.css";

const FilterMaxInventory = ({ items, onClose, onUpdateItems }) => {
  const [filterType, setFilterType] = useState("");
  const [itemsToUpdate, setItemsToUpdate] = useState([]);

  useEffect(() => {
    setItemsToUpdate([]);
    setFilterType("");
  }, [items]); 

  const handleContainerClick = (e) => {
    e.stopPropagation();
  };

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
    setItemsToUpdate([]);
  };

  const handleItemCheckboxChange = (itemId) => {
    setItemsToUpdate((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleApplyFilter = () => {
    if (!filterType || itemsToUpdate.length === 0) {
      alert("Por favor, selecciona un tipo de filtro y al menos un elemento.");
      return;
    }

    const newState = filterType === "aceptable" ? "Deplorable" : "Aceptable";

    const itemsToSend = itemsToUpdate.map((id) => ({
      id,
      estado: newState,
    }));

    onUpdateItems(itemsToSend);
    onClose();
  };

  const itemsToShow = filterType
    ? items.filter((item) => item.estado.toLowerCase() === filterType)
    : items;

  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div> 
      <div className={styles._inventory_container_ovjvj_11}>
        <motion.div
          className={styles.ConteinerFilterMax}
          onClick={handleContainerClick}
          initial={{ opacity: 0, y: -100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
        >
          <div className={styles.HeaderFilterMax}>
            <h2>Filtrado Máximo de Estado</h2>
            <select
              value={filterType}
              onChange={handleFilterTypeChange}
              className={styles.selectFilter}
            >
              <option value="">Selecciona el estado a filtrar</option>
              <option value="aceptable">Aceptable a deplorable</option>
              <option value="deplorable">Deplorable a aceptable</option>
            </select>
          </div>

          <div className={styles.listFilterMax}>
            {itemsToShow.length > 0 ? (
              <div className={styles.itemsGrid}>
                {itemsToShow.map((item) => (
                  <div key={item.id} className={styles.filterItem}>
                    {(item.image || item.imagen) && (
                      <img
                        src={item.image || item.imagen}
                        alt={item.nombre}
                        className={styles.smallImage}
                      />
                    )}
                    <span className={styles.itemName}>{item.nombre}</span>
                    <input
                      type="checkbox"
                      checked={itemsToUpdate.includes(item.id)}
                      onChange={() => handleItemCheckboxChange(item.id)}
                      className={styles.itemCheckbox}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p>
                {filterType
                  ? `No hay objetos con estado "${filterType}"`
                  : "Selecciona un estado para filtrar"}
              </p>
            )}
          </div>

          <div className={styles.modalActions}>
            <button
              onClick={handleApplyFilter}
              disabled={itemsToUpdate.length === 0 || !filterType}
              className={styles.acceptButton}
            >
              Cambiar Estado
            </button>
            <button onClick={onClose} className={styles.cancelButton}>
              Cancelar
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default FilterMaxInventory;

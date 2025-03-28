import React, { useState, useEffect } from "react";
import styles from "./FilterMaxInventory.module.css";

const FilterMaxInventory = ({
  items,
  onClose,
  onUpdateItems
}) => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const [displayItems, setDisplayItems] = useState([]);

  // Efecto para actualizar los items mostrados basado en el filtro
  useEffect(() => {
    let filteredItems = [];
    
    if (selectedFilter === "aceptable-deplorable") {
      filteredItems = items.filter(item => item.estado === 'Aceptable');
    } else if (selectedFilter === "deplorable-aceptable") {
      filteredItems = items.filter(item => item.estado === 'Deplorable');
    }
    
    setDisplayItems(filteredItems);
    // Reiniciar items seleccionados cuando cambia el filtro
    setSelectedItemIds([]);
  }, [selectedFilter, items]);

  const handleContainerClick = (e) => {
    e.stopPropagation();
  };

  const handleFilterChange = (e) => {
    const filterValue = e.target.value;
    setSelectedFilter(filterValue);
    // Reiniciar selección al cambiar filtro
    setSelectedItemIds([]);
  };

  const handleItemSelect = (itemId) => {
    setSelectedItemIds(prevSelectedItemIds => {
      // Toggle selection usando el id
      if (prevSelectedItemIds.includes(itemId)) {
        return prevSelectedItemIds.filter(id => id !== itemId);
      }
      return [...prevSelectedItemIds, itemId];
    });
  };

  const handleAccept = () => {
    // Validar que haya un filtro y elementos seleccionados
    if (!selectedFilter || selectedItemIds.length === 0) {
      alert("Debe seleccionar un filtro y al menos un elemento");
      return;
    }
  
    // Determinar el nuevo estado basado en el filtro seleccionado
    const newState = selectedFilter === 'deplorable-aceptable' 
      ? 'Aceptable' 
      : 'Deplorable';
  
    // Crear una copia de los items con el estado actualizado
    const updatedItems = items.map(item => {
      // Verificar si el id del item está en los ids seleccionados
      if (selectedItemIds.includes(item.id)) {
        return {
          ...item,
          estado: newState
        };
      }
      
      return item;
    });
  
    // Actualizar los items en el componente padre
    onUpdateItems(updatedItems);
    
    // Cerrar el modal
    onClose();
  };

  return (
    <div 
      className={styles.ConteinerFilterMax}
      onClick={handleContainerClick}
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
          selectedFilter 
            ? <p>No hay Objetos por el filtro selecionado</p>
            : <p>Selecciona un criterio de filtrado</p>
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
        <button
          onClick={onClose}
          className={styles.cancelButton}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default FilterMaxInventory;
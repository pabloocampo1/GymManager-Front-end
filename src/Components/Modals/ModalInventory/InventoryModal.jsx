import React from "react";
import "./InventoryModal.css";

const InventoryModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; 

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>Volver</button>
        <h2>Añadir Objeto</h2>
        <form>
          <label>Nombre del objeto</label>
          <input type="text" required placeholder="Maquina"/>

          <label for="menuToggle" class="menu-button" placeholder="opciones">&#9660; Categorias</label>
    
        <div class="menu-options">
            <a href="#">Superior</a>
            <a href="#">inferior</a>
            <a href="#">cardio</a>
            <a href="#">complemento</a>
        </div>

          <label>Fecha de compra</label>
          <input type="date" required placeholder="20/10/2006"/>

          <label>Proveedor</label>
          <textarea required placeholder="Empresa"></textarea>

          <label>Estado</label>
          <input type="text" required placeholder="Estado Maquina"></input>  

        <label>Marca</label>
        <input type="text" required placeholder="Marca"></input>

        <label>Modelo</label>
        <input type="text" required placeholder="Modelo de la maquina"></input>

          <label for="fileInput">Selecciona una imagen</label>
          <input type="file" id="fileInput" placeholder="añadir imagen" required></input>

          <button type="submit" id="AddEvent" onClick={onClose}>Cancelar</button>  
          <button type="submit" id="AddEvent">Agregar</button>
        </form>
      </div>
    </div>
  );
};

export default InventoryModal;

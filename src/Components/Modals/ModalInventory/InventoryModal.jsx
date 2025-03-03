import React from "react";
import "./InventoryModal.css";

const InventoryModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose(); // Cierra el modal solo si se hace clic fuera del contenido
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <h2>Añadir Objeto</h2>
        <form>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nombre">Nombre del objeto</label>
              <input type="text" id="nombre" required placeholder="Máquina Smith" />
            </div>

            <div className="form-group">
              <label htmlFor="categoria">Categoría</label>
              <select id="categoria">
                <option>Inferior</option>
                <option>Superior</option>
                <option>Cardio</option>
                <option>Complemento</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="fecha">Fecha de compra</label>
              <input type="date" id="fecha" required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="proveedor">Proveedor</label>
              <input type="text" id="proveedor" required placeholder="Empresa" />
            </div>

            <div className="form-group">
              <label htmlFor="estado">Estado</label>
              <input type="text" id="estado" required placeholder="Estado Máquina" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="marca">Marca</label>
              <input type="text" id="marca" required placeholder="Marca" />
            </div>

            <div className="form-group">
              <label htmlFor="modelo">Modelo</label>
              <input type="text" id="modelo" required placeholder="Modelo de la máquina" />
            </div>
          </div>

          <div className="form-group image-upload">
            <label htmlFor="imagen">Imagen</label>
            <input type="file" id="imagen" />
            <div className="image-preview">Añadir imagen</div>
          </div>

          <div className="button-container">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="add-btn">Agregar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryModal;

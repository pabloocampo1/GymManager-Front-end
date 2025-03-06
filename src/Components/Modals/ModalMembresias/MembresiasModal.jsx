import React from "react";
import './MembresiasModal.module.css';

const MembresiaModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null; 
  
    const handleOverlayClick = (e) => {
      if (e.target.classList.contains("modal-overlay")) {
        onClose();
      }
    };
  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <h2>Agregar membresia</h2>
        <form>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nombre">Nombre Membresia</label>
              <input type="text" id="nombre" placeholder="Nombre Membresia" />
              
            </div>

            <div className="form-group">
              <label htmlFor="tipo">Tipo de membresia</label>
              <select id="tipo">
                <option>tipo</option>
                <option>Mensual</option>
                <option>Trimestral</option>
                <option>Anual</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="duracion">Duracion</label>
              <input type="text" id="duracion" placeholder="Duracion" />
            </div>
          </div>
        <div className="form-row">    
          <div className="form-group">
            <label htmlFor="precio">Precio</label>
            <input type="text" id="precio" placeholder="Precio" />
          </div>
        </div>

          <div className="button-container">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancelar</button>
            <button type="submit" className="add-btn">Agregar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MembresiaModal;

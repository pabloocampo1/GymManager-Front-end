import React from "react";
import "./EventModal.css";

const EventModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; 

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>Volver</button>
        <h2>Añadir Evento</h2>
        <form>
          <label>Nombre del Evento</label>
          <input type="text" required placeholder="Evento"/>

          <label>Categoría</label>
          <select required>
            <option value="crossfit">CrossFit</option>
            <option value="natacion">Natación</option>
            <option value="atletismo">Atletismo</option>
            <option value="powerlifting">Powerlifting</option>
          </select>

          <label>Fecha del evento</label>
          <input type="date" required />

          <label>Encargado</label>
          <input type="text" required placeholder="Encargado" />

          <label>Lugar</label>
          <input type="text" required placeholder="Ubicación" />

          <label>Imagen</label>
          <div className="image-upload">
            <span>Añadir imagen</span>
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

export default EventModal;

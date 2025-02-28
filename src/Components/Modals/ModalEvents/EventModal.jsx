import React from "react";
import "./EventModal.css";

const EventModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; 

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>Volver</button>
        <h2>Añadir Evento</h2>
        <form>
          <label>Nombre del Evento</label>
          <input type="text" required placeholder="Evento"/>

          <label for="menuToggle" class="menu-button" placeholder="opciones">&#9660; Categorias</label>
    
        <div class="menu-options">
            <a href="#">CrosFit</a>
            <a href="#">Natacion</a>
            <a href="#">Atletismo</a>
            <a href="#">Power lifther</a>
        </div>

          <label>Fecha del evento</label>
          <input type="date" required placeholder="20/10/2006"/>

          <label>Encargado</label>
          <textarea required placeholder="Encargado"></textarea>

          <label>Lugar</label>
          <input type="text" required placeholder="Ubicacion"></input>  

          <label for="fileInput">Selecciona una imagen</label>
          <input type="file" id="fileInput"></input>

          <button type="submit" id="AddEvent" onClick={onClose}>Cancelar</button>  
          <button type="submit" id="AddEvent">Agregar</button>
        </form>
      </div>
    </div>
  );
};

export default EventModal;

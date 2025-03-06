import React, { useState } from "react";
import { Filter, PlusCircle, Search } from "lucide-react";
import "./Eventos.css";
import EventModal from "../../Components/Modals/ModalEvents/EventModal";

function Events() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="eventos-container">
      <div className="evento-header">
        <h1 className="eventos-title">Eventos</h1>

        <div className="eventos-actions">
          <div className="eventos-search">
            <Search size={16} className="search-icon" />
            <input type="text" placeholder="Buscar Eventos" />
          </div>
          <button className="filter-button">
            <Filter size={16} /> Filtrar
          </button>
          <button className="add-button" onClick={() => setIsModalOpen(true)}>
            <PlusCircle size={16} /> Agregar Nuevo Evento
          </button>
        </div>
      </div>

      <EventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default Events;

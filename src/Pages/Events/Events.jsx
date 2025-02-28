import { Filter, PlusCircle, Search } from "lucide-react";
import React, { useState } from "react";
import EventModal from "../../Components/Modals/ModalEvents/EventModal";

import "./Events.css";

function Events() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="eventos-container">
      <h1 className="eventos-title">Eventos</h1>

      <div className="eventos-actions">
        <div className="eventos-search">
          <Search size={16} className="search-icon" />
          <input type="text" placeholder="Buscar Eventos" />
        </div>
        <button className="filter-button">
          <Filter size={16} /> Filter
        </button>
        <button className="add-button" onClick={() => setIsModalOpen(true)}>
          <PlusCircle size={16} /> Agregar Nuevo Evento
        </button>
      </div>

      {/* Modal de Evento */}
      <EventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default Events;

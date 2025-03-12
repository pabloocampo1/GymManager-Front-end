import React, { useState } from "react";
import { Filter, PlusCircle, Search } from "lucide-react";
import { Menu, MenuItem } from "@mui/material";
import "./Eventos.css";
import EventModal from "../../Components/Modals/ModalEvents/EventModal";

function Events() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (option) => {
    if (option) console.log("Evento seleccionado:", option);
    setAnchorEl(null);
  };

  return (
    <div className="eventos-container">
      <div className="evento-header">
        <h1 className="eventos-title">Eventos</h1>

        <div className="eventos-actions">
          <div className="eventos-search">
            <Search size={16} className="search-icon" />
            <input type="text" placeholder="Buscar Eventos" />
          </div>

         
          <button className="filter-button" onClick={handleOpenMenu}>
            <Filter size={16} /> Filtrar
          </button>

          
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleCloseMenu()}>
            <MenuItem onClick={() => handleCloseMenu("CrossFit")}>CrossFit</MenuItem>
            <MenuItem onClick={() => handleCloseMenu("Natación")}>Natación</MenuItem>
            <MenuItem onClick={() => handleCloseMenu("Atletismo")}>Atletismo</MenuItem>
            <MenuItem onClick={() => handleCloseMenu("Powerlifting")}>Powerlifting</MenuItem>
          </Menu>

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

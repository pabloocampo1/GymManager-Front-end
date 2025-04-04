import React, { useState } from "react";
import { PlusCircle, Search } from "lucide-react";
import { Menu, MenuItem } from "@mui/material";
import styles from "./Eventos.module.css";
import EventModal from "../../Components/Modals/ModalsEvents/ModalEvents/EventModal";
import TargetEvent from "../../Components/Targets/TargetEvent/TargetEvent";
import FilterAltIcon from '@mui/icons-material/FilterAlt';

function Events() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [editingEvent, setEditingEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const handleFilterSelect = (category) => {
    setSelectedCategory(category);
    handleCloseMenu();
  };

  const handleAddEvent = (newEvent) => {
    if (editingEvent !== null) {
      
      const updatedEvents = [...events];
      updatedEvents[editingEvent.index] = newEvent;
      setEvents(updatedEvents);
      setEditingEvent(null);
    } else {
    
      setEvents([...events, newEvent]);
    }
    setIsModalOpen(false);
  };

  const handleRemoveEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
  };

  const handleEditEvent = (event, index) => {
    setEditingEvent({ ...event, index });
    setIsModalOpen(true);
  };

 
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };


  const filteredEvents = events.filter(event => 
    (selectedCategory === "Todos" || event.categoria === selectedCategory) &&
    (searchTerm === "" || (event.nombre && event.nombre.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  return (
    <div className={styles.eventosContainer}>
      <div className={styles.eventoHeader}>
        <h1 className={styles.eventosTitle}>Eventos</h1>
        <div className={styles.eventosActions}>
          <div className={styles.eventosSearch}>
            <Search size={16} className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Buscar Eventos" 
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <button className={styles.filterButton} onClick={handleOpenMenu}>
            <FilterAltIcon /> Filtrar
          </button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
            <MenuItem onClick={() => handleFilterSelect("Todos")}>Todos</MenuItem>
            <MenuItem onClick={() => handleFilterSelect("crossfit")}>CrossFit</MenuItem>
            <MenuItem onClick={() => handleFilterSelect("natacion")}>Natación</MenuItem>
            <MenuItem onClick={() => handleFilterSelect("atletismo")}>Atletismo</MenuItem>
            <MenuItem onClick={() => handleFilterSelect("powerlifting")}>Powerlifting</MenuItem>
          </Menu>
          <button className={styles.addButton} onClick={() => {
            setEditingEvent(null);
            setIsModalOpen(true);
          }}>
            <PlusCircle size={16} /> Agregar Nuevo Evento
          </button>
        </div>
      </div>
      <h2 className={styles.TitleFiltrado}>
        {searchTerm ? 
          `Filtrado por la categoría: ${selectedCategory} y búsqueda: "${searchTerm}"` : 
          `Filtrado por la categoría: ${selectedCategory}`
        }
      </h2>
      <EventModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingEvent(null);
        }}
        onAddEvent={handleAddEvent}
        initialEventData={editingEvent ? editingEvent : null}
      />
      
      <div className={styles.eventosList}>
        {filteredEvents.map((event, index) => (
          <TargetEvent
            key={index}
            event={event}
            onDelete={() => handleRemoveEvent(index)}
            onEdit={() => handleEditEvent(event, index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Events;
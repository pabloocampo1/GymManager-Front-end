import React, { useState, useEffect } from "react";
import { PlusCircle, Search } from "lucide-react";
import { Menu, MenuItem } from "@mui/material";
import styles from "./Eventos.module.css";
import EventModal from "../../Components/Modals/ModalsEvents/ModalEvents/EventModal";
import TargetEvent from "../../Components/Targets/TargetEvent/TargetEvent";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import EventService from "../../Service/EventsService"; 

function Events() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [editingEvent, setEditingEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar eventos cuando el componente se monta
  useEffect(() => {
    fetchEvents();
  }, []);

  // Función para obtener todos los eventos
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await EventService.getAllEvents();
      setEvents(data);
      setError(null);
    } catch (err) {
      console.error("Error al cargar eventos:", err);
      setError("Error al cargar los eventos. Por favor intente de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const handleFilterSelect = (category) => {
    setSelectedCategory(category);
    handleCloseMenu();
  };

  // Manejar la adición o edición de un evento
  const handleAddEvent = async (newEvent) => {
    setLoading(true);
    try {
      if (editingEvent !== null) {
        // Si estamos editando un evento existente
        const updatedEvent = await EventService.updateEvent(editingEvent.id, newEvent);
        
        // Actualizar el estado local
        setEvents(events.map(event => 
          event.id === updatedEvent.id ? updatedEvent : event
        ));
      } else {
        // Si estamos creando un nuevo evento
        const addedEvent = await EventService.createEvent(newEvent);
        
        // Actualizar el estado local
        setEvents([...events, addedEvent]);
      }
      
      setError(null);
    } catch (err) {
      console.error("Error al guardar evento:", err);
      setError("Error al guardar el evento. Por favor intente de nuevo.");
    } finally {
      setLoading(false);
      setIsModalOpen(false);
      setEditingEvent(null);
    }
  };

  // Manejar la eliminación de un evento
  const handleRemoveEvent = async (event) => {
    if (!event || !event.id) {
      console.error("No se puede eliminar evento sin ID");
      return;
    }
    
    setLoading(true);
    try {
      await EventService.deleteEvent(event.id);
      
      // Actualizar el estado local
      setEvents(events.filter(e => e.id !== event.id));
      setError(null);
    } catch (err) {
      console.error("Error al eliminar evento:", err);
      setError("Error al eliminar el evento. Por favor intente de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  // Manejar la edición de un evento
  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  // Manejar cambios en la búsqueda
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  // Filtrar eventos según la categoría y término de búsqueda
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
          <button 
            className={styles.addButton} 
            onClick={() => {
              setEditingEvent(null);
              setIsModalOpen(true);
            }}
            disabled={loading}
          >
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
      
      {error && <p className={styles.errorMessage}>{error}</p>}
      
      <EventModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingEvent(null);
        }}
        onAddEvent={handleAddEvent}
        initialEventData={editingEvent}
      />
      
      <div className={styles.eventosList}>
        
        
        {!loading && filteredEvents.length === 0 && (
          <p className={styles.emptyMessage}>No hay eventos que mostrar actualmente</p>
        )}
        
        {filteredEvents.map((event) => (
          <TargetEvent
            key={event.id}
            event={event}
            onDelete={() => handleRemoveEvent(event)}
            onEdit={() => handleEditEvent(event)}
          />
        ))}
      </div>
    </div>
  );
}

export default Events;
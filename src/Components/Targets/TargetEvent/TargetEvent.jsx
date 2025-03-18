import React from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./TargetEvent.module.css";
import ButtonActive from "../../Buttons/ButtonActive";
import ButtonInactive from "../../Buttons/ButtonInactive"
import ButtonInTime from "../../Buttons/ButtonInTime";

const TargetEvent = ({ event, onDelete, onEdit }) => {
    const getEventStatus = (eventDate)=>{
      const hoy = new Date();
      const eventDateObjeto = new Date(eventDate);


      hoy.setHours(0,0,0,0);
      eventDateObjeto.setHours(0,0,0,0);


      if (eventDateObjeto.getDate() === hoy.getDate() && 
        eventDateObjeto.getMonth() === hoy.getMonth() && 
        eventDateObjeto.getFullYear() === hoy.getFullYear()) {
        return "today";
      } else if (eventDateObjeto > hoy) {
        return "upcoming";
      } else {
        return "expired";
      }
    }
    const eventStatus = getEventStatus(event.fecha);
  return (
    <div className={styles.eventCard}>
      {event.image && (
        <img src={event.image} alt="Evento" className={styles.eventImage} />
      )}
      
      <div className={styles.eventContent}>
        <h3 className={styles.eventTitle}>{event.nombre}</h3>
        
        <div className={styles.eventDetails}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Lugar</span>
            <span className={styles.detailValue}>{event.lugar || "No especificado"}</span>
          </div>
          
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Fecha</span>
            <span className={styles.detailValue}>{event.fecha || "No especificada"}</span>
          </div>
        </div>
        
        <div className={styles.eventActions}>
        {eventStatus === "expired" && <ButtonInactive text="vencido" />}
          {eventStatus === "today" && <ButtonActive text="Enproceso" />}
          {eventStatus === "upcoming" && <ButtonInTime text="disponible" />}
          
  
          
          
          <div className={styles.iconButtons}>
            <IconButton className={styles.editButton} onClick={() => onEdit && onEdit(event)}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton className={styles.deleteButton} onClick={() => onDelete && onDelete(event)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TargetEvent;
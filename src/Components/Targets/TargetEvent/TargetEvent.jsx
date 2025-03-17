import React from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./TargetEvent.module.css";

const TargetEvent = ({ event, onDelete, onEdit }) => {
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
          <button className={styles.vencidaButton}>
            {event.estado || "Vencida"}
          </button>
          
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
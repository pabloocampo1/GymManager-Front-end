import React from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./TargetInventory.module.css";
import ButtonActive from "../../Buttons/ButtonActive";
import ButtonInactive from "../../Buttons/ButtonInactive"
import ButtonInTime from "../../Buttons/ButtonInTime";

const TargetInventory = ({ inventory, onDelete, onEdit }) => {
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
    const eventStatus = getEventStatus(inventory.fecha);
  return (
    <div className={styles.eventCard}>
      {inventory.image && (
        <img src={inventory.image} alt="Evento" className={styles.eventImage} />
      )}
      
      <div className={styles.eventContent}>
        <h3 className={styles.eventTitle}>{inventory.nombre}</h3>
        
        <div className={styles.eventDetails}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Categoria</span>
            <span className={styles.detailValue}>{inventory.categoria}</span>
          </div>
        </div>
        
        <div className={styles.eventActions}>
        {eventStatus === "expired" && <ButtonInactive text="vencido" />}
          {eventStatus === "today" && <ButtonActive text="Enproceso" />}
          {eventStatus === "upcoming" && <ButtonInTime text="disponible" />}
          
  
          
          
          <div className={styles.iconButtons}>
            <IconButton className={styles.editButton} onClick={() => onEdit && onEdit(inventory)}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton className={styles.deleteButton} onClick={() => onDelete && onDelete(inventory)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TargetInventory;
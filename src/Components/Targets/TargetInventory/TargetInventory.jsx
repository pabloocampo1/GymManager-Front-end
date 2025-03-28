
import React, { useState } from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./TargetInventory.module.css";

import ButtonInactive from "../../Buttons/ButtonInactive"
import ButtonInTime from "../../Buttons/ButtonInTime";
import ConfirmationModalInventory from "../../Modals/ModalsInventory/ConfirmationModalInventory/ConfirmationModalInventory";

const TargetInventory = ({ inventory, onDelete, onEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
    const getEventStatus = ()=>{
      const estado = inventory.estado;
      if (estado === "Aceptable"){
        return "Aceptable";
      }else{
        return "deplorable"
      }
    }
    const eventStatus = getEventStatus(inventory.estado);
  return (
    <div className={styles.inventoriCard}>
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
        {eventStatus === "Aceptable" && <ButtonInTime text="aceptable" />}
          {eventStatus === "deplorable" && <ButtonInactive text="deplorable" />}
          
          
  
          
          
          <div className={styles.iconButtons}>
            <IconButton className={styles.editButton} onClick={() => onEdit && onEdit(inventory)}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton className={styles.deleteButton} onClick={() => setIsModalOpen(true)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </div>
        </div>
      </div>
      {isModalOpen && (
                <ConfirmationModalInventory
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={() => {
            
                        setIsModalOpen(onDelete);
                    }}
                />
            )}
    </div>
  );
};

export default TargetInventory;
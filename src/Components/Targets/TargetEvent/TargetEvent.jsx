import React, { useState } from "react";
import ReactDOM from "react-dom";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./TargetEvent.module.css";
import ButtonActive from "../../Buttons/ButtonActive";
import ButtonInactive from "../../Buttons/ButtonInactive";
import ButtonInTime from "../../Buttons/ButtonInTime";
import ConfirmationModalEvent from "../../Modals/ModalsEvents/ConfirmationModalEvents/ConfrimatiModalEvent";
import DocumentViewer from "../../DocumentViewer";

const TargetEvent = ({ event, onDelete, onEdit }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const getEventStatus = (fechaEvento) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const [year, month, day] = fechaEvento.split("-").map(Number);
    const eventDate = new Date(year, month - 1, day); 
  
    if (eventDate.getTime() === today.getTime()) {
      return "today"; 
    } else if (eventDate > today) {
      return "upcoming"; 
    } else {
      return "expired"; 
    }
  };
  

  const eventStatus = getEventStatus(event.fechaEvento);

  const imageUrl = event.image || event.imagen || event.imagenFile || null;

  const handleEditClick = () => {
    if (onEdit) onEdit();
  };

  const handleDeleteClick = () => setIsDeleteModalOpen(true);

  return (
    <div className={styles.eventCard}>
      <div className={styles.imageContainer}>
        <DocumentViewer
          imageUrl={imageUrl}
          alt={event.nombre}
          className={styles.eventImage}
        />
      </div>

      <div className={styles.eventContent}>
        <h3 className={styles.eventTitle}>{event.nombre}</h3>

        <div className={styles.eventDetails}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Lugar</span>
            <span className={styles.detailValue}>{event.lugar}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Fecha</span>
            <span className={styles.detailValue}>{event.fechaEvento}</span>
          </div>
        </div>

        <div className={styles.eventActions}>
          {eventStatus === "expired" && <ButtonInactive text="Vencido" />}
          {eventStatus === "today" && <ButtonActive text="En proceso" />}
          {eventStatus === "upcoming" && <ButtonInTime text="Disponible" />}

          <div className={styles.iconButtons}>
            <IconButton className={styles.editButton} onClick={handleEditClick}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton className={styles.deleteButton} onClick={handleDeleteClick}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </div>
        </div>
      </div>

      {/* Modal para confirmar eliminación */}
      {isDeleteModalOpen &&
        ReactDOM.createPortal(
          <ConfirmationModalEvent
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={() => {
              setIsDeleteModalOpen(false);
              if (onDelete) onDelete(event);
            }}
          />,
          document.body
        )}
    </div>
  );
};

export default TargetEvent;

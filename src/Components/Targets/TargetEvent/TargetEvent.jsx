import React from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./TargetEvent.module.css";
import ButtonActive from "../../Buttons/ButtonActive";
import ButtonInactive from "../../Buttons/ButtonInactive";
import ButtonInTime from "../../Buttons/ButtonInTime";
import DocumentViewer from "../../DocumentViewer";
import Swal from "sweetalert2";

const TargetEvent = ({ event, onDelete, onEdit }) => {
  const getEventStatus = (fechaEvento) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [year, month, day] = fechaEvento.split("-").map(Number);
    const eventDate = new Date(year, month - 1, day);
    if (eventDate.getTime() === today.getTime()) return "today";
    if (eventDate > today) return "upcoming";
    return "expired";
  };

  const eventStatus = getEventStatus(event.fechaEvento);
  const imageUrl = event.image || event.imagen || event.imagenFile || "";

  const handleEditClick = () => onEdit?.();

  const handleDeleteClick = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Se eliminará el evento con el nombre: ${event.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#000000',
      confirmButtonColor: '#D3D837',
      customClass: {
        confirmButton: 'mi-boton-confirmar',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete?.(event);
        Swal.fire(
          '¡Eliminado!',
          'El evento ha sido eliminado correctamente.',
          'success'
        );
      }
    });
  };

  return (
    <div className={styles.eventCard}>
      <div className={styles.imageContainer}>
        <DocumentViewer imageUrl={imageUrl} alt={event.nombre} className={styles.eventImage} />
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
    </div>
  );
};

export default TargetEvent;

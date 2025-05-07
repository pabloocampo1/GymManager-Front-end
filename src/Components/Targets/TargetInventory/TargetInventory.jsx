import React, { useState } from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./TargetInventory.module.css";
import ButtonInactive from "../../Buttons/ButtonInactive";
import ButtonInTime from "../../Buttons/ButtonInTime";
import ConfirmationModalInventory from "../../Modals/ModalsInventory/ConfirmationModalInventory/ConfirmationModalInventory";
import DocumentViewer from "../../DocumentViewer";

const TargetInventory = ({ inventory, onDelete, onEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getEventStatus = () => {
    const estado = inventory.estado;
    if (estado === "Aceptable") {
      return "Aceptable";
    } else {
      return "deplorable";
    }
  };

  const eventStatus = getEventStatus();
  
  // Obtenemos la URL de la imagen (utilizando cualquier propiedad donde pueda estar)
  const imageUrl = inventory.image || inventory.imagen || inventory.imagenFile || 'https://via.placeholder.com/400x300?text=Imagen%20no%20disponible';
  
  const handleConfirmDelete = () => {
    onDelete(inventory.id);
    setIsModalOpen(false);
  };

  return (
    <div className={styles.inventoriCard}>
      <div className={styles.imageContainer}>
        <DocumentViewer 
          imageUrl={imageUrl}
          alt={inventory.nombre}
          className={styles.eventImage}
        />
      </div>

      <div className={styles.eventContent}>
        <h3 className={styles.eventTitle}>{inventory.nombre}</h3>

        <div className={styles.eventDetails}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Categoria: </span>
            <span className={styles.detailValue}>{inventory.categoria}</span>
          </div>
        </div>

        <div className={styles.eventActions}>
          {eventStatus === "Aceptable" && <ButtonInTime text="aceptable" />}
          {eventStatus === "deplorable" && <ButtonInactive text="deplorable" />}

          <div className={styles.iconButtons}>
            <IconButton className={styles.editButton} onClick={() => onEdit(inventory)}>
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
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default TargetInventory;

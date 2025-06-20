import React from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./TargetInventory.module.css";
import ButtonInactive from "../../Buttons/ButtonInactive";
import ButtonInTime from "../../Buttons/ButtonInTime";
import DocumentViewer from "../../DocumentViewer";
import Swal from "sweetalert2";

const TargetInventory = ({ inventory, onDelete, onEdit, isDarkMode }) => {
  const getEventStatus = () => {
    const estado = inventory.estado;
    if (estado === "Aceptable") {
      return "Aceptable";
    } else {
      return "deplorable";
    }
  };

  const eventStatus = getEventStatus();
  const imageUrl = inventory.image || inventory.imagen || inventory.imagenFile || 'https://via.placeholder.com/400x300?text=Imagen%20no%20disponible';

  const handleDeleteClick = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Se eliminará el elemento con el nombre: ${inventory.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      reverseButtons: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar',
      cancelButtonColor: '#000000',
      confirmButtonColor: '#D3D837',
      background: isDarkMode ? '#2d2d2d' : '#ffffff',
      color: isDarkMode ? '#e4e4e4' : '#000000',
      customClass: {
        confirmButton: 'mi-boton-confirmar',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(inventory.id);
        Swal.fire({
          title: '¡Eliminado!',
          text: 'El elemento ha sido eliminado correctamente.',
          icon: 'success',
          background: isDarkMode ? '#2d2d2d' : '#ffffff',
          color: isDarkMode ? '#e4e4e4' : '#000000'
        });
      }
    });
  };

  return (
    <div className={`${styles.inventoriCard} ${isDarkMode ? styles.darkTheme : ''}`}>
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
          {eventStatus === "Aceptable" && <ButtonInTime text="aceptable" isDarkMode={isDarkMode} />}
          {eventStatus === "deplorable" && <ButtonInactive text="deplorable" isDarkMode={isDarkMode} />}

          <div className={styles.iconButtons}>
            <IconButton className={styles.editButton} onClick={() => onEdit(inventory)}>
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

export default TargetInventory;

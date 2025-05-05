import React from "react";
import styles from "./TargetHomeEvent.module.css";
import DocumentViewer from "../../DocumentViewer";

const TargetH = ({ event }) => {
 
  const imageUrl = event.image || null;
  const eventName = event.nombre || event.title || 'Nombre no disponible';
  const eventLocation = event.lugar || 'Lugar no disponible';
  const eventDate = event.fechaEvento || event.date || 'Fecha no disponible';

  return (
    <div className={styles.eventCard}>
      <div className={styles.imageContainer}>
        <DocumentViewer
          imageUrl={imageUrl}
          alt={eventName}
          className={styles.eventImage}
        />
      </div>

      <div className={styles.eventContent}>
        <h3 className={styles.eventTitle}>{eventName}</h3>

        <div className={styles.eventDetails}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Lugar</span>
            <span className={styles.detailValue}>{eventLocation}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Fecha</span>
            <span className={styles.detailValue}>{eventDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TargetH;
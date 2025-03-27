import React, { useState } from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./TargetEvent.module.css";
import ButtonActive from "../../Buttons/ButtonActive";
import ButtonInactive from "../../Buttons/ButtonInactive";
import ButtonInTime from "../../Buttons/ButtonInTime";
import ConfirmationModalEvent from "../../Modals/ModalsEvents/ConfirmationModalEvents/ConfrimatiModalEvent"; 

const TargetEvent = ({ event, onDelete, onEdit }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const getEventStatus = (eventDate) => {
        const today = new Date();
        const eventDateObj = new Date(eventDate);
        today.setHours(0, 0, 0, 0);
        eventDateObj.setHours(0, 0, 0, 0);

        if (eventDateObj.getTime() === today.getTime()) {
            return "today";
        } else if (eventDateObj > today) {
            return "upcoming";
        } else {
            return "expired";
        }
    };

    const eventStatus = getEventStatus(event.fecha);

    const handleEditClick = () => {
        if (onEdit) onEdit();
    };

    const handleDeleteClick = () => setIsDeleteModalOpen(true);

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

            {/* Modal de eliminación */}
            {isDeleteModalOpen && (
                <ConfirmationModalEvent 
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={() => {
                        setIsDeleteModalOpen(false);
                        if (onDelete) onDelete(event);
                    }}
                />
            )}
        </div>
    );
};

export default TargetEvent;
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './LogoutConfirmationModal.module.css';

const LogoutConfirmationModal = ({ onClose, onConfirm }) => {
    const handleOverlayClick = (e) => {
        // Solo cerrar si el clic fue directamente en el overlay
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <AnimatePresence>
            <motion.div 
                className={styles.DivConteiner}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleOverlayClick}
            >
                <motion.div 
                    className={styles.Contenedorinfo}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()} // Evitar que los clics en el contenido cierren el modal
                >
                    <div className={styles.TitleCOnteiner}>
                        <h2>¿Estás seguro de que deseas cerrar sesión?</h2>
                    </div>
                    <div className={styles.ConteinerActions}>
                        <button onClick={onClose}>Cancelar</button>
                        <button onClick={onConfirm}>Aceptar</button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default LogoutConfirmationModal; 
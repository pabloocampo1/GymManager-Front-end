import styles from "./MiembrosConfirmation.module.css";
import { motion, AnimatePresence } from "framer-motion";
const ConfirmationModalMiembros= ({ onClose, onConfirm })=>{

    const handleOverlayClick = (e) => {
            if (e.target.classList.contains(styles.DivConteiner)) {
              onClose();
            }
          };
    
    return(
        <AnimatePresence>
        <motion.div className={styles.DivConteiner}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleOverlayClick}>
            <div className={styles.Contenedorinfo}>
                <div className={styles.TitleCOnteiner}>
                    <h2>¿Desea eliminar este miembro?</h2>
                </div>
                <div className={styles.ConteinerActions}>
                    <button onClick={onClose}>Cancelar</button>
                    <button onClick={onConfirm}>Aceptar</button>
                </div>
            </div>
            
        </motion.div>
        </AnimatePresence>
    )
}

export default ConfirmationModalMiembros;
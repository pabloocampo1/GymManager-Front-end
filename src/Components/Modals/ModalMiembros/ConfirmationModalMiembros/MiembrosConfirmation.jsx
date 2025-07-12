import { useThemeCtx } from "../../../../Context/ThemeContext";
import styles from "./MiembrosConfirmation.module.css";
import { motion, AnimatePresence } from "framer-motion";


const ConfirmationModalMiembros= ({ onClose, onConfirm, memberName })=>{
     const { darkMode } = useThemeCtx();

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
            <div className={styles.Contenedorinfo} data-theme={darkMode ? "dark" : "light"}>
                <div className={styles.TitleCOnteiner}>
                    <h2 data-theme={darkMode ? "dark" : "light"}>
                      ¿Seguro que desea eliminar a: <strong>{memberName}</strong>?
                    </h2>
                </div>
                <div className={styles.ConteinerActions}>
                    <button 
                      onClick={onClose}
                      data-theme={darkMode ? "dark" : "light"}
                    >
                      Cancelar
                    </button>
                    <button onClick={onConfirm}>Aceptar</button>
                </div>
            </div>
            
        </motion.div>
        </AnimatePresence>
    )
}

export default ConfirmationModalMiembros;
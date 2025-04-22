import styles from "./ExitConfirmation.module.css";
import { motion, AnimatePresence } from "framer-motion";
const ConfirmationExit= ({ onClose, onConfirm })=>{

    
    return(
        <AnimatePresence>
        <motion.div className={styles.DivConteiner}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>
            <div className={styles.Contenedorinfo}>
                <div className={styles.TitleCOnteiner}>
                    <h2>¿Seguro que desea salir?</h2>
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

export default ConfirmationExit;
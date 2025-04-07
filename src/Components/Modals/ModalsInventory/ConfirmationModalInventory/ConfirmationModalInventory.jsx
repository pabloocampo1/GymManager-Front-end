import { motion } from "framer-motion";
import styles from "./ConfirmationModalInventory.module.css";

const ConfirmationModalInventory = ({ onClose, onConfirm }) => {
  return (
    <div className={styles.DivConteiner}>
      <motion.div
        className={styles.Contenedorinfo}
        initial={{ rotateY: 90, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        exit={{ rotateY: -90, opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className={styles.TitleContainer}>
          <h2>¿Desea eliminar este objeto?</h2>
        </div>
        <div className={styles.ConteinerActions}>
          <button onClick={onClose}>Cancelar</button>
          <button onClick={onConfirm}>Aceptar</button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmationModalInventory;
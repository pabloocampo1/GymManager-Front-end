import { div } from "framer-motion/client";
import styles from "./ConfirmationModalInventory.module.css";
const ConfirmationModalInventory= ({ onClose, onConfirm })=>{
    
    return(

        <div className={styles.DivConteiner} >
            <div className={styles.Contenedorinfo}>
                <div className={styles.TitleCOnteiner}>
                    <h2>¿Desea eliminar este objeto?</h2>
                </div>
                <div className={styles.ConteinerActions}>
                    <button onClick={onClose}>Cancelar</button>
                    <button onClick={onConfirm}>Aceptar</button>
                </div>
            </div>
            
        </div>
    )
}

export default ConfirmationModalInventory;
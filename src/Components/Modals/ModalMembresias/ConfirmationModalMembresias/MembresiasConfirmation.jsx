import styles from "./MembresiasConfirmation.module.css";
const ConfirmationModalMembresias= ({ onClose, onConfirm })=>{
    
    return(

        <div className={styles.DivConteiner} >
            <div className={styles.Contenedorinfo}>
                <div className={styles.TitleCOnteiner}>
                    <h2>¿Desea eliminar esta membresia?</h2>
                </div>
                <div className={styles.ConteinerActions}>
                    <button onClick={onClose}>Cancelar</button>
                    <button onClick={onConfirm}>Aceptar</button>
                </div>
            </div>
            
        </div>
    )
}

export default ConfirmationModalMembresias;
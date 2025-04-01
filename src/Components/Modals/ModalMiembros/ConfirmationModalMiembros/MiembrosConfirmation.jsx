import styles from "./MiembrosConfirmation.module.css";
const ConfirmationModalMiembros= ({ onClose, onConfirm })=>{
    
    return(

        <div className={styles.DivConteiner} >
            <div className={styles.Contenedorinfo}>
                <div className={styles.TitleCOnteiner}>
                    <h2>¿Desea eliminar este miembro?</h2>
                </div>
                <div className={styles.ConteinerActions}>
                    <button onClick={onClose}>Cancelar</button>
                    <button onClick={onConfirm}>Aceptar</button>
                </div>
            </div>
            
        </div>
    )
}

export default ConfirmationModalMiembros;
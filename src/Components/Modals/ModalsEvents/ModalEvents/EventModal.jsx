import React, { useState, useEffect } from "react"; 

import styles from "./EventModal.module.css";  
import ClearIcon from '@mui/icons-material/Clear';

function EventModal({ 
  isOpen, 
  onClose, 
  onAddEvent, 
  initialEventData = null  // Nuevo prop para datos de edición
}) {   
  const [eventData, setEventData] = useState({     
    nombre: "",     
    categoria: "crossfit",     
    encargado: "",
    fecha: "",
    lugar: "",
    image: ""   
  });   
  
  const [imagePreview, setImagePreview] = useState(null);

  // Efecto para cargar datos de edición
  useEffect(() => {
    if (initialEventData) {
      setEventData(initialEventData);
      setImagePreview(initialEventData.image || null);
    } else {
      // Reiniciar si no hay datos de edición
      setEventData({
        nombre: "",     
        categoria: "crossfit",     
        encargado: "",
        fecha: "",
        lugar: "",
        image: ""
      });
      setImagePreview(null);
    }
  }, [initialEventData]);

  const handleChange = (e) => {     
    const { name, value } = e.target;     
    setEventData({       
      ...eventData,       
      [name]: value     
    });   
  };  
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setEventData({
          ...eventData,
          image: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {     
    e.preventDefault();     
    onAddEvent(eventData);     
    // Reiniciar el formulario     
    setEventData({       
      nombre: "",       
      categoria: "crossfit",       
      encargado: "",
      fecha: "",
      lugar: "",
      image: ""     
    });
    setImagePreview(null);
    onClose(); // Cerrar modal después de guardar
  };    

  if (!isOpen) return null;    

  return (     
    <div className={styles.modalOverlay} onClick={(e) => e.target.classList.contains(styles.modalOverlay) && onClose()}>     
      <div className={styles.modalContent}>       
        <div className={styles.modalClosebtn}>
          <ClearIcon onClick={onClose}></ClearIcon>
        </div>        
        <h2>{initialEventData ? "Editar Evento" : "Agregar Nuevo Evento"}</h2>         
        <form onSubmit={handleSubmit}>           
          <div className={styles.formRow}>
            <div className={styles.formGroup}>             
              <label>Nombre del Evento</label>             
              <input               
                type="text"               
                name="nombre" 
                placeholder="Nombre del evento"              
                value={eventData.nombre}               
                onChange={handleChange}               
                required             
              />           
            </div>           
            <div className={styles.formGroup}>             
              <label>Categoría</label>             
              <select               
                name="categoria"               
                value={eventData.categoria}   
                placeholder="Categoria"            
                onChange={handleChange}               
                required             
              >               
                <option value="crossfit">CrossFit</option>               
                <option value="natacion">Natación</option>               
                <option value="atletismo">Atletismo</option>               
                <option value="powerlifting">Powerlifting</option>             
              </select>           
            </div>
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>             
              <label>Encargado</label>             
              <input               
                type="text"               
                name="encargado"  
                placeholder="Encargado"             
                value={eventData.encargado}               
                onChange={handleChange}               
                required             
              />           
            </div>           
            <div className={styles.formGroup}>             
              <label>Fecha del Evento</label>             
              <input               
                type="date"               
                name="fecha"   
                min={new Date().toISOString().split("T")[0]}          
                value={eventData.fecha}               
                onChange={handleChange}               
                required             
              />           
            </div>
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>             
              <label>Lugar</label>             
              <input               
                type="text"               
                name="lugar"     
                placeholder="Ubicacion"          
                value={eventData.lugar}               
                onChange={handleChange}               
                required             
              />           
            </div>
            <div className={styles.formGroup}>             
              <div className={styles.imageUpload}>
                <label htmlFor="imagen">Imagen:</label>
                <input type="file" id="imagen" onChange={handleImageChange} accept="image/png, image/jpeg" />
                {imagePreview && <img src={imagePreview} alt="Previsualización" className={styles.imagePreview} />}
              </div>
            </div>
          </div>
          
          <div className={styles.buttonContainer}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className={styles.addBtn}>             
              {initialEventData ? "Guardar Cambios" : "Guardar Evento"}
            </button>
          </div>
        </form>       
      </div>     
    </div>   
  ); 
}  

export default EventModal;
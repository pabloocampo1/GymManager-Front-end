import React, { useState } from "react"; 
import { X } from "lucide-react"; 
import styles from "../../Modals/ModalEvents/EventModal.module.css";  

function EventModal({ isOpen, onClose, onAddEvent }) {   
  const [eventData, setEventData] = useState({     
    nombre: "",     
    categoria: "crossfit",     
    encargado: "",
    fecha: "",
    lugar: "",
    image: ""   
  });   
  
  const [imagePreview, setImagePreview] = useState(null);

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
  };    

  if (!isOpen) return null;    

  return (     
    <div className={styles.modalOverlay}>       
      <div className={styles.modalContent}>         
        <button className={styles.closeBtn} onClick={onClose}>             
          <X size={24} />           
        </button>         
        <h2>Agregar Nuevo Evento</h2>         
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
              <label>Imagen del Evento</label>
              <div className={styles.imageUpload}>             
                {imagePreview ? (
                  <img 
                    src={imagePreview} 
                    alt="Vista previa" 
                    className={styles.imagePreview} 
                  />
                ) : (
                  <label className={styles.uploadBtn}>
                    
                    <input               
                      type="file"               
                      name="imageFile"              
                      onChange={handleImageChange}
                      accept="image/*"           
                    />
                  </label>             
                )}
              </div>
            </div>
          </div>
             
          <div className={styles.buttonContainer}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className={styles.addBtn}>             
              Guardar Evento           
            </button>
          </div>
        </form>       
      </div>     
    </div>   
  ); 
}  

export default EventModal;
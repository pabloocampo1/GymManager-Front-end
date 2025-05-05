import { useState } from "react";
import { Menu, MenuItem, Button } from "@mui/material";
import { Filter } from "lucide-react";
import "./Mail.css";

function Promotions() {
  const [selectedOption, setSelectedOption] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (option) => {
    if (option) setSelectedOption(option);
    setAnchorEl(null);
  };

  return (
    <>
      <h1 className="promotions-title">Promociones</h1>
      <div className="promotions-container">
      

      <div className="promotions-input-group">
        <label className="promotions-label">Para:</label>
        <input 
          className="promotions-input" 
          type="text" 
          value={selectedOption} 
          placeholder="Selecciona una opción" 
          readOnly 
          required 
        />
        <button className="promotions-filter-button" onClick={handleOpenMenu}>
          <Filter size={16} /> Filtrar
        </button>

        {/* Menú desplegable sin borde extra */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleCloseMenu()}>
          <MenuItem onClick={() => handleCloseMenu("Usuarios Activos")}>Usuarios Activos</MenuItem>
          <MenuItem onClick={() => handleCloseMenu("Usuarios Inactivos")}>Usuarios Inactivos</MenuItem>
          <MenuItem onClick={() => handleCloseMenu("Usuarios con membresía FULL ENTRADAS")}>
            Usuarios con membresía FULL ENTRADAS
          </MenuItem>
          <MenuItem onClick={() => handleCloseMenu("Usuarios con membresía ESTUDIANTIL")}>
            Usuarios con membresía ESTUDIANTIL
          </MenuItem>
          <MenuItem onClick={() => handleCloseMenu("Usuarios con membresía Bronce")}>
            Usuarios con membresía Bronce
          </MenuItem>
          <MenuItem onClick={() => handleCloseMenu("Todos los usuarios")}>Todos los usuarios</MenuItem>
        </Menu>
      </div>

      <div className="promotions-field">
        <label className="promotions-label">Asunto:</label>
        <input className="promotions-input" type="text" placeholder="Asunto" required />
      </div>

      <div className="promotions-field">
        
        <textarea className="promotions-textarea" rows={4} placeholder="Contenido" required></textarea>
      </div>

      <button className="promotions-send-button">Enviar</button>
    </div>
    </>
    
  );
}

export default Promotions;

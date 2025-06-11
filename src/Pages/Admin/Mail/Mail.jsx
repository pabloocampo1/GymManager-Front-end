import { useState } from "react";
import { Menu, MenuItem, Button } from "@mui/material";
import { Filter } from "lucide-react";
import "./Mail.css";
import MailService from "../../../Service/MailService";

function Promotions() {
  const [selectedOption, setSelectedOption] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [formData, setFormData] = useState({
    asunt: "",
    contenido: "",
    estado: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (option) => {
    if (option) {
      setSelectedOption(option);
      // Set estado based on selected option
      let estado;
      switch(option) {
        case "Usuarios Activos":
          estado = 1;
          break;
        case "Usuarios Inactivos":
          estado = 0;
          break;
        case "Todos los usuarios":
          estado = 2;
          break;
        default:
          estado = null;
      }
      setFormData(prev => ({ ...prev, estado }));
    }
    setAnchorEl(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (!selectedOption || !formData.asunt || !formData.contenido) {
        throw new Error("Por favor complete todos los campos");
      }

      console.log("Datos del formulario a enviar:", {
        asunt: formData.asunt,
        contenido: formData.contenido,
        estado: formData.estado,
        selectedOption
      });
      
      await MailService.sendMail(formData);
      setSuccess(true);
      // Reset form
      setSelectedOption("");
      setFormData({
        asunt: "",
        contenido: "",
        estado: null
      });
    } catch (err) {
      console.error("Error completo:", err);
      setError(err.response?.data?.message || err.message || "Error al enviar el correo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="promotions-title">Promociones</h1>
      <form className="promotions-container" onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">Correo enviado exitosamente</div>}

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
          <button 
            type="button" 
            className="promotions-filter-button" 
            onClick={handleOpenMenu}
          >
            <Filter size={16} /> Filtrar
          </button>

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleCloseMenu()}>
            <MenuItem onClick={() => handleCloseMenu("Usuarios Activos")}>Usuarios Activos</MenuItem>
            <MenuItem onClick={() => handleCloseMenu("Usuarios Inactivos")}>Usuarios Inactivos</MenuItem>
            <MenuItem onClick={() => handleCloseMenu("Todos los usuarios")}>Todos los usuarios</MenuItem>
          </Menu>
        </div>

        <div className="promotions-field">
          <label className="promotions-label">Asunto:</label>
          <input 
            className="promotions-input" 
            type="text" 
            name="asunt"
            value={formData.asunt}
            onChange={handleInputChange}
            placeholder="Asunto" 
            required 
          />
        </div>

        <div className="promotions-field">
          <textarea 
            className="promotions-textarea" 
            rows={4} 
            name="contenido"
            value={formData.contenido}
            onChange={handleInputChange}
            placeholder="Contenido" 
            required
          ></textarea>
        </div>

        <button 
          type="submit" 
          className="promotions-send-button"
          disabled={loading}
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </>
  );
}

export default Promotions;

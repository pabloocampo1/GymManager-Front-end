import { Filter } from "lucide-react";
import "./Mail.css"; 

function Promotions() {
  return (
    <div className="promotions-container">
      <h1 className="promotions-title">Promociones</h1>

      <div className="promotions-input-group">
        <label className="promotions-label">Para:</label>
        <input className="promotions-input" type="email"  required/>
        <button className="promotions-filter-button">
          <Filter size={16} /> Filter
        </button>
      </div>

      <div className="promotions-field">
        <label className="promotions-label">Asunto:</label>
        <input className="promotions-input" type="text" required/>
      </div>

      <div className="promotions-field">
        <label className="promotions-label">Texto:</label>
        <textarea className="promotions-textarea" rows={4} placeholder="Text" required></textarea>
      </div>

      <button className="promotions-send-button">Enviar</button>
    </div>
  );
}

export default Promotions;

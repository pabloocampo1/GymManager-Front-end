import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <p>Url no encontrada</p>
      <Link to="/" className="home-link">
        Volver al inicio
      </Link>
    </div>
  );
}

export default NotFound;

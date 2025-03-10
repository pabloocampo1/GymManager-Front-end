import React, { useState } from "react";
import "./ProfileGym.css";

const Profile = () => {
  const [formData, setFormData] = useState({
    nombre: "Juan Pérez",
    correo: "juanperez@example.com",
    contraseña: "",
    clientes: "150",
    nombreGimnasio: "FitLife Gym",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos actualizados:", formData);
  };

  return (
    <div className="profile-container">
      <h2>Datos Personales</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </label>

        <label>
          Correo:
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
          />
        </label>

        <label>
          Contraseña:
          <input
            type="password"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            placeholder="********"
          />
        </label>

        <label>
          Clientes Activos:
          <input
            type="number"
            name="clientes"
            value={formData.clientes}
            onChange={handleChange}
          />
        </label>

        <label>
          Nombre del Gimnasio:
          <input
            type="text"
            name="nombreGimnasio"
            value={formData.nombreGimnasio}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Actualizar Datos</button>
      </form>
    </div>
  );
};

export default Profile;

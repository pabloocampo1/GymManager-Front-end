import React, { useState } from "react";
import styles from "./ProfileGym.module.css";

const ProfileGym = () => {
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
    <div className={styles.profileContainer}>
      <h2 className={styles.title}>Datos Personales</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Correo:</label>
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Contraseña:</label>
          <input
            type="password"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            placeholder="********"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Clientes Activos:</label>
          <input
            type="number"
            name="clientes"
            value={formData.clientes}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Nombre del Gimnasio:</label>
          <input
            type="text"
            name="nombreGimnasio"
            value={formData.nombreGimnasio}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className={styles.updateButton}>
          Actualizar Datos
        </button>
      </form>
    </div>
  );
};

export default ProfileGym;

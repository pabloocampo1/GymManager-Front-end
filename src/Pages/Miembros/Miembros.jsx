import { FaSearch, FaFilter, FaPlus } from "react-icons/fa";
import React, { useState } from "react";
import styles from "./Miembros.module.css";
import MiembrosModal from "../../Components/Modals/ModalMiembros/MiembrosModal.jsx";

const MiembroModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles["miembros_container"]}>
      <div className={styles["miembros-header"]}>
        <h2 className={styles["miembros-title"]}>Miembros</h2>
        <div className={styles["search-container"]}>
          <FaSearch className={styles["search-icon"]} />
          <input
            type="text"
            placeholder="Buscar Miembros"
            className={styles["search-input"]}
          />
        </div>
        <button className={styles["filter-boton"]}>
          <FaFilter className={styles["filter-icon"]} />
          Filter
        </button>
        <button
          className={styles["add-boton"]}
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus className={styles["add-icon"]} />
          Agregar Nuevo Miembro
        </button>
        {isModalOpen ? (
          <MiembrosModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        ) : null}
      </div>
    </div>
  );
};

export default MiembroModal;

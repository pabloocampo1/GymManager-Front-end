import { FaSearch, FaFilter, FaPlus } from "react-icons/fa";
import React, { useState } from "react";
import styles from "./Miembros.module.css";
import MiembrosModal from "../../Components/Modals/ModalMiembros/MiembrosModal.jsx";

const MiembroModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.miembros_container}>
      <div className={styles.miembros_header}>
        <h1 className={styles.miembros_title}>Miembros</h1>
        <div className={styles.search_container}>
          <FaSearch className={styles.search_icon} />
          <input
            type="text"
            placeholder="Buscar Miembros"
            className={styles.search_input}
          />
        </div>
        <button className={styles.filter_boton}>
          <FaFilter className={styles.filter_icon} />
          Filter
        </button>
        <button
          className={styles.add_boton}
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus className={styles.add_icon} />
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

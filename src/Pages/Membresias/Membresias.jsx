import { FaSearch, FaFilter, FaPlus } from "react-icons/fa";
import React, { useState } from "react";
import styles from "./Membresias.module.css";
import MembresiasModal from "../../Components/Modals/ModalMembresias/MembresiasModal.jsx";

const MembresiaModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles["membresia_container"]}>
      <div className={styles["membresias-header"]}>
        <h2 className={styles["membresias-title"]}>Membresias</h2>
        <div className={styles["search-container"]}>
          <FaSearch className={styles["search-icon"]} />
          <input
            type="text"
            placeholder="Buscar membresias"
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
          Agregar Nueva Membresia
        </button>
        {isModalOpen ? (
          <MembresiasModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        ) : null}
      </div>
    </div>
  );
};

export default MembresiaModal;

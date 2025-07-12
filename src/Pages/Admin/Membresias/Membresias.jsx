import { FaSearch, FaFilter, FaPen, FaPlus } from "react-icons/fa";
import { Menu, MenuItem, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import styles from "./Membresias.module.css";
import MembresiasModal from "../../../Components/Modals/ModalMembresias/MembresiasModal.jsx";
import ConfirmatioModalMembresia from "../../../Components/Modals/ModalMembresias/ConfirmationModalMembresias/MembresiasConfirmation.jsx";
import MembresiaService from "../../../Service/MembresiaService.jsx";
import { useEffect } from "react";
import { useThemeCtx } from "../../../Context/ThemeContext.jsx";


const MembresiaModal = () => {
  const { darkMode } = useThemeCtx();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("Todos");
  const [membresias, setMembresias] = useState([]);
  const [membresiaEditando, setMembresiaEditando] = useState(null);
  const [membresiaToDelete, setMembresiaToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [membresiaToDeleteName, setMembresiaToDeleteName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilterType, setActiveFilterType] = useState("filter"); // "filter" o "search"

  useEffect(() => {
    const fetchMembresias = async () => {
      try {
        const data = await MembresiaService.getAllMembresia();
        setMembresias(data);
      } catch (error) {
        console.error("No se pudieron cargar las membresias:", error);
      }
    };

    fetchMembresias();
  }, []);

  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = (option) => {
    if (option) {
      setSelectedFilter(option);
      setActiveFilterType("filter");

      setSearchTerm("");
    }
    setAnchorEl(null);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value) {
      setActiveFilterType("search");
    } else if (!value && activeFilterType === "search") {
      setActiveFilterType("filter");
    }
  };

  const filteredMembresias = membresias.filter((m) => {
    if (activeFilterType === "search" && searchTerm) {
      return (
        m.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      return selectedFilter === "Todos" || m.type === selectedFilter;
    }
  });

  // 👉 Agregar o editar membresía
  const handleAddMembresia = async (membresia) => {
    try {
      if (membresia.id) {
        const updated = await MembresiaService.updateMembresia(
          membresiaEditando.id,
          membresia
        );
        setMembresias((prev) =>
          prev.map((m) => (m.id === updated.id ? updated : m))
        );
        setMembresiaEditando(membresia);
      } else {
        const nueva = await MembresiaService.createMembresia(membresia);
        setMembresias((prev) => [...prev, nueva]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al guardar membresía:", error);
    }
  };

  // 👉 Editar
  const handleEditMembresia = (membresia) => {
    setMembresiaEditando(membresia);
    setIsModalOpen(true);
  };

  const confirmDeleteMembresia = (id, title) => {
    setMembresiaToDelete(id);
    setMembresiaToDeleteName(title);
    setIsDeleteModalOpen(true);
  };

  // 👉 Eliminar
  const handleDeleteMembresia = async () => {
    try {
      await MembresiaService.deleteMembresia(membresiaToDelete);
      setMembresias((prev) => prev.filter((m) => m.id !== membresiaToDelete));
      setIsDeleteModalOpen(false);
      setMembresiaToDelete(null);
    } catch (error) {
      console.error("Error al eliminar membresía:", error);
    }
  };

  const getFilterTitle = () => {
    if (activeFilterType === "search" && searchTerm) {
      return `Búsqueda: ${searchTerm}`;
    } else {
      return `Filtrado por: ${selectedFilter}`;
    }
  };

  return (
    <div className={styles.membresia_container} data-theme={darkMode ? "dark" : "light"}>
      <div className={styles.membresias_header} data-theme={darkMode ? "dark" : "light"}>
        <h2 className={styles.membresias_title} data-theme={darkMode ? "dark" : "light"}>Membresías</h2>

        <div className={styles.search_container} data-theme={darkMode ? "dark" : "light"}>
          <FaSearch className={styles.search_icon} data-theme={darkMode ? "dark" : "light"} />
          <input
            type="text"
            placeholder="Buscar membresías"
            className={styles.search_input}
            data-theme={darkMode ? "dark" : "light"}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <Button
          className={styles.filter_boton}
          data-theme={darkMode ? "dark" : "light"}
          onClick={handleOpenMenu}
          disabled={activeFilterType === "search" && searchTerm}
        >
          <FaFilter className={styles.filter_icon} /> Filtrar
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => handleCloseMenu()}
        >
          <MenuItem onClick={() => handleCloseMenu("Oro")}>Oro</MenuItem>
          <MenuItem onClick={() => handleCloseMenu("Plata")}>Plata</MenuItem>
          <MenuItem onClick={() => handleCloseMenu("Bronce")}>Bronce</MenuItem>
          <MenuItem onClick={() => handleCloseMenu("Todos")}>Todos</MenuItem>
        </Menu>

        <Button
          className={styles.add_boton}
          onClick={() => {
            setMembresiaEditando(null);
            setIsModalOpen(true);
          }}
        >
          <FaPlus className={styles.add_icon} /> Agregar Nueva Membresía
        </Button>
      </div>

      <h2 className={styles.filtered_title} data-theme={darkMode ? "dark" : "light"}>{getFilterTitle()}</h2>

      <TableContainer
        className={styles.membresia_table}
      
      >
        <Table sx={{ 
          borderCollapse: 'separate',
          borderSpacing: '0 5px',
          '& td, & th': {
            border: 'none',
            color: 'var(--text-color)',
          },
          "& thead": {
      backgroundColor: '#f2f2f2',
          },
          '& tbody tr': {
            backgroundColor: 'var(--card-bg)',
          },
          '& tbody tr td': {
            padding: '10px 16px',
          },
          '& tbody tr td:first-of-type': {
            borderRadius: '35px 0 0 35px',
          },
          '& tbody tr td:last-child': {
            borderRadius: '0 35px 35px 0',
          },
          '& tbody': {
            backgroundColor: 'var(--bg-color)',
          }
        }}>
          <TableHead>
            <TableRow>
              <TableCell data-theme={darkMode ? "dark" : "light"}>Nombre</TableCell>
              <TableCell data-theme={darkMode ? "dark" : "light"}>Tipo</TableCell>
              <TableCell data-theme={darkMode ? "dark" : "light"}>Duración (días)</TableCell>
              <TableCell data-theme={darkMode ? "dark" : "light"}>Precio</TableCell>
              <TableCell data-theme={darkMode ? "dark" : "light"}>Beneficios</TableCell>
              <TableCell data-theme={darkMode ? "dark" : "light"}>Opciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMembresias.length > 0 ? (
              filteredMembresias.map((membresia) => (
                <TableRow key={membresia.id} data-theme={darkMode ? "dark" : "light"}>
                  <TableCell data-theme={darkMode ? "dark" : "light"}>{membresia.title}</TableCell>
                  <TableCell data-theme={darkMode ? "dark" : "light"}>
                    <span className={styles[membresia.type.toLowerCase()]}>
                      {membresia.type}
                    </span>
                  </TableCell>
                  <TableCell data-theme={darkMode ? "dark" : "light"}>{membresia.duration}</TableCell>
                  <TableCell data-theme={darkMode ? "dark" : "light"}>${membresia.price}</TableCell>
                  <TableCell data-theme={darkMode ? "dark" : "light"}>
                    {membresia.benefits ? membresia.benefits.length : 0} beneficios
                  </TableCell>
                  <TableCell>
                    <FaPen 
                      className={styles.edit_icon} 
                      data-theme={darkMode ? "dark" : "light"}
                      onClick={() => handleEditMembresia(membresia)} 
                    />
                    <DeleteIcon 
                      className={styles.delete_icon} 
                      data-theme={darkMode ? "dark" : "light"}
                      onClick={() => confirmDeleteMembresia(membresia.id, membresia.title)} 
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} style={{ textAlign: 'center' }} data-theme={darkMode ? "dark" : "light"}>
                  No se encontraron membresías con los criterios de búsqueda.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {isModalOpen && (
        <MembresiasModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddMembresia}
          membresiaEditando={membresiaEditando}
        />
      )}
      {isDeleteModalOpen && (
        <ConfirmatioModalMembresia
          onClose={() => {
            setIsDeleteModalOpen(false);
            setMembresiaToDelete(null);
            setMembresiaToDeleteName("");
          }}
          onConfirm={() => {
            handleDeleteMembresia();
            setMembresiaToDeleteName("");
          }}
          membershipName={membresiaToDeleteName}
        />
      )}
    </div>
  );
};

export default MembresiaModal;

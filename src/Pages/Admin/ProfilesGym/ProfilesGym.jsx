import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import styles from './ProfilesGym.module.css';
import { useNavigate } from 'react-router-dom';
import { LogOutIcon } from 'lucide-react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ProfilesGym = () => {
  const [profiles, setProfiles] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const savedProfiles = localStorage.getItem('gymProfiles');
    if (savedProfiles) {
      setProfiles(JSON.parse(savedProfiles));
    } else {
      
      const sampleProfiles = [
        {
          id: 1,
          name: 'Carlos Rodríguez',
          email: 'carlos@example.com',
          phone: '+34 612 345 678',
          membershipType: 'Premium',
          startDate: '2023-05-10',
          imageUrl: null,
        },
        {
          id: 2,
          name: 'María García',
          email: 'maria@example.com',
          phone: '+34 623 456 789',
          membershipType: 'Standard',
          startDate: '2023-08-15',
          imageUrl: null,
        },
      ];
      setProfiles(sampleProfiles);
      localStorage.setItem('gymProfiles', JSON.stringify(sampleProfiles));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('gymProfiles', JSON.stringify(profiles));
  }, [profiles]);

  const handleAddProfile = () => {
    setSelectedProfile(null);
    setShowAddModal(true);
  };

  const handleEditProfile = (profile) => {
    setSelectedProfile(profile);
    setShowAddModal(true);
  };

  const handleDeleteProfile = (profileId, name) => {
    Swal.fire({
    title: '¿Estás seguro?',
    text: "Se eliminará el admin con el nombre: " + name,
    icon: 'warning',
    showCancelButton: true,
      reverseButtons: true,
    confirmButtonText: 'Eliminar',
    cancelButtonText: 'Cancelar',
    cancelButtonColor: '#000000',
    confirmButtonColor: '#D3D837',
    customClass: {
      confirmButton: 'mi-boton-confirmar'
    }
  }).then((result) => {
      if (result.isConfirmed) {
        setProfiles(profiles.filter(profile => profile.id !== profileId));
        Swal.fire(
          '¡Eliminado!',
          'El perfil ha sido eliminado correctamente.',
          'success'
        );
      }
    });
  };

  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.membershipType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.profileContainer}>
      <div className={styles.HeaderContainer}>
        <ArrowBackIcon onClick={() => navigate("/dashboard/perfil")} />
        <h1 className={styles.title}>Gestión de Perfiles</h1>
        <button 
          className={styles.openModalBtn}
          onClick={handleAddProfile}
        >
           Añadir Perfil
        </button>
      </div>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Buscar perfiles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.profilesGrid}>
        <AnimatePresence>
          {filteredProfiles.map((profile) => (
            <motion.div
              key={profile.id}
              className={styles.profileCard}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              layout
            >
              <div className={styles.profileImageContainer}>
                {profile.imageUrl ? (
                  <img src={profile.imageUrl} alt={profile.name} className={styles.profileCardImage} />
                ) : (
                  <div className={styles.profileInitials}>
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </div>
                )}
              </div>
              <div className={styles.profileInfo}>
                <h3>{profile.name}</h3>
                <p className={styles.membershipType}>{profile.membershipType}</p>
                <p className={styles.emailPhone}>{profile.email}</p>
                <p className={styles.emailPhone}>{profile.phone}</p>
                <p className={styles.date}>Miembro desde: {new Date(profile.startDate).toLocaleDateString()}</p>
              </div>
              <div className={styles.cardActions}>
                <button 
                  className={styles.editButton}
                  onClick={() => handleEditProfile(profile)}
                >
                  Editar
                </button>
                <button 
                  className={styles.deleteButton}
                  onClick={() => handleDeleteProfile(profile.id, profile.name)}
                >
                  Eliminar
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredProfiles.length === 0 && (
        <motion.div 
          className={styles.noProfiles}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          No se encontraron perfiles con los criterios de búsqueda.
        </motion.div>
      )}

      {showAddModal && (
        <ProfileFormModal
          onClose={() => setShowAddModal(false)}
          profiles={profiles}
          setProfiles={setProfiles}
          selectedProfile={selectedProfile}
        />
      )}
    </div>
  );
};

const ProfileFormModal = ({ onClose, profiles, setProfiles, selectedProfile }) => {
  const isEditing = !!selectedProfile;
  const [formData, setFormData] = useState({
    id: selectedProfile?.id || Date.now(),
    name: selectedProfile?.name || '',
    email: selectedProfile?.email || '',
    phone: selectedProfile?.phone || '',
    membershipType: selectedProfile?.membershipType || 'Standard',
    startDate: selectedProfile?.startDate || new Date().toISOString().split('T')[0],
    imageUrl: selectedProfile?.imageUrl || null,
  });
  const [previewImage, setPreviewImage] = useState(selectedProfile?.imageUrl || null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData({
          ...formData,
          imageUrl: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      Swal.fire({
        icon: 'error',
        title: 'Campos requeridos',
        text: 'Por favor completa al menos el nombre y el email.',
      });
      return;
    }

    if (isEditing) {
      // Update existing profile
      setProfiles(profiles.map(profile => 
        profile.id === formData.id ? formData : profile
      ));
      Swal.fire({
        icon: 'success',
        title: 'Perfil actualizado',
        text: 'El perfil ha sido actualizado correctamente.',
        confirmButtonColor: '#d3d837',
      });
    } else {
      // Add new profile
      setProfiles([...profiles, formData]);
      Swal.fire({
        icon: 'success',
        title: 'Perfil añadido',
        text: 'El nuevo perfil ha sido creado correctamente.',
        confirmButtonColor: '#d3d837',
      });
    }
    
    onClose();
  };

  return (
    <motion.div 
      className={styles.modalOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
  className={styles.modalContent}
  initial={{ scale: 0.8, y: 50 }}
  animate={{ scale: 1, y: 0 }}
  transition={{ type: 'spring', damping: 25 }}
>
  <div className={styles.modalHeader}>
    <h2>{isEditing ? 'Editar Perfil' : 'Crear Nuevo Perfil'}</h2>
    <button className={styles.closeButton} onClick={onClose}>×</button>
  </div>
  
  <div className={styles.contentLayout}>
    
    {/* Columna imagen igual */}
    <div className={styles.imageColumn}>
      <div className={styles.profileImagePreview}>
        {previewImage ? (
          <img src={previewImage} alt="Profile Preview" className={styles.previewImage} />
        ) : (
          <div className={styles.noImagePlaceholder}>
            {formData.name ? formData.name.split(' ').map(n => n[0]).join('') : 'Sin Imagen'}
          </div>
        )}
      </div>
      <div className={styles.uploadButtonContainer}>
        <label className={styles.customFileUpload}>
          <input
            type="file"
            className={styles.fileInput}
            accept="image/*"
            onChange={handleImageChange}
          />
          Subir Imagen
        </label>
      </div>
    </div>
    
    {/* Columna datos hasta fecha */}
    <div className={styles.dataColumn}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Nombre Completo: </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nombre y apellidos"
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="email">Correo Electrónico: </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="phone">Teléfono: </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+34 600 000 000"
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="membershipType">Rol: </label>
          <select
            id="membershipType"
            name="membershipType"
            value={formData.membershipType}
            onChange={handleChange}
            className={styles.selectInput}
          >
            <option value="Basic">Admin</option>
            
            
          </select>
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="startDate">Fecha de creación: </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
    
    {/* Línea vertical */}
    <div className={styles.verticalHr}></div>
    
    {/* Columna credenciales + botón */}
    <div className={styles.credentialsColumn}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3>Credenciales:</h3>
        <div className={styles.formGroup}>
          <label htmlFor="username">Nombre de usuario:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Contraseña: </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className={styles.updateButton}>
          {isEditing ? 'Actualizar Perfil' : 'Crear Perfil'}
        </button>
      </form>
    </div>
    
  </div>
</motion.div>

    </motion.div>
  );
};

export default ProfilesGym;
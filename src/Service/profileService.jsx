import { api } from './api';

const ProfileService = {
  getProfileData: async () => {
    try {
      const response = await api.get('/api/profile');
      return response.data;
    } catch (error) {
      console.error('Error al obtener datos del perfil:', error);
      throw error;
    }
  },

  updateProfileData: async (profileData) => {
    try {
      const response = await api.put('/api/profile/update', profileData);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar datos del perfil:', error);
      throw error;
    }
  },

  
};

export default ProfileService;

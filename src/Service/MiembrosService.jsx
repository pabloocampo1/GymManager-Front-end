import { api } from './api';

const MiembrosService = {
  getAllMiembros: async () => {
    try {
      const response = await api.get(`/api/members`);
      return response.data;
    } catch (error) {
      console.error('Error obteniendo miembros:', error);
      throw error;
    }
  },

  createMiembro: async (miembro) => {
    try {
      const response = await api.post('/api/members', miembro);
      return response.data;
    } catch (error) {
      console.error('Error creando miembro:', error);
      throw error;
    }
  },

  updateMiembro: async (id, miembro) => {
    try {
      const response = await api.put(`/api/members/update/${id}`, miembro);
      return response.data;
    } catch (error) {
      console.error(`Error actualizando miembro ${id}:`, error);
      throw error;
    }
  },

  deleteMiembro: async (id) => {
    try {
      const response = await api.delete(`/api/members/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error eliminando miembro ${id}:`, error);
      throw error;
    }
  }
};

export default MiembrosService;

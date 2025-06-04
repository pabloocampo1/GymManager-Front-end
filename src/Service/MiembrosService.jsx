import { api } from './api';

const MiembrosService = {
  getAllMiembros: async () => {
    try {
      const response = await api.get(`/api/members`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener miembros:', error);
      throw error;
    }
  },

  getMembershipData: async (memberId) => {
    try {
      const response = await api.get(`/api/members/getFullData/${memberId}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener datos completos del miembro:', error);
      throw error;
    }
  },

  createMiembro: async (data) => {
    try {
      console.log('Datos enviados al endpoint /api/members/save:', {
        url: '/api/members/save',
        method: 'POST',
        data: data
      });
      const response = await api.post('/api/members/save', data);
      console.log('Respuesta del servidor:', response);
      return response.data;
    } catch (error) {
      console.error('Error al crear miembro:', error);
      console.error('Detalles del error:', {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers
      });
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

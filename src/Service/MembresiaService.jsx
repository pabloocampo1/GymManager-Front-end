import { api } from './api';

const MembresiaService = {
  getAllMembresia: async () => {
    try {
      const response = await api.get(`/api/membresias`);
      return response.data;
    } catch (error) {
      console.error('Error obteniendo membresias:', error);
      throw error;
    }
  },

  createMembresia: async (membresia) => {
    try {
      const response = await api.post('/api/membresias', membresia);
      return response.data;
    } catch (error) {
      console.error('Error creando membresia:', error);
      throw error;
    }
  },

  updateMembresia: async (id, membresia) => {
    try {
      const response = await api.put(`/api/membresias/${id}`, membresia);
      return response.data;
    } catch (error) {
      console.log(error)
      console.error(`Error actualizando membresia ${id}:`, error);
      throw error;
    }
  },

  deleteMembresia: async (id) => {
    try {
      const response = await api.delete(`/api/membresias/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error eliminando membresia ${id}:`, error);
      throw error;
    }
  }
};

export default MembresiaService;

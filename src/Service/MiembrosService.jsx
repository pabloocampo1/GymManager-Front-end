import { api } from './api';

const MiembrosService = {
  getAllMiembros: async () => {
    try {
      const response = await api.get(`/api/members`);
      return response.data;
    } catch (error) {
      console.error( error);
     
    }
  },

  createMiembro: async (miembro) => {
    try {
      console.log("se llamo aca en el front: 1");
      
      const response = await api.post('/api/members', miembro);
      console.log(response);
      
      return response.data;
    } catch (error) {
      console.error( error);
  
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

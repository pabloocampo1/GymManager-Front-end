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
      const response = await api.post('/api/members', data);
      return response.data;
    } catch (error) {
      console.error('Error al crear miembro:', error);
      throw error;
    }
  },

  updateMiembro: async (id, miembro) => {
    try {;
      const response = await api.put(`/api/members/${id}`, miembro);
      return response.data;
    } catch (error) {
      console.error(`Error actualizando miembro ${id}:`, error);
      console.error('Detalles del error:', {
        mensaje: error.message,
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers
      });
      throw error;
    }
  },

  updateMembership: async (memberId, memberData) => {
    try {
      const response = await api.post("/api/sales/save", {
        userId: memberId,
        membershipId: parseInt(memberData.membershipId),
        purchaseMethod: "Efectivo",
        receptionistName: "Sistema"
      });
      
      if (response.status === 200 || response.status === 201) {
        return response.data;
      }
      throw new Error('Error al actualizar la membresía');
    } catch (error) {
      console.error('Error al actualizar la membresía:', error);
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

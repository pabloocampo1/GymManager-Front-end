import { api } from '../Service/api.jsx';

const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

const normalizeImageResponse = (item) => {
  // Cambia 'imagen' por 'imagenUrl' para que coincida con tu DTO
  if (item.imagenUrl && !item.image) {
    item.image = item.imagenUrl;
  }
  return item;
};

const InventoryService = {

  getAllItems: async () => {
    try {
      const response = await api.get(`/api/inventory`);
      return response.data.map(normalizeImageResponse);
    } catch (error) {
      console.error('Error getting inventory items:', error);
      throw error;
    }
  },

  getItemById: async (id) => {
    try {
      const response = await api.get(`/api/inventory/${id}`);
      return normalizeImageResponse(response.data);
    } catch (error) {
      console.error(`Error getting inventory item with ID ${id}:`, error);
      throw error;
    }
  },

  createItem: async (item) => {
    try {
      const formData = new FormData();
      formData.append('nombre', item.nombre);
      formData.append('categoria', item.categoria);
      formData.append('fechaCompra', item.fecha);
      formData.append('proveedor', item.proveedor);
      formData.append('estado', item.estado);
      formData.append('marca', item.marca);
      formData.append('modelo', item.modelo);

      if (item.image && typeof item.image === 'string' && item.image.startsWith('data:image')) {
        const imageFile = dataURLtoFile(item.image, 'image.jpg');
        formData.append('imagenFile', imageFile);
      } else if (item.image instanceof File) {
        formData.append('imagenFile', item.image);
      }

      const response = await api.post(`/api/inventory`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return normalizeImageResponse(response.data);
    } catch (error) {
      console.error('Error creating inventory item:', error);
      throw error;
    }
  },

  updateItem: async (id, item) => {
    try {
      const formData = new FormData();
      formData.append('nombre', item.nombre);
      formData.append('categoria', item.categoria);
      formData.append('fechaCompra', item.fecha);
      formData.append('proveedor', item.proveedor);
      formData.append('estado', item.estado);
      formData.append('marca', item.marca);
      formData.append('modelo', item.modelo);

      if (item.image && typeof item.image === 'string') {
        if (item.image.startsWith('data:image')) {
          const imageFile = dataURLtoFile(item.image, 'image.jpg');
          formData.append('imagenFile', imageFile);
        } else if (!item.image.startsWith('http')) {
          const imageFile = dataURLtoFile(item.image, 'image.jpg');
          formData.append('imagenFile', imageFile);
        }
      } else if (item.image instanceof File || item.image instanceof Blob) {
        formData.append('imagenFile', item.image);
      }

      const response = await api.put(`/api/inventory/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return normalizeImageResponse(response.data);
    } catch (error) {
      console.error(`Error updating inventory item with ID ${id}:`, error);
      throw error;
    }
  },

  deleteItem: async (id) => {
    try {
      const response = await api.delete(`/api/inventory/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting inventory item with ID ${id}:`, error);
      throw error;
    }
  },

  bulkUpdateItems: async (items) => {
    try {
      const response = await api.put(`/api/inventory/updateEstados`, items);
      return response.data;
    } catch (error) {
      console.error('Error bulk updating inventory items:', error);
      throw error;
    }
  }
};

export default InventoryService;

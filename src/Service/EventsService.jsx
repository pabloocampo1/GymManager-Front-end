import { api } from "../Service/api.jsx";

const normalizeImageResponse = (event) => {
  if (event.imagenUrl && !event.image) {
    event.image = event.imagenUrl;
  }
  return event;
};

const EventService = {
  getAllEvents: async () => {
    try {
      const response = await api.get(`/api/Eventos`);
      return response.data.map(normalizeImageResponse);
    } catch (error) {
      console.error('Error getting events:', error);
      throw error;
    }
  },

  getEventById: async (id) => {
    const response = await api.get(`/api/Eventos/${id}`);
    return normalizeImageResponse(response.data);
  },

  createEvent: async (event) => {
    const formData = new FormData();
    formData.append("nombre", event.nombre);
    formData.append("categoria", event.categoria);
    formData.append("fechaEvento", event.fecha);
    formData.append("encargado", event.encargado);
    formData.append("lugar", event.lugar);

    if (event.image && typeof event.image === "string" && event.image.startsWith("data:image")) {
      const imageFile = dataURLtoFile(event.image, "image.jpg");
      formData.append("imagenFile", imageFile);
    } else if (event.image instanceof File) {
      formData.append("imagenFile", event.image);
    } else {
      throw new Error("Se requiere una imagen válida para crear un evento.");
    }

    const response = await api.post(`/api/Eventos`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return normalizeImageResponse(response.data);
  },

  updateEvent: async (id, event) => {
    const formData = new FormData();
    formData.append("nombre", event.nombre);
    formData.append("categoria", event.categoria);
    formData.append("fechaEvento", event.fecha);
    formData.append("encargado", event.encargado);
    formData.append("lugar", event.lugar);

    if (event.image && typeof event.image === "string") {
      if (event.image.startsWith("data:image") || !event.image.startsWith("http")) {
        const imageFile = dataURLtoFile(event.image, "image.jpg");
        formData.append("imagenFile", imageFile);
      }
    } else if (event.image instanceof File || event.image instanceof Blob) {
      formData.append("imagenFile", event.image);
    }

    const response = await api.put(`/api/Eventos/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return normalizeImageResponse(response.data);
  },

  deleteEvent: async (id) => {
    const response = await api.delete(`/api/Eventos/${id}`);
    return response.data;
  },

  bulkUpdateEvents: async (events) => {
    const response = await api.put(`/api/Eventos/bulk-update`, { events });
    return response.data.map(normalizeImageResponse);
  },
};

function dataURLtoFile(dataurl, filename) {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

export default EventService;

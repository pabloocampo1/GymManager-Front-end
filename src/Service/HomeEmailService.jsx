import { api } from "./api"; // o "../config/api" si lo tienes en otra carpeta

export const sendContactEmail = async (emailData) => {
  try {
    // Asegurarse que los campos coincidan exactamente con EMailHomeDto
    const formattedData = {
      name: emailData.name,
      email: emailData.email,
      message: emailData.message
    };
    
    // Verificar que la ruta sea la correcta según el controlador
    const response = await api.post("/contact/send", formattedData);
    return response.data;
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    throw error.response?.data || "Error inesperado al enviar el mensaje.";
  }
};
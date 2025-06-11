import { api } from "./api"; 

export const sendContactEmail = async (emailData) => {
  try {
    const formattedData = {
      name: emailData.name,
      email: emailData.email,
      message: emailData.message,
      captchaToken: emailData.captchaToken
    };
    const response = await api.post("/api/contact/send", formattedData);
    return response.data;
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    throw error.response?.data || "Error inesperado al enviar el mensaje.";
  }
};
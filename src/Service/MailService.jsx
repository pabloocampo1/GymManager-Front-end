import { api } from "./api.jsx";

const MailService = {
    sendMail: async (mailData) => {
        try {
            console.log('Datos que se enviarán al backend:', {
                estado: mailData.estado,
                asunt: mailData.asunt,
                contenido: mailData.contenido
            });
            
            const response = await api.post('/api/correo/send', {
                estado: mailData.estado,
                asunt: mailData.asunt,
                contenido: mailData.contenido
            });
            
            console.log('Respuesta del servidor:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error detallado:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            throw error;
        }
    }
};

export default MailService; 
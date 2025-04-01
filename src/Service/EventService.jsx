import {api} from "./api"


export const getAllEvent = async () => {
    try{
        const response = await api.get('/event/events');
        console.log(response.data)
        return response.data;
    }catch (error) {
        console.error('Error fetching events:', error);
        throw error; 
      }
}
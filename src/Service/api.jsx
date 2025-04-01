import axios from 'axios';

const API_URL =  'http://localhost:8080/api';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 segundos, ajustable según necesidad
});



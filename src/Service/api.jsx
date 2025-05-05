import axios from 'axios';

const API_URL =  'http://localhost:8080';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, 
});



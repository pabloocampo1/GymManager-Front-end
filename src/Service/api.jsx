
import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});


api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('userAuthGymManager'));
    const token = user?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

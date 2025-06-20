import axios from 'axios';

const API_URL = 'http://localhost:8080';

// Recuperar el token del localStorage al inicio
const userAuth = JSON.parse(localStorage.getItem("userAuthGymManager"));
const initialToken = userAuth ? userAuth.token : null;

export const api = axios.create({
  baseURL: API_URL,
  timeout: 40000,
  headers: {
    'Authorization': initialToken ? `Bearer ${initialToken}` : '',
  }
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    // También actualizar el header específico si existe
    api.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
    delete api.defaults.headers.Authorization;
  }
};

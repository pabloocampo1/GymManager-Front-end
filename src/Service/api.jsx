
import axios from 'axios';


const API_URL = 'http://localhost:8080';


export const api = axios.create({
  baseURL: API_URL,
  timeout: 40000 
});

let authToken = null;

export const setAuthToken = (token) => {
  authToken = token;
};


api.interceptors.request.use(
  (config) => {
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
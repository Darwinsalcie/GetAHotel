// src/services/authService.js
import axios from 'axios';

const API_BASE_URL = 'https://localhost:7023/api/auth';

// Configuración base de axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

// Función para registrar usuario
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/register', {
      name: userData.name.trim(),
      email: userData.email.trim().toLowerCase(),
      password: userData.password
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función para iniciar sesión
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/login', {
      email: credentials.email.trim().toLowerCase(),
      password: credentials.password
    });
    
    // Guardar datos en localStorage
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('userName', user.name);
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función para cerrar sesión
export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userName');
};

// Función para verificar si el usuario está autenticado
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('userName');
  return !!(token && userName);
};

// Función para obtener el nombre del usuario actual
export const getCurrentUserName = () => {
  return localStorage.getItem('userName') || '';
};

// Función para obtener el token actual
export const getCurrentToken = () => {
  return localStorage.getItem('token') || '';
};

// Función para verificar la validez del token (opcional)
export const verifyToken = async () => {
  try {
    const response = await api.get('/verify');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función para refrescar el token (si tu API lo soporta)
export const refreshToken = async () => {
  try {
    const response = await api.post('/refresh');
    const { token } = response.data;
    localStorage.setItem('token', token);
    return token;
  } catch (error) {
    throw error;
  }
};
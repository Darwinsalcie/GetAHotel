// src/services/savedLocationService.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7023/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const fetchSavedLocations   = () => api.get('/SavedLocation').then(r => r.data);
export const createSavedLocation   = (body) => api.post('/SavedLocation', body);
export const updateSavedLocation   = (id, body) => api.put(`/SavedLocation/${id}`, body);
export const deleteSavedLocation   = (id) => api.delete(`/SavedLocation/${id}`);
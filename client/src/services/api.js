// src/services/api.js
import axios from 'axios';

// Configuración base de Axios para apuntar a nuestro servidor
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Servicio para las notas
export const notesService = {
  // Obtener todas las notas
  getAll: async () => {
    try {
      const response = await api.get('/notes');
      return response.data;
    } catch (error) {
      console.error('Error fetching notes:', error);
      throw error;
    }
  },

  // Obtener una nota por ID
  getById: async (id) => {
    try {
      const response = await api.get(`/notes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching note with id ${id}:`, error);
      throw error;
    }
  },

  // Crear una nueva nota
  create: async (noteData) => {
    try {
      const response = await api.post('/notes', noteData);
      return response.data;
    } catch (error) {
      console.error('Error creating note:', error);
      throw error;
    }
  },

  // Actualizar una nota existente
  update: async (id, noteData) => {
    try {
      const response = await api.put(`/notes/${id}`, noteData);
      return response.data;
    } catch (error) {
      console.error(`Error updating note with id ${id}:`, error);
      throw error;
    }
  },

  // Eliminar una nota
  delete: async (id) => {
    try {
      const response = await api.delete(`/notes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting note with id ${id}:`, error);
      throw error;
    }
  }
};

export default api;

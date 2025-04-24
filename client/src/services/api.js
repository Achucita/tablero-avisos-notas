import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const getNotes = async () => {
  try {
    const response = await axios.get(`${API_URL}/notas`);
    return response.data;
  } catch (error) {
    console.error('Error en getNotes:', error);
    throw error;
  }
};

export const getNoteById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/notas/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error en getNoteById:', error);
    throw error;
  }
};

export const createNote = async (note) => {
  try {
    const response = await axios.post(`${API_URL}/notas`, note);
    return response.data;
  } catch (error) {
    console.error('Error en createNote:', error);
    throw error;
  }
};

export const updateNote = async (id, note) => {
  try {
    const response = await axios.put(`${API_URL}/notas/${id}`, note);
    return response.data;
  } catch (error) {
    console.error('Error en updateNote:', error);
    throw error;
  }
};

export const deleteNote = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/notas/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error en deleteNote:', error);
    throw error;
  }
};

// src/components/NoteList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { notesService } from '../services/api';
import NoteItem from './NoteItem';

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchNotes = async () => {
    try {
      setIsLoading(true);
      const data = await notesService.getAll();
      setNotes(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar las notas. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta nota?')) {
      try {
        await notesService.delete(id);
        setNotes(notes.filter(note => note.id !== id));
      } catch (err) {
        setError('Error al eliminar la nota. Por favor, intenta de nuevo.');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Tablero de Notas</h2>
        <Link to="/create" className="btn btn-primary">
          Nueva Nota
        </Link>
      </div>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      {notes.length === 0 ? (
        <div className="text-center p-5 bg-light rounded">
          <h3>No hay notas disponibles</h3>
          <p>Comienza creando una nueva nota.</p>
        </div>
      ) : (
        <div>
          {notes.map(note => (
            <NoteItem 
              key={note.id} 
              note={note} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NoteList;

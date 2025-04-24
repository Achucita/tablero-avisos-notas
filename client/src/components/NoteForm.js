// src/components/NoteForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { notesService } from '../services/api';

const NoteForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [note, setNote] = useState({
    title: '',
    content: '',
  });

  // Cargar la nota si estamos en modo edición
  useEffect(() => {
    const fetchNote = async () => {
      if (id) {
        try {
          setIsLoading(true);
          const noteData = await notesService.getById(id);
          setNote(noteData);
        } catch (err) {
          setError('Error al cargar la nota. Por favor, intenta de nuevo.');
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchNote();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote(prevNote => ({
      ...prevNote,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      if (id) {
        await notesService.update(id, note);
      } else {
        await notesService.create(note);
      }
      navigate('/');
    } catch (err) {
      setError('Error al guardar la nota. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && id) {
    return <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>;
  }

  return (
    <div className="container mt-4">
      <h2>{id ? 'Editar Nota' : 'Crear Nueva Nota'}</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="title">Título</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group mb-3">
          <label htmlFor="content">Contenido</label>
          <textarea
            className="form-control"
            id="content"
            name="content"
            rows="6"
            value={note.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        
        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/')}
          >
            Cancelar
          </button>
          
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                {id ? 'Actualizando...' : 'Guardando...'}
              </>
            ) : (
              id ? 'Actualizar Nota' : 'Guardar Nota'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;
